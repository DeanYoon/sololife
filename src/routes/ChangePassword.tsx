import styled from "styled-components";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { InputBox, InputValidation } from "./Signup";
import { hashPassword } from "../components/hash";
import { useNavigate } from "react-router-dom";
const Wrapper = styled.div`
  background-color: #fffaf4;
  max-width: 500px;
  min-width: 375px;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  margin: 20px;
  font-size: 20px;
  font-family: "NanumSquareRound", sans-serif;
`;

const Box = styled.form`
  background-color: white;
  width: 637px;
  height: 680px;
  padding: 30px 70px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 32px;
    color: #767676;
    font-weight: 1000;
    margin: 20px 0;
  }
  p {
    text-align: center;
    width: 500px;
    margin: 20px 0 60px 0;
  }
  input {
    width: 500px;
    height: 50px;
    padding-left: 20px;
    border: 1px solid #dddddd;
    position: relative;
  }
`;

const CautionBox = styled.div`
  width: 100%;
  height: 210px;
  background-color: #f8f8f8;
  padding: 20px;
  color: #767676;
  margin: 50px 0;
  div {
    font-size: 20px;
    font-weight: 1000;
    margin-bottom: 20px;
  }
  ul {
    margin-left: 20px;
  }
  li {
    list-style-type: disc;
    padding: 3px;
  }
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  button {
    width: 240px;
    height: 50px;
    border: 1px solid;
  }
`;
const CancelBtn = styled.button`
  color: #767676;
  background-color: white;
`;
const SubmitBtn = styled.button`
  color: white;
  background-color: #ff5f2d;
`;
function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const { password, checkPassword } = watch();
  const navigate = useNavigate();

  const onValid = async (data: any) => {
    if (password === checkPassword) {
      const hashedPassword = await hashPassword(data.password);
      console.log(hashedPassword);
    }
  };

  const handleCancelClick = (event: any) => {
    event.preventDefault();
    navigate("/login");
  };
  return (
    <Wrapper>
      <Title>비밀번호 변경</Title>
      <Box onSubmit={handleSubmit(onValid)}>
        <h1>비밀번호 변경</h1>
        <p>
          고객님의 소중한 정보를 보호하기 위하여 새로운 비밀번호로 변경해주세요.
        </p>
        <InputBox>
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="새 비밀번호"
          />{" "}
          <InputValidation>
            {password && errors.password ? (
              <FontAwesomeIcon
                icon={faTimesCircle}
                style={{ color: "red", fontSize: "20px" }}
              />
            ) : null}
            {!errors.password && password ? (
              <FontAwesomeIcon
                icon={faCheckCircle}
                style={{ fontSize: "20px" }}
              />
            ) : null}
          </InputValidation>
        </InputBox>
        <InputBox>
          <input
            {...register("checkPassword", { required: true })}
            type="password"
            placeholder="새 비밀번호 확인"
          />{" "}
          <InputValidation>
            {checkPassword &&
            (errors.checkPassword || checkPassword !== password) ? (
              <FontAwesomeIcon
                icon={faTimesCircle}
                style={{ color: "red", fontSize: "20px" }}
              />
            ) : null}
            {checkPassword &&
            !errors.checkPassword &&
            checkPassword == password ? (
              <FontAwesomeIcon
                icon={faCheckCircle}
                style={{ fontSize: "20px" }}
              />
            ) : null}
          </InputValidation>
        </InputBox>
        <CautionBox>
          <div>비밀번호 변경 시 유의사항</div>
          <ul>
            <li>영문자, 숫자, 특수문자 조합하여 8~12자리여야 합니다. </li>
            <li>
              {" "}
              아이디와 4자리 이상 동일하거나, 4자리 이상 반복되는 문자와 숫자는
              사용이 불가합니다.
            </li>
            <li>사용 가능 특수문자: !”#$%’()+,-ㅣ:;?@[]^_’{}~</li>
          </ul>
        </CautionBox>
        <Buttons>
          <CancelBtn onClick={handleCancelClick}>취소</CancelBtn>
          <SubmitBtn>비밀번호 변경</SubmitBtn>
        </Buttons>
      </Box>
    </Wrapper>
  );
}

export default ChangePassword;
