import axios from "axios";

export function validName(
  name: string,
  setNameError: React.Dispatch<React.SetStateAction<boolean>>
) {
  const regex = /^[a-zA-Z\s\.]+$/;
  if (regex.test(name)) {
    setNameError(false);
  } else {
    setNameError(true);
  }
}
export async function validMobile(
  role: string,
  mobileNo: string,
  setMobileError: React.Dispatch<React.SetStateAction<boolean>>,
  setMobileErrorMsg: React.Dispatch<React.SetStateAction<string>>
) {
  const regex = /^[1-9][0-9]{9}$/;
  if (regex.test(mobileNo)) {
    setMobileError(false);
    await axios
      .get(`http://localhost:4000/accounts/${role}?contactNumber=${mobileNo}`)
      .catch((error) => {
        setMobileError(true);
        setMobileErrorMsg("Mobile number already exist");
      });
  } else {
    setMobileError(true);
    setMobileErrorMsg("Please enter a valid 10-digit mobile number!");
  }
}
export async function validEmail(
  role: string,
  email: string,
  setEmailError: React.Dispatch<React.SetStateAction<boolean>>,
  setEmailErrorMsg: React.Dispatch<React.SetStateAction<string>>
) {
  const regex = /^[_a-zA-Z0-9\.\s\-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
  if (regex.test(email)) {
    setEmailError(false);
    await axios
      .get(`http://localhost:4000/accounts/${role}?email=${email}`)
      .catch((error) => {
        setEmailError(true);
        setEmailErrorMsg("Email address already exist");
      });
  } else {
    setEmailError(true);
    setEmailErrorMsg("Please enter a valid e-mail address!");
  }
}

export function validPassword(
  password: string,
  confirmPassword: string,
  setValidLowerCase: React.Dispatch<React.SetStateAction<string>>,
  setValidUpperCase: React.Dispatch<React.SetStateAction<string>>,
  setValidSpecialCharacter: React.Dispatch<React.SetStateAction<string>>,
  setValidNumber: React.Dispatch<React.SetStateAction<string>>,
  setValidLength: React.Dispatch<React.SetStateAction<string>>,
  setMatchPassword: React.Dispatch<React.SetStateAction<string>>
) {
  setValidLowerCase("false");
  setValidUpperCase("false");
  setValidSpecialCharacter("false");
  setValidNumber("false");
  setValidLength("false");
  setMatchPassword("false");
  if (/[a-z]/.test(password)) {
    setValidLowerCase("true");
  } else {
    setValidLowerCase("false");
  }
  if (/[A-Z]/.test(password)) {
    setValidUpperCase("true");
  } else {
    setValidUpperCase("false");
  }
  if (/[!@#$%^&*]/.test(password)) {
    setValidSpecialCharacter("true");
  } else {
    setValidSpecialCharacter("false");
  }
  if (/[0-9]/.test(password)) {
    setValidNumber("true");
  } else {
    setValidNumber("false");
  }
  if (password.length >= 6) {
    setValidLength("true");
  } else {
    setValidLength("false");
  }
  if (password == confirmPassword) {
    setMatchPassword("true");
  } else {
    setMatchPassword("false");
  }
}
export function matchConfirmPassword(password:string, confirmPassword:string, setMatchPassword: React.Dispatch<React.SetStateAction<string>>) {
  if (password == confirmPassword) {
    setMatchPassword("true");
  } else {
    setMatchPassword("false");
  }
}

export const validLocation = (location:string, setLocationError: React.Dispatch<React.SetStateAction<boolean>>) => {
  if (!location) {
    setLocationError(true);
  }
};
