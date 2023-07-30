import styled from "styled-components";
import Navigator from "../components/app/Navigator";
import { Header, Wrapper } from "../components/app/Styled_Component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import PostLink from "../components/app/PostLink";
import { useRecoilValue } from "recoil";
import { loginState } from "../atoms";
import UnloggedIn from "../components/app/UnloggedIn";

const ProfileInfoBox = styled.div`
  height: 160px;
  width: 100%;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProfileInfoBox__Img = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background-color: #feefea;
  position: relative;
`;
const Setting_Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background-color: #ff5f2d;
  border: 5px solid white;
  color: white;
  position: absolute;
  bottom: -5px;
  left: -5px;
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

const Profile__detail = styled.div`
  height: 200px;
  width: 100%;
  padding: 30px;
  border-bottom: 15px solid #e1e1e1;
`;
const Profile__detail__top = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-bottom: 10px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Point = styled.div`
  font-size: 20px;
`;

const Profile__detail__top__point = styled.div`
  width: 40%;
  height: 80px;
`;

const Profile__detail__top__interest = styled.div`
  width: 60%;
  height: 80px;
`;

const Interest_Tag = styled.div`
  display: flex;

  div {
    background-color: #feefea;
    font-size: 16px;
    padding: 3px;
    margin: 4px;
    font-weight: 400;
  }
`;

const Profile__detail__bottom = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Profile__detail__bottom__percentage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Percentage = styled.div`
  height: 15px;
  border-radius: 10px;
  width: 400px;
  background: linear-gradient(to right, #ffb8a3, #ff6433);
`;

const PostsBox = styled.div`
  width: 100%;
`;
const PostsTab = styled.div`
  display: flex;
  width: 100%;
`;
const MyPostsTab = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-size: 20px;
  font-weight: 1000;
`;
const MarkedPostsTab = styled(MyPostsTab)`
  border-bottom: 3px solid #ff5f2d;
  color: #ff5f2d;
`;
const PostsListBox = styled.div`
  padding: 20px 30px;
  overflow: scroll;
  height: 40vh;
  padding-bottom: 100px;
`;
function MyProfile() {
  const isLoggedIn = useRecoilValue(loginState);

  return (
    <Wrapper>
      <Header>마이페이지</Header>
      {isLoggedIn ? (
        <>
          <ProfileInfoBox>
            <ProfileInfoBox__Img>
              <Setting_Icon>
                <FontAwesomeIcon icon={faCog} />{" "}
              </Setting_Icon>
            </ProfileInfoBox__Img>
            <ProfileInfoBox__Info>
              <ProfileInfoBox__Info__name>닉네임</ProfileInfoBox__Info__name>
              <ProfileInfoBox__Info__info>
                자기소개입니다.
              </ProfileInfoBox__Info__info>
            </ProfileInfoBox__Info>
          </ProfileInfoBox>
          <Profile__detail>
            <Profile__detail__top>
              <Profile__detail__top__point>
                <Title>포인트</Title>
                <Point>0P</Point>
              </Profile__detail__top__point>
              <Profile__detail__top__interest>
                <Title>관심사</Title>
                <Interest_Tag>
                  <div>관심소개</div>
                  <div>관심소개</div>
                  <div>관심소개</div>
                </Interest_Tag>
              </Profile__detail__top__interest>
            </Profile__detail__top>
            <Profile__detail__bottom>
              <Profile__detail__bottom__percentage>
                <Title>프로필 완성도 100%</Title>
                <Percentage />
              </Profile__detail__bottom__percentage>
            </Profile__detail__bottom>
          </Profile__detail>
          <PostsBox>
            <PostsTab>
              <MyPostsTab>내가 쓴 글</MyPostsTab>
              <MarkedPostsTab>책갈피</MarkedPostsTab>
            </PostsTab>
            <PostsListBox>
              <PostLink />
            </PostsListBox>
          </PostsBox>
        </>
      ) : (
        <UnloggedIn />
      )}

      <Navigator />
    </Wrapper>
  );
}

export default MyProfile;
