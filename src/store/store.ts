import { configureStore, createSlice } from '@reduxjs/toolkit';

export interface State {
  photoUrl: string;
  petType: string;
  petName: string;
  postposition: boolean;
}

const initialState: State = {
  photoUrl: '',
  petType: '고양이',
  petName: '얘',
  postposition: true,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPhotoUrl: (state, action) => {
        state.photoUrl = action.payload;
    },
    setPetType: (state, action) => {
        state.petType = action.payload;
    },
    setPetName: (state, action) => {
        state.petName = action.payload;
    },
    setPostposition: (state, action) => {
        state.postposition = action.payload;
    },
  },
});

export const { setPhotoUrl, setPetType, setPetName, setPostposition } = postSlice.actions;

const store = configureStore({
  reducer: postSlice.reducer,
});

export default store;
