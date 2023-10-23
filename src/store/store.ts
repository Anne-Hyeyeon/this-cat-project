import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';

type PosterType = 'simplePosterColors' | 'emphasizedPosterColors';

interface PosterColors {
  bgColor: string;
  headerColor: string;
  firstLineColor: string;
  secondLineColor: string;
}

export interface emphasizedPosterColors extends PosterColors {
  accentColor: string;
}

export interface State {
  step: number;
  photoUrl: string;
  petType: string;
  petName: string;
  posterType: 'emphasized' | 'simple';
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
  posterType: 'emphasized',
  fileRef: '',
  colors: {
    emphasizedPosterColors: {
      bgColor: 'white',
      headerColor: '#e5d45e',
      firstLineColor: '#1a1a1a',
      secondLineColor: '#1a1a1a',
      accentColor: '#c63f3b',
    },
    simplePosterColors: {
      bgColor: 'white',
      headerColor: '#1a1a1a',
      firstLineColor: '#e5d45e',
      secondLineColor: '#1a1a1a',
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
    setBgColor: (
      state,
      action: PayloadAction<{ type: PosterType; color: string }>,
    ) => {
      state.colors[action.payload.type].bgColor = action.payload.color;
    },
    setHeaderColor: (
      state,
      action: PayloadAction<{ type: PosterType; color: string }>,
    ) => {
      state.colors[action.payload.type].headerColor = action.payload.color;
    },
    setFirstLineColor: (
      state,
      action: PayloadAction<{ type: PosterType; color: string }>,
    ) => {
      state.colors[action.payload.type].firstLineColor = action.payload.color;
    },
    setSecondLineColor: (
      state,
      action: PayloadAction<{ type: PosterType; color: string }>,
    ) => {
      state.colors[action.payload.type].secondLineColor = action.payload.color;
    },
    setAccentColor: (state, action) => {
      state.colors.emphasizedPosterColors.accentColor = action.payload;
    },
    init: (state) => {
      state.step = initialState.step;
      state.photoUrl = initialState.photoUrl;
      state.petType = initialState.petType;
      state.petName = initialState.petName;
      state.fileRef = initialState.fileRef;
      state.posterType = initialState.posterType;
      state.colors = initialState.colors;
    },
    initColor: (state) => {
      state.colors = initialState.colors;
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
  setAccentColor,
  setBgColor,
  setFirstLineColor,
  setSecondLineColor,
  setHeaderColor,
  init,
  initColor,
} = postSlice.actions;

const store = configureStore({
  reducer: postSlice.reducer,
});

export default store;
