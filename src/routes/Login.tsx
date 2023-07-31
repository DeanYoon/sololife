import styled from "styled-components";
import SocialLoginBtns from "../components/SocialLoginBtns";
import { useForm } from "react-hook-form";
import {
  BtnBox,
  LoginBtn,
  SignupBtn,
} from "../components/app/Styled_Component";
import axios from "axios";
import { USERS_API } from "../components/api";
import { useRecoilState, useSetRecoilState } from "recoil";
import { UserData, loginState } from "../atoms";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  background-color: #fffaf4;
  max-width: 500px;
  min-width: 375px;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  margin: 10px;
  font-size: 20px;
  font-family: "NanumSquareRound", sans-serif;
`;

const Box = styled.div`
  background-color: white;
  width: 500px;
  height: 680px;
  padding: 45px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  font-family: "NanumSquare", sans-serif;
`;

const LoginInput = styled.input`
  width: 400px;
  height: 56px;
  outline: none;
  border: none;
  font-size: 16px;
  border-bottom: 1px solid #dddddd;
  ::placeholder {
    color: #767676;
  }
`;

const ForgotIDPass = styled.a`
  font-size: 15px;
  text-align: end;
  margin-top: 30px;
  &:hover {
    text-decoration: underline;
    text-decoration-color: #767676;
  }
`;

const Barrier = styled.div`
  border: 1px solid #dddddd;
  margin: 50px 0;
  position: relative;
  span {
    position: absolute;
    right: 40%;
    top: -15px;
    background-color: white;
    padding: 8px;
  }
`;

function Login() {
  const setIsLoggedIn = useSetRecoilState(loginState);
  const [userData, setUserData] = useRecoilState(UserData);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onValid = async (data: any) => {
     try {
    const response = await axios.post(`${USERS_API}/login`, data);

    if (response.status === 200) {
      // Login successful
        const { id, username, email, profile_image } = response.data.data;
           setIsLoggedIn(true);
          setUserData({
            id,
            username,
            userEmail: email,
            profileImg: profile_image,
          });
          navigate("/home");
      // Redirect the user to the home/dashboard page or perform other actions for a successful login
    } else if (response.status === 400) {
      // Email does not exist
      console.log('Email does not exist');
    } else if (response.status === 401) {
      // Wrong password
      console.log('Wrong password');
    } else {
      // Other server errors
      console.log('Server error');
    }
  } catch (error) {
    console.error('Error occurred:', error);
  }
  };
  return (
    <Wrapper>
      <Title>로그인</Title>
      <Box>
        <LoginForm onSubmit={handleSubmit(onValid)}>
          <LoginInput
            {...register("email", { required: true })}
            type="email"
            placeholder="아이디(이메일)를 입력하세요"
          ></LoginInput>
          <LoginInput
            {...register("password", { required: true })}
            type="password"
            placeholder="비밀번호를 입력하세요"
          ></LoginInput>
          <ForgotIDPass href="/find-password">
            아이디/비밀번호 잊으셨나요?
          </ForgotIDPass>
          <BtnBox>
            <LoginBtn as="button">로그인</LoginBtn>
            <SignupBtn href="/signup">회원가입</SignupBtn>
          </BtnBox>
        </LoginForm>
        <Barrier>
          <span>간편로그인</span>
        </Barrier>
        <SocialLoginBtns />
      </Box>
    </Wrapper>
  );
}

export default Login;
