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
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDate } from "../../utils/validation";
import axios from "axios";
import { CameraAlt, Close } from "@mui/icons-material";

const ProfilePage = () => {
  const [edit, setEdit] = useState(false);
  const user = useSelector((state) => state.user);
  const [img, setImg] = useState("/broken-image.jpg");
  const [imgFile, setImgFile] = useState([]);
  const [dob,setDob]=useState()
  const [bloodGroup,setBloodGroup]=useState("")
  const [houseNo,setHouseNo]=useState("N/a")
  const [colony,setColony]=useState("N/a")
  const [city,setCity]=useState("N/a")
  const [state,setState]=useState("N/a")
  const [country,setCountry]=useState("N/a")
  const [pinCode,setPinCode]=useState("N/a")
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  useEffect(()=>{
    
    setImg(`http://localhost:4000/${user.image}`)
    setDob(getDate(new Date(user.dob)))
    setBloodGroup(user.BloodGroup)
  },[])
  const disabled =
    img==="/broken-image.jpg" ||
    !bloodGroup ||
    !houseNo ||
    !colony ||
    !city ||
    !state ||
    !country ||
    !pinCode;
  console.log(user.contactNumber);
  const getName = () => {
    if (user.user.lastName) {
      return `${user.user.firstName} ${user.user.lastName}`;
    }
    return user.user.firstName;
  };
  const handleSubmit = async () => {
    if (!edit) {
      setEdit(true);
    } else {
      
      try {
        const formData=new FormData();
        formData.append("userId",user.Id)
        formData.append("dob",dob)
        formData.append("BloodGroup",bloodGroup)
        formData.append("HouseNo",houseNo)
        formData.append("Colony",colony)
        formData.append("city",city)
        formData.append("state",state)
        formData.append("country",country)
        formData.append("pincode",pinCode)
        formData.append("image",imgFile)
        console.log(Object.fromEntries(formData.entries()))
        const res = await axios.post(
          "http://localhost:4000/updateProfile/patient",formData);
       
        setError(false);
        setSuccess("Your profile is succesfully updated");
      } catch (error) {
        setError(error.response.data.message);
        setSuccess(false);
      }
    }
  };
  const handleUpload = (e) => {
    if (e.target.files.length) {
      const validExt = ["jpg", "jpeg", "png"];
      const fileExt = e.target.files[0].name.split(".").at(-1);
      const fileSize = e.target.files[0].size;
      const maxSize = 1024 * 1024;
      console.log(fileExt);
      if (validExt.includes(fileExt.toLowerCase())) {
        if (fileSize <= maxSize) {
          
          setImgFile(e.target.files[0]);
  

          setImg(URL.createObjectURL(e.target.files[0]));

          e.target.value = "";
          setImgErr(false);
        } else {
          setImgErr("Image can be less than or equal to 1MB");
        }
      } else {
        setImgErr("Only .jpg, .jpeg, .png images are allowed");
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
                name="Image"
                accept=".jpg, .jpeg, .png"
                onChange={handleUpload}
              />
            </Button>
            <Close
              onClick={() => {
                console.log("removed");
                setImg("/broken-image.jpg");
                setImgFile("");
                console.log(imgFile);
              }}
            />
          </Box>
          {imgErr && <span style={{ color: "red" }}>{imgErr}</span>}
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
            value={`${user.user.contactNumber}`}
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={3} sx={{ mt: 2, p: 1 }}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={`${user.user.email}`}
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
              value={`${user.user.gender}`}
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
              onChange={(value) => setDob( getDate(value) )}
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
              value={bloodGroup}
              label="Blood Group"
              onChange={(e) =>setBloodGroup(e.target.value )}
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
            value={houseNo}
            disabled={!edit}
            onChange={(e) => setHouseNo(e.target.value )}
            fullWidth
          />
        </Grid>
        <Grid item xs={3} sx={{ mt: 2, p: 1 }}>
          <TextField
            id="outlined-basic"
            label="Colony/Street/Locality"
            variant="outlined"
            value={colony}
            disabled={!edit}
            onChange={(e) => setColony( e.target.value )}
            fullWidth
          />
        </Grid>
        <Grid item xs={3} sx={{ mt: 2, p: 1 }}>
          <TextField
            id="outlined-basic"
            label="City"
            variant="outlined"
            value={city}
            disabled={!edit}
            onChange={(e) => setCity(e.target.value )}
            fullWidth
          />
        </Grid>
        <Grid item xs={3} sx={{ mt: 2, p: 1 }}>
          <TextField
            id="outlined-basic"
            label="State"
            variant="outlined"
            value={state}
            disabled={!edit}
            onChange={(e) => setState(e.target.value )}
            fullWidth
          />
        </Grid>
        <Grid item xs={3} sx={{ mt: 2, p: 1 }}>
          <TextField
            id="outlined-basic"
            label="Country"
            variant="outlined"
            value={country}
            disabled={!edit}
            onChange={(e) => setCountry(e.target.value )}
            fullWidth
          />
        </Grid>
        <Grid item xs={3} sx={{ mt: 2, p: 1 }}>
          <TextField
            id="outlined-basic"
            label="Pin Code"
            variant="outlined"
            value={pinCode}
            disabled={!edit}
            onChange={(e) => setPinCode(e.target.value )}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;
