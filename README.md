# This-Cat (이 고양이를 보신 적 있나요) Project

## 준비 - 개발 환경 세팅

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

### 카카오톡 공유하기

#### 초기 세팅

1. JavaScript SDK 파일을 웹 페이지에 포함시킴. (index.html에 script로 삽입)
2. Kakao.init('키값')으로 초기화 후 확인

#### 카카오톡 공유 기능

- JavaScript SDK의 `Kakao.Share` 모듈 사용

## 각 페이지 별 작동 방식 구상

### Photo

- 파일 업로드
- 파일 업로드시 랜덤 파일명으로 자동 설정

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

- 원하는 문구 입력하기
- 미리보기
- selectBox와 input 생성 후 store의 state값과 연결.
- 자동 조사 생성기 (주어/목적어의 받침에 따라 이/가, 을/를 자동으로 선택)

### Design

- 강조형, 심플형 포스터 중 하나 선택

### Detail

- 미리보기
- 포스터 내 글자, 배경 색깔 변경

### Result

- '쿠팡 방문하고 결과 보기'를 통해 수익화
- Html to Image 컴포넌트 이용해 Poster 컴포넌트를 이미지로 다운로드.
- 카카오톡 공유하기

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

#### Poster component의 사이즈를 width값을 이용해 자유자재로 조절하고자 한다. 예를 들면, 고정된 height 대신 width 에 따른 상대 값을 사용하는 것이다. height 값을 width의 1:414배로 해 두면 width값이 달라져도, 컴포넌트는 A4 사이즈 비율을 유지한다.

하지만, 폰트 사이즈는 어떻게 맞출 것인가?

- 개발진스처럼 사용자가 자유롭게 요소와 폰트를 변경하는...뭐 그런 거 없을까... \*

* https://devjeans.dev-hee.com/

### 자식 요소가 부모 요소보다 커서 잘리는 오류 대처 방법

#### Resize Event Listener

- before : 컴포넌트가 처음 마운트 될 때만 `setScreenSize` 호출함.
- after : 사용자가 브라우저 크기를 조절하거나, 모바일 기기에서 화면을 회전할 경우에도 `--vh` 값 업데이트
- how : resize 이벤트 리스너

#### 전체 스케일 조절

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

### index.html에서 환경 변수 사용하기(env)

- 일반적으로 순수 HTML 에서는 `process.env`를 사용할 수 없다.
- <%= %> 등의 방법을 사용하려고 했으나 내 프로젝트에는 먹히지 않는다. (원인 파악 필요)

### window.Kakao 인식 불가

- SDK이 정상적으로 추가되면, window.Kakao 접근이 가능하다.
- 그러나 내 프로젝트에서는 접근이 불가능하다. (원인 파악 필요)

## 개발 노트

### 한 파일에서 여러 개의 컴포넌트 export하기

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

### 'Poster'컴포넌트에서 사용되는 initialWidth를 별도의 모듈 파일로 분리하여 사용하는 것은 좋은 접근일까?

- Poster.tsx, ScaleWrapper.tsx에서 공통으로 사용되는 initialWidth
- 해당 값을 관리하는 파일을 별도로 만들어야 하는지.

#### pros

1. `재사용성``: 해당 상수가 여러 컴포넌트나 함수에서 사용되어야 하는 경우, 한 곳에서 정의하고 여러 곳에서 임포트하여 사용하면 중복 코드를 줄일 수 있다.

2. `관리 용이성``: 상수가 한 곳에 모여있으면, 나중에 값이 변경되어야 할 때 한 파일 내에서만 수정하면 되므로 유지 보수가 용이하다.

3. `가독성`: 각 컴포넌트나 함수 파일이 주요 로직에만 집중할 수 있게 되고, 상수와 같은 설정 값들이 별도의 파일에 있으므로 코드의 가독성이 향상됨.

#### cons

