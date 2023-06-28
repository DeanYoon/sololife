import styled from "styled-components";

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
  }
`;
function MainPost() {
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
          <div>좋아요</div>
          <div>리포스트</div>
          <div>북마크</div>
          <div>공유하기</div>
        </Reaction>
      </Wrapper>
    </>
  );
}

export default MainPost;
