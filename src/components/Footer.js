import styled from "styled-components";

const Wrapper = styled.div`
  height: 380px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "NanumGothic", sans-serif;
`;
const Content = styled.div`
  width: 900px;
  height: 100%;
`;

const Content__Top = styled.div`
  height: 30%;
  border-bottom: 1px solid #353535;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 200px;
  }
  a {
    color: white;
    font-size: 12px;
    color: #353535;
  }
`;
const Content__Mid = styled.div`
  height: 45%;
  border-bottom: 1px solid #353535;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
`;
const Content__Mid__Box__Title = styled.div`
  color: #cbcbcb;
  line-height: 25px;
  margin-bottom: 20px;
`;
const Content__Mid__Box__Content = styled.div`
  color: #595959;
  div {
    margin-bottom: 10px;
  }
`;
const Content__Mid__Box = styled.div``;
const Content__Bottom = styled.div`
  height: 25%;
  text-align: center;
  color: #595959;
  padding-top: 15px;
`;
export default function Footer() {
  return (
    <Wrapper>
      <Content>
        <Content__Top>
          <img src="./imgs/Logo_footer.png" />
          <a href="/">이용약관 · 개인정보 취급방침</a>
        </Content__Top>
        <Content__Mid>
          <Content__Mid__Box>
            <Content__Mid__Box__Title>회사정보</Content__Mid__Box__Title>
            <Content__Mid__Box__Content>
              <div>상호 : 솔로라이프</div>
              <div>대표자/개인정보책임관리자 : 최규남 </div>
              <div>사업자등록번호 : 634-81-12341</div>
            </Content__Mid__Box__Content>
          </Content__Mid__Box>
          <Content__Mid__Box>
            <Content__Mid__Box__Title>연락처</Content__Mid__Box__Title>
            <Content__Mid__Box__Content>
              <div>070-1234-1234</div>
              <div>AM 10:00 - PM 7:00 (주말 및 공휴 일 휴무) </div>
            </Content__Mid__Box__Content>
          </Content__Mid__Box>
          <Content__Mid__Box>
            <Content__Mid__Box__Title>주소</Content__Mid__Box__Title>
            <Content__Mid__Box__Content>
              <div>상호 : 솔로라이프</div>
            </Content__Mid__Box__Content>
          </Content__Mid__Box>
          <Content__Mid__Box>
            <Content__Mid__Box__Title>이메일</Content__Mid__Box__Title>
            <Content__Mid__Box__Content>
              <div>asdasdsa@naver.com</div>
            </Content__Mid__Box__Content>
          </Content__Mid__Box>
        </Content__Mid>
        <Content__Bottom>
          Copyright ⓒ sololife. All right reserved
        </Content__Bottom>
      </Content>
    </Wrapper>
  );
}
