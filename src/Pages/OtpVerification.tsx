import { Alert, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { useAppDispatch, useAppSelector } from '../Redux/Store';
import axios, { AxiosError } from 'axios';
import { fetchUser } from '../Redux/CreateSlice';
interface CurrentUserTypes{
    email:string,
    password:"string"
}
interface UserTypes{
   otpToken:string,
   user:{
//     Id:string; 
// contactNumber:string
// createdAt: string
// deleted: boolean
email:string
// enabled:boolean
// firstName:string
// gender:string
// lastName:string
// password:string
// role:string
// updatedAt:string
   }
}
const OtpVerification = () => {
    const [otp, setOtp] = useState("");
    const [runuseEffect, setRunUseEffect] = useState(false);
    const [err, setErr] = useState<string|boolean>(false);
    const navigate = useNavigate();
    const [user, setUser] = useState<UserTypes|null>(null);
    const [currentuser, setCurrentUser] = useState({} as CurrentUserTypes);
    const [progress, setProgress] = useState(0)
    const dispatch=useAppDispatch();
    const login = useAppSelector((state) => state.Login);
    console.log(user)
    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem("user")||"{}"))
      setUser(JSON.parse(localStorage.getItem("user")||"{}"));
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")||"{}"));
    }, [runuseEffect]);
    useEffect(()=>{
      if(login){
        console.log(login)
        navigate("/");
      }
    },[login, navigate])
    console.log(login)
    console.log(user)
    const handleResendButton = async () => {
      setOtp("")
      try {
        const res = await axios.post("http://localhost:4000/authentication", {
          email: currentuser.email,
          password: currentuser.password,
        });
        localStorage.setItem("user", JSON.stringify(res.data));
        setRunUseEffect(!runuseEffect);
      } catch (error) {}
    };
    const handleSubmit = async () => {
      setProgress(95)
      if (otp) {
        try {
          const res = await axios.post("http://localhost:4000/otpverification", {
            user,
            otp,
          });
          console.log(res);
          localStorage.setItem("user", JSON.stringify(res.data));
          setErr(false);
          dispatch(fetchUser())
         
          
        } catch (error:any) {
          setProgress(100)
          console.log(error);
          setErr(error.response.data.msg);
        }
      }
    };
  return (
    <div style={{width:"100vw"}}>
         <LoadingBar
    color='red'
    progress={progress}
    onLoaderFinished={() => setProgress(0)}
  />
    <Grid container sx={{ mt: 25, minHeight:"65vh" }}>
      <Grid item
        xs={4}
        sx={{
          m: "auto",
          textAlign: "center",
          p: 4,
          backgroundColor: "white",
          border: 1,
          borderColor: "divider",
        }}
      >
        {err && <Alert severity="error">{err}</Alert>}
        <Typography variant="h3" sx={{ color: "#3f51b5", mt: 4 }}>
          OTP Verification
        </Typography>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Please enter the OTP to verify your account
        </Typography>
        <Typography variant="h6" sx={{ mt: 4 }}>
          An OTP has been sent to {user && user.user.email}{" "}
        </Typography>
        <TextField
          id="outlined-basic"
          type="tel"
          label="Enter OTP"
          variant="outlined"
          sx={{ mt: 4 }}
          inputProps={{ maxLength: 6 }}
          required
          fullWidth
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />{" "}
        <br /> <br />
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#3f51b5", mt: 4 }}
          onClick={handleSubmit}
        >
          Verify
        </Button>
        <Typography sx={{ mt: 2 }}>
          Didn't receive the Verification OTP?
          <Link to="" onClick={handleResendButton}>Resend again</Link>
        </Typography>
      </Grid>
    </Grid>
    </div>
  )
}

export default OtpVerification
