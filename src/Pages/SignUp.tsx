import { Alert, Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import React, { useState } from 'react'
import { matchConfirmPassword, validEmail, validLocation, validMobile, validName, validPassword } from '../utils/Validation';
import { CancelOutlined, CheckCircleOutlineOutlined, CircleOutlined } from '@mui/icons-material';
import axios from 'axios';
type SignUpProps={
  role:string
}
const SignUp = ({role}:SignUpProps) => {
  const [user, setUser] = useState({
    name: "",
    location:"",
    gender: "male",
    mobileNo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState<string|boolean>(false);
  const [nameError, setNameError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [mobileErrorMsg, setMobileErrorMsg] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [validLowercase, setValidLowerCase] = useState("initial");
  const [validUpperCase, setValidUpperCase] = useState("initial");
  const [validSpecialCharacter, setValidSpecialCharacter] = useState("initial");
  const [validNumber, setValidNumber] = useState("initial");
  const [validLength, setValidLength] = useState("initial");
  const [matchPassword, setMatchPassword] = useState("initial");
  const [locationError,setLocationError]=useState(false)
  const register = async () => {
    if (role == "hospital") {
        try {
            const res=await axios.post("http://localhost:4000/hospital", {
                hospitalName: user.name,
                location:user.location,
                email: user.email,
                password: user.password,
                contactNumber: user.mobileNo,
              });
              
              setSuccess("Signed up successfully!");
        } catch (error) {
            setSuccess(false)
        }
       
      }
    else {
        try {
          const fullName=user.name.split(" ")
          console.log(fullName)
          let first="";
          let last=""
          if(fullName.length>1){
         for(let i=0; i<fullName.slice(0,-1).length; i++){
          first+=`${fullName.slice(0,-1)[i]} `
         }
          last=fullName.slice(-1)[0]
         }
         else{
          first=user.name
         }
        
          await axios.post(`http://localhost:4000/${role}`, {
          firstName:first ,
          lastName: last,
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
  async function validateSubmit(e:React.FormEvent<HTMLFormElement>) {
    console.log("hello");
    e.preventDefault();

      setSuccess(false);
      console.log(user.name.split(" ")[0]);
      try{
        await register();
        
        setUser({
          name: "",
          gender: "male",
          location:"",
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
       {role==="hospital" && <>
       <FormLabel required sx={{ fontSize: 16, color: "black" }}>
          Address
        </FormLabel><TextField
          error={locationError}
          placeholder="Enter Hospital Location"
          fullWidth
          value={user.location}
          inputProps={{ "data-testid": "location" }}
          onChange={(e) => setUser({ ...user,location: e.target.value })}
          // onKeyUp={() => validId(user.hospitalId, setIdError)}
          onBlur={(e) =>
            validLocation(user.location, setLocationError)}
        />
        {locationError && (
          <span style={{ color: "red" }}>Please enter a valid location</span>
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
          error={passwordErrorMsg}
          placeholder="create password"
          type="password"
          fullWidth
          value={user.password}
          inputProps={{ "data-testid": "password" }}
          onFocus={() => setShowPasswordRules(true)}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          onBlur={(e) =>
            !e.target.value
              ? setPasswordErrorMsg(true)
              : setPasswordErrorMsg(false)
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
  )
}

export default SignUp
