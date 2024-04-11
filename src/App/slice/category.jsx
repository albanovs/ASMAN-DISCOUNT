import { createSlice } from "@reduxjs/toolkit";

const category = createSlice({
  name: "category",
  initialState: {
    data: [],
    id: "",
    name: "",
  },
  reducers: {
    changeData: (state, action) => {
      state.data = action.payload;
    },
    changeName: (state, action) => {
      state.name = action.payload;
    },
    changeId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { changeData, changeId, changeName } = category.actions;
export default category.reducer;
