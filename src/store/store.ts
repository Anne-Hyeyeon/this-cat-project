import { configureStore, createSlice } from '@reduxjs/toolkit';

interface State {
  photoUrl: string;
  text: string;
}

const initialState: State = {
  photoUrl: '',
  text: '',
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPhotoUrl: (state, action) => {
      state.photoUrl = action.payload;
    },
    setText: (state, action) => {
      state.text = action.payload;
    },
  },
});

export const { setPhotoUrl, setText } = postSlice.actions;

const store = configureStore({
  reducer: postSlice.reducer,
});

export default store;
