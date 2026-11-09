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

### 2. 팀원 찾기
- 팀원 프로필 목록 조회
- 닉네임 및 기술 스택 기반 검색
- 프론트엔드, 백엔드, 디자이너 등 분야별 필터링
- 팀원별 상세 프로필 확인

### 3. 사용자 계정
- 회원가입 및 로그인 화면
- 마이페이지
- 사용자 프로필 관리

## 기술 스택

| 구분 | 기술 |
|---|---|
| Frontend | React, TypeScript |
| Build Tool | Vite |
| Routing | React Router |
| Styling | CSS |
| Icons | Lucide React |
| Backend | Express (예정) |
| Database | PostgreSQL / Supabase (검토 중) |

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
```

## 실행 방법

### 1. 저장소 클론

```bash
git clone https://github.com/JuMoth/ProjectMate.git
```

### 2. 프로젝트 디렉터리 이동

```bash
cd ProjectMate
```

### 3. 패키지 설치

```bash
npm install
```

### 4. 개발 서버 실행

```bash
npm run dev
```

## 개발 진행 현황

- [x] Vite + React + TypeScript 프로젝트 환경 구성
- [x] React Router 기반 페이지 라우팅
- [x] 공통 레이아웃 및 사이드바 구현
- [x] 로그인 및 회원가입 화면 구현
- [x] 메인 페이지 구현
- [x] 프로젝트 목록 페이지 구현
- [x] 팀원 찾기 페이지 구현
- [x] 팀원 검색 및 분야별 필터링
- [x] 팀원 상세 페이지 구현
- [ ] 사용자 인증 기능 구현
- [ ] 프로젝트 및 팀원 데이터 API 연동
- [ ] 데이터베이스 구축
- [ ] 프로젝트 참여 요청 기능 구현
- [ ] 반응형 UI 및 사용자 경험 개선

## 개발 목적

ProjectMate는 단순한 화면 구현에 그치지 않고, 실제 사용자가 활용할 수 있는 풀스택 웹 서비스를 만드는 것을 목표로 합니다.

프론트엔드 화면 개발부터 서버 구축, 데이터베이스 설계, API 연동 및 배포까지 전체적인 웹 서비스 개발 과정을 경험하고, 개발 과정에서 발생하는 문제를 해결하며 실무에 필요한 역량을 쌓고자 합니다.

---

**ProjectMate** — Find Your Team, Build Your Future.