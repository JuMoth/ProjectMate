# 기술적 의사결정 기록

## 개발 기록 1. 프로젝트 참여 신청 데이터 관리 및 검증 구조 결정

## 1. 결정이 필요한 상황
- 프로젝트 참여 신청 기능을 구현하면서 신청 데이터를 어디에서 관리할지 결정해야 했다.
- 새로고침 이후에도 신청 상태가 유지되어야 했다.
- 동일 사용자가 동일 프로젝트에 중복 신청하는 것을 방지해야 했다.
- 향후 데이터베이스 연동을 고려하면서 기존 백엔드 구조를 최대한 유지할 필요가 있었다.

## 2. 고려한 선택지
- 선택지 1: 프론트엔드 React State로만 신청 상태 관리
  - 구현이 간단하지만 새로고침하면 상태가 초기화된다.
  - 서버에서 중복 신청을 검증할 수 없다.

- 선택지 2: 백엔드 메모리 저장소(In-memory Repository) 사용
  - 별도의 데이터베이스 없이 신청 데이터를 관리할 수 있다.
  - 서버가 실행되는 동안 데이터가 유지된다.
  - 서버 재시작 시 데이터가 초기화되는 한계가 있다.

- 선택지 3: PostgreSQL 등 데이터베이스에 바로 저장
  - 데이터를 영구적으로 보존할 수 있다.
  - 데이터베이스 연결 및 스키마 설계가 추가로 필요하다.

## 3. 최종 선택 및 이유
- 최종 선택:
  - 현재 단계에서는 백엔드 메모리 저장소를 사용하기로 결정했다.
  - 신청 데이터의 생성 및 조회는 Repository에서 관리한다.
  - 모집 상태, 마감일, 중복 신청 검증은 Service에서 처리한다.
  - 프론트엔드에서는 API를 통해 신청 및 신청 내역을 조회한다.

- 선택한 이유:
  - 현재 데이터베이스 연동 전 단계이므로 기존 백엔드 구조를 유지하면서 기능을 구현할 수 있다.
  - Repository와 Service를 분리하여 추후 데이터베이스 연동 시 변경 범위를 줄일 수 있다.
  - 중복 신청 검증을 백엔드에서 처리하여 클라이언트에서 임의로 요청하더라도 중복 신청을 방지할 수 있다.
  - 신청 내역 조회 API를 통해 새로고침 후에도 서버에 저장된 신청 상태를 다시 불러올 수 있다.

- 선택하지 않은 대안과 그 이유:
  - 프론트엔드 React State만 사용하는 방식은 새로고침 시 상태가 초기화되고 서버 측 검증이 불가능하므로 선택하지 않았다.
  - 데이터베이스를 즉시 연결하는 방식은 현재 개발 단계에서 추가적인 설정과 설계가 필요하므로 추후 작업으로 미뤘다.

## 4. 적용 결과
- 실제 적용한 내용:
  - `application.repository.ts`에서 신청 데이터 생성 및 조회
  - `application.service.ts`에서 프로젝트 모집 상태, 마감일, 중복 신청 검증
  - `application.controller.ts`에서 API 요청과 응답 처리
  - `application.routes.ts`에서 참여 신청 및 신청 내역 조회 경로 등록
  - 프론트엔드 `application.service.ts`에서 API 요청 함수 구현
  - 프로젝트 상세 페이지에서 신청 상태 조회 및 UI 반영

- 적용 후 확인한 결과:
  - 참여 신청 성공 확인
  - 중복 신청 차단 확인
  - 새로고침 이후 신청 상태 유지 확인
  - 모집 종료 프로젝트의 신청 제한 확인
  - 프론트엔드 및 백엔드 빌드 성공

- 추후 개선할 부분:
  - PostgreSQL 데이터베이스 연동
  - 사용자 인증 및 실제 로그인 사용자 ID 적용
  - 사용자별 신청 내역 관리
  - 서버 재시작 이후에도 신청 데이터가 유지되도록 영구 저장 구조로 변경

## 5. 배운 점
- 프론트엔드 상태와 백엔드 데이터는 서로 다른 역할을 가진다는 점을 이해했다.
- 중요한 비즈니스 검증은 프론트엔드뿐만 아니라 백엔드에서도 수행해야 한다는 점을 배웠다.
- Repository와 Service를 분리하면 데이터 저장 방식이 변경되더라도 비즈니스 로직을 유지하기 쉽다는 점을 알게 되었다.
- 메모리 저장소는 초기 개발에 유용하지만 서버 재시작 시 데이터가 사라진다는 한계가 있음을 이해했다.

