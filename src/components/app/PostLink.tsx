import styled from "styled-components";
import { SubPostProps } from "../../routes/MyProfile";
import { formatTimeAgo } from "../functions/post";

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

function Post(props: SubPostProps) {
  const newFormattedDate = formatTimeAgo(new Date(props.date));
  return (
    <Wrapper>
      {props.image ? (
        <img src={`${props.image}`} alt="Image" />
      ) : (
        <img
          src={`https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg`}
          alt="Image"
        />
      )}
      <Post_info>
        <Post_info_title>{props.title}</Post_info_title>
        <Post_info_detail>
          <div>{props.username}</div>
          <div>{newFormattedDate}</div>
        </Post_info_detail>
      </Post_info>
    </Wrapper>
  );
}

export default Post;
