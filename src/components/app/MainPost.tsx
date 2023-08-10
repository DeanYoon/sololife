import styled from "styled-components";
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

const LikeBtn = styled.span`
  display: flex;
  text-align: center;
  justify-content: space-between;
  width: 70px;
  span {
  }
  span:last-child {
    width: 20px;
  }
`;

const PostComment = styled.div`
  width: 100%;
  padding: 10px 25px 25px 25px;
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
  const [liked, setLiked] = useState(false);
  const [marked, setMarked] = useState(false);
  const [upVoteCount, setUpVoteCount] = useState(0);
  const [comments, setComments] = useState<IComments[]>([]);
  const User = useRecoilValue(UserData);
  const [commentForEdit, setCommentForEdit] = useState<IComments | null>(null);
  const [expandComments, setExpandComments] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const GlobalUserData = useRecoilValue(UserAtom);
  const handleLikeClick = () => {
    setLiked(!liked);

    // Define the request data (start and listn in your case)
    const requestData = {
      postId: props.id,
      userId: GlobalUserData.id,
    };

    axios
      .post(`${POSTS_API}/${props.id}/like`, requestData)
      .then((response) => {
        // Handle the API response
        const responseData = response.data;
        if (responseData.message === "OK") {
          // Check if the post was already liked
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

  const handleMarkClick = () => {
    setMarked(!marked);

    const requestData = {
      postId: props.id,
      userId: GlobalUserData.id,
    };

    axios
      .post(`${POSTS_API}/${props.id}/bookmark`, requestData)
      .then((response) => {})
      .catch((error) => {
        // Handle any errors
        console.error("Error liking post:", error);
      });
  };

  const handleEditBtn = (comment: IComments) => {
    setCommentForEdit(comment);
  };
  const handleDeleteBtn = async (commentId: number) => {
    try {
      const response = await axios.delete(
        `${POSTS_API}/${props.id}/comments/${commentId}`
      );

      if (response.data.data) {
        setComments(response.data.data); // 댓글 삭제 후 다음 최신 댓글로 업데이트
      } else {
        console.log("Error deleting comment");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const newFormattedDate = formatTimeAgo(new Date(props.date));

  const onValid = async (data: any) => {
    const requestData = {
      postId: props.id,
      userId: GlobalUserData.id,
      comment: data.comment,
      editComment: commentForEdit?.commentId,
    };
    axios
      .post(`${POSTS_API}/${requestData.postId}/comments`, requestData)
      .then((response) => {
        //수정중인 데이터 초기화
        setCommentForEdit(null);
        setComments(response.data.data);
        reset();
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error liking post:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`${POSTS_API}/${props.id}/comments/last`)
      .then((response) => {
        response.data.data && setComments(response.data.data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
    const emailArray = props.upvote.split(",");
    const bookMarkArray = props.bookmark.split(",");
    if (emailArray.includes(GlobalUserData.id.toString())) {
      setLiked(true);
    }
    if (bookMarkArray.includes(GlobalUserData.id.toString())) {
      setMarked(true);
    }
    setUpVoteCount(emailArray.length - 1);
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
          </PostOwner>
          <PostContent>
            <h1>{props.title}</h1>
            {props.image && <img src={`${props.image}`} />}
            <p>{props.content}</p>
          </PostContent>
          <Reaction>
            <ReactionButton onClick={handleLikeClick}>
              {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              <LikeBtn>
                <span>좋아요</span>
                <span>{upVoteCount}</span>
              </LikeBtn>
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
        </PostDetail>
        <PostComment>
          {expandComments ? (
            comments.map((comment: IComments) => (
              <Comment
                key={comment.commentId}
                comment={comment}
                handleEditBtn={handleEditBtn}
                handleDeleteBtn={handleDeleteBtn}
                User={User}
              />
            ))
          ) : (
            <Comment
              key={comments[0]?.commentId}
              comment={comments[0]}
              handleEditBtn={handleEditBtn}
              handleDeleteBtn={handleDeleteBtn}
              User={User}
            />
          )}

          <InputWrapper onSubmit={handleSubmit(onValid)}>
            <input
              {...register("comment", { required: true })}
              placeholder="댓글을 달아보세요!"
              defaultValue={commentForEdit?.text}
            />
            <button>Reply</button>
          </InputWrapper>
        </PostComment>
      </Wrapper>
    </>
  );
}

export default MainPost;