- 오버엔지니어링: 만약 initialWidth와 같은 상수가 특정 컴포넌트에서만 사용되고, 재사용될 가능성이 없다면 별도의 파일로 분리하는 것은 오버엔지니어링이 될 수 있음.

- 디렉토리 구조: 상수를 별도 파일로 관리할 때, 프로젝트의 디렉토리 구조를 잘 관리하지 않으면 여러 상수 파일들이 프로젝트 전체에 흩어져 코드 베이스가 혼란스러울 수 있다.

### 페이지 설명을 나타내는 TitleTypography와 본문 내용을 설명하는 BodyTypoGraphy 공통 컴포넌트로 분리

- 재사용성 업!

### Hook은 무조건 컴포넌트 안에!

#### 오류 내용

```
react.development.js:209 Warning: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
```

1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app

#### 원인

Poster 컴포넌트에서 컴포넌트 내부가 아닌 바깥에 useSelector를 사용했음. hook은 컴포넌트 내부에서! !

### 삽질 기록: react-color 가 hex값도 제공했네~!!

#### 생각의 흐름

1. color-picker를 이용해서 Poster의 배경색, 강조색을 사용자가 직접 정할 수 있게 만들어보자!
2. react-color 라이브러리 설치
3. react-color 에서는 color값을 rgba로 제공하겠지?
4. store에 강조포스터, 심플포스터의 컬러값을 rgba로 만들어놓음...

```ts
import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';

type PosterType = 'simplePosterColors' | 'emphasizedPosterColors';

interface PosterColors {
  headerColor: RgbaColor;
  firstLineColor: RgbaColor;
  secondLineColor: RgbaColor;
}

export interface emphasizedPosterColors extends PosterColors {
  accentColor: RgbaColor;
}

export interface RgbaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface State {
  step: number;
  photoUrl: string;
  petType: string;
  petName: string;
  posterType: string;
  fileRef: any;
  colors: {
    emphasizedPosterColors: emphasizedPosterColors;
    simplePosterColors: PosterColors;
  };
}
export const initialState: State = {
  step: 0,
  photoUrl: '',
  petType: '고양이',
  petName: '저희집 별이',
  posterType: '',
  fileRef: '',
  colors: {
    emphasizedPosterColors: {
      headerColor: {
        r: 229,
        g: 212,
        b: 94,
        a: 1,
      },
      firstLineColor: {
        r: 26,
        g: 26,
        b: 26,
        a: 1,
      },
      secondLineColor: {
        r: 26,
        g: 26,
        b: 26,
        a: 1,
      },
      accentColor: {
        r: 198,
        g: 63,
        b: 59,
        a: 1,
      },
    },
    simplePosterColors: {
      headerColor: {
        r: 1,
        g: 1,
        b: 1,
        a: 1,
      },
      firstLineColor: {
        r: 1,
        g: 1,
        b: 1,
        a: 1,
      },
      secondLineColor: {
        r: 1,
        g: 1,
        b: 1,
        a: 1,
      },
    },
  },
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setPhotoUrl: (state, action) => {
      state.photoUrl = action.payload;
    },
    setPetType: (state, action) => {
      state.petType = action.payload;
    },
    setPetName: (state, action) => {
      state.petName = action.payload;
    },
    setFileRef: (state, action) => {
      state.fileRef = action.payload;
    },
    setPosterType: (state, action) => {
      state.posterType = action.payload;
    },
    setAccentColor: (state, action) => {
      state.colors.emphasizedPosterColors.accentColor = action.payload;
    },
    setHeaderColor: (
      state,
      action: PayloadAction<{ type: PosterType; color: RgbaColor }>,
    ) => {
      state.colors[action.payload.type].headerColor = action.payload.color;
    },
    setFirstLineColor: (
      state,
      action: PayloadAction<{ type: PosterType; color: RgbaColor }>,
    ) => {
      state.colors[action.payload.type].firstLineColor = action.payload.color;
    },
    setSecondLineColor: (
      state,
      action: PayloadAction<{ type: PosterType; color: RgbaColor }>,
    ) => {
      state.colors[action.payload.type].secondLineColor = action.payload.color;
    },

    init: (state) => {
      state.step = initialState.step;
      state.photoUrl = initialState.photoUrl;
      state.petType = initialState.petType;
      state.petName = initialState.petName;
      state.fileRef = initialState.fileRef;
      state.posterType = initialState.posterType;
    },
  },
});

export const {
  setStep,
  setPhotoUrl,
  setPetType,
  setPetName,
  setFileRef,
  setPosterType,
  init,
  setAccentColor,
  setFirstLineColor,
  setSecondLineColor,
  setHeaderColor,
} = postSlice.actions;

const store = configureStore({
  reducer: postSlice.reducer,
});

export default store;
```

