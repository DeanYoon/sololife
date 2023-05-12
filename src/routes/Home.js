import styled from "styled-components";
import Header from "../components/Header";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Screen1 = styled.div`
  font-size: 100px;
  background-color: #fffaf4;
  height: 650px;
  margin-top: 125px;
  display: flex;
  align-items: center;
  justify-content: left;
  img {
    width: 792px;
    height: 792px;
    position: absolute;
    right: 120px;
    top: 20px;
    z-index: 1;
  }
`;
const Screen1Box = styled.div`
  font-family: "NanumSquareRound", sans-serif;
  color: #ff5f2d;
  width: 430px;
  margin-left: 15%;
  font-weight: 1000;
  margin-bottom: 50px;

  div {
    margin: 15px 0;
  }
`;
const Screen1BoxTop = styled.div`
  font-size: 18px;
`;
const Screen1BoxMid = styled.div`
  font-size: 36px;
  line-height: 150%;
`;
const Screen1BoxBottom = styled.div`
  font-family: "NanumGothic", sans-serif;
  color: #939393;
  font-size: 14px;
  padding-top: 20px;
  line-height: 200%;
`;

const Circle = styled.div`
  width: 583px;
  height: 583px;
  background-color: #fecc53;
  border-radius: 100%;
  position: absolute;
  right: -120px;
  top: 200px;
`;
function Home() {
  return (
    <Wrapper>
      <Header />
      <Screen1>
        <Screen1Box>
          <Screen1BoxTop>솔로 라이프, 솔라</Screen1BoxTop>
          <Screen1BoxMid>
            자취생과 1인 가구를 위한 전문가들의 라이프 케어 서비스
          </Screen1BoxMid>
          <Screen1BoxBottom>
            이제 바야흐로 혼족의 시대, 알뜰하고 스마트하게 그리고 함께의 가치를
            바탕으로 따듯한 라이프가 되는 서비스를 지양합니다.
          </Screen1BoxBottom>
        </Screen1Box>
        <img src="./imgs/rocket.png" />
        <Circle />
      </Screen1>
    </Wrapper>
  );
}

export default Home;
