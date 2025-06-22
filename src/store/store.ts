import { configureStore } from '@reduxjs/toolkit';
import cocktailReducer from './cocktailSlice';

export const store = configureStore({
  reducer: {
    cocktails: cocktailReducer,
  },
});

/** Тип для корневого состояния (RootState) */
export type RootState = ReturnType<typeof store.getState>;
/** Тип для диспетчера (AppDispatch) */
export type AppDispatch = typeof store.dispatch;
