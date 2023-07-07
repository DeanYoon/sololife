import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: #fffaf4;
  max-width: 500px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  background-color: inherit;
  padding-top: 77px;
`;

export const Header = styled.div`
  min-height: 77px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 200;
  font-size: 20px;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.1);
  font-weight: 400;
  position: absolute;
  top: 0;
  z-index: 1;
`;

// Login Signup Button
export const BtnBox = styled.div`
  margin-top: 30px;
`;

export const LoginBtn = styled.a`
  max-width: 400px;
  width: 80vw;
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

export const SignupBtn = styled(LoginBtn)`
  border: 1px solid #ff5f2d;
  font-size: 16px;
`;
