import { TokenResponse, useGoogleLogin } from "@react-oauth/google";

import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUserData, IUserDataSaveData } from "./KakaoLogin";
import { UserData, loginState } from "../atoms";
import { DOMAIN_URL, USERS_API } from "./api";

const GoogleLoginWrapper = styled.div`
  width: 100%;
  padding: 0px 10px;
  box-sizing: border-box;
  border: 1px solid #d3d3d3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f3f3f3;
  }
  .social_login_image_box {
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #d3d3d3;
    height: 100%;
    padding-right: 10px;
  }
  img {
    width: 30px;
  }
`;

export const GoogleLoginButton = () => {
  const setIsLoggedIn = useSetRecoilState(loginState);
  const [user, setUser] = useState<TokenResponse>();
  const [userData, setUserData] = useRecoilState(UserData);
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          const { email } = res.data;
          axios
            .get(`${USERS_API}/checkEmail/${email}`)
            .then((response) => {
              const { id, profile_image, username } = response.data.data;
              setUserData({
                id,
                username,
                userEmail: email,
                profileImg: profile_image,
              });
              setIsLoggedIn(true);
              navigate("/home");
            })
            .catch((error) => {
              console.log(error);
              navigate("/login");
            });
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <GoogleLoginWrapper onClick={() => login()}>
      <div className="social_login_image_box">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png?20230305195327"
          alt="google_login"
        />
      </div>
      <div className="social_login_text_box">구글로 로그인</div>
      <div className="social_login_blank_box"> </div>
    </GoogleLoginWrapper>
  );
};
