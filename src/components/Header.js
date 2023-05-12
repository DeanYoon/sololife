import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #ffffff;
  z-index: 100;
`;
const Buttons = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 8px;
  font-weight: 500;
  div {
    width: 120px;
    height: 40px;
    border: 1px solid #ff5f2d;
    color: #ff5f2d;
    margin: 4px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font: bold;
  }
  div:last-child {
    color: white;
    background-color: #ff5f2d;
  }
`;
export default function Header() {
  return (
    <Wrapper>
      <img src="./imgs/솔로라이프.png" />
      <Buttons>
        <div>로그인</div>
        <div>회원가입</div>
      </Buttons>
    </Wrapper>
  );
}
