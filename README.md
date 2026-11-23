# ProjectMate

**함께 성장할 프로젝트 팀원을 찾고, 아이디어를 실제 결과물로 만들어가는 협업 플랫폼**

ProjectMate는 개인 프로젝트나 포트폴리오 제작을 위해 팀원을 찾는 사람들을 위한 웹 서비스입니다.

프로젝트를 함께 진행하고 싶지만 적절한 팀원을 찾기 어려운 개발자, 디자이너, 기획자 등이 자신의 기술 스택과 활동 가능 시간을 공유하고, 서로에게 적합한 협업 파트너를 찾을 수 있도록 만드는 것을 목표로 합니다.

## 주요 기능

### 1. 프로젝트 탐색
- 등록된 프로젝트 목록 확인
- 프로젝트 상세 정보 조회
- 프로젝트 분야 및 기술 스택 확인
- 새로운 프로젝트 등록
- 프로젝트 참여 신청 및 신청 상태 확인

### 2. 팀원 찾기
- 팀원 프로필 목록 조회
- 닉네임 및 기술 스택 기반 검색
- 프론트엔드, 백엔드, 디자이너 등 분야별 필터링
- 팀원별 상세 프로필 확인

### 3. 사용자 계정
- 회원가입 화면 및 API 연동
- 이메일 중복 확인 및 서버 입력값 검증
- bcrypt를 사용한 비밀번호 해시 저장
- 회원가입 성공 시 JWT를 HttpOnly 쿠키로 설정
- 로그인 화면
- 마이페이지 및 사용자 프로필 관리

현재 로그인 API와 로그인한 사용자의 인증 상태를 검증하는 기능은 후속 작업으로 진행할 예정입니다.

## 기술 스택

| 구분 | 기술 |
|---|---|
| Frontend | React, TypeScript |
| Build Tool | Vite |
| Routing | React Router |
| Styling | CSS |
| Icons | Lucide React |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL (Supabase) |

Supabase PostgreSQL은 현재 사용자 계정 저장에 사용합니다. 프로젝트 및 참여 신청 데이터의 저장 방식은 사용자 데이터와 별도로 관리됩니다.

## 프로젝트 구조

```text
src/
├── assets/       # 이미지 및 정적 리소스
├── components/   # 공통 컴포넌트
├── data/         # 목업 데이터
├── layouts/      # 공통 레이아웃
├── pages/        # 페이지 컴포넌트
├── services/     # API 통신 관련 로직
├── stores/       # 전역 상태 관리
├── styles/       # CSS 스타일
└── types/        # TypeScript 타입 정의

server/
└── src/
    ├── config/       # 데이터베이스 연결 설정
    ├── controllers/  # API 요청 및 응답 처리
    ├── middlewares/  # 공통 미들웨어
    ├── respositories/# 데이터 저장 및 조회
    ├── routes/       # API 라우트
    ├── services/     # 비즈니스 로직
    └── types/        # 서버 타입 정의

docs/
├── images/           # 개발 과정 스크린샷
├── performance.md    # 성능 측정 기록
├── problem-solving.md# 문제 해결 기록
└── tech-decisions.md # 기술적 의사결정 기록
```

## 실행 방법

### 1. 저장소 클론

```bash
git clone https://github.com/JuMoth/ProjectMate.git
cd ProjectMate
```

### 2. 프론트엔드 실행

프로젝트 루트에서 의존성을 설치하고 개발 서버를 실행합니다.

```bash
npm install
npm run dev
```

### 3. 백엔드 환경 변수 설정

`server/.env.example`을 참고해 `server/.env` 파일을 만들고 다음 환경 변수를 설정합니다.

- `DATABASE_URL`: Supabase PostgreSQL 연결 문자열
- `JWT_SECRET`: JWT 서명에 사용할 로컬 비밀값

실제 환경 변수 값이 들어 있는 `.env` 파일은 Git에 추가하지 않습니다. 실제 비밀값을 README, 코드, 스크린샷에 기록하지 마세요.

### 4. 백엔드 실행

별도의 터미널에서 서버 디렉터리로 이동해 의존성을 설치하고 개발 서버를 실행합니다.

```bash
cd server
npm install
npm run dev
```

프론트엔드는 `http://localhost:5173`, 백엔드는 `http://localhost:4000`에서 실행합니다.

## 회원가입 API

### 회원가입

- **Method:** `POST`
- **Endpoint:** `/api/auth/signup`

요청 본문:

```json
{
  "email": "user@example.com",
  "password": "ExamplePassword123!",
  "nickname": "사용자"
}
```

성공 응답은 `201 Created`이며, 응답 본문에는 공개 사용자 정보만 포함됩니다. 비밀번호 해시와 JWT는 JSON 응답에 포함하지 않습니다. JWT는 `accessToken` HttpOnly 쿠키로 전달됩니다.

```json
{
  "success": true,
  "message": "회원가입이 완료되었습니다.",
  "data": {
    "id": "user-uuid",
    "email": "user@example.com",
    "nickname": "사용자",
    "created_at": "2026-11-23T09:15:46.332Z"
  }
}
```

주요 오류 응답:

| 상태 코드 | 설명 |
|---|---|
| `400 Bad Request` | 이메일, 비밀번호, 닉네임 등 입력값이 올바르지 않음 |
| `409 Conflict` | 이미 가입된 이메일 |
| `500 Internal Server Error` | 예상하지 못한 서버 오류 |

프론트엔드는 쿠키를 주고받도록 요청에 credentials를 포함합니다. 백엔드는 개발 환경에서 `http://localhost:5173`의 요청을 허용하고 CORS credentials를 활성화합니다.

## 개발 진행 현황

- [x] Vite + React + TypeScript 프로젝트 환경 구성
- [x] React Router 기반 페이지 라우팅
- [x] 공통 레이아웃 및 사이드바 구현
- [x] 로그인 및 회원가입 화면 구현
- [x] 메인 페이지 구현
- [x] 프로젝트 목록 및 상세 페이지 구현
- [x] 프로젝트 생성 기능 구현
- [x] 프로젝트 API 연동
- [x] 프로젝트 참여 신청 기능 및 API 연동
- [x] Supabase PostgreSQL 사용자 테이블 구축
- [x] 회원가입 API 및 프론트엔드 연동
- [ ] 로그인 및 로그아웃 API
- [ ] JWT 인증 검증 미들웨어 및 인증 상태 처리
- [ ] 팀원 데이터 API 연동
- [ ] 프로젝트 및 참여 신청 데이터의 영구 저장
- [ ] 반응형 UI 및 사용자 경험 개선

## 개발 기록 및 테스트 자료

개발 과정의 성능 측정, 문제 해결, 기술적 의사결정 기록은 `docs/`에서 확인할 수 있습니다.

회원가입 API의 성공 응답, 중복 이메일 오류, 잘못된 입력, 쿠키 설정, DB 해시 확인 스크린샷은 `docs/images/auth/`에 저장합니다. 쿠키 스크린샷은 토큰 값이 보이지 않도록 가린 자료만 보관합니다.

## 개발 목적

ProjectMate는 단순한 화면 구현에 그치지 않고, 실제 사용자가 활용할 수 있는 풀스택 웹 서비스를 만드는 것을 목표로 합니다.

프론트엔드 화면 개발부터 서버 구축, 데이터베이스 설계, API 연동 및 배포까지 전체적인 웹 서비스 개발 과정을 경험하고, 개발 과정에서 발생하는 문제를 해결하며 실무에 필요한 역량을 쌓고자 합니다.

---

**ProjectMate** — Find Your Team, Build Your Future.