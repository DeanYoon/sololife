import styled from "styled-components";
import { BtnBox, LoginBtn, SignupBtn, Wrapper } from "./Styled_Component";

const Img = styled.img`
  width: 70%;
`;
const MidText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 60px;
  font-size: 20px;
  width: 80vw;
  h1 {
    font-weight: 500;
  }
`;

function UnloggedIn() {
  return (
    <Wrapper>
      <Img src="./imgs/AppScreen/UnLoggedInImg.png" />
      <MidText>
        <h1>아직 솔라회원이 아니신가요?</h1>
        <div>로그인하시고 솔라의 모든 서비스를 이용해보세요</div>
      </MidText>
      <BtnBox>
        <LoginBtn as="button">로그인</LoginBtn>
        <SignupBtn href="/signup">회원가입</SignupBtn>
      </BtnBox>
    </Wrapper>
  );
}

export default UnloggedIn;
