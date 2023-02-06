import { configureStore, createSlice } from '@reduxjs/toolkit';

export interface State {
  photoUrl: string;
  petType: string;
  petName: string;
}

const initialState: State = {
  photoUrl: '',
  petType: '고양이',
  petName: '얘',
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
  },
  },
);

export const { setPhotoUrl, setPetType, setPetName,  } = postSlice.actions;

const store = configureStore({
  reducer: postSlice.reducer,
});

export default store;
