import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./createSlice";

export const store=configureStore({
reducer:userReducer
})