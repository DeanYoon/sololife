import styled from "styled-components";
import { IComments } from "./MainPost";
import { formatTimeAgo } from "../functions/post";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { UserData } from "../../atoms";
import { useEffect, useRef, useState } from "react";

const CommentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
  }
  span {
    margin: 0 5px;
    font-size: 15px;
  }
`;
const CommentWrapper = styled.div`
  display: flex;
  align-items: center;
  span:last-child {
    font-size: 10px;
  }
`;
const CommentUsername = styled.div`
  font-weight: 1000;
`;

const MoreIconWrapper = styled.div`
  cursor: pointer;
  position: relative;
`;
const MoreBtnWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: -40px;
  right: -30px;
  button {
    width: 40px;
  }
`;
interface CommentProps {
  comment: IComments;
  handleEditBtn: (comment: IComments) => void;
  handleDeleteBtn: (commentId: number) => void;
  User: UserData;
}

function Comment({
  comment,
  handleEditBtn,
  handleDeleteBtn,
  User,
}: CommentProps) {
  const [isMoreBtnClicked, setIsMoreBtnClicked] = useState(false);
  const moreIconRef = useRef<HTMLDivElement | null>(null);

  const handleMoreBtnClick = () => {
    setIsMoreBtnClicked(!isMoreBtnClicked);
  };
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (moreIconRef.current && !moreIconRef.current.contains(event.target)) {
        setIsMoreBtnClicked(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <CommentBox key={comment?.commentId}>
      {comment && (
        <>
          <CommentWrapper>
            {comment.profile_image ? (
              <img src={`${comment.profile_image}`} alt="Image" />
            ) : (
              <img
                src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfZCGFDrC8YeednlJC3mhxPfg_s4Pg8u7-kf6dy88&s`}
                alt="Image"
              />
            )}
            <CommentUsername>{comment.username}</CommentUsername>
            <span>{comment.text}</span>
            <span>{formatTimeAgo(new Date(comment.createdTime))}</span>
          </CommentWrapper>
          <MoreIconWrapper ref={moreIconRef} onClick={handleMoreBtnClick}>
            <MoreHorizIcon />
            {isMoreBtnClicked && User.id === comment.userId && (
              <MoreBtnWrapper>
                <button onClick={() => handleEditBtn(comment)}>수정</button>
                <button onClick={() => handleDeleteBtn(comment.commentId)}>
                  삭제
                </button>
              </MoreBtnWrapper>
            )}
          </MoreIconWrapper>
        </>
      )}
    </CommentBox>
  );
}

export default Comment;
