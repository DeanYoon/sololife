import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";
import axios from "axios";
import { UserData, loginState } from "../atoms";
import { DOMAIN_URL, USERS_API } from "./api";

const KakaoButton = styled.button`
  width: 100%;
  font-size: 16px;
  font-weight: 100;
  margin-top: 10px;
  background-color: white;
  height: 56px;
  border: 1px solid #d3d3d3;
  cursor: pointer;
  padding: 0;
  &:hover {
    background-color: #ffdd00;
  }
  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
`;

const KakaoIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #d3d3d3;
  height: 100%;
  width: 50px;
`;

const KakaoIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  scale: 1.3;
  width: 20px;
  height: 100%;
  margin-left: 10px;
`;
export const KakaoLogin = () => {
  const baseUrl = "https://kauth.kakao.com/oauth/authorize";
  const config = {
    client_id: "d40768c0a7713feacbc40a16c77a08bf",
    redirect_uri: "https://www.sololife.net/kakao-login",
    response_type: "code",
  };
  const params = new URLSearchParams(config).toString();

  const finalUrl = `${baseUrl}?${params}`;
  return (
    <KakaoButton>
      <a href={finalUrl}>
        <KakaoIconBox>
          <KakaoIcon icon={faComment}></KakaoIcon>
        </KakaoIconBox>
        카카오로 로그인
        <div className="social_login_blank_box"> </div>
      </a>
    </KakaoButton>
  );
};

interface FinishKakaoLoginProps {
  code: string | null;
}

export interface IUserData {
  id: number;
  email: string;
  nickname: string;
  profile_image: string;
}

export interface IUserDataSaveData {
  nickname: string;
  profile_image: string;
  gender: string;
  birthday: string;
  phone: string;
  cities_code: number;
  address: string;
}

export const FinishKakaoLogin = ({ code }: FinishKakaoLoginProps) => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userData, setUserData] = useRecoilState(UserData);
  const navigate = useNavigate();

  useEffect(() => {
    const baseUrl = "https://kauth.kakao.com/oauth/token";
    const config = {
      client_id: "d40768c0a7713feacbc40a16c77a08bf",
      client_secret: "AoMHS1j30H8LIi0Vrn4OK2KLmdBWTKHD",
      grant_type: "authorization_code",
      redirect_uri: "https://www.sololife.net/kakao-login",
      code: code as string,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;

    const fetchKakaoData = async () => {
      try {
        const kakaoTokenRequest = await axios.post(finalUrl, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
        });

        if ("access_token" in kakaoTokenRequest.data) {
          const { access_token } = kakaoTokenRequest.data;

          const userDataFromKakao = await axios.get(
            "https://kapi.kakao.com/v2/user/me",
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-type": "application/json",
              },
            }
          );
          const {
            kakao_account: { email },
          } = userDataFromKakao.data;

          axios
            .get(`${USERS_API}/checkEmail/${email}`)
            .then((response) => {
              console.log(response);
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
              console.error(error);
              navigate("/login");
            });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchKakaoData();
  }, [code]);

  return <></>;
};
