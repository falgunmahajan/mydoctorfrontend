import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState={
    user:[],
    Login:false,
    status:"idle"
}
export const fetchUser=createAsyncThunk("user/fetchUser",async()=>{
    // try{
        const token = JSON.parse(localStorage.getItem("user")).accessToken
        console.log(token)
        const res=await axios.get("http://localhost:4000/authorization",{
            headers:{
                Authorization:token
            }
        })
        return res.data
    // }
    // catch(err){
    //     console.log(err)
    //     return err.message
    // }
})
const userSlice=createSlice({
    name:"users",
    initialState,
    extraReducers(builder){
        builder
       .addCase(fetchUser.fulfilled,(state,action)=>{
        state.status="succeeded";
        state.user=action.payload;
        state.Login=true
       })
    }
})
export const userReducer=userSlice.reducer