5. 하지만..!!!!!!!!
6. 알고 보니 컬러 피커는 rgba값은 물론 hex값을 제공하고 있었다.... 객체로. 콘솔로그로 피커의 컬러값을 찍어본 결과

```
{hsl: {…}, hex: '#5e201e', rgb: {…}, hsv: {…}, oldHue: 1.7266187050359711, …}
hex: "#5e201e"
hsl:
{h: 1.726618705035969, s: 0.5122873345935727, l: 0.244398, a: 1}
hsv:
{h: 1.726618705035969, s: 0.6774999999999999, v: 0.3696, a: 1}
oldHue:1.7266187050359711
rgb:
{r: 94, g: 32, b: 30, a: 1}
source: "hsv"
```

나는 진실을 알게 되고 말았지... 7. 모든 걸 hex로 되돌리는 작업 실시!

#### 교훈 : 삽질하기 전에 꼼꼼히 사전조사하기...

### Detail 컴포넌트 -> 분리냐, 통합이냐

1. Detail 컴포넌트에서는 SimplePoster, EmphasizedPoster의 Detail 설정을 담당하고 있다.
2. poster별로 컨트롤해야 할 색상의 수는 각 4개(accent color, header color, first line color, second line color), 3개(accent color 제외한 나머지 색상). 해당 컴포넌트에다가 7개의 색상을 컨트롤하는 로직을 짜야 함.
3. SimplePoster의 색상만을 컨트롤하는 SimpleDetail과, EmphasizedPoster의 색상을 컨토를하는 EmphasizedDetail로 나눠서 컴포넌트 분리하기로 결정함.
4. 컴포넌트 분리 시 생각해야 할 것.

- 재사용성 :
- 복잡도 : 너무 많은 기능을 하고 있는 건 아닌지? -> 7개의 색상 컨트롤이라는 기능은 복잡도를 키움. 분리하는 게 맞음.
- 유지보수
- 코드 가독성 : 조건문과 리듀서 때문에 코드가 꼬일 가능성이 큼

#### 나의 결론

- 관리해야 하는 페이지는 EmphasizedDetail, SimpleDetail 총 두 개다. 굳이 한 페이지로 통합할 필요가 없다고 판단함.
- 두 개로 나누어서 분리하는 게 복잡도를 낮추고 코드 가독성을 높일 수 있다는 결론을 내림.
- 포스터의 종류가 더 늘어날 가능성이 적고, 늘어난다고 해도 5개 미만이 될 것으로 예상함. 재사용성보다는 복잡도, 유지보수, 코드 가독성의 이점이 있기 때문에 컴포넌트 분리.

### 상단 네비바와 하단의 메인 컨텐츠가 겹치지 않게 하는 방법

1. 메인 컨텐츠에 네비바 높이만큼 패딩을 준다.

2. z-index를 조절한다.

3. Grid, Flexbox를 사용한다.

- 여기서 나는 1번의 방법이 가장 간단하고 보기 좋다고 생각한다. 아주 간단하고 오류 없이 잘 작동하기 때문이다. 메인 컨텐츠에 네이바 높이만큼의 패딩이 적용되었다는 사실을 코드를 통해 명시하면 될 듯하다. 유지보수 시 다른 개발자가 해당 패딩값의 의미를 알게 하는 장치가 필요...?

