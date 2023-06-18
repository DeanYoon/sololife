import styled from "styled-components";
import Navigator from "../components/app/Navigator";

const Wrapper = styled.div`
  background-color: #fffaf4;
  max-width: 500px;
  width: 500px;
  max-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  overflow-x: scroll;
`;

const Header = styled.div`
  height: 77px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 200;
  font-size: 20px;

  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.1);
`;

const ProfileInfoBox = styled.div`
  height: 160px;
  width: 100%;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProfileInfoBox__Img = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background-color: #feefea;
`;
const ProfileInfoBox__Info = styled.div`
  padding-left: 20px;
  width: 70%;
  font-size: 20px;
`;
const ProfileInfoBox__Info__name = styled.div`
  padding: 5px;
  font-weight: 400;
`;
const ProfileInfoBox__Info__info = styled.div`
  padding: 5px;
`;

function MyProfile() {
  return (
    <Wrapper>
      <Header>마이페이지</Header>
      <ProfileInfoBox>
        <ProfileInfoBox__Img />
        <ProfileInfoBox__Info>
          <ProfileInfoBox__Info__name>닉네임</ProfileInfoBox__Info__name>
          <ProfileInfoBox__Info__info>
            자기소개입니다.
          </ProfileInfoBox__Info__info>
        </ProfileInfoBox__Info>
      </ProfileInfoBox>
      <Navigator />
    </Wrapper>
  );
}

export default MyProfile;
