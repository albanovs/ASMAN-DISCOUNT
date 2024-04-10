import { createSlice } from "@reduxjs/toolkit";

const tab = createSlice({
  name: "tab",
  initialState: {
    tab: true,
  },
  reducers: {
    changeTab: (state) => {
      state.tab = !state.tab;
    },
  },
});

export const { changeTab } = tab.actions;
export default tab.reducer;
