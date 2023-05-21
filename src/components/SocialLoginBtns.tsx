import styled from "styled-components";

const BtnBox = styled.div`
  margin-top: 30px;
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
  img {
    width: 30px;
  }
  #chat {
    width: 50px;
  }
`;

function SocialLoginBtns() {
  return (
    <BtnBox>
      <SocialBtn href="/">
        <Logo>
          <img src="./imgs/icons/GoogleLogo.png" />
        </Logo>
        구글 아이디로 시작하기
      </SocialBtn>
      <SocialBtn href="/">
        <Logo>
          <img id="chat" src="./imgs/icons/KakaoLogo.png" />
        </Logo>
        카카오 아이디로 시작하기
      </SocialBtn>
    </BtnBox>
  );
}

export default SocialLoginBtns;
