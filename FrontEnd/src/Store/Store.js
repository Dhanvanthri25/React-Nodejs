import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Auth/Auth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
