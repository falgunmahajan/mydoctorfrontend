import {
  Alert,
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getDate } from "../../utils/validation";
import axios from "axios"
import { CameraAlt, Close } from "@mui/icons-material";

const ProfilePage = () => {
  const [edit, setEdit] = useState(false);
  const user = useSelector((state) => state.user);
  const [img, setImg] = useState("/broken-image.jpg");
  const [imgFile,setImgFile]=useState("");
  const [data, setData] = useState({
    dob: getDate(new Date()),
    BloodGroup: "",
    HouseNo: "N/a",
    Colony: "N/a",
    city: "N/a",
    state: "N/a",
    country: "N/a",
    pincode: "N/a",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const disabled =
    !data.BloodGroup ||
    !data.HouseNo ||
    !data.Colony ||
    !data.city ||
    !data.state ||
    !data.country ||
    !data.pincode;
  console.log(user.contactNumber);
  const getName = () => {
    if (user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.firstName;
  };
  const handleSubmit = async () => {
    if (!edit) {
      setEdit(true);
    } else {
      try {
        const res = await axios.post(
          "http://localhost:4000/updateProfile/patient",
          {
            data: data,
            Id: user.Id,
          }
        );
        setData({
          dob: getDate(new Date()),
          BloodGroup: "",
          HouseNo: "N/a",
          Colony: "N/a",
          city: "N/a",
          state: "N/a",
          country: "N/a",
          pincode: "N/a",
        });
        setError(false);
        setSuccess("Your profile is succesfully updated");
      } catch (error) {
        setError(error.response.data.message);
        setSuccess(false);
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#fafafa" }}>
      <Grid container sx={{ mt: 15, minHeight: "65vh" }}>
        <Grid item xs={12}>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{ color: "#3f51b5", fontWeight: "bold" }}
          >
            My Profile
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt: 2 }}>
          <Avatar src={img} sx={{ height: 120, width: 120 }} />
          <Box sx={{ display: edit ? "flex" : "none", alignItems: "center" }}>
            <Button component="label">
              <CameraAlt />{" "}
              <input
                type="file"
                hidden
                value={imgFile}
                name="Image"
                onChange={(e) => {
                  console.log("hello");
                  console.log(e.target.files);
                  setImgFile(e.target.files[0])
                  // if(e.target.files.length){

                    setImg(URL.createObjectURL(e.target.files[0]));
                  // }
                  // e.target.value = "";
                 
                }}
              />
            </Button>
            <Close
              onClick={() => {
                console.log("removed")
                setImg("/broken-image.jpg");
                setImgFile("")
                console.log(imgFile)
              }}
            />
          </Box>

          <Typography sx={{ fontSize: "12px", color: "grey", mt: 2 }}>
            JPEG, JPG or PNG image less than 1 MB
            <br />
            (Close up face picture looks great)
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            disabled={edit && disabled}
            onClick={handleSubmit}
            sx={{ backgroundColor: "#3f51b5" }}
          >
            {edit ? "Save" : "Edit"}
          </Button>
        </Grid>
        <Grid item xs={3} sx={{ mt: 2, p: 1 }}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={`${getName()}`}
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={3} sx={{ mt: 2, p: 1 }}>
          <TextField
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            value={`${user.contactNumber}`}
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={3} sx={{ mt: 2, p: 1 }}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={`${user.email}`}
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={3} sx={{ mt: 2, p: 1 }}>
          <FormControl sx={{ minWidth: 395 }}>
            <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              fullWidth
              value={`${user.gender}`}
              label="Gender"
              disabled
              // onChange={handleChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3} sx={{ mt: 2, p: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date Of Birth"
              sx={{ minWidth: 390 }}
              defaultValue={dayjs(new Date())}
              disabled={!edit}
              onChange={(value) => setData({ ...data, dob: getDate(value) })}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={3} sx={{ mt: 2, p: 1 }}>
          <FormControl sx={{ minWidth: 395 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Blood Group
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              fullWidth
              disabled={!edit}
              value={data.BloodGroup}
              label="Blood Group"
              onChange={(e) => setData({ ...data, BloodGroup: e.target.value })}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3} sx={{ mt: 2, p: 1 }}>
          <TextField
            id="outlined-basic"
            label="House No./Street/Area"
            variant="outlined"
            value={data.HouseNo}
            disabled={!edit}
            onChange={(e) => setData({ ...data, HouseNo: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={3} sx={{ mt: 2, p: 1 }}>
          <TextField
            id="outlined-basic"
            label="Colony/Street/Locality"
            variant="outlined"
            value={data.Colony}
            disabled={!edit}
            onChange={(e) => setData({ ...data, Colony: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={3} sx={{ mt: 2, p: 1 }}>
          <TextField
            id="outlined-basic"
            label="City"
            variant="outlined"
            value={data.city}
            disabled={!edit}
            onChange={(e) => setData({ ...data, city: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={3} sx={{ mt: 2, p: 1 }}>
          <TextField
            id="outlined-basic"
            label="State"
            variant="outlined"
            value={data.state}
            disabled={!edit}
            onChange={(e) => setData({ ...data, state: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={3} sx={{ mt: 2, p: 1 }}>
          <TextField
            id="outlined-basic"
            label="Country"
            variant="outlined"
            value={data.country}
            disabled={!edit}
            onChange={(e) => setData({ ...data, country: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={3} sx={{ mt: 2, p: 1 }}>
          <TextField
            id="outlined-basic"
            label="Pin Code"
            variant="outlined"
            value={data.pincode}
            disabled={!edit}
            onChange={(e) => setData({ ...data, pincode: e.target.value })}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;
