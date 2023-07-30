import styled from "styled-components";
import SocialLoginBtns from "../components/SocialLoginBtns";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { hashPassword } from "../components/hash";
import bcrypt from "bcryptjs";
import { DOMAIN_URL, postInsertUserData } from "../components/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { UserData, loginState } from "../atoms";
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
  margin: 10px;
  font-size: 20px;
  font-family: "NanumSquareRound", sans-serif;
`;

const Box = styled.div`
  background-color: white;
  width: 500px;
  height: 780px;
  padding: 30px 45px;
  display: flex;
  flex-direction: column;
`;
const Box_Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 280px;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: "NanumSquare", sans-serif;
`;

export const InputBox = styled.div`
  position: relative;
  display: flex;
`;

const LoginInput = styled.input`
  width: 400px;
  height: 56px;
  outline: none;
  border: none;
  font-size: 16px;
  border-bottom: 1px solid #dddddd;
  padding-left: 20px;
  ::placeholder {
    color: #767676;
  }
`;
export const InputValidation = styled.span`
  display: flex;
  position: absolute;
  right: 30px;
  top: 15px;
`;

const MoveToLogin = styled.a`
  font-size: 15px;
  text-align: end;
  margin-top: 30px;
  text-decoration: underline;
  color: #ff5f2d;
  font-weight: 1000;
  margin-left: 20px;
`;

const BtnBox = styled.div`
  margin-top: 30px;
`;

const LoginBtn = styled.a`
  width: 400px;
  height: 56px;
  border: 1px solid #ff5f2d;
  color: #ff5f2d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: background-color 0.3s ease;
  margin: 8px 0;
  background-color: inherit;
  &:hover {
    color: white;
    background-color: #ff5f2d;
  }
`;

const SubmitBtn = styled(LoginBtn)`
  border: 1px solid #ff5f2d;
  cursor: pointer;
`;

const Barrier = styled.div`
  border: 1px solid #fffaf4;
  margin: 50px 0;
  position: relative;
  span {
    position: absolute;
    right: 40%;
    top: -25px;
    background-color: white;
    padding: 18px;
  }
`;

interface IFormData {
  email: string;
  name: string;
  password: string;
  checkPassword: string;
}

function Signup() {
  const setIsLoggedIn = useSetRecoilState(loginState);
  const [userData, setUserData] = useRecoilState(UserData);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const hasSpecialCharacter = (value: string) => {
    return /[!@#\$%\^&\*_\-=]/.test(value);
  };
  const { email, name, password, checkPassword } = watch();
  const navigate = useNavigate();
  const onValid = async (data: any) => {
    if (password === checkPassword) {
      const hashedPassword = await hashPassword(data.password);
      const checkData = {
        email: data.email,
        username: data.name,
      };

      try {
        const response = await axios.post(
          `${DOMAIN_URL}/checkAvailability`,
          checkData
        );

        if (!response.data.email.available) {
          alert("사용중인 이메일입니다.");
        } else if (!response.data.username.available) {
          alert("사용중인 이름입니다.");
        } else {
          const userData = {
            ...checkData,
            password: hashedPassword,
            profile_image: "",
          };
          const response = await axios.post(`${DOMAIN_URL}/insert`, userData);
          const { id, username, email, profile_image } = response.data.data;
          setIsLoggedIn(true);
          setUserData({
            id,
            username,
            userEmail: email,
            profileImg: profile_image,
          });
          navigate("/home");
        }
      } catch (error) {
        console.error("Error:", error);
      }

      // console.log(userData);user
      // const insertResult = await postInsertUserData(userData);
      // console.log(insertResult?.data.message);
      // if (insertResult?.data.message !== "NG") {
      //   navigate("/signup-done");
      // }
    } else {
      alert("다시 입력하십시오");
    }
  };

  return (
    <Wrapper>
      <Title>회원가입</Title>
      <Box>
        <Box_Top>
          <img src="./imgs/Logo.png" />
          <div>
            이미 솔로라이프 회원이신가요?
            <MoveToLogin href="/login">로그인하기</MoveToLogin>
          </div>
        </Box_Top>
        <SocialLoginBtns />
        <Barrier>
          <span>또는</span>
        </Barrier>
        <LoginForm onSubmit={handleSubmit(onValid)}>
          <InputBox>
            <LoginInput
              {...register("email", {
                required: true,
                pattern: {
                  value: /^(?:\d{3}-\d{4}-\d{4}|\w+@\w+\.\w{2,3})$/,
                  message: "asd",
                },
              })}
              placeholder="이메일 주소"
            ></LoginInput>
            <InputValidation>
              {errors.email ? (
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  style={{ color: "red", fontSize: "20px" }}
                />
              ) : null}
              {!errors.email && email ? (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  style={{ fontSize: "20px" }}
                />
              ) : null}
            </InputValidation>
          </InputBox>
          <InputBox>
            <LoginInput
              {...register("name", {
                required: true,
              })}
              placeholder="이름"
            ></LoginInput>
            <InputValidation>
              {errors.name ? (
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  style={{ color: "red", fontSize: "20px" }}
                />
              ) : null}
              {!errors.name && name ? (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  style={{ fontSize: "20px" }}
                />
              ) : null}
            </InputValidation>
          </InputBox>
          <InputBox>
            <LoginInput
              {...register("password", {
                required: "Add Password",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                validate: {
                  hasSpecialCharacter: (value) =>
                    hasSpecialCharacter(value) ||
                    "Password must contain at least one special character like !@#$%^&*_-=",
                },
              })}
              placeholder="비밀번호 (기호 포함 8자 이상)"
              type="password"
            ></LoginInput>
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
            <LoginInput
              {...register("checkPassword", { required: "Add Password" })}
              placeholder="비밀번호 확인"
              type="password"
            ></LoginInput>
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
          <BtnBox>
            <SubmitBtn as="button">가입하기</SubmitBtn>
          </BtnBox>
        </LoginForm>
      </Box>
    </Wrapper>
  );
}

export default Signup;
