import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  padding: 10px 0;

  img {
    width: 80px;
    height: 80px;
    margin-right: 10px;
  }
`;
const Post_info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
  padding: 10px;
`;
const Post_info_title = styled.div`
  font-size: 20px;
`;
const Post_info_detail = styled.div`
  display: flex;
  div {
    margin-right: 20px;
  }
`;

function Post() {
  return (
    <Wrapper>
      <img />
      <Post_info>
        <Post_info_title>글제목</Post_info_title>
        <Post_info_detail>
          <div>작성자</div>
          <div>2023.nn.nn</div>
        </Post_info_detail>
      </Post_info>
    </Wrapper>
  );
}

export default Post;
