import axios from "axios";

export async function getSpecialities() {
    const res = await axios.get(
      "http://localhost:4000/specializations"
    );
   return res.data.data;
   
  }
  export interface SpecialitiesTypes{
    name:string,
    imageUrl:string
  }