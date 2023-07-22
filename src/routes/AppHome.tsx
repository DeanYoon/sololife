import styled from "styled-components";
import Navigator from "../components/app/Navigator";
import { Header, Wrapper } from "../components/app/Styled_Component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import MainPost, { MainPostProps } from "../components/app/MainPost";
import { useEffect, useState } from "react";
import axios from "axios";

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
  overflow: scroll;
  padding-bottom: 100px;
`;

function AppHome() {
  // API : https://port-0-area-node-express-r8xoo2mledsvukh.sel3.cloudtype.app//users/readPost?id=30
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // Define the API URL
    const apiUrl = "http://localhost:3001"; // Change this URL to your actual server URL
    // Define the request data (start and listn in your case)
    const requestData = {
      start: 0, // Replace with the desired start value
      listn: 10, // Replace with the desired listn value
    };

    // Make the API request
    axios
      .post(`${apiUrl}/readPosts`, requestData)
      .then((response) => {
        // Handle the API response
        setPosts(response.data.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error fetching posts:", error);
      });
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);
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
            profileImg={post.profileImg}
            username={post.username}
            date={post.date}
            title={post.title}
            content={post.content}
            upVote={post.upVote}
            image={post.image}
          />
        ))}
      </PostWrapper>
      <Navigator />
    </Wrapper>
  );
}

export default AppHome;
