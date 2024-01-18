import { createSlice } from "@reduxjs/toolkit";
import { DoctorsTypes, slotTypes } from "../utils/Doctors";

interface SlotSliceTypes {
  slots: slotTypes|null;
  doctor: DoctorsTypes|null;
  otherName?: string;
  otherMobileNumber?: string;
}
interface StateTypes{
    data:SlotSliceTypes|null
}
const initialState:StateTypes= {
   data:null
};
const slotSlice = createSlice({
  name: "slots",
  initialState,
  reducers : {
    setAppointmentData(state,action){
        state.data=action.payload
        
    },
    deleteAppointmentData(state){
      state.data=null
    }
  },
});
export const {setAppointmentData,deleteAppointmentData}=slotSlice.actions;
export const slotsReducer=slotSlice.reducer