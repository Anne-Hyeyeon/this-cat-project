import { configureStore, createSlice } from '@reduxjs/toolkit';

export interface State {
  step: number;
  photoUrl: string;
  petType: string;
  petName: string;
  fileRef: any;
}

export const initialState: State = {
  step: 0,
  photoUrl: '',
  petType: '고양이',
  petName: '얘',
  fileRef: '',
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state['step'] = action.payload;
    },
    setPhotoUrl: (state, action) => {
      state['photoUrl'] = action.payload;
    },
    setPetType: (state, action) => {
      state['petType'] = action.payload;
    },
    setPetName: (state, action) => {
      state['petName'] = action.payload;
    },
    setFileRef: (state, action) => {
      state['fileRef'] = action.payload;
    },
    init: (state) => {
      state['step'] = initialState['step'];
      state['photoUrl'] = initialState['photoUrl'];
      state['petType'] = initialState['petType'];
      state['petName'] = initialState['petName'];
      state['fileRef'] = initialState['fileRef'];
    },
  },
});

export const {
  setStep,
  setPhotoUrl,
  setPetType,
  setPetName,
  setFileRef,
  init,
} = postSlice.actions;

const store = configureStore({
  reducer: postSlice.reducer,
});

export default store;
