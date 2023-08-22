import styled, { keyframes } from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { POSTS_API } from "../api";
import { useForm } from "react-hook-form";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { UserData as UserAtom, UserData } from "../../atoms";
import { formatTimeAgo } from "../functions/post";
import Comment from "./Comment";

const Wrapper = styled.div`
  width: 100%;
  border-top: 1px solid #767676;
  border-bottom: 1px solid #767676;
`;
const PostDetail = styled.div`
  padding: 25px;
  border-bottom: 1px solid #767676;
`;

const PostOwner = styled.div`
  display: flex;
  margin-bottom: 20px;
  position: relative;
  img {
    width: 65px;
    height: 65px;
    border-radius: 100%;
    background-color: #feefea;
    border: none;
    outline: none;
  }
`;
const MoreIcon = styled.div`
  position: absolute;
  right: 0;
  cursor: pointer;
`;
const MoreBtnWrapper = styled.div`
  position: absolute;
  display: flex;
  top: 0px;
  right: -20px;
  button {
    width: 40px;
    height: 20px;
    font-size: 10px;
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
  padding: 10px;
  margin-top: 10px;

  > div {
    background-color: inherit;

    border: none;
    width: 23%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    color: #767676;
    > span {
      margin-left: 10px;
    }
  }
`;
const ReactionButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #767676;
`;
const LikeBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LikeBtn = styled.span`
  margin-left: 10px;
  width: 20px;
`;
const PostComment = styled.div`
  width: 100%;
  position: relative;
  padding: 10px 25px 25px 25px;
`;

const StyledArrowIcon = styled(KeyboardArrowDownIcon)<{
  expandComments: boolean;
}>`
  position: absolute;
  left: 0;
  cursor: pointer;
  transform-origin: center;
  transform: ${({ expandComments }) =>
    expandComments ? "rotate(180deg)" : "rotate(0deg)"};

  &:hover {
    transition: all 0.5s;
  }
`;

const InputWrapper = styled.form`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  input {
    width: 80%;
    border: none;
    padding: 5px;
    margin-top: 10px;
  }
  button {
    border: none;
    width: 20%;
    background-color: #ff5f2d;
    color: white;
    font-weight: 500;
    border-radius: 20px;
  }
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
  upvote: string;
  bookmark: string;
  userId: number;
  onDeletePost: () => void;
}
export interface IComments {
  commentId: number;
  text: string;
  upvote?: string;
  createdTime: string;
  username: string;
  profile_image: string;
  userId: number;
}

