import { configureStore } from '@reduxjs/toolkit';
import TodoSlice from '../slices/todoSlice';

export const store = configureStore({
  reducer: {
    todo: TodoSlice,
  },
});
