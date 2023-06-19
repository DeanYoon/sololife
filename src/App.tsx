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
import MyProfile from "./routes/MyProfile";

const Container = styled.div`
  display: flex;
`;

const AppScreen = styled.div`
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  background-color: white;
`;

function App() {
  const [isHideBackground, setIsHideBackground] =
    useRecoilState(hideBackground);
  const code = new URL(window.location.href);

  useEffect(() => {
    const handleResize = () => {
      setIsHideBackground(window.innerWidth < 1000);
      if (code.pathname == "/") {
        setIsHideBackground(true);
      }
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
        <AppScreen>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/signup-done" element={<SignupSuccess />}></Route>
            <Route path="/find-password" element={<FindPassword />}></Route>
            <Route path="/change-password" element={<ChangePassword />}></Route>
            <Route path="/kakao-login" element={<KakaoCheck />}></Route>
            {/* For App */}
            <Route path="/myprofile" element={<MyProfile />}></Route>
          </Routes>
        </AppScreen>
      </Container>
    </Router>
  );
}

export default App;
