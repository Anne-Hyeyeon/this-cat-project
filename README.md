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

### Firebase 연동

1. npm i firebase
2. env에 key 저장, initialize firebase
3. storage import

## Trouble Shooting

### Error: "prettier/react" has been merged into "prettier" in eslint-config-prettier 8.0.0

- 해결 : .eslintrc.json 에서 extends의 "prettier/@typescript-eslint" 삭제
