import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [runuseEffect, setRunUseEffect] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [currentuser, setCurrentUser] = useState();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, [runuseEffect]);
  const handleResendButton = async () => {
    try {
      const res = await axios.post("http://localhost:4000/authentication", {
        email: currentuser.email,
        password: currentuser.password,

        // strategy:"local"
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      setRunUseEffect(!runuseEffect);
    } catch (error) {}
  };
  const handleSubmit = async () => {
    if (otp) {
      try {
        const res = await axios.post("http://localhost:4000/otpverification", {
          user,
          otp,
        });
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setErr(false);
        navigate("/");
      } catch (error) {
        console.log(error);
        setErr(error.response.data.msg);
      }
    }
  };
  return (
    <Grid container sx={{ mt: 25, minHeight:"67vh" }}>
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
          <Link onClick={handleResendButton}>Resend again</Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OtpVerification;