## 6. 관련 자료
- GitHub PR: 프로젝트 참여 신청 기능 PR (번호 및 URL 추후 추가)
- 관련 코드:
  - `server/src/respositories/application.repository.ts`
  - `server/src/services/application.service.ts`
  - `server/src/controllers/application.controller.ts`
  - `server/src/routes/application.routes.ts`
  - `src/services/application.service.ts`
  - `src/pages/ProjectDetailPage.tsx`
- 참고 자료:
  - Express 공식 문서
  - TypeScript 공식 문서
  - Axios 공식 문서


## 개발 기록 2. 사용자 계정 저장 및 회원가입 인증 방식 결정

## 1. 결정이 필요한 상황
- 회원가입 정보를 저장할 위치와 비밀번호 보관 방식을 정해야 했다.
- 동일 이메일 중복 가입을 막아야 했다.
- 가입 성공 후 JWT를 브라우저에 전달하는 방법을 정해야 했다.
- API 오류 응답을 프로젝트의 `{ success, message, data }` 형식으로 유지해야 했다.

## 2. 고려한 선택지
- 비밀번호를 원문 또는 복호화 가능한 형태로 저장
  - 사용자 비밀번호가 노출될 위험이 있어 선택하지 않았다.
- 비밀번호를 bcrypt로 해시하여 저장
  - 원래 비밀번호를 저장하지 않고 검증 가능한 해시만 보관할 수 있어 선택했다.
- JWT를 응답 본문이나 브라우저 저장소에 저장
  - JavaScript가 토큰에 접근할 수 있어 선택하지 않았다.
- JWT를 HttpOnly 쿠키로 전달
  - 브라우저 JavaScript가 토큰 값을 직접 읽지 못하게 할 수 있어 선택했다.

## 3. 최종 선택 및 이유
- 사용자 계정은 Supabase PostgreSQL의 `public.users` 테이블에 저장한다.
- 이메일 중복은 DB의 UNIQUE 제약조건으로 막는다.
- 비밀번호는 bcryptjs로 해시하고 cost factor는 12로 설정한다.
- 이메일 앞뒤 공백을 제거하고 소문자로 정규화한다. 닉네임은 앞뒤 공백을 제거한다.
- 회원가입 성공 시 JWT를 `accessToken`이라는 HttpOnly 쿠키로 설정한다.
- 쿠키 만료는 하루로 설정하고 `SameSite=Lax`를 적용한다. `Secure`는 production 환경에서 활성화한다.
- 프론트엔드 요청은 credentials를 포함하고, Express CORS에서도 credentials를 허용한다.
- 입력 오류는 `400`, 이메일 중복은 `409`, 예기치 않은 서버 오류는 `500`으로 응답한다.
- 참여 신청 데이터는 기존 구현대로 Repository의 메모리 저장소를 사용한다. PostgreSQL 연결은 이번 단계에서 사용자 계정에 적용했다.

## 4. 적용 결과
- Repository는 사용자 행을 저장하고 공개 필드만 반환한다.
- API 응답에는 `password_hash`를 포함하지 않는다.
- JWT는 JSON 응답 본문에 넣지 않고 HttpOnly 쿠키로 설정한다.
- 회원가입 성공, 중복 이메일, 잘못된 이메일 요청에서 각각 `201`, `409`, `400` 응답을 확인했다.

## 5. 배운 점
- 비밀번호 해시는 저장소에 전달하기 전에 서비스 계층에서 생성한다.
- 사용자 입력 검증과 DB 제약조건은 함께 사용해야 중복 및 잘못된 데이터 저장을 방지할 수 있다.
- JWT 쿠키 사용에는 프론트엔드 credentials 옵션과 서버 CORS credentials 설정이 함께 필요하다.
- 계정 저장을 PostgreSQL에 연결해도 다른 기능의 데이터 저장 구조가 자동으로 바뀌지는 않는다.

## 6. 관련 자료
- 관련 코드:
  - `server/src/config/database.ts`
  - `server/src/types/auth.types.ts`
  - `server/src/respositories/auth.repository.ts`
  - `server/src/services/auth.service.ts`
  - `server/src/controllers/auth.controller.ts`
  - `server/src/routes/auth.routes.ts`
  - `server/src/middlewares/error.middleware.ts`
  - `server/src/index.ts`
  - `src/pages/SignupPage.tsx`
- 테스트 캡처:
  - `docs/images/auth/` 아래 회원가입 성공, 중복 이메일, 입력 오류, 쿠키, DB 해시 확인 캡처
- 환경 변수:
  - `DATABASE_URL`
  - `JWT_SECRET`
  - 실제 환경 변수 값은 저장소에 기록하지 않는다.