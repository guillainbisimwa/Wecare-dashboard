import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import doctorsReducer from './doctorsReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorsReducer
  },
});

export default store;
