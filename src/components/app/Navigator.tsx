import styled from "styled-components";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SmartToysIcon from "@mui/icons-material/SmartToyOutlined";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  max-width: 500px;
  width: 100%;
  height: 100px;
  display: flex;
  position: fixed;
  bottom: 0;
  background-color: inherit;
  box-shadow: 0px -1px 3px rgba(11, 3, 3, 0.2);
`;

const ButtonBox = styled.a`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.p`
  font-weight: 400;
  margin-top: 10px;
`;

function Navigator() {
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(location.pathname);
  }, [location]);

  return (
    <Wrapper>
      <ButtonBox href="/home">
        <HomeOutlinedIcon
          fontSize="large"
          style={{ color: currentUrl === "/home" ? "tomato" : "" }}
        />
        <ButtonText>홈</ButtonText>
      </ButtonBox>
      <ButtonBox href="/new-post">
        <EditOutlinedIcon fontSize="large" />
        <ButtonText>글쓰기</ButtonText>
      </ButtonBox>
      <ButtonBox href="/">
        <SmartToysIcon fontSize="large" />
        <ButtonText>AI 친구</ButtonText>
      </ButtonBox>
      <ButtonBox href="/">
        <SupportAgentIcon fontSize="large" />
        <ButtonText>전문 매니저</ButtonText>
      </ButtonBox>
      <ButtonBox href="/myprofile">
        <PersonOutlinedIcon
          fontSize="large"
          style={{ color: currentUrl === "/myprofile" ? "tomato" : "" }}
        />
        <ButtonText>마이페이지</ButtonText>
      </ButtonBox>
    </Wrapper>
  );
}

export default Navigator;
