import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { hideBackground } from "../atoms";

const Wrapper = styled.div`
  width: 100vw;
  position: relative;
  overflow: hidden;
  padding-top: 500px;
  margin-top: 2700px;
`;

const Screen1 = styled.div`
  overflow: hidden;
  font-size: 100px;
  background-color: #fffaf4;
  height: 650px;

  display: flex;
  align-items: center;
  justify-content: left;

  img {
    width: 792px;
    height: 792px;
    position: absolute;
    right: 120px;
    top: 500px;
    z-index: 1;
  }
`;
export const Screen1Box = styled.div`
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
export const Screen1BoxTop = styled.div`
  font-size: 18px;
`;
export const Screen1BoxMid = styled.div`
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

const Screen2 = styled.div`
  height: 594px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    z-index: 1;
  }
`;
const Screen2Box = styled(Screen1Box)``;

const Screen3 = styled.div`
  height: 597px;
  background-color: #fffaf4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Screen3Box = styled(Screen1Box)`
  width: 670px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  text-align: center;
`;

const Screen3ImgBox = styled.div`
  width: 900px;
  height: 217px;
  background-color: white;
  border-radius: 29px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 50px;
  box-shadow: 1px 3px 10px -5px gray;
  img {
    width: 60px;
    margin-bottom: 20px;
  }
`;
const Screen3ImgBoxDetail = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  font-weight: 1000;
`;
const Screen3ImgBoxDetail__Title = styled.div`
  font-size: 15px;
  color: #ff5f2d;
  font-family: NanumSquareRound;
  margin: 10px 0;
`;
const Screen3ImgBoxDetail__Cont = styled.div`
  font-family: NanumGothic;
  font-size: 13px;
  width: 140px;
  color: #939393;
`;

const Screen4 = styled.div`
  height: 720px;
  display: flex;
  align-items: center;
  position: relative;
`;
const Screen4Box = styled(Screen1Box)`
  width: 350px;
`;

const ImgGun = styled.img`
  position: absolute;
  right: 20%;
  top: 20%;
`;
const ImgPhone = styled.img`
  position: absolute;
  right: 10%;
  top: 0;
`;

const Screen5 = styled.div`
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 436px;
    height: 436px;
  }
`;
const Screen5Box = styled(Screen1Box)`
  width: 460px;
  margin: 0;
`;

const InfoBox = styled.ul``;
const InfoWrap = styled.div``;
const InfoBoxLi = styled.li`
  color: black;
  position: relative;
  padding-left: 10px;
  margin-bottom: 10px;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ff5f2d;
  }
`;
const InfoBoxText = styled.span`
  color: #939393;
  font-size: 12px;
  margin-left: 10px;
  display: inline-block;
  line-height: 25px;
`;

const Screen6 = styled.div`
  background-color: #fffaf4;
  height: 577px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 543px;
    height: 415px;
  }
`;

const Screen6Box = styled(Screen5Box)`
  margin-right: 100px;
`;
const Screen6BoxMid = styled(Screen1BoxMid)`
  width: 580px;
`;

const ApplyBtn = styled.a`
  width: 130px;
  height: 40px;
  background-color: #ff5f2d;
  color: white;
  margin: 4px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: white;
    color: #ff5f2d;
    border: 1px solid #ff5f2d;
  }
`;
const Circles = styled.div`
  div {
    position: absolute;
    border-radius: 100%;
  }
`;

const Circle1 = styled.div`
  width: 583px;
  height: 583px;
  background-color: #fecc53;
  right: -120px;
  top: 700px;
`;
const Circle2 = styled.div`
  width: 268px;
  height: 268px;
  background-color: #fef1de;
  top: 1100px;
  left: -150px;
`;
const Circle3 = styled.div`
  width: 422px;
  height: 422px;
  background-color: #fecc53;
  top: 1450px;
  left: 100px;
`;
const Circle4 = styled.div`
  width: 541px;
  height: 541px;
  background-color: #feefea;
  top: 2600px;
  right: -5%;
  z-index: -1;
`;

