import styled from "styled-components";
import { useForm } from "react-hook-form";
const Wrapper = styled.div`
  background-color: #fffaf4;
  width: 100vw;
  height: 100vh;
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

const Box = styled.form`
  background-color: white;
  width: 637px;
  height: 680px;
  padding: 70px;
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
    margin: 20px 0;
  }
  input {
    width: 500px;
    height: 50px;
    margin-top: 80px;
    padding-left: 20px;
    border: 1px solid #dddddd;
  }
  button {
    width: 500px;
    height: 56px;
    background-color: #ff5f2d;
    color: white;
    font-weight: bold;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    cursor: pointer;
  }
`;

const BoxBottom = styled.div`
  width: 100%;
  margin-top: 100px;
  a {
    &:hover {
      text-decoration: underline;
      text-decoration-color: #767676;
    }
  }
  div {
    margin-top: 10px;
  }
`;
function FindPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onValid = (data: any) => {
    console.log(data);
  };
  return (
    <Wrapper>
      <Title>비밀번호 찾기</Title>
      <Box onSubmit={handleSubmit(onValid)}>
        <h1>비밀번호를 잃어버리셨나요?</h1>
        <p>
          기존에 가입하신 이메일을 입력하시면, 비밀번호 변경 메일을
          발송해드립니다.
        </p>
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="이메일 주소"
        />
        <button>비밀번호 변경 이메일 받기</button>
        <BoxBottom>
          <a href="/login">로그인</a>/<a href="/signup">회원가입</a>
          <div>
            *위 방법으로 계정을 찾을 수 없다면, 고객센터로 직접 문의 바랍니다.
          </div>
        </BoxBottom>
      </Box>
    </Wrapper>
  );
}

export default FindPassword;
