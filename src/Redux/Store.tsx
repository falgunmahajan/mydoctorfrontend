import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./CreateSlice";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const store=configureStore({
reducer:userReducer
})
export const useAppSelector :TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector

export const useAppDispatch:()=> typeof store.dispatch=useDispatch