import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
interface User{
    user:{
        role:string,
        name:string,
        email:string,
        contact:string,
    }
   
}
interface StateType{
    user:null|User;
    Login:boolean;
    status:string
}
const initialState:StateType={
    user:null,
    Login:false,
    status:"idle"
}
export const fetchUser=createAsyncThunk("user/fetchUser",async()=>{
    // try{
        console.log("hello")
        const user=JSON.parse(localStorage.getItem("user")||"{}")
        console.log(user)
        const token = user.accessToken
        console.log(token)
        const res=await axios.get(`http://localhost:4000/authorization/${user.user.role}`,{
            headers:{
                Authorization:token
            }
        })
        return res.data
})
const userSlice=createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
       .addCase(fetchUser.fulfilled,(state,action)=>{
        state.status="succeeded";
        state.user=action.payload;
        state.Login=true
       })
       .addCase(fetchUser.rejected,(state,action)=>{
        state.status="idle";
        state.user=null
        state.Login=false
       })
    }
})
export const userReducer=userSlice.reducer