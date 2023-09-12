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

### localStorage, sessionStorage

- '쿠팡 보고 결과 확인하기'를 localStorage로 구현했으나, localStorage에 남아 있는 데이터를 초기화시키는 기준에 대해 고민하게 됨.
- 사용자들이 몇 번이고 '다시 하기'를 누를 걸 생각해서, 일단 한 번 쿠팡창이 열리면 브라우저를 닫을 때까지는 쿠팡을 클릭할 필요가 없도록 구현하고 싶었음.
- 내 의도에 맞게 데이터를 저장하기 위해서는 localStorage보다 sessionStorage가 데이터 저장소로 더 적합했음. (브라우저 껐다 키면 데이터 사라짐)
- localStorage를 sessionStorage로 변경.

### 이미지 사이즈 제한

- 파이어베이스 스토리지 관리를 위해서는, 이미지 파일 사이즈 제한이 필요할듯 했다.
- 하지만 파이어베이스 콘솔에서 사용할 수 있는 자체프로그램은 유료 요금제를 구독해야 이용할 수 있었다.

#### 방법 : 페이지를 벗어날 때 storage의 이미지 정보 지움

- 파이어베이스의 deleteObject 메소드를 활용하면 storage 내의 파일을 삭제할 수 있음.

1. Result.tsx 에 useEffect hook 사용, useEffect 내에 deleteObject 이용한 함수 선언
2. window이벤트 중 beforeunload 이용하면 페이지를 떠날 때 이미지가 삭제되도록 할 수 있음.

### 'embed-webfonts.ts:158 Error loading remote stylesheet DOMException: Failed to read the 'cssRules' property from 'CSSStyleSheet': Cannot access rules'

- CORS문제로 웹폰트가 걸린 HTML을 png로 다운로드 할 수 없음.

- crossorigin="anonymous" 를 link 태그에다가 추가해줌.

### useTheme() 사용할 수 없음

- 자동 임포트로 styled-component 에 있는 useTheme을 가져왔었다. 하지만 내가 사용하는 useTheme은 Mui 컴포넌트로 경로를 Mui로 해주어야 정상 작동하는 것이었다.

- import 경로를 mui로 변경하니 정상 작동함.

### import mingming from '../assets/img/mingming.png' 임포트 안 됨

- 파일이름.d.ts -> 타입스크립트 선언 파일을 src 폴더 내에 만들어준다.
- .d.ts 파일이란? 타입스크립트 선언 파일로, 타입스크립트 코드 타입 추론을 돕는 파일.
- 전역 변수로 선언한 변수를 특정 파일에서 사용하는 경우, 해당 변수를 인식하지 못한다. 이 때 변수를 인식하게 해 준다.

### progressbar color 등 속성 변경하는 법

- 디버거로 사라지려는 프로그래스바를 딱 잡아서 얘가 어디서 영향을 받는지 확인!

```js
<progress
  className="progressbar"
  style={{ backgroundColor: red }}
  value={progress}
  max="100"
/>
```

- 위와 같이 프로그래스바에 클래스네임 넣어줌

```css
.progressbar {
  width: 100%;
  height: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.progressbar::-webkit-progress-value {
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
}

.progressbar::-webkit-progress-bar {
  background-color: #f2f2f2;
  border-radius: 5px;
}

.progressbar::-moz-progress-bar {
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
}
```

- 그 후, CSS로 속성을 수정해주면 된다. 다른 브라우저와의 호환을 위해 (-moz-, -ms-, -o-) 등 사용해준다.
- style attribute는 안 먹힌다.

### A non-serializable value was detected in an action, in the path: `payload`

```js
const fileRef = ref(storage, `photos/${randomFileName}`);
```

- Redux에 store한 value가 ref 형식임.
- 여기서 fileRef를 콘솔에 찍어보면

```
Reference {_service: FirebaseStorageImpl, _location: Location}
```

- '레퍼런스'가 뜨는데 이건 **_non-serializable_**한 값임.

#### non-serializable하다는 건 어떤 의미일까?

- gpt 의 답변

```
Yes, the Reference object you posted is likely a non-serializable format in Redux. The Reference object is a Firebase Storage reference that represents a file in the storage bucket. It contains internal state and methods that are not serializable.

When you store data in the Redux store, it is important to ensure that the data is serializable, meaning it can be converted to a plain JavaScript object and back without losing any data or functionality. This is because Redux stores the state as a plain JavaScript object, and non-serializable data will cause errors when it is serialized or deserialized.
```

- 해결 방법

1. To make the Reference object serializable, you can extract the necessary information from the object and store it in a plain JavaScript object instead. For example, you can store the bucket name, file path, and other necessary metadata as separate fields in the state, and use that information to construct a new Reference object when needed.

- Reference에서 필요한 정보를 추출해서 object로 만들어 사용한다.

2. Alternatively, you can exclude the Reference object from the state altogether and store it outside of the Redux store, for example in a local variable or a separate object.

- Reference 값을 리덕스에서 사용하지 안흔ㄴ다.

- 참고로 `serializable`은 한국어로 `직렬화`로 번역할 수 있는데, 이는 데이터나 객체를 저장, 전송 또는 공유 가능한 형식으로 변환할 수 있는 속성을 의미한다.

### analytics/config-fetch-failed 오류

- .env 파일에 입력해뒀던 id 값에 문제가 있었다. 언제 바뀌었지..?

### Poster component 상대 크기

### Poster component의 사이즈를 width값을 이용해 자유자재로 조절하고자 한다. 예를 들면, 고정된 height 대신 width 에 따른 상대 값을 사용하는 것이다. height 값을 width의 1:414배로 해 두면 width값이 달라져도, 컴포넌트는 A4 사이즈 비율을 유지한다.

### 하지만, 폰트 사이즈는 어떻게 맞출 것인가?

### 개발진스처럼 사용자가 자유롭게 요소와 폰트를 변경하는...뭐 그런 거 없을까...

- https://devjeans.dev-hee.com/

### 자식 요소가 부모 요소보다 클 때

### Resize Event Listener

- before : 컴포넌트가 처음 마운트 될 때만 `setScreenSize` 호출함.
- after : 사용자가 브라우저 크기를 조절하거나, 모바일 기기에서 화면을 회전할 경우에도 `--vh` 값 업데이트
- how : resize 이벤트 리스너

### 전체 스케일 조절

- Poster.tsx에 전체 스케일을 width값만으로 동적으로 조정할 수 있게 만듦.

```ts
const ScaleWrapper = styled.div<Styles>`
  transform: ${({ width }) =>
    width ? `scale(${width / initialWidth})` : 'none'};
  transform-origin: top left;
  width: ${({ width }) => (width ? `${width}mm` : `${initialWidth}mm`)};
  height: ${({ width }) =>
    width ? `${width * 1.414}mm` : `${initialWidth * 1.414}mm`};
`;
```

## 한 파일에서 여러 개의 컴포넌트 export하기

1. 컴포넌트 정의

```tsx
const SimplePoster: React.FC<Props> = (props) => {
  // component logic here
  return (
    // JSX for SimplePoster
  );
}

const PrettyPoster: React.FC<Props> = (props) => {
  // component logic here
  return (
    // JSX for PrettyPoster
  );
}
```

2. export 하기

```tsx
export { Poster, SimplePoster, PrettyPoster };
```

3. import 하기

```tsx
import { Poster, SimplePoster, PrettyPoster } from './path';
```

## 'Poster'컴포넌트에서 사용되는 initialWidth를 별도의 모듈 파일로 분리하여 사용하는 것은 좋은 접근일까?

- Poster.tsx, ScaleWrapper.tsx에서 공통으로 사용되는 initialWidth
- 해당 값을 관리하는 파일을 별도로 만들어야 하는지.

### pros

1. `재사용성``: 해당 상수가 여러 컴포넌트나 함수에서 사용되어야 하는 경우, 한 곳에서 정의하고 여러 곳에서 임포트하여 사용하면 중복 코드를 줄일 수 있다.

2. `관리 용이성``: 상수가 한 곳에 모여있으면, 나중에 값이 변경되어야 할 때 한 파일 내에서만 수정하면 되므로 유지 보수가 용이하다.

3. `가독성`: 각 컴포넌트나 함수 파일이 주요 로직에만 집중할 수 있게 되고, 상수와 같은 설정 값들이 별도의 파일에 있으므로 코드의 가독성이 향상됨.

### cons

- 오버엔지니어링: 만약 initialWidth와 같은 상수가 특정 컴포넌트에서만 사용되고, 재사용될 가능성이 없다면 별도의 파일로 분리하는 것은 오버엔지니어링이 될 수 있음.

- 디렉토리 구조: 상수를 별도 파일로 관리할 때, 프로젝트의 디렉토리 구조를 잘 관리하지 않으면 여러 상수 파일들이 프로젝트 전체에 흩어져 코드 베이스가 혼란스러울 수 있다.

## 페이지 설명을 나타내는 TitleTypography와 본문 내용을 설명하는 BodyTypoGraphy 공통 컴포넌트로 분리

- 재사용성 업!
