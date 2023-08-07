import styled from "styled-components";
import Navigator from "../components/app/Navigator";
import { Header, Wrapper } from "../components/app/Styled_Component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import MainPost, { MainPostProps } from "../components/app/MainPost";
import { useEffect, useState } from "react";
import axios from "axios";
import { POSTS_API } from "../components/api";
import { ITags } from "./NewPost";

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
  justify-content: center;
  border-bottom: 1px solid #767676;
  a {
    cursor: pointer;
  }
  > option {
    width: 15%;
  }
  option {
    padding: 10px;
    cursor: pointer;
  }
`;

const PostWrapper = styled.div`
  width: 100%;
  overflow: scroll;
  padding-bottom: 100px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const TagsWrapper = styled.div`
  display: flex;
  width: 85%;
  overflow-x: scroll;
  /* Style the scrollbar thumb */
  ::-webkit-scrollbar {
    display: none;
  }
`;

function AppHome() {
  // API : https://port-0-area-node-express-r8xoo2mledsvukh.sel3.cloudtype.app//users/readPost?id=30
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [clickedTag, setClickedTag] = useState(0);
  const handleClickTag = (key: number) => {
    setClickedTag(key);
    console.log(key);
  };

  useEffect(() => {
    const requestData = {
      start: 0,
      listn: 10,
      tag: clickedTag,
    };
    axios
      .post(`${POSTS_API}/readPosts`, requestData)
      .then((response) => {
        setPosts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });

    axios
      .get(`${POSTS_API}/newPosts/getTags`)
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [clickedTag]);

  return (
    <Wrapper>
      <Header>
        <span>피드</span>
        <Search>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Search>
      </Header>
      <BtnWrapper>
        <option onClick={() => handleClickTag(0)} key={0}>
          전체보기
        </option>
        <TagsWrapper>
          {tags &&
            tags.map((tags: ITags) => (
              <option
                onClick={() => handleClickTag(tags.id)}
                key={`${tags.id}`}
              >
                {tags.tag}
              </option>
            ))}
        </TagsWrapper>
      </BtnWrapper>
      <PostWrapper>
        {posts.map((post: MainPostProps) => (
          <MainPost
            key={post.id}
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
