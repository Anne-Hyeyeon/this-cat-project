# This-Cat (이 고양이를 보신 적 있습니까) Project

## 준비

### Typescript Setting

```js
npx create-react-app my-app --template typescript
```

### esLint, prettier Setting

1. esLint, Prettier 설치
2. VS Code Settings 변경 : JavaScript Formant, Format on Save
3. ESlint, Prettier 관련 패키지 설치
   (1) eslint-config-airbnb 패키지 설치

```js
- eslint
- eslint-plugin-import
- eslint-plugin-jsx-a11y
- eslint-plugin-react
- eslint-plugin-react-hooks

// 명령어 : npx install-peerdeps --dev eslint-config-airbnb
```

4. 규칙 설정하기
   (1) ESlint 관련 규칙 설정 : .eslintrc 파일 추가 또는 package.json 의 eslintConfig에 설정

```js
 // ... package.json

  "eslintConfig": {
    "extends": [
      "airbnb",
      "plugin:prettier/recommended"
    ],
    "rules": {
      "object-curly-newline": 0,
      // import 3개 이상 할 시 줄바꿈 해야하는 규칙을 무시할 수 있음.
    },
    "env": {
      "browser": true
      // 브라우저 내장 객체를 조회할 때도 오류 없이 작업하게 해줌.
    },
  },
```

(2) Prettier 관련 규칙 설정 : .prettierrc 파일에 설정

```js
{
  "singleQuote": true, // "" 또는 ''
  "semi": true, // Print semicolons at the ends of statements.
  "useTabs": false, // .editorconfig 파일로 tab 들여쓰기 여부 결정
  "tabWidth": 2, // Tab 간격 설정
  "trailingComma": "all", //  배열, 오브젝트 프로퍼티 등 콤마를 이용한 항목의 나열에서 마지막 항목에도 콤마를 붙임.
  "printWidth": 80 // 줄 바꿈 폭
}
```
