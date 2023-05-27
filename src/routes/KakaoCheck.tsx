import { FinishKakaoLogin } from "../components/KakaoLogin";

const KakaoCheck = () => {
  const code = new URL(window.location.href).searchParams.get("code");

  return (
    <div>
      <FinishKakaoLogin code={code} />
    </div>
  );
};

export default KakaoCheck;
