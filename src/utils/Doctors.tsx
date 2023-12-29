import axios from "axios";

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
}
export interface degree {
  degree: string;
}
export interface speciality {
  name: string;
}
export interface hospital {
  hospitalName: string;
}