### 폴더명의 대문자, 소문자 때문에 생긴 오류

#### 작업을 하다가 문득 내가 만든 폴더들이 모두 소문자로 시작한다는 사실을 알게 되었다 😱😱😱 이럴 수가

- 내가 한 행동 : 열심히 폴더명의 앞글자를 대문자로 바꿈. 그런데...
- import 오류는 물론이고, 커밋을 할 때 같은 파일임에도 불구하고 두 개의 변경사항이 뜨는 것을 발견했다.
- 하나는 기존 폴더명 (소문자 시작)에 있는 파일, 다른 한 개는 바뀐 폴더명 (대문자 시작)에 있는 파일.
- 파일 하나의 변경 내역을 지우니, 다른 하나도 없어져버린다. 이런 일이 왜 일어날까?

```
// 오류 내용
fatal: will not add file alias 'src/common/components/Poster/EmphasizedPoster.tsx' ('src/common/components/poster/EmphasizedPoster.tsx' already exists in index)
```

#### 원인 분석

- 이 오류 메시지는 git에서 발생하며, 주로 대소문자 구분이 다른 두 파일이나 디렉토리를 동일한 git 인덱스에 추가하려고 할 때 나타남.
- 이는 특히 파일 시스템이 대소문자를 구분하지 않는 환경 (예: Windows, 일부 macOS 파일 시스템)에서 자주 발생함.

#### 해결 방법

1. 기존 파일 제거 후 커밋
2. git 설정 변경:
   git의 core.ignoreCase 설정을 false로 변경하여 git에게 대소문자를 구분하도록 지시함. (미래 비슷한 오류 방지)
   `git config core.ignoreCase false`

- 프로젝트를 삭제하고 저장소에서 한번 더 클론한 후, git 설정을 변경해 주었다.

#### 느낀 점

- 프로젝트 진행 때는 작은 선택일지라도 신중해야 한다. 조그마한 변동사항일지라도 어떤 부작용이 생길지 모른다.

### 자바스크립트에서 화면 크기를 확인한 후 적절한 값을 return 시키기

```ts
const test = () => {
  const width = window.innerWidth;

  if (width >= 1024) {
    // PC 사이즈
    return 100;
  } else if (width >= 768 && width < 1024) {
    // 태블릿 사이즈
    return 50;
  } else {
    // 모바일 사이즈
    return 30;
  }
};
```

- window.innterWidth 를 이용하면 화면의 크기를 확인할 수 있다.
- 이에 따라 반응형으로 요소 크기를 조절하는 게 가능해진다.

#### 고려해야 할 점

- 브라우저 크기가 변경될 때마다 함수를 호출하고, 컴포넌트의 상태를 업데이트 하기 위해서는 **리사이즈 이벤트 리스너 설정** 등 추가 로직이 필요하다.

### 호이스팅을 시킬 것인가, 그러지 말아야 하는가 (함수의 반환 값을 useState의 초기값으로 쓰고 싶을 때)

#### 호이스팅이란?

- 자바스크립트의 작동 방식 중 하나다. 함수 선언, 변수 선언을 스코프의 최상단으로 끌어올리는 것. 그러나 **화살표 함수**에서는 적용되지 않는다.

#### 상황

- useState 훅으로 posterWidth라는 값을 관리하기로 했다.
- posterWidth가 스크린의 크기에 따라 변하도록 만드는 함수가 존재한다.
- posterWidth의 초기값을 이 함수의 return 값으로 정하고자 한다.
- 그리하여, 이 페이지에 접속했을 때 스크린 사이즈에 맞는 posterSize가 선택되게끔 하고 싶다.

#### 오류

```ts
const [posterWidth, setPosterWidth] = useState(getPosterWidth(60, 50));

const getPosterWidth = () => {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 600) {
    // sm 이상
    return 50;
  } else {
    // xs
    return 60;
  }
};
```

