import { useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        alert("현재는 화면 구현 단계입니다. 로그인 기능은 아직 지원하지 않습니다.");
    }

    return (
        <main className="pm-login">
            <section className="pm-login__container">
                <div className="pm-login__header">
                    <h1>ProjectMate</h1>
                    <p>다시 만나서 반가워요!</p>
                    <span>로그인하고 함께 성잘할 팀원을 찾아보세요.</span>
                </div>

                <form className="pm-login__form" onSubmit={handleSubmit}>
                    <div className="pm-login__field">
                        <label htmlFor="login-email">이메일</label>
                        <input
                            id="login-email"
                            type="email"
                            placeholder="이메일을 입력해 주세요."
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>

                    <div className="pm-login__field">
                        <label htmlFor="login-password">비밀번호</label>
                        <input
                            id="login-password"
                            type="password"
                            placeholder="비밀번호를 입력해 주세요."
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>

                    <div className="pm-login__options">
                        <Link to="/find-password" className="pm-login__submit">비밀번호 찾기</Link>
                    </div>

                    <button type="submit" className="pm-login__submit">
                        로그인
                    </button>
                </form>

                <div className="pm-login__signup">
                    <span>아직 회원이 아니신가요?</span>
                    <Link to="/signup">회원가입</Link>
                </div>
            </section>
        </main>
    );
}

export default LoginPage;