function MainPost(props: MainPostProps) {
  const newFormattedDate = formatTimeAgo(new Date(props.date));
  const [liked, setLiked] = useState(false);
  const [marked, setMarked] = useState(false);
  const [upVoteCount, setUpVoteCount] = useState(0);
  const [comments, setComments] = useState<IComments[]>([]);
  const User = useRecoilValue(UserData);
  const [commentForEdit, setCommentForEdit] = useState<IComments | null>(null);
  const [expandComments, setExpandComments] = useState(false);
  const [isMoreBtnClicked, setIsMoreBtnClicked] = useState(false);
  const moreIconRef = useRef<HTMLDivElement | null>(null);
  const GlobalUserData = useRecoilValue(UserAtom);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const handleLikeClick = async () => {
    // Define the request data (start and listn in your case)
    const requestData = {
      postId: props.id,
      userId: GlobalUserData.id,
    };

    await axios
      .post(`${POSTS_API}/${props.id}/like`, requestData)
      .then((response) => {
        // Handle the API response
        const responseData = response.data;
        if (responseData.message === "OK") {
          // Check if the post was already liked
          setLiked(!liked);

          if (liked) {
            // Post was already liked, so decrement upVote by 1
            // Update the upVote state to reflect the change
            setUpVoteCount((prevUpVote) => prevUpVote - 1);
          } else {
            // Post was not liked, so increment upVote by 1
            // Update the upVote state to reflect the change
            setUpVoteCount((prevUpVote) => prevUpVote + 1);
          }
        } else {
          console.log("Error liking post:", responseData.message);
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error liking post:", error);
      });
  };

  const handleMarkClick = async () => {
    const requestData = {
      postId: props.id,
      userId: GlobalUserData.id,
    };

    await axios
      .post(`${POSTS_API}/${props.id}/bookmark`, requestData)
      .then((response) => {
        setMarked(!marked);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error liking post:", error);
      });
  };

  const handleEditCommentBtn = (comment: IComments) => {
    setCommentForEdit(comment);
  };
  const handleDeleteCommentBtn = async (commentId: number) => {
    try {
      const response = await axios.delete(
        `${POSTS_API}/${props.id}/comments/${commentId}`
      );

      if (response) {
        // 댓글 삭제 후 삭제 댓글 제외 후 렌더링
        const updatedComments = comments.filter(
          (comment) => comment.commentId !== commentId
        );
        setComments(updatedComments);
      } else {
        console.log("Error deleting comment");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const handleEditPostBtn = () => {
    console.log(props.id);
  };
  const handleDeletePostBtn = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(`${POSTS_API}/${props.id}`);
        if (response) {
          // Call the onDeletePost callback to update posts after deletion
          props.onDeletePost();
        } else {
          console.log("Error deleting post");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };
  const handleExpandIcon = async () => {
    setExpandComments((prev) => !prev);
    if (comments.length === 1) {
      await axios
        .get(`${POSTS_API}/${props.id}/comments`)
        .then((response) => {
          response.data.data && setComments(response.data.data);
          console.log("data recieved");
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  };
  const handlePostMoreBtn = () => {
    setIsMoreBtnClicked(!isMoreBtnClicked);
  };

  const onValid = async (data: any) => {
    const requestData = {
      postId: props.id,
      userId: GlobalUserData.id,
      comment: data.comment,
      editComment: commentForEdit?.commentId,
    };

    try {
      const response = await axios.post(
        `${POSTS_API}/${requestData.postId}/comments`,
        requestData
      );

      if (commentForEdit) {
        // If editing an existing comment, update the comments array
        const updatedComments = comments.map((comment) =>
          comment.commentId === commentForEdit.commentId
            ? { ...comment, text: data.comment } // Update the text of the edited comment
            : comment
        );
        setComments(updatedComments);
        setCommentForEdit(null); // Clear the edited comment
      } else {
        // If creating a new comment, add it to the comments array
        setComments((prevComments) => [response.data.data[0], ...prevComments]);
      }

      reset();
    } catch (error) {
      // Handle any errors
      console.error("Error posting/editing comment:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${POSTS_API}/${props.id}/comments/last`
        );
        if (response.data.data) {
          setComments(response.data.data);
        }
      } catch (error) {
        console.error("Error", error);
      }

      const emailArray = props.upvote.split(",");
      const bookMarkArray = props.bookmark.split(",");
      if (emailArray.includes(GlobalUserData.id.toString())) {
        setLiked(true);
      }
      if (bookMarkArray.includes(GlobalUserData.id.toString())) {
        setMarked(true);
      }
      setUpVoteCount(emailArray.length - 1);
    };

    fetchData(); // Immediately invoke the async function
  }, []);

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
  useEffect(() => {
    console.log(comments);
  }, [comments]);

  return (
    <>
      <Wrapper key={props.id}>
        <PostDetail>
          <PostOwner>
            {props.profile_image ? (
              <img src={`${props.profile_image}`} alt="Image" />
            ) : (
              <img
                src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfZCGFDrC8YeednlJC3mhxPfg_s4Pg8u7-kf6dy88&s`}
                alt="Image"
              />
            )}

            <OwnerInfo>
              <h1>{props.username}</h1>
              <div>{newFormattedDate}</div>
            </OwnerInfo>
            <MoreIcon ref={moreIconRef} onClick={handlePostMoreBtn}>
              <MoreHorizIcon />
            </MoreIcon>
            {isMoreBtnClicked && User.id === props.userId && (
              <MoreBtnWrapper>
                <button onClick={handleEditPostBtn}>수정</button>
                <button onClick={handleDeletePostBtn}>삭제</button>
              </MoreBtnWrapper>
            )}
          </PostOwner>
          <PostContent>
            <h1>{props.title}</h1>
            {props.image && <img src={`${props.image}`} />}
            <p>{props.content}</p>
          </PostContent>
          <Reaction>
            <ReactionButton onClick={handleLikeClick}>
              <LikeBtnWrapper>
                {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                <LikeBtn>{upVoteCount}</LikeBtn>
              </LikeBtnWrapper>
            </ReactionButton>
            <div>
              <AutorenewIcon />
            </div>
            <ReactionButton onClick={handleMarkClick}>
              {marked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </ReactionButton>
            <div>
              <ShareIcon />
            </div>
          </Reaction>
        </PostDetail>
        <PostComment>
          <StyledArrowIcon
            expandComments={expandComments}
            onClick={handleExpandIcon}
          />
          {expandComments ? (
            comments.map((comment: IComments) => (
              <Comment
                key={comment.commentId}
                comment={comment}
                handleEditCommentBtn={handleEditCommentBtn}
                handleDeleteCommentBtn={handleDeleteCommentBtn}
                User={User}
              />
            ))
          ) : (
            <Comment
              key={comments[0]?.commentId}
              comment={comments[0]}
              handleEditCommentBtn={handleEditCommentBtn}
              handleDeleteCommentBtn={handleDeleteCommentBtn}
              User={User}
            />
          )}

          <InputWrapper onSubmit={handleSubmit(onValid)}>
            <input
              {...register("comment", { required: true, maxLength: 100 })}
              placeholder="댓글을 달아보세요!"
              defaultValue={commentForEdit?.text}
              autoComplete="off"
            />
            <button>Reply</button>
          </InputWrapper>
        </PostComment>
      </Wrapper>
    </>
  );
}

export default MainPost;
