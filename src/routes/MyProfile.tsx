import styled from "styled-components";
import Navigator from "../components/app/Navigator";
import { Header, Wrapper } from "../components/app/Styled_Component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import PostLink from "../components/app/PostLink";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserData, loginState } from "../atoms";
import UnloggedIn from "../components/app/UnloggedIn";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { POSTS_API, USERS_API } from "../components/api";
import { returnEncodedImage } from "../components/functions/post";
import { userInfo } from "os";

const HiddenFileUploader = styled.input`
  display: none;
`;
const ProfileInfoBox = styled.div`
  height: 160px;
  width: 100%;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProfileInfoBox__Img = styled.div`
  position: relative;
  img {
    width: 80px;
    height: 80px;
    border-radius: 100%;
  }
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
  cursor: pointer;
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
  cursor: pointer;
  border-bottom: 3px solid transparent;
`;
const MarkedPostsTab = styled(MyPostsTab)``;

const ActiveTab = styled(MyPostsTab)`
  border-bottom-color: #ff5f2d;
  color: #ff5f2d;
`;
const PostsListBox = styled.div`
  padding: 20px 30px;
  overflow: scroll;
  height: 40vh;
  padding-bottom: 100px;
`;
export interface SubPostProps {
  id: number;
  image?: string;
  date: string;
  title: string;
  username: string;
}

function MyProfile() {
  const isLoggedIn = useRecoilValue(loginState);
  const [UserInfo, setUserInfo] = useRecoilState(UserData);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(true);
  const [isMyPosts, setIsMyPosts] = useState(false);

  const handleMyPostsTabClick = () => {
    setIsBookmarked(false);
    setIsMyPosts(true);
  };
  const handleMarkedPostsTablClick = () => {
    setIsBookmarked(true);
    setIsMyPosts(false);
  };
  const handleSettingIcon = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the click event on the file input
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookmarkedPostsResponse = await axios.get(
          `${USERS_API}/${UserInfo.id}/bookmarked-posts`
        );
        setBookmarkedPosts(bookmarkedPostsResponse.data);

        const myPostsResponse = await axios.get(
          `${USERS_API}/${UserInfo.id}/posts`
        );
        setMyPosts(myPostsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Immediately invoke the async function
  }, []);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const encodedImage = await returnEncodedImage(event); // Wait for the Promise to resolve
      const postData = {
        userId: UserInfo.id,
        profileImageData: encodedImage,
      };
      await axios
        .post(`${USERS_API}/update/profileImage`, postData)
        .then((response) => {
          console.log(response);

          setImageData(encodedImage);
          setUserInfo({ ...UserInfo, profileImg: encodedImage });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error("Error uploading and encoding image:", error);
      // Handle error as needed
    }
  };

  return (
    <Wrapper>
      <Header>마이페이지</Header>
      {isLoggedIn ? (
        <>
          <ProfileInfoBox>
            <ProfileInfoBox__Img>
              {UserInfo.profileImg ? (
                <img src={`${UserInfo.profileImg}`} alt="Image" />
              ) : (
                <img
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfZCGFDrC8YeednlJC3mhxPfg_s4Pg8u7-kf6dy88&s`}
                  alt="Image"
                />
              )}
              <Setting_Icon onClick={handleSettingIcon}>
                <FontAwesomeIcon icon={faCog} />{" "}
                <HiddenFileUploader
                  type="file"
                  accept="image/*"
                  ref={(e) => (fileInputRef.current = e)}
                  onChange={handleFileUpload}
                />
              </Setting_Icon>
            </ProfileInfoBox__Img>
            <ProfileInfoBox__Info>
              <ProfileInfoBox__Info__name>
                {UserInfo.username}
              </ProfileInfoBox__Info__name>
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
              {isMyPosts ? (
                <ActiveTab onClick={handleMyPostsTabClick}>
                  내가 쓴 글
                </ActiveTab>
              ) : (
                <MyPostsTab onClick={handleMyPostsTabClick}>
                  내가 쓴 글
                </MyPostsTab>
              )}
              {isBookmarked ? (
                <ActiveTab onClick={handleMarkedPostsTablClick}>
                  책갈피
                </ActiveTab>
              ) : (
                <MarkedPostsTab onClick={handleMarkedPostsTablClick}>
                  책갈피
                </MarkedPostsTab>
              )}
            </PostsTab>
            <PostsListBox>
              {isBookmarked
                ? bookmarkedPosts.map((post: SubPostProps) => (
                    <PostLink
                      key={post.id}
                      image={post.image}
                      id={post.id}
                      date={post.date}
                      title={post.title}
                      username={post.username}
                    />
                  ))
                : myPosts.map((post: SubPostProps) => (
                    <PostLink
                      key={post.id}
                      image={post.image}
                      id={post.id}
                      date={post.date}
                      title={post.title}
                      username={post.username}
                    />
                  ))}
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
