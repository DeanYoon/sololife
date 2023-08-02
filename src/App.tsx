import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
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
import { useRecoilState, useRecoilValue } from "recoil";
import { hideBackground, loginState } from "./atoms";
import Background from "./components/Background";
import MyProfile from "./routes/MyProfile";
import AppHome from "./routes/AppHome";
import NewPost from "./routes/NewPost";

const Container = styled.div`
  display: flex;
`;

const AppScreen = styled.div`
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  background-color: white;
  width: 100vw;
  max-width: 500px;
`;

function App() {
  const [hideApp, setHideApp] = useState(false);
  const [isHideBackground, setIsHideBackground] =
    useRecoilState(hideBackground);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setIsHideBackground(true);
      } else {
        setIsHideBackground(false);
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
        {window.innerWidth >= 1000 && <Background />}
        {hideApp ? (
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        ) : (
          <AppScreen>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signup-done" element={<SignupSuccess />} />
              <Route path="/find-password" element={<FindPassword />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/kakao-login" element={<KakaoCheck />} />
            </Routes>

            {/* For App */}
            <Routes>
              <Route path="/home" element={<AppHome />} />
              <Route path="/myprofile" element={<MyProfile />} />
              <Route path="/new-post" element={<NewPost />} />
            </Routes>
          </AppScreen>
        )}
      </Container>
    </Router>
  );
}

export default App;
