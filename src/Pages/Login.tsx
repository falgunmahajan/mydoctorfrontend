import { Alert, Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const Login = () => {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const validateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setProgress(95);
    let field;
    if (/^[0-9]*$/.test(input)) {
      field = "contactNumber";
    } else {
      field = "email";
    }
    setError(false);
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/authentication", {
        [field]: input,
        password: password,
      });
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          [field]: input,
          password: password,
        })
      );
      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/otpverification");
    } catch (err) {
      setProgress(100);
      setError(true);
    }
  };
  return (
    <div>
      <LoadingBar
        color="red"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Mobile Number/Email or password is incorrect. Please try again.
        </Alert>
      )}
      <form onSubmit={validateSubmit}>
        <TextField
          id="outlined-basic"
          label="Email or Mobile Number"
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
          fullWidth
        />{" "}
        <br /> <br />
        <TextField
          id="outlined-basic"
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />{" "}
        <br /> <br />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#3f51b5" }}
          >
            Login
          </Button>
          <a href="">Forgot Password?</a>
        </Box>
      </form>{" "}
      <br />
      <p>
        Don't have an account?
        <a href="/auth/signup"> Sign up</a>
      </p>
    </div>
  );
};

export default Login;
