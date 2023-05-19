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
  img {
    width: 192px;
  }
`;
const Buttons = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 8px;
  font-weight: 500;
  a {
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
    transition: background-color 0.3s ease;
    padding-top: 3px;
    &:hover {
      background-color: #ff5f2d;
      color: white;
    }
  }
`;
export default function Header() {
  return (
    <Wrapper>
      <img src="./imgs/Logo.png" />
      <Buttons>
        <a href="/Login">로그인</a>
        <a href="/">회원가입</a>
      </Buttons>
    </Wrapper>
  );
}
