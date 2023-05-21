import styled from "styled-components";
import SocialLoginBtns from "../components/SocialLoginBtns";

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
  &:hover {
    color: white;
    background-color: #ff5f2d;
  }
`;

const SubmitBtn = styled(LoginBtn)`
  border: 1px solid #ff5f2d;
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

function Signup() {
  return (
    <Wrapper>
      <Title>회원가입</Title>
      <Box>
        <Box_Top>
          <img src="./imgs/Logo.png" />
          <div>
            이미 솔로라이프 회원이신가요?
            <MoveToLogin href="/">로그인하기</MoveToLogin>
          </div>
        </Box_Top>
        <SocialLoginBtns />
        <Barrier>
          <span>또는</span>
        </Barrier>
        <LoginForm>
          <LoginInput type="email" placeholder="이메일 주소"></LoginInput>
          <LoginInput type="text" placeholder="성명"></LoginInput>
          <LoginInput type="password" placeholder="비밀번호"></LoginInput>
          <LoginInput type="password" placeholder="비밀번호 확인"></LoginInput>
          <BtnBox>
            <SubmitBtn>가입하기</SubmitBtn>
          </BtnBox>
        </LoginForm>
      </Box>
    </Wrapper>
  );
}

export default Signup;
