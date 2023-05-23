import styled from "styled-components";
import SocialLoginBtns from "../components/SocialLoginBtns";
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

const Box = styled.div`
  background-color: white;
  width: 500px;
  height: 680px;
  padding: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 32px;
    color: #767676;
    font-weight: 1000;
    margin: 20px 0;
  }
  p {
    text-align: center;
    width: 346px;
    margin: 20px 0;
  }
  a {
    width: 400px;
    height: 56px;
    background-color: #ff5f2d;
    color: white;
    font-weight: bold;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
    cursor: pointer;
  }
`;
const Icon = styled.div`
  width: 100px;
  height: 100px;
  background-color: #feefea;
  border-radius: 100%;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 50px;
  }
`;

function SignupSuccess() {
  return (
    <Wrapper>
      <Title>가입완료</Title>
      <Box>
        <Icon>
          <img src="./imgs/Icons/Vector.png" />
        </Icon>
        <h1>회원가입이 완료되었습니다.</h1>
        <p>
          로그인 후 안전하고 편리하게 솔로라이프의 다양한 서비스를 이용하실 수
          있습니다.
        </p>
        <a>로그인</a>
      </Box>
    </Wrapper>
  );
}

export default SignupSuccess;
