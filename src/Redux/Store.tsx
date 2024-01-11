import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { slotsReducer } from "./slotsSlice";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const store=configureStore({
reducer:{
    userReducer,
    slotsReducer
}
})
export const useAppSelector :TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector

export const useAppDispatch:()=> typeof store.dispatch=useDispatch