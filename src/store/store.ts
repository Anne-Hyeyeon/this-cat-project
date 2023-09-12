import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';

type PosterType = 'simplePosterColors' | 'emphasizedPosterColors';

interface PosterColors {
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
      headerColor: '#e5d45e',
      firstLineColor: '#1a1a1a',
      secondLineColor: '#1a1a1a',
      accentColor: '#c63f3b',
    },
    simplePosterColors: {
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
    setAccentColor: (state, action) => {
      state.colors.emphasizedPosterColors.accentColor = action.payload;
    },
    setHeaderColor: (
      state,
      action: PayloadAction<{ type: PosterType; color: string }>,
    ) => {
      console.log(action.payload.type);
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
