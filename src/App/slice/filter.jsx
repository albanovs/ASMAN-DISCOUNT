import { createSlice } from "@reduxjs/toolkit";

const filter = createSlice({
  name: "filter",
  initialState: {
    cat: "",
    pricefrom: "",
    priceto: "",
    city: "",
    sort: "",
  },
  reducers: {
    changeCat: (state, action) => {
      state.cat = action.payload;
    },
    changePricefrom: (state, action) => {
      state.pricefrom = action.payload;
    },
    changePriceto: (state, action) => {
      state.priceto = action.payload;
    },
    changeCity: (state, action) => {
      state.city = action.payload;
    },
    changeSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const {
  changeCat,
  changePricefrom,
  changePriceto,
  changeCity,
  changeSort,
} = filter.actions;
export default filter.reducer;
