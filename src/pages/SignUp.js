import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import React, { useState } from "react";
import {
  getDate,
  matchConfirmPassword,
  validEmail,
  validId,
  validMobile,
  validName,
  validPassword,
} from "../utils/validation";
import dayjs from "dayjs";
import {
  CancelOutlined,
  CheckCircleOutlineOutlined,
  CircleOutlined,
} from "@mui/icons-material";
// import { Link } from 'react-router-dom';
import axios from "axios";

export default function SignUp({role}) {
  const [user, setUser] = useState({
    name: "",
    hospitalId:"",
    gender: "male",
    dob: getDate(new Date()),
    mobileNo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [mobileErrorMsg, setMobileErrorMsg] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  // const [passwordError,setPasswordError]=useState(false)
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [validLowercase, setValidLowerCase] = useState("initial");
  const [validUpperCase, setValidUpperCase] = useState("initial");
  const [validSpecialCharacter, setValidSpecialCharacter] = useState("initial");
  const [validNumber, setValidNumber] = useState("initial");
  const [validLength, setValidLength] = useState("initial");
  const [matchPassword, setMatchPassword] = useState("initial");
  const [IdError,setIdError]=useState(false)
  const register = async () => {
    if (role == "patient") {
        try {
           await axios.post("http://localhost:4000/patients", {
                firstName: user.name.split(" ")[0],
                lastName: user.name.split(" ")[1],
                gender: user.gender,
                profile: {
                  dob: user.dob,
                },
                email: user.email,
                password: user.password,
                contactNumber: user.mobileNo,
              });
              setSuccess("Signed up successfully!");
        } catch (error) {
            setSuccess(false)
        }
     
    }
    if (role == "hospital") {
        try {
            const res=await axios.post("http://localhost:4000/hospital", {
                firstName: user.name,
                email: user.email,
                password: user.password,
                contactNumber: user.mobileNo,
              });
              
              setSuccess(`Signed up successfully! Your Hospital id is ${res.data.Id}. Please save it for Doctor Registration`);
        } catch (error) {
            setSuccess(false)
        }
       
      }
      if (role == "doctor") {
        try {
          await axios.post("http://localhost:4000/doctors", {
          firstName: user.name.split(" ")[0],
          lastName: user.name.split(" ")[1],
          hospitalId:user.hospitalId,
          gender: user.gender,
          email: user.email,
          password: user.password,
          contactNumber: user.mobileNo,
        });
        setSuccess("Signed up successfully!");
        } catch (error) {
            setSuccess(false)
        }
    }
  };
  async function validateSubmit(e) {
    console.log("hello");
    e.preventDefault();

      setSuccess(false);
      console.log(user.name.split(" ")[0]);
      try{
        await register();
        
        setUser({
          name: "",
          gender: "male",
          hospitalId:"",
          dob: getDate(new Date()),
          mobileNo: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }catch(err){
setSuccess(false)
      }
      
  
  }
  function passwordError() {
    if (
      validLowercase == "true" &&
      validUpperCase == "true" &&
      validSpecialCharacter == "true" &&
      validNumber == "true" &&
      validLength == "true" &&
      matchPassword == "true"
    ) {
      console.log("true");
      return true;
    }
    console.log("false");
    return false;
  }
  const disableRegister = () => {
    if (!passwordError() || nameError || mobileError || emailError) {
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    }
  };
  return (
    <div>
      <Box sx={{ fontWeight: "bold", fontSize: 20, mb: 2 }}>
        Create an account
      </Box>
      <form onSubmit={validateSubmit}>
        {success && <Alert severity="success">{success}</Alert>}
        <FormLabel required sx={{ fontSize: 16, color: "black" }}>
          {role=="hospital"?"Hospital Name":"Full Name"}
        </FormLabel>
        <TextField
          error={nameError}
          placeholder="Enter Name"
          fullWidth
          value={user.name}
          inputProps={{ "data-testid": "name" }}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          onKeyUp={() => validName(user.name, setNameError)}
          onBlur={(e) =>
            !e.target.value ? setNameError(true) : setNameError(false)
          }
        />
        {nameError && (
          <span style={{ color: "red" }}>Please enter a valid name!</span>
        )}
        <br />
        <br />
       {role==="doctor" && <>
       <FormLabel required sx={{ fontSize: 16, color: "black" }}>
          Hospital Id
        </FormLabel><TextField
          error={IdError}
          placeholder="Enter Hospital Id"
          fullWidth
          value={user.hospitalId}
          inputProps={{ "data-testid": "hospitalId" }}
          onChange={(e) => setUser({ ...user, hospitalId: e.target.value })}
          onKeyUp={() => validId(user.hospitalId, setIdError)}
          onBlur={(e) =>
            validId(user.hospitalId, setIdError)}
        />
        {IdError && (
          <span style={{ color: "red" }}>{IdError}</span>
        )}
        <br />
        <br /></> }
        {(role == "patient" || role=="doctor") && (
            <>
          <FormControl>
            <FormLabel required sx={{ fontSize: 16, color: "black" }}>
              Gender
            </FormLabel>
            <RadioGroup
              row
              name="row-radio-buttons-group"
              defaultValue="male"
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
           <br />
           <br />
           </>
        )}
       

        {role == "patient" && (
          <>
            <FormLabel required sx={{ fontSize: 16, color: "black" }}>
              Date of birth
            </FormLabel>{" "}
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                defaultValue={dayjs(new Date())}
                onChange={(value) => setUser({ ...user, dob: getDate(value) })}
              />
            </LocalizationProvider>
            <br />
        <br />
          </>
        )}
       

        <FormLabel required sx={{ fontSize: 16, color: "black" }}>
          Mobile Number
        </FormLabel>
        <TextField
          error={mobileError}
          type="tel"
          placeholder="Enter Mobile Number"
          fullWidth
          value={user.mobileNo}
          onChange={(e) => setUser({ ...user, mobileNo: e.target.value })}
          onKeyUp={() =>
            validMobile(role,user.mobileNo, setMobileError, setMobileErrorMsg)
          }
          onBlur={() =>
            validMobile(role,user.mobileNo, setMobileError, setMobileErrorMsg)
          }
          inputProps={{ maxLength: 10, "data-testid": "contact" }}
        />
        {mobileError && <span style={{ color: "red" }}>{mobileErrorMsg}</span>}

        <br />
        <br />
        <FormLabel required sx={{ fontSize: 16, color: "black" }}>
          Email
        </FormLabel>
        <TextField
          error={emailError}
          placeholder="abc@gmail.com"
          fullWidth
          value={user.email}
          inputProps={{ "data-testid": "email" }}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          onKeyUp={() =>
            validEmail(role,user.email, setEmailError, setEmailErrorMsg)
          }
          onBlur={() => validEmail(role,user.email, setEmailError, setEmailErrorMsg)}
        />
        {emailError && <span style={{ color: "red" }}>{emailErrorMsg}</span>}
        <br />
        <br />
        <FormLabel required sx={{ fontSize: 16, color: "black" }}>
          Create Password
        </FormLabel>
        <TextField
          error={false}
          placeholder="create password"
          type="password"
          fullWidth
          value={user.password}
          inputProps={{ "data-testid": "password" }}
          onFocus={() => setShowPasswordRules(true)}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          onBlur={(e) =>
            !e.target.value
              ? setPasswordErrorMsg("Password cannot be empty!")
              : setPasswordErrorMsg("")
          }
          onKeyUp={() =>
            validPassword(
              user.password,
              user.confirmPassword,
              setValidLowerCase,
              setValidUpperCase,
              setValidSpecialCharacter,
              setValidNumber,
              setValidLength,
              setMatchPassword
            )
          }
        />
        <span style={{ color: "red" }}>{passwordErrorMsg}</span>
        <br />
        <br />
        <FormLabel required sx={{ fontSize: 16, color: "black" }}>
          Confirm Password
        </FormLabel>
        <TextField
          error={false}
          placeholder="confirm password"
          type="password"
          fullWidth
          value={user.confirmPassword}
          inputProps={{ "data-testid": "confirmpassword" }}
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
          onKeyUp={() =>
            matchConfirmPassword(
              user.password,
              user.confirmPassword,
              setMatchPassword
            )
          }
        />
        <br />
        {showPasswordRules && (
          <Box sx={{ my: 1 }}>
            <Box>
              {validLowercase == "initial" && (
                <CircleOutlined fontSize="small" color="primary" />
              )}
              {validLowercase == "false" && (
                <CancelOutlined fontSize="small" sx={{ color: "red" }} />
              )}
              {validLowercase == "true" && (
                <CheckCircleOutlineOutlined
                  data-testid="lowercase right"
                  fontSize="small"
                  color="success"
                />
              )}
              <span>Must contain lowercase letter.</span>
            </Box>
            <Box>
              {validUpperCase == "initial" && (
                <CircleOutlined fontSize="small" color="primary" />
              )}
              {validUpperCase == "false" && (
                <CancelOutlined fontSize="small" sx={{ color: "red" }} />
              )}
              {validUpperCase == "true" && (
                <CheckCircleOutlineOutlined
                  data-testid="uppercase right"
                  fontSize="small"
                  color="success"
                />
              )}{" "}
              <span>Must contain uppercase letter.</span>
            </Box>
            <Box>
              {validSpecialCharacter == "initial" && (
                <CircleOutlined fontSize="small" color="primary" />
              )}
              {validSpecialCharacter == "false" && (
                <CancelOutlined fontSize="small" sx={{ color: "red" }} />
              )}
              {validSpecialCharacter == "true" && (
                <CheckCircleOutlineOutlined
                  data-testid="specialcharacter right"
                  fontSize="small"
                  color="success"
                />
              )}
              <span>Must contain at least one special character. </span>
            </Box>
            <Box>
              {validNumber == "initial" && (
                <CircleOutlined fontSize="small" color="primary" />
              )}
              {validNumber == "false" && (
                <CancelOutlined fontSize="small" sx={{ color: "red" }} />
              )}
              {validNumber == "true" && (
                <CheckCircleOutlineOutlined
                  data-testid="digit right"
                  fontSize="small"
                  color="success"
                />
              )}{" "}
              <span>Must contain at least one number.</span>
            </Box>
            <Box>
              {validLength == "initial" && (
                <CircleOutlined fontSize="small" color="primary" />
              )}
              {validLength == "false" && (
                <CancelOutlined fontSize="small" sx={{ color: "red" }} />
              )}
              {validLength == "true" && (
                <CheckCircleOutlineOutlined
                  data-testid="sixchar right"
                  fontSize="small"
                  color="success"
                />
              )}{" "}
              <span>Must contain at least 6 characters.</span>
            </Box>
            <Box>
              {matchPassword == "initial" && (
                <CircleOutlined fontSize="small" color="primary" />
              )}
              {matchPassword == "false" && (
                <CancelOutlined fontSize="small" sx={{ color: "red" }} />
              )}
              {matchPassword == "true" && (
                <CheckCircleOutlineOutlined
                  data-testid="match right"
                  fontSize="small"
                  color="success"
                />
              )}
              <span> Passwords must match.</span>
            </Box>
          </Box>
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={disableRegister()}
        >
          Register
        </Button>
      </form>{" "}
      <br />
      <p>
        Already have an account?
        <a href="/auth/login"> Sign in</a>
      </p>
    </div>
  );
}
