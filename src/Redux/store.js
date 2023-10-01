import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import foodSlice from './foodSlice';
import cartSlice from './cartSlice';


export const store = configureStore({
  reducer: {
    user: userSlice,
    foodItems: foodSlice,
    cart: cartSlice,
  },
});
