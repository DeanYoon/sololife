import styled from "styled-components";
import { Screen1Box, Screen1BoxMid, Screen1BoxTop } from "../routes/Home";

const Wrapper = styled.div`
  width: 500px;
  height: 100vh;
  background-color: inherit;
  position: relative;
  display: flex;
`;

const Box = styled(Screen1Box)`
  margin: 20% 0;
`;

const BoxMid = styled(Screen1BoxMid)`
  width: 460px;
`;

const Circle = styled.div`
  position: absolute;
  width: 517px;
  height: 517px;
  border-radius: 50%;
  background-color: #feefea;
  z-index: -1;
  left: -15%;
  top: 15%;
  img {
    position: absolute;
    top: 20%;
    left: 10%;
  }
`;

function Background() {
  return (
    <Wrapper>
      <Circle>
        <img src="./imgs/motorcycle.png" />
      </Circle>
      <Box>
        <Screen1BoxTop>솔로 라이프, 솔라</Screen1BoxTop>
        <BoxMid>
          자취생과 1인 가구를 위한 <br></br> 전문가들의 라이프 케어 서비스
        </BoxMid>
      </Box>
    </Wrapper>
  );
}

export default Background;
