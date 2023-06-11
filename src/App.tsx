import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import SignupSuccess from "./routes/SignupSuccess";
import FindPassword from "./routes/FindPassword";
import ChangePassword from "./routes/ChangePassword";
import KakaoCheck from "./routes/KakaoCheck";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { hideBackground } from "./atoms";
import Background from "./components/Background";

const Container = styled.div`
  display: flex;
`;

function App() {
  const [isHideBackground, setIsHideBackground] =
    useRecoilState(hideBackground);

  useEffect(() => {
    const handleResize = () => {
      setIsHideBackground(window.innerWidth < 1000);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Router>
      <Container>
        {isHideBackground ? null : <Background />}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signup-done" element={<SignupSuccess />}></Route>
          <Route path="/find-password" element={<FindPassword />}></Route>
          <Route path="/change-password" element={<ChangePassword />}></Route>
          <Route path={"/kakao-login"} element={<KakaoCheck />}></Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
