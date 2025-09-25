import { configureStore } from '@reduxjs/toolkit';
import skillReducer from './skillSlice';

export default configureStore({
  reducer: {
    skill: skillReducer
  }
})