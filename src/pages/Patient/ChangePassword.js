import {
  Close,
  Done,
} from "@mui/icons-material";
import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { matchConfirmPassword, validPassword } from "../../utils/validation";
import axios from "axios";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const user=useSelector(state=>state.user)
  const [newPassword, setNewPassword] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [oldpasswordErrorMsg, setoldPasswordErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const [validLowercase, setValidLowerCase] = useState("false");
  const [validUpperCase, setValidUpperCase] = useState("false");
  const [validSpecialCharacter, setValidSpecialCharacter] = useState("false");
  const [validNumber, setValidNumber] = useState("false");
  const [validLength, setValidLength] = useState("false");
  const [matchPassword, setMatchPassword] = useState("false");
  const [error,setError]=useState("")
  const [success,setSuccess]=useState("")
  const passwordError=() =>{
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
  const disabledSubmit=!oldPassword||!passwordError()
  const handleSubmit=async()=>{
    try {
      const res=await axios.post("http://localhost:4000/changepassword",{
        id:user.user.Id,
        oldPassword:oldPassword,
        newPassword:newPassword,
      })
      setError()
      setSuccess(res.data.message)
    } catch (error) {
      setError(error.response.data.message)
      setSuccess()
    }
  }
  return (
    <Grid container sx={{ mt: 17, minHeight:"62vh"}}>
      <Grid item xs={4} sx={{ m: "auto" }}>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
        <Typography variant="h4" sx={{ color: "#3f51b5", fontWeight: "bold" }}>
          Change Password
        </Typography>
        <TextField
          id="outlined-basic"
          type="password"
          label="Current Password"
          variant="outlined"
          error={oldpasswordErrorMsg}
          value={oldPassword}
          onChange={(e)=>setOldPassword(e.target.value)}
          fullWidth
          required
          onBlur={(e) =>
            !e.target.value
              ? setoldPasswordErrorMsg("Current Password cannot be empty!")
              : setoldPasswordErrorMsg("")
              
          }
          sx={{ mt: 2 }}
        />
          {oldpasswordErrorMsg && <span style={{ color: "red" }}>{oldpasswordErrorMsg}</span>}
        <TextField
          id="outlined-basic"
          type="password"
          label="New Password"
          variant="outlined"
          error={passwordErrorMsg}
          value={newPassword}
          onChange={(e)=>setNewPassword(e.target.value)}
          fullWidth
          required
          onBlur={(e) =>
            !e.target.value
              ? setPasswordErrorMsg("New Password cannot be empty!")
              :setPasswordErrorMsg("")
          }
          onKeyUp={() =>
            validPassword(
              newPassword,
              confirmPassword,
              setValidLowerCase,
              setValidUpperCase,
              setValidSpecialCharacter,
              setValidNumber,
              setValidLength,
              setMatchPassword
            )
          }
          sx={{ mt: 2 }}
        />
        {passwordErrorMsg && <span style={{ color: "red" }}>{passwordErrorMsg}</span>}
        <TextField
          id="outlined-basic"
          type="password"
          label="Confirm Password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          fullWidth
          required
          onKeyUp={() =>
            matchConfirmPassword(
              newPassword,
              confirmPassword,
              setMatchPassword
            )
          }
          sx={{ mt: 2 }}
        />
        <Box sx={{ my: 3 }}>
          <Box sx={{ display: "flex" }}>
            {validLowercase=="true" ? (
              <Done sx={{ color: "green" }} />
            ) : (
              <Close sx={{ color: "red" }} />
            )}
            <span style={{ marginLeft: 5 }}>A lowercase letter.</span>
          </Box>
          <Box sx={{ display: "flex" }}>
            {validUpperCase=="true" ? (
              <Done sx={{ color: "green" }} />
            ) : (
              <Close sx={{ color: "red" }} />
            )}
            <span style={{ marginLeft: 5 }}>An uppercase letter.</span>
          </Box>
          <Box sx={{ display: "flex" }}>
            {validSpecialCharacter=="true" ? (
              <Done sx={{ color: "green" }} />
            ) : (
              <Close sx={{ color: "red" }} />
            )}
            <span style={{ marginLeft: 5 }}>At least one special letter.</span>
          </Box>
          <Box sx={{ display: "flex" }}>
            {validNumber=="true" ? (
              <Done sx={{ color: "green" }} />
            ) : (
              <Close sx={{ color: "red" }} />
            )}
            <span style={{ marginLeft: 5 }}>At least one number.</span>
          </Box>
          <Box sx={{ display: "flex" }}>
            {validLength=="true" ? (
              <Done sx={{ color: "green" }} />
            ) : (
              <Close sx={{ color: "red" }} />
            )}
            <span style={{ marginLeft: 5 }}>At least six characters.</span>
          </Box>
          <Box sx={{ display: "flex" }}>
            {matchPassword=="true" ? (
              <Done sx={{ color: "green" }} />
            ) : (
              <Close sx={{ color: "red" }} />
            )}
            <span style={{ marginLeft: 5 }}>Passwords must match</span>
          </Box>
        </Box>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={disabledSubmit}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
