import styled from "styled-components";
import Navigator from "../components/app/Navigator";
import { Wrapper } from "../components/app/Styled_Component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import MainPost from "../components/app/MainPost";

const Header = styled.div`
  height: 77px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 200;
  font-size: 20px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  position: relative;
  font-weight: 400;
`;

const Search = styled.div`
  position: absolute;
  right: 20px;
  cursor: pointer;
  color: #767676;
`;

const BtnWrapper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #767676;
  a {
    cursor: pointer;
  }
`;

function AppHome() {
  return (
    <Wrapper>
      <Header>
        <span>피드</span>
        <Search>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Search>
      </Header>
      <BtnWrapper>
        <a>전체보기</a>
        <a>집렌트</a>
        <a>중고물품</a>
        <a>맛집</a>
        <a>이벤트</a>
      </BtnWrapper>
      <MainPost />
      <Navigator />
    </Wrapper>
  );
}

export default AppHome;
