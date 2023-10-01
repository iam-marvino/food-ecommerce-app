import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

let foodSlice = createSlice({
  name: "foodItems",
  initialState,
  reducers: {
    setFoodItems: (state, action) => {
      return action.payload;
    },
  },
});

export const { setFoodItems } = foodSlice.actions;
export default foodSlice.reducer;
