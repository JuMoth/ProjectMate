# 문제 해결 기록

## 개발 기록 1. 프로젝트 참여 신청 상태 유지 및 API 404 오류 해결

## 1. 문제 상황
- 프로젝트 참여 신청 기능 구현 후 새로고침하면 신청 완료 상태가 유지되지 않는 문제가 발생했다.
- 신청한 프로젝트 상세 페이지에 다시 접속하면 참여 신청 버튼이 원래 상태로 돌아왔다.
- Network 탭에서 신청 내역 조회 API가 404 Not Found를 반환하는 현상을 확인했다.

## 2. 원인 분석
- 프론트엔드에서 신청 내역을 조회하는 API 경로가 백엔드 라우터에 정상적으로 등록되지 않았다.
- `server/src/routes/application.routes.ts`에서 라우트 경로를 다음과 같이 잘못 작성했다.

```ts
router.get("./:id/applications/me", getMyApplicationController);
router.post("./:id/applications", createApplicationController);
```

- Express Router 경로에 불필요한 `./`가 포함되어 실제 요청 경로와 일치하지 않았다.
- 이로 인해 신청 내역 조회 API가 정상적으로 실행되지 않았고, 프론트엔드에서 신청 상태를 복원할 수 없었다.

## 3. 해결 방법
- 어떤 방법을 시도했는가?
  - 브라우저 개발자 도구의 Network 탭에서 API 요청 URL과 HTTP 상태 코드를 확인했다.
  - 백엔드의 `index.ts`와 `application.routes.ts`를 확인하여 라우트 등록 상태를 점검했다.
  - 프론트엔드의 API 요청 경로와 백엔드 라우트 경로를 비교했다.

- 최종적으로 어떤 방법을 선택했는가?
  - `application.routes.ts`의 경로에서 `./`를 제거했다.

```ts
router.get("/:id/applications/me", getMyApplicationController);
router.post("/:id/applications", createApplicationController);
```

  - 수정 후 Express Router가 정상적으로 요청을 처리하도록 변경했다.
  - 프론트엔드에서 페이지 진입 시 신청 내역 조회 API를 호출하여 기존 신청 여부를 확인하도록 했다.

## 4. 개선 결과
- 해결 전:
  - 신청 내역 조회 API에서 404 Not Found 발생
  - 새로고침 후 신청 완료 상태를 정상적으로 복원하지 못함

- 해결 후:
  - 신청 내역 조회 API 정상 응답
  - 참여 신청 후 새로고침해도 신청 완료 상태 유지
  - 이미 신청한 프로젝트에 대한 중복 신청 차단
  - 신청 완료 상태에서 버튼 비활성화 확인

- 확인 방법:
  - Chrome 개발자 도구 Network 탭에서 API 요청 확인
  - `GET /api/projects/1/applications/me` 응답 확인
  - `POST /api/projects/1/applications` 응답 확인
  - 새로고침 후 신청 완료 상태 유지 확인
  - 중복 신청 시도 후 신청이 차단되는지 확인
  - 프론트엔드와 백엔드 빌드 테스트

## 5. 배운 점
- API 요청에서 404 오류가 발생하면 프론트엔드 코드뿐만 아니라 백엔드 라우트 등록 상태도 확인해야 한다는 점을 배웠다.
- Express Router에서 요청 경로를 정확하게 작성하는 것이 중요하다는 점을 이해했다.
- Network 탭을 활용하면 요청 URL, HTTP 메서드, 상태 코드, 응답 데이터를 확인하여 문제 발생 지점을 좁힐 수 있다는 점을 알게 되었다.
- 새로고침 후에도 유지되어야 하는 상태는 프론트엔드의 임시 상태만으로 구현하는 것이 아니라 서버에서 데이터를 다시 조회해야 한다는 점을 배웠다.

## 6. 관련 자료
- GitHub PR: 프로젝트 참여 신청 기능 PR
- 관련 코드:
  - server/src/routes/application.routes.ts
  - server/src/services/application.service.ts
  - src/services/application.service.ts
  - src/pages/ProjectDetailPage.tsx
- 측정 결과 및 스크린샷:
  - docs/images/project-application/application-success.png
  - docs/images/project-application/application-completed.png