function Home() {
  const [isHideBackground, setIsHideBackground] =
    useRecoilState(hideBackground);

  useEffect(() => {
    setIsHideBackground(true);
  }, []);
  useEffect(() => {
    setIsHideBackground(true);
  }, [isHideBackground]);

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
        <img src="./imgs/home/rocket.png" />
      </Screen1>
      <Screen2>
        <img src="./imgs/home/손.png" />
        <Screen2Box>
          <Screen1BoxTop>솔로라이프, 솔라</Screen1BoxTop>
          <Screen1BoxMid>
            1인 가구에 필요한 꿀팁,혜택 들을 뉴스레터와 매거진으로 무료
            제공합니다.
          </Screen1BoxMid>
        </Screen2Box>
      </Screen2>
      <Screen3>
        <Screen3Box>
          <Screen1BoxTop>솔로라이프, 솔라</Screen1BoxTop>
          <Screen1BoxMid>
            1인 가구가 겪는 경제·건강·외로움·주거 등의 문제를 전문가들의
            서비스로 해결합니다.
          </Screen1BoxMid>
        </Screen3Box>
        <Screen3ImgBox>
          <Screen3ImgBoxDetail>
            <img src="./imgs/Icons/폰.png" />
            <Screen3ImgBoxDetail__Title>
              심리 상담 전문가
            </Screen3ImgBoxDetail__Title>
            <Screen3ImgBoxDetail__Cont>
              1인 가구의 취약한 심적 외로움과 우울증 등을 케어
            </Screen3ImgBoxDetail__Cont>
          </Screen3ImgBoxDetail>
          <Screen3ImgBoxDetail>
            <img src="./imgs/Icons/돈.png" />
            <Screen3ImgBoxDetail__Title>
              경제 상담 전문가
            </Screen3ImgBoxDetail__Title>
            <Screen3ImgBoxDetail__Cont>
              1인 가구의 취약한 심적 외로움과 우울증 등을 케어
            </Screen3ImgBoxDetail__Cont>
          </Screen3ImgBoxDetail>
          <Screen3ImgBoxDetail>
            <img src="./imgs/Icons/상점.png" />
            <Screen3ImgBoxDetail__Title>
              건강 상담 전문가
            </Screen3ImgBoxDetail__Title>
            <Screen3ImgBoxDetail__Cont>
              1인 가구의 취약한 심적 외로움과 우울증 등을 케어
            </Screen3ImgBoxDetail__Cont>
          </Screen3ImgBoxDetail>
          <Screen3ImgBoxDetail>
            <img src="./imgs/Icons/박스.png" />
            <Screen3ImgBoxDetail__Title>
              청소 정리 전문가
            </Screen3ImgBoxDetail__Title>
            <Screen3ImgBoxDetail__Cont>
              1인 가구의 취약한 심적 외로움과 우울증 등을 케어
            </Screen3ImgBoxDetail__Cont>
          </Screen3ImgBoxDetail>
        </Screen3ImgBox>
      </Screen3>
      <Screen4>
        <Screen4Box>
          <Screen1BoxTop>솔로 라이프, 솔라</Screen1BoxTop>
          <Screen1BoxMid>
            자취 꿀팁 커뮤니티로 일상과 큐레이션 정보를 소통하고 공유받아요!
          </Screen1BoxMid>
          <ImgGun src="./imgs/home/gun.png" />
          <ImgPhone src="./imgs/home/phone.png" />
        </Screen4Box>
      </Screen4>
      <Screen5>
        <img src="./imgs/home/game.png" />
        <Screen5Box>
          <Screen1BoxTop>솔로 라이프, 솔라</Screen1BoxTop>
          <Screen1BoxMid>
            ChatGPT AI기술을 통한
            <br />
            24시간 AI/전문가 케어 서비스
          </Screen1BoxMid>
          <InfoBox>
            <InfoWrap>
              <InfoBoxLi>
                스마트한 솔로 라이프에 필요한 정보를 얻어 보아요.
              </InfoBoxLi>
              <InfoBoxText>
                1인 가구, 자취에 필요한 모든 질문에 똑똑하게 답변해주니까
                든든해요.
              </InfoBoxText>
            </InfoWrap>
            <InfoWrap>
              <InfoBoxLi>친구가 되어 가볍게 물어보며 대화 가능해요</InfoBoxLi>
              <InfoBoxText>
                진짜 사람같은 말투와 감정이 담긴 대화를 통해서 24시간 대화가
                가능한
                <br /> 새로운 친구를 만들어보세요.
              </InfoBoxText>
            </InfoWrap>
          </InfoBox>
        </Screen5Box>
      </Screen5>
      <Screen6>
        <Screen6Box>
          <Screen1BoxTop>솔로 라이프, 솔라</Screen1BoxTop>
          <Screen6BoxMid>
            정기 구독을 통한 전문 매니저 서비스 여러분도 솔라 매니저가 될 수
            있어요!
          </Screen6BoxMid>
          <InfoBox>
            <InfoWrap>
              <InfoBoxLi>
                다양한 전문가 라이프 케어 서비스를 통한 소확행
              </InfoBoxLi>
              <InfoBoxText>
                1회성 서비스 이용도 가능하기때문에 부담없이 이용가능해요.
              </InfoBoxText>
            </InfoWrap>
            <InfoWrap>
              <InfoBoxLi>
                저비용으로 1인 가구 맞춤형 알뜰한 서비스 제공
              </InfoBoxLi>
              <InfoBoxText>
                1인 가구, 자취에 필요한 모든 질문에 똑똑하게 답변해주니까
                든든해요.
              </InfoBoxText>
            </InfoWrap>
            <InfoWrap>
              <InfoBoxLi>
                세탁, 청소, 설거지, 운동 등 소소한 케어 서비스로도 전문가
                활동가능!
              </InfoBoxLi>
              <InfoBoxText>
                자신만의 특기를 바탕으로 남을 돕는 것은 따듯해지는 일이에요.
              </InfoBoxText>
            </InfoWrap>
            <InfoWrap>
              <InfoBoxLi>전문가 활동을 통한 수익창출 가능!</InfoBoxLi>
              <InfoBoxText>
                추후 업데이트 될 전문가 서비스를 통해서 수익도 창출하고 함께
                만들어가는 솔로 라이프
              </InfoBoxText>
            </InfoWrap>
          </InfoBox>
          <ApplyBtn href="/">솔라 매니저 지원하기</ApplyBtn>
        </Screen6Box>
        <img src="./imgs/home/악수.png" />
      </Screen6>
      <Circles>
        <Circle1 />
        <Circle2 />
        <Circle3 />
        <Circle4 />
      </Circles>
      <Footer></Footer>
    </Wrapper>
  );
}

export default Home;
