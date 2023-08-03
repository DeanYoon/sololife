import styled from "styled-components";
import { Header, Wrapper } from "../components/app/Styled_Component";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import LocationIcon from "@mui/icons-material/LocationOn";
import MoodIcon from "@mui/icons-material/Mood";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { UserData, loginState } from "../atoms";
import UnloggedIn from "../components/app/UnloggedIn";
import Navigator from "../components/app/Navigator";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { POSTS_API } from "../components/api";

const PostForm = styled.form`
  width: 100%;
`;

const MainTop = styled.div`
  padding: 30px;
  width: 100%;
  border-bottom: 1px solid #d9d9d9;
`;

const HeaderSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const CloseBtn = styled.div`
  cursor: pointer;
`;

const MidSection = styled.div``;
const CategorySelection = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  margin: 20px 0;
  svg {
    cursor: pointer;
  }

  select {
    font-size: 18px;
    border: none;
    font-weight: 300;
    padding-right: 10px;
  }
`;
const Title = styled.input`
  border: none;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  &::placeholder {
    color: black;
  }
`;

const MainBottom = styled.textarea`
  padding: 30px;
  box-sizing: border-box;
  width: 100%;
  height: 70vh;
  border: none;
  outline: none;
  resize: none;
  border-bottom: 1px solid #d9d9d9;
  font-size: 16px;
`;

const BottomBar = styled.div`
  padding: 20px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: tomato;

  div {
    width: 60%;
    display: flex;
    align-items: start;
    justify-content: space-around;
    svg {
      cursor: pointer;
    }
  }
`;

const HiddenFileUploader = styled.input`
  display: none;
`;

const Btns = styled.button`
  display: flex;
  justify-content: space-between;
  width: 80px;
  height: 30px;
  border: none;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.1s ease-in-out;
  cursor: pointer;
  font-weight: bold;
  background-color: tomato;
  color: white;
  &:hover {
    background-color: white;
    color: tomato;
    border: 2px solid tomato;
  }
`;

interface FormData {
  tags_code?: string;
  title: string;
  content: string;
  username: string;
  email: string;
  images?: FileList;
}

function NewPost() {
  const navigate = useNavigate();
  const [tags_code, setTags_code] = useState<string>("");
  const isLoggedIn = useRecoilValue(loginState);
  const UserInfo = useRecoilValue(UserData);
  const { register, handleSubmit, watch } = useForm({ mode: "onSubmit" });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const onSubmit = (data: any) => {
    try {
      const postData: FormData = {
        ...data,
        tags_code: tags_code,
        image: imageData ? imageData : "",
        email: UserInfo.userEmail,
        username: UserInfo.username,
      };
      axios
        .post(`${POSTS_API}/insert`, postData)
        .then((response) => {
          navigate("/home");
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const handleMoodIconClick = () => {
    console.log("hi");
  };

  const handleAddPhotoIconClick = (event: any) => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the click event on the file input
    }
  };
  const handleCloseIconClick = () => {
    navigate("/home");
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();
      //returns Base64-encoded url
      reader.readAsDataURL(file);
      reader.onload = () => {
        //Resize process

        //loads image into img
        const img = new Image();
        img.src = reader.result as string;
        //size setting
        img.onload = () => {
          //create canvas element and set max width

          // create a new canvas element
          const canvas = document.createElement("canvas");
          // set the maximum width of the image to be 800 pixels
          const MAX_WIDTH = 800;
          // calculate the scale size based on the image width and maximum width
          const scaleSize = MAX_WIDTH / img.width;
          // set the width and height of the canvas based on the maximum width and scaled height
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          // get the 2D rendering context of the canvas
          const ctx = canvas.getContext("2d");
          // draw the image onto the canvas with the scaled dimensions
          ctx && ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          // convert the canvas to a data URL with JPEG format and 80% quality
          const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
          // set the image data as the value of the "image" input field
          setImageData(dataUrl);
        };
      };
    }
  };

  return (
    <Wrapper>
      <Header>글쓰기</Header>
      {isLoggedIn ? (
        <PostForm onSubmit={handleSubmit(onSubmit)}>
          <MainTop>
            <HeaderSection>
              <CloseBtn onClick={handleCloseIconClick}>
                <CloseIcon />
              </CloseBtn>
            </HeaderSection>
            <MidSection>
              <CategorySelection>
                <select
                  name="category"
                  onChange={(e) => setTags_code(e.target.value)}
                >
                  <option value="">게시판 선택</option>
                  <option value="1">집렌트</option>
                  <option value="2">중고물품</option>
                  <option value="3">맛집</option>
                </select>
              </CategorySelection>
              <Title
                placeholder="제목을 입력해주세요"
                {...register("title", { required: true })}
              />
            </MidSection>
          </MainTop>
          <MainBottom
            {...register("content", { required: true })}
            placeholder="내용을 입력하세요."
          />
          <BottomBar>
            <div>
              <MoodIcon fontSize={"large"} onClick={handleMoodIconClick} />
              <AddPhotoAlternateIcon
                fontSize={"large"}
                onClick={handleAddPhotoIconClick}
              />
              <HiddenFileUploader
                type="file"
                accept="image/*"
                {...register("image")}
                ref={(e) => (fileInputRef.current = e)}
                onChange={handleFileUpload}
              />
              <CalendarIcon fontSize={"large"} />
              <LocationIcon fontSize={"large"} />
            </div>
            <Btns>작성</Btns>
          </BottomBar>
        </PostForm>
      ) : (
        <UnloggedIn />
      )}
    </Wrapper>
  );
}

export default NewPost;
