import { configureStore } from '@reduxjs/toolkit';

import github from './Github/GithubSlice';

export const store = configureStore({
  reducer: {
    github,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
