import styled from "styled-components";
import { Header, Wrapper } from "../components/app/Styled_Component";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoodIcon from "@mui/icons-material/Mood";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import GifBox from "@mui/icons-material/GifBox";

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
const Btns = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    width: 80px;
    height: 30px;
    border: 2px solid tomato;
    border-radius: 30px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    transition: background-color 0.1s ease-in-out;
    cursor: pointer;
    font-weight: bold;
    color: tomato;
    &:hover {
      background-color: tomato;
      color: white;
    }
  }
`;
const MidSection = styled.div``;
const CategorySelection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
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
`;

const PostBottom = styled.div`
  width: 100%;
  color: tomato;

  div {
    width: 50%;
    display: flex;
    align-items: start;
    justify-content: space-around;
    padding: 20px;
    svg {
      cursor: pointer;
    }
  }
`;

function NewPost() {
  const handleMoodIconClick = () => {
    console.log("hi");
  };
  const handleGifIconClick = () => {
    console.log("hi");
  };
  const handleAddPhotoIconClick = () => {
    console.log("hi");
  };
  return (
    <Wrapper>
      <Header>글쓰기</Header>

      <MainTop>
        <HeaderSection>
          <CloseBtn>
            <CloseIcon />
          </CloseBtn>

          <Btns>
            <div>임시보관</div>
            <div>작성</div>
          </Btns>
        </HeaderSection>
        <MidSection>
          <CategorySelection>
            <span>게시판 선택</span>
            <ChevronRightIcon />
          </CategorySelection>
          <Title placeholder="제목을 입력해주세요" />
        </MidSection>
        <BottomSection></BottomSection>
      </MainTop>
      <MainBottom />
      <PostBottom>
        <div>
          <MoodIcon fontSize={"large"} onClick={handleMoodIconClick} />
          <GifBox fontSize={"large"} onClick={handleGifIconClick} />
          <AddPhotoAlternateIcon
            fontSize={"large"}
            onClick={handleAddPhotoIconClick}
          />
        </div>
      </PostBottom>
    </Wrapper>
  );
}

export default NewPost;
