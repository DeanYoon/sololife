import styled from "styled-components";
import { useEffect, useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useRecoilValue } from "recoil";
import { UserData as UserAtom, loginState } from "../../atoms";
import axios from "axios";
import { POSTS_API } from "../api";
import { useForm } from "react-hook-form";

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
const TopComment = styled.div`
  display: flex;
  align-items: center;
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
`;

const CommentUsername = styled.div`
  font-weight: 1000;
`;
const InputWrapper = styled.form`
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
interface IComments {
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
  const [recentComment, setRecentComment] = useState<IComments>();
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
      .post(`${POSTS_API}/likePost`, requestData)
      .then((response) => {
        // Handle the API response
        const responseData = response.data;
        console.log(response.data);
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
      .post(`${POSTS_API}/bookmarkPost`, requestData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error liking post:", error);
      });
  };

  const formattedDate = new Date(props.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const onValid = async (data: any) => {
    const requestData = {
      postId: props.id,
      userId: GlobalUserData.id,
      comment: data.comment,
    };
    axios
      .post(`${POSTS_API}/comment/insert`, requestData)
      .then((response) => {
        console.log(response);
        setRecentComment({
          text: data.comment,
          createdTime: new Date().toISOString(),
          username: GlobalUserData.username, // Assuming you have access to the username
          profile_image: GlobalUserData.profileImg, // Assuming you have access to the profile image
          userId: GlobalUserData.id,
        });

        reset();
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error liking post:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`${POSTS_API}/readComments/${props.id}`)
      .then((response) => {
        console.log(response.data.data[0]);
        response.data.data[0] && setRecentComment(response.data.data[0]);
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

  return (
    <>
      <Wrapper key={props.id}>
        <PostDetail>
          <PostOwner>
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
          <TopComment>
            {recentComment && (
              <>
                <CommentWrapper>
                  <img src={`${recentComment.profile_image}`} alt="Image" />
                  <CommentUsername>{recentComment.username}</CommentUsername>
                  <span>{recentComment.text}</span>
                </CommentWrapper>
                <button></button>
              </>
            )}
          </TopComment>
          <InputWrapper onSubmit={handleSubmit(onValid)}>
            <input
              {...register("comment", { required: true })}
              placeholder="댓글을 달아보세요!"
            />
            <button>Reply</button>
          </InputWrapper>
        </PostComment>
      </Wrapper>
    </>
  );
}

export default MainPost;
