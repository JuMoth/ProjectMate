import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/SignupPage.css";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.length < 8) {
      alert("비밀번호는 8자 이상 입력해 주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!agreeTerms) {
      alert("이용약관에 동의해 주세요.");
      return;
    }

    alert(
      "현재는 화면 구현 단계입니다. 회원가입 기능은 아직 지원하지 않습니다.",
    );
  };

  return (
    <main className="pm-signup">
      <section className="pm-signup__container">
        <div className="pm-signup__header">
          <h1>ProjectMate</h1>
          <p>새로운 시작을 함께해요!</p>
          <span>회원가입하고 함께 성잘할 팀원을 찾아보세요.</span>
        </div>

        <form className="pm-signup__form" onSubmit={handleSubmit}>
          <div className="pm-signup__field">
            <label htmlFor="signup-email">이메일</label>
            <input
              id="signup-email"
              type="email"
              placeholder="이메일을 입력해 주세요."
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="pm-signup__field">
            <label htmlFor="signup-nickname">닉네임</label>
            <input
              id="signup-nickname"
              type="text"
              placeholder="사용할 닉네임을 입력해 주세요."
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              required
              minLength={2}
              maxLength={20}
            />
          </div>

          <div className="pm-signup__field">
            <label htmlFor="signup-password">비밀번호</label>
            <input
              id="signup-password"
              type="password"
              placeholder="비밀번호를 8자 이상 입력해 주세요."
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
            />
          </div>

          <div className="pm-signup__field">
            <label htmlFor="signup-password-confirm">비밀번호 확인</label>
            <input
              id="signup-password-confirm"
              type="text"
              placeholder="비밀번호를 다시 입력해 주세요."
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
              required
            />
          </div>

          <label className="pm-signup__terms">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(event) => setAgreeTerms(event.target.checked)}
            />
            <span>이용약관 및 개인정보 처리방침에 동의합니다.</span>
          </label>

          <button type="submit" className="pm-signup__submit">회원가입</button>
        </form>

        <div className="pm-signup__login">
            <span>이미 계정이 있으신가요?</span>
            <Link to="/login">로그인</Link>
        </div>
      </section>
    </main>
  );
}

export default SignupPage;
