# This-Cat (이 고양이를 보신 적 있습니까) Project

## 준비

### Creating Project & Typescript Setting

```js
npx create-react-app my-app --template typescript
```

### esLint, prettier Setting

https://seonghui.github.io/blog/2020/12/27/typescript-eslint-prettier/

### scss 컴파일러 설치

```js
C:\Users\SSR\Desktop\hykim\study\this-cat>npx sass --watch css/style.scss css/style.css
```

### 폴더 구조 구상

- https://velog.io/@_seeul/React-리액트로-프로젝트를-진행할때-어떻게-폴더-구조를-잡는것이-좋을까
- src 하위 폴더에 assets, components, pages 폴더 생성

### 리액트 라우터 설치

- Main, Photo, Text, Result를 라우터로

### Firebase 연동

1. npm i firebase
2. env에 key 저장, initialize firebase
3. storage import

### Photo

- 파일 업로드시 랜덤 파일명으로

```js
const fileRef = ref(
  storage,
  `photos/${
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  }`,
);
```

### Text

- selectBox와 input 생성 후 store의 state값과 연결.
- 자동 조사 생성기 (주어/목적어의 받침에 따라 이/가, 을/를 자동으로 선택)

### Result

- Html to Image 컴포넌트 이용해 Poster 컴포넌트를 이미지로 다운로드.

## Liberaies

### Redux, Redux-toolkit

```js
npm install react-redux
npm install @reduxjs/toolkit
```

- 이미지 주소, 입력값을 전역으로 관리하기 위해

### Styled-components

```js
yarn add styled-components
npm i -D @types/styled-components
```

- Poster 컴포넌트 구성하는 데 사용

### Html-to-Image

```js
npm install --save html-to-image

```

- Poster 컴포넌트를 이미지로 다운받는 데 사용

## Trouble Shooting

### Error: "prettier/react" has been merged into "prettier" in eslint-config-prettier 8.0.0

- 해결 : .eslintrc.json 에서 extends의 "prettier/@typescript-eslint" 삭제

### Error: API key not valid. Please pass a valid API key.

- 해결 : .env 파일-> = 할때 양 옆에 공백 두고 / 쉼표 없앰

### Error: User does not have permission to access 'photos/[object File]'

- 해결 :

```js
rules_version = '2';
service firebase.storage {
match /b/{bucket}/o {
match /{allPaths=**} {
allow read, write;
    }
  }
}

```

### Html to Image 컴포넌트로 이미지 다운로드시 image가 다운받아지지 않음.

`Access to fetch at 'https://firebasestorage.googleapis.com/...' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.`

- CORS 에러였다.
- CORS 에러란? Cross-Origin Resource Sharing.
- 여기서 Origin이란 Origin은 요청이 시작된 서버의 위치를 나타낸다.
- SOP, Same Origin POlicy에 따라 동일한 출처의 Origin만 리소스를 공유할 수 있다.
- Origin이 같다는 것? 같은 프로토콜, 호스트, 포트를 사용한다는 것.
- 해결? `Access-Control-Allow-Origin`
- 서버에서 Access-Control-Allow-Origin 헤더에 허용할 출처를 기재해서 클라이언트에 응답
- https://stove99.github.io/etc/2021/06/09/firebase-storage-cors-setting 파이어베이스 자체에서 CORS 해결할 수 있는 방법을 찾아 해결함.
