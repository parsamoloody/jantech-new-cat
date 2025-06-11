import { configureStore } from '@reduxjs/toolkit';
import dictionary from './slices/dictionarySlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      dictionary,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];