- getPosterWidth는 화살표 함수. 호이스팅이 안 되는 형식이다.
- 화살표 함수는 자바스크립트 실행 시 함수가 차례대로 실행된다는 걸 보장한다.

#### 방법 1.

- getPosterWidth를 화살표 함수가 아닌, function으로 변경

```ts
const [posterWidth, setPosterWidth] = useState(getPosterWidth(60, 50));

function getPosterWidth() {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 600) {
    // sm 이상
    return 50;
  } else {
    // xs
    return 60;
  }
}
```

- 이 경우 function으로 선언된 getPosterWidth() 함수는 호이스팅이 일어나 순서와 상관 없이 전역에서 사용이 가능해진다.

##### 예상되는 문제

1. **함수 정의 순서에 대한 혼란**: getPosterWidth 함수가 Text 컴포넌트의 상단에 실제로 정의되어 있지 않지만, 컴포넌트 내 어디서든 호출할 수 있다. 이는 코드의 가독성을 저해할 수 있으며, 특히 크고 복잡한 컴포넌트에서는 함수의 위치를 찾기 어렵게 만들 수 있다. (유지보수 측면에서 x)

2. **코드의 구조와 명확성**: 일반적으로 컴포넌트의 로직은 **가능한 한** 선언된 순서대로 실행되는 것이 좋다. function으로 선언된 함수는 호이스팅으로 인해 이러한 순서가 깨질 수 있다.

#### 방법 2.

- const [posterWidth, setPosterWidth] = useState(getPosterWidth()); 를 getPosterWidth 함수보다 아래에 선언

```ts
const getPosterWidth = () => {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 600) {
    // sm 이상
    return 50;
  } else {
    // xs
    return 60;
  }
};
const [posterWidth, setPosterWidth] = useState(getPosterWidth());
```

##### 예상되는 문제

- Hook 관련 관행 어기게 됨.
- React Hook은 조건문, 반복문, 중첩된 함수 내부에서 호출될 수 없다. 최상위 레벨에서만 호출되어야 한다.
- 따라서 useState 등의 hook은 함수의 상단에 위치시키는 것이 일반적인 관행이다.
  (함수가 최상위 레벨에 있다는 사실을 명시적으로 나타냄.)
- 리액트 컴포넌트에서는 상태 관리 훅(hooks)을 컴포넌트의 최상단에 배치하여, 컴포넌트의 상태와 관련된 로직이 쉽게 식별될 수 있도록 한다.
- 위 방법을 따를 경우, 이 관행을 어기게 됨.
- 이러한 문제를 방지하기 위해, 가능하면 컴포넌트의 상단에 상태 관리 훅을 위치시키고, 필요한 함수는 훅 위에 또는 별도의 헬퍼 파일로 분리하는 것이 좋음. 이렇게 하면 컴포넌트의 구조가 더 명확해지고, 유지 보수가 용이해짐.

#### 비교

- 어떤 방법을 선택할 지는 개발 환경, 상황에 따라 달라진다.

1. 방법 1 (Function 사용)

- 이 방법은 getPosterWidth 함수를 일반 function으로 정의하여 호이스팅을 활용하는 방식이다. 이 경우, 함수는 컴포넌트 어디에서나 접근할 수 있으므로 useState의 초기값으로 바로 사용할 수 있다.
- 그러나 이는 함수의 선언 위치와 상관없이 함수를 호출할 수 있다는 점에서 **코드의 가독성과 구조적 명확성**을 해칠 수 있다.
- 크고 복잡한 컴포넌트에서는 함수의 위치를 추적하기 어려워질 수 있다.

2. 방법 2 (함수 선언 후 useState 사용)

