import { apiSlice } from '@/features/api/apiSlice';
import rootReducer from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';

export const appstore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
