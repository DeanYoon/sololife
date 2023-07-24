import {
  faArrowUp,
  faArrowUpFromBracket,
  faHeart,
  faRepeat,
  faShare,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useEffect, useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import AutorenewIcon from "@mui/icons-material/Autorenew";

const Wrapper = styled.div`
  width: 100%;
  border-top: 1px solid #767676;
  border-bottom: 1px solid #767676;
  padding: 25px;
`;
const PostOwner = styled.div`
  display: flex;
  margin-bottom: 20px;
  img {
    width: 65px;
    height: 65px;
    border-radius: 100%;
    background-color: #feefea;
    border: none;
    outline: none;
  }
`;
const OwnerInfo = styled.div`
  padding: 10px;
  margin-left: 10px;
  h1 {
    font-weight: 600;
    margin-bottom: 5px;
  }
`;
const PostContent = styled.div`
  h1 {
    font-size: 20px;
    font-weight: 500;
  }
  img {
    width: 100%;
    height: 400px;
    border: 1px solid black;
  }
`;

const Reaction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  margin-top: 10px;

  div {
    background-color: inherit;
    border: none;
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #767676;
    span {
      margin-left: 10px;
    }
  }
`;
const ReactionButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #767676;
`;

// Define the type for the props
export interface MainPostProps {
  id: number;
  profile_image?: string;
  image?: string;
  username: string;
  date: string;
  title: string;
  content: string;
  upVote?: number;
}

function MainPost(props: MainPostProps) {
  const [liked, setLiked] = useState(false);
  const [marked, setMarked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };
  const handleMarkClick = () => {
    setMarked(!marked);
  };
  useEffect(() => {}, [marked]);
  const formattedDate = new Date(props.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  console.log(props.profile_image);
  return (
    <>
      <Wrapper key={props.id + ""}>
        <PostOwner>
          {/* <img src={`${props.profile_image}`} /> */}
          <img src={`${props.profile_image}`} alt="Image" />

          <OwnerInfo>
            <h1>{props.username}</h1>
            <div>{formattedDate}</div>
          </OwnerInfo>
        </PostOwner>
        <PostContent>
          <h1>{props.title}</h1>
          {props.image && <img src={`${props.image}`} />}
          <p>{props.content}</p>
        </PostContent>
        <Reaction>
          <ReactionButton onClick={handleLikeClick}>
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            <span>좋아요</span>
          </ReactionButton>
          <div>
            <AutorenewIcon />
            <span>리포스트</span>
          </div>
          <ReactionButton onClick={handleMarkClick}>
            {marked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            <span>북마크</span>
          </ReactionButton>
          <div>
            <ShareIcon />
            <span>공유하기</span>
          </div>
        </Reaction>
      </Wrapper>
    </>
  );
}

export default MainPost;
