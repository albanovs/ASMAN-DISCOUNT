import { createSlice } from "@reduxjs/toolkit";

const category = createSlice({
  name: "category",
  initialState: {
    data: [],
    name: "",
  },
  reducers: {
    changeData: (state, action) => {
      state.data = action.payload;
    },
    changeName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { changeData, changeName } = category.actions;
export default category.reducer;
