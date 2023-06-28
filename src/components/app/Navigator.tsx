import styled from "styled-components";

const Wrapper = styled.div`
  width: 500px;
  height: 100px;
  display: flex;
  position: fixed;
  bottom: 0;
  background-color: inherit;
  box-shadow: 0px -1px 3px rgba(50, 50, 50, 0.2);
`;

const ButtonBox = styled.a`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ButtonIcon = styled.img`
  width: 40px;
`;
const ButtonText = styled.p`
  font-weight: 400;
  margin-top: 10px;
`;

function Navigator() {
  return (
    <Wrapper>
      <ButtonBox href="/home">
        <ButtonIcon src="./imgs/NavBar/home.png" />
        <ButtonText>홈</ButtonText>
      </ButtonBox>
      <ButtonBox href="/">
        <ButtonIcon src="./imgs/NavBar/pen.png" />
        <ButtonText>글쓰기</ButtonText>
      </ButtonBox>
      <ButtonBox href="/">
        <ButtonIcon src="./imgs/NavBar/bot.png" />
        <ButtonText>AI 친구</ButtonText>
      </ButtonBox>
      <ButtonBox href="/">
        <ButtonIcon src="./imgs/NavBar/manager.png" />
        <ButtonText>전문 매니저</ButtonText>
      </ButtonBox>
      <ButtonBox href="/myprofile">
        <ButtonIcon src="./imgs/NavBar/profile.png" />
        <ButtonText>마이페이지</ButtonText>
      </ButtonBox>
    </Wrapper>
  );
}

export default Navigator;
