import styled from "styled-components";
import { Header, Wrapper } from "../components/app/Styled_Component";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import LocationIcon from "@mui/icons-material/LocationOn";
import MoodIcon from "@mui/icons-material/Mood";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

const BottomSection = styled.div``;

const MainBottom = styled.textarea`
  padding: 30px;
  width: 100%;
  height: 80vh;
  border: none;
  outline: none;
  resize: none;
  border-bottom: 1px solid #d9d9d9;
  font-size: 16px;
`;

const PostBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: tomato;
  padding: 20px;
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

function NewPost() {
  const navigate = useNavigate();
  const [expand, setExpand] = useState(false);
  const handleMoodIconClick = () => {
    console.log("hi");
  };

  const handleAddPhotoIconClick = () => {
    console.log("hi");
  };
  const handleExpandIconClick = () => {
    setExpand(true);
  };
  console.log(expand);
  const handleCloseIconClick = () => {
    navigate("/home");
  };
  return (
    <Wrapper>
      <Header>글쓰기</Header>

      <MainTop>
        <HeaderSection>
          <CloseBtn onClick={handleCloseIconClick}>
            <CloseIcon />
          </CloseBtn>
        </HeaderSection>
        <MidSection>
          <CategorySelection>
            <select name="게시판 선택">
              <option value={"게시판 선택"}>게시판 선택</option>
              <option value={"집렌트"}>집렌트</option>
              <option value={"중고물품"}>중고물품</option>
              <option value={"맛집"}>맛집</option>
            </select>
          </CategorySelection>
          <Title placeholder="제목을 입력해주세요" />
        </MidSection>
        <BottomSection></BottomSection>
      </MainTop>
      <MainBottom />
      <PostBottom>
        <div>
          <MoodIcon fontSize={"large"} onClick={handleMoodIconClick} />
          <AddPhotoAlternateIcon
            fontSize={"large"}
            onClick={handleAddPhotoIconClick}
          />
          <CalendarIcon fontSize={"large"} />
          <LocationIcon fontSize={"large"} />
        </div>
        <Btns>작성</Btns>
      </PostBottom>
    </Wrapper>
  );
}

export default NewPost;
