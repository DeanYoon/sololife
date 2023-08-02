import styled from "styled-components";
import Navigator from "../components/app/Navigator";
import { Header, Wrapper } from "../components/app/Styled_Component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import MainPost, { MainPostProps } from "../components/app/MainPost";
import { useEffect, useState } from "react";
import axios from "axios";
import { POSTS_API } from "../components/api";

const Search = styled.div`
  position: absolute;
  right: 20px;
  cursor: pointer;
  color: #767676;
`;

const BtnWrapper = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #767676;
  a {
    cursor: pointer;
  }
`;

const PostWrapper = styled.div`
  width: 100%;
  overflow: scroll;
  padding-bottom: 100px;
`;

function AppHome() {
  // API : https://port-0-area-node-express-r8xoo2mledsvukh.sel3.cloudtype.app//users/readPost?id=30
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const requestData = {
      start: 0,
      listn: 10,
    };

    axios
      .post(`${POSTS_API}/readPosts`, requestData)
      .then((response) => {
        setPosts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <Wrapper>
      <Header>
        <span>피드</span>
        <Search>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Search>
      </Header>
      <BtnWrapper>
        <a>전체보기</a>
        <a>집렌트</a>
        <a>중고물품</a>
        <a>맛집</a>
        <a>이벤트</a>
      </BtnWrapper>
      <PostWrapper>
        {posts.map((post: MainPostProps) => (
          <MainPost
            id={post.id}
            profile_image={post.profile_image}
            username={post.username}
            date={post.date}
            title={post.title}
            content={post.content}
            upvote={post.upvote}
            image={post.image}
            bookmark={post.bookmark}
          />
        ))}
      </PostWrapper>
      <Navigator />
    </Wrapper>
  );
}

export default AppHome;
