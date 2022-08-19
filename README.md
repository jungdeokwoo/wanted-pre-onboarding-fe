# 프리온보딩 프론트엔드코스 사전과제

## 정덕우 (Frontend 개발자)

### todo 어플리케이션 개발

- react를 활용한 프로젝트 개발
- 로그인, 회원가입 및 todo리스트 생성,삭제,수정 구현
- typeScript, styledcomponent, React Router 활용
- npm start로 프로젝트 시작


1. Auth 관련 (로그인, 회원가입페이지)

[](https://user-images.githubusercontent.com/97271725/185526637-2bdd7aa7-a057-482e-882c-391326b9e28b.mov)

로그인과 회원가입은 email, password 를 활용하여 진행, 동일한 레이아웃으로 버튼의 작동방식만 다르게 구현하였습니다.

회원가입에서 email의 경우 @,'.'이 포함되지 않거나 password가 8자 미만일때 회원가입 버튼을 비활성화 하였습니다.

회원가입시 동일한 이메일이 존재하는 경우 화면 우측상단에 중복된 이메일 알람을 띄워주었습니다.

회원가입이 성공한 경우에 발급된 jwt토큰을 localstorage에 저장하고 todo 페이지로 바로 이동하도록 하였습니다.

[](https://user-images.githubusercontent.com/97271725/185528246-41b8e4c5-a536-493c-8fef-2d53ce56cc68.mov)

로그인 시도시 존재하지 않는 이메일인경우 또는 비밀번호가 틀린경우에는 오른쪽 상단에 알람창을 띄우고

로그인을 성공한 경우에는 회원가입과 마찬가지로 localstorage에 토큰을 저장 후 todo 페이지로 이동시켰습니다.

[](https://user-images.githubusercontent.com/97271725/185529240-a28a5914-7161-474c-81de-c3763f9adb94.mov)

로그인을 하지 않은 경우 todo페이지로 이동했을때 로그인 페이지로 리다이렉팅 되도록 하고,

로그인 후에는 todo페이지에서 로그인페이지로 이동 시도할 경우 todo 페이지로 리다이렉팅 되도록 구현하였습니다.
