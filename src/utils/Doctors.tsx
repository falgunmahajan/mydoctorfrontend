import axios from "axios";
import moment from "moment";

export async function getDoctors() {
  const res = await axios.get("http://localhost:4000/doctors");
  return res.data;
}
export const getName = (firstName: string, lastName: string) => {
  if (lastName) {
    return `${firstName} ${lastName}`;
  }
  return firstName;
};

export const getQualification = (Qualification: degree[]) => {
  const doctorQualification = Qualification.map((item) => item.degree).join(
    " | "
  );
  return doctorQualification;
};
export const getDoctorSpecialities = (specialities: speciality[]) => {
  const doctorSpecialities = specialities.map((item) => item.name).join(" | ");
  return doctorSpecialities;
};
export const getHospitals = (hospitals: hospital[]) => {
  const doctorHospitals = hospitals
    .map((item) => item.hospitalName)
    .join(" | ");
  return doctorHospitals;
};
export const getLanguages = (languages: language[]) => {
  const doctorLanguages = languages.map((item) => item.name).join(", ");
  return doctorLanguages;
};
const getSlotDate=(slotDate:Date)=>{
  const currentDate=new Date();
  const diff=Math.round((slotDate.getTime()- currentDate.getTime())/(60*60*1000*24))
  const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  const weekendDate=currentDate.getDate()+7+(6-currentDate.getDay())
  if(diff===0){
    return "Today"
  }
  if(diff===1){
    return "Tomorrow"
  }
  if(diff<7){
return days[slotDate.getDay()]
  }
  if(diff>=7 && diff<13 && slotDate.getDate()<=weekendDate){
    return "Next Week"
  }
  if(diff>13 && diff<365 && slotDate.getFullYear()===currentDate.getFullYear()){
 return moment(slotDate).format("D-MMM")
  }
  if(slotDate.getFullYear()>currentDate.getFullYear()){
    return moment(slotDate).format("D-MMM-YYYY")
  }
    }
    export const getNextAvailableSlots=async(id:string)=>{
      try {
        const resp = await axios.get(
          `http://localhost:4000/slots?doctorId=${id}`
        );
        console.log(resp.data)
        if(resp.data.length){
          const doctorSlots:string[]=[]
          resp.data.map((slot:slotTypes) =>{
            if(slot.size!==slot.count){
              doctorSlots.push(slot.startTime)
            }
          })
          if(doctorSlots.length){
           return getSlotDate(new Date(doctorSlots[0]))
          }
        }
        else{
          return "Not available"
        }
      
      } catch (error) {
        
      }
  
    }
   
export interface DoctorsTypes {
  Id: string;
  languages: language[];
  Qualification: degree[];
  user: {
    firstName: string;
    lastName: string;
  };
  specialities: speciality[];
  hospitals: hospital[];
}
export interface language {
  name: string;
  code:string
}
export interface degree {
  degree: string;
  institute:string;
  year:string
}
export interface speciality {
  Id:string,
  name: string;
}
export interface hospital {
  Id:string,
  hospitalName: string;
  hospitalDoctorMapping:hospitalDoctor
}
export interface ExperienceInterface{
  position:string,
  hospitalName: string,
  startDate:string,
  endDate:string
}
export interface hospitalDoctor{
  position:string,
  consultationFee:string
}
export type slotTypes = {
  Id: string;
  deleted: boolean;
  count: number;
  doctorId: string;
  size: number;
  startTime: string;
  endTime: string;
};