- 이 방법은 useState를 함수 선언 바로 아래에 배치하는 것이다.
- 이는 리액트의 훅 사용 규칙을 따르며, 함수의 호출 순서와 관련된 혼란을 최소화할 수 있다.
- 그러나 이 방식은 훅의 선언 위치가 컴포넌트의 최상단이 아니라는 점에서 일반적인 리액트 패턴을 벗어난다.

#### 결론

- 방법 1을 선택하기로 했다.
- 호이스팅은 자바스크립트의 특징 중 하나이며, 사용한다고 해서 반드시 나쁜 게 아니다.
- 또한, 이 방식은 리액트 컴포넌트의 일반적인 구조를 따르므로 다른 개발자들이 코드를 이해하고 유지보수하는 데에도 도움이 된다고 판단함. (이건 개인 프로젝트지만)
- 가장 중요한 것은 코드의 명확성, 유지보수의 용이성, 그리고 팀 내의 코딩 관행을 고려하는 것이다.

### 관련 없는 파일까지 한 commit에 담아 푸쉬해 버렸을 때 (실수)

#### 상황 : 금번 작업으로 변경된 사항은 총 8개. 그 중 MainFooter.tsx은 `Chore: Footer 정보 변경`이라는 커밋명으로 커밋할 예정이었다. 그러나 실수로 다른 7개의 파일을 함께 커밋해 버림.

#### 해결책 : `soft reset`을 사용함.

#### 방법

1. 다음과 같은 명령어 입력함.

```
git reset --soft 커밋 해시
```

2. 커밋 내역을 수정함.
3. git push --force를 사용하여 원격 저장소에 강제로 푸시한다.

#### `soft reset`이란?

- 여기서 커밋 해시는 되돌리고 싶은 지점의 커밋 해시다. 이 커밋 바로 이전 상태로 HEAD가 이동한다.
- 이 작업은, 최근 커밋을 수정하고 싶지만 작업 내용은 그대로 유지하고 싶을 때 사용한다.
- 예를 들어, **커밋 메시지를 잘못 작성했거나 커밋에 파일을 빠트린 경우**
- 또는, 여러 커밋을 하나로 합치고 싶을 때 커밋을 되돌린 후 단일 커밋으로 합칠 수 있다.

#### 주의사항

- soft reset은 로컬 저장소에만 영향을 미치며, 원격 저장소의 커밋 히스토리에는 영향을 주지 않습니다. 원격 저장소에 이미 푸시된 커밋을 soft reset으로 되돌린 경우, 이후에 git push --force를 사용하여 원격 저장소에 강제로 푸시해야 할 수도 있다.

### firebase storage 관리하기

#### 상황

- 사용자가 페이지를 나갈 때, firebase storage에 업로드한 이미지를 지우고 싶다.
- This Cat은, 사용자가 업로드한 이미지를 파이어베이스에 저장했다가 사용한다. 용량과 프라이버시 문제를 위해 이미지 삭제는 필수다.

#### 시도 1.

- UI에 올린 파일을 직접 지울 수 있는 버튼을 만듦.
- 문제 : 해당 버튼을 노출하는 것만으로도 '내 파일이 동의 없이 저장되고 있다'는 이미지를 주기에 충분함. 사용자 경험으로 보았을 때, 사용자들은 실제로 해당 버튼을 누르지 않을 가능성이 큼.

#### 시도 2.

- useEffect의 청소 함수를 이용하여 (return) 사용자가 페이지를 벗어날 때마다, file reference를 찾아 지우는 함수를 구현함.
- 문제 : 이 청소 함수가 실행되기 전에 사용자는 페이지를 이탈함.
- 해당 기능은 같은 웹 페이지를 이용한다고 가정할 때, 페이지에서 페이지로 넘어가면서 실행되어야 하는 함수가 있을 때 사용할 수 있음.

#### 시도 3.

- 스케줄링을 이용해 주기적으로 firebase의 storage를 청소해 준다.
- Firebase Cloud Function 사용할 수 있으나, 유료 서비스임.
- vercel 을 이용해볼 예정.
