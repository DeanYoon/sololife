import styled from "styled-components";
import SocialLoginBtns from "../components/SocialLoginBtns";
import { useForm } from "react-hook-form";

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
  height: 680px;
  padding: 45px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  font-family: "NanumSquare", sans-serif;
`;

const LoginInput = styled.input`
  width: 400px;
  height: 56px;
  outline: none;
  border: none;
  font-size: 16px;
  border-bottom: 1px solid #dddddd;
  ::placeholder {
    color: #767676;
  }
`;

const ForgotIDPass = styled.a`
  font-size: 15px;
  text-align: end;
  margin-top: 30px;
  &:hover {
    text-decoration: underline;
    text-decoration-color: #767676;
  }
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
  background-color: white;
  font-size: 16px;
  &:hover {
    color: white;
    background-color: #ff5f2d;
  }
`;

const SignupBtn = styled(LoginBtn)`
  border: 1px solid #ff5f2d;
  font-size: 16px;
`;

const Barrier = styled.div`
  border: 1px solid #dddddd;
  margin: 50px 0;
  position: relative;
  span {
    position: absolute;
    right: 40%;
    top: -15px;
    background-color: white;
    padding: 8px;
  }
`;

function Login() {
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
      <Title>로그인</Title>
      <Box>
        <LoginForm onSubmit={handleSubmit(onValid)}>
          <LoginInput
            {...register("email", { required: true })}
            placeholder="아이디(이메일)를 입력하세요"
          ></LoginInput>
          <LoginInput
            {...register("password", { required: true })}
            type="password"
            placeholder="비밀번호를 입력하세요"
          ></LoginInput>
          <ForgotIDPass href="/find-password">
            아이디/비밀번호 잊으셨나요?
          </ForgotIDPass>
          <BtnBox>
            <LoginBtn as="button">로그인</LoginBtn>
            <SignupBtn href="/signup">회원가입</SignupBtn>
          </BtnBox>
        </LoginForm>
        <Barrier>
          <span>간편로그인</span>
        </Barrier>
        <SocialLoginBtns />
      </Box>
    </Wrapper>
  );
}

export default Login;
