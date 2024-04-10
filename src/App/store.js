import { configureStore } from "@reduxjs/toolkit";
import user_info from "./slice/user-info";
import status from "./slice/status";
import process from "./slice/process";
import tab from "./slice/tab";
import filter from "./slice/filter";
import category from "./slice/category";

export const store = configureStore({
  reducer: {
    user_info,
    status,
    process,
    tab,
    filter,
    category,
  },
});
