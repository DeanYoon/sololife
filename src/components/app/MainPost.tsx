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
function MainPost() {
  const [liked, setLiked] = useState(false);
  const [marked, setMarked] = useState(false);
  const handleLikeClick = () => {
    setLiked(!liked);
  };
  const handleMarkClick = () => {
    setMarked(!marked);
  };
  useEffect(() => {}, [marked]);
  return (
    <>
      <Wrapper>
        <PostOwner>
          <img />
          <OwnerInfo>
            <h1>닉네임</h1>
            <div>2023.06.21</div>
          </OwnerInfo>
        </PostOwner>
        <PostContent>
          <h1>{"<제목>"}</h1>
          <img />
          <p>
            본문 내용 예시: 품에 동산에는 산야에 우리 아름다우냐? 얼마나 사람은
            것이 새 목숨이 있다.
          </p>
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
