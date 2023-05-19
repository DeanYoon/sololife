import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

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
  border: none;
  font-size: 16px;
  border-bottom: 1px solid #dddddd;
  ::placeholder {
    color: #767676;
  }
  &:focus {
    border: none;
  }
`;

const ForgotIDPass = styled.a`
  font-size: 15px;
  text-align: end;
  margin-top: 30px;
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
  &:hover {
    color: white;
    background-color: #ff5f2d;
  }
`;

const SignupBtn = styled(LoginBtn)`
  border: 1px solid #ff5f2d;
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

const SocialBtn = styled.a`
  color: #767676;
  border: 1px solid #dddddd;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 56px;
  position: relative;
  margin: 10px 0;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-right: 1px solid #dddddd;
  position: absolute;
  left: 0;
  width: 50px;
  height: 55px;
`;
const GoogleIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
`;

function Login() {
  return (
    <Wrapper>
      <Title>로그인</Title>
      <Box>
        <LoginForm>
          <LoginInput
            type="email"
            placeholder="아이디(이메일)를 입력하세요"
          ></LoginInput>
          <LoginInput
            type="password"
            placeholder="비밀번호를 입력하세요"
          ></LoginInput>
          <ForgotIDPass href="/">아이디/비밀번호 잊으셨나요?</ForgotIDPass>
          <BtnBox>
            <LoginBtn href="/">로그인</LoginBtn>
            <SignupBtn href="/">회원가입</SignupBtn>
          </BtnBox>
        </LoginForm>
        <Barrier>
          <span>간편로그인</span>
        </Barrier>
        <BtnBox>
          <SocialBtn href="/">
            <Logo>
              <GoogleIcon icon={faGoogle} />
            </Logo>
            구글 아이디로 시작하기
          </SocialBtn>
          <SocialBtn href="/">
            <Logo>
              <GoogleIcon icon={faMessage} />
            </Logo>
            카카오 아이디로 시작하기
          </SocialBtn>
        </BtnBox>
      </Box>
    </Wrapper>
  );
}

export default Login;
