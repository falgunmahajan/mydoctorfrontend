import {
  Alert,
  Autocomplete,
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import languages from "../../languages.json";
import axios from "axios";

const DoctorProfile = () => {
  const [edit, setEdit] = useState(false);
  const [img, setImg] = useState("/broken-image.jpg");
  const [imgFile, setImgFile] = useState([]);
  const [languageField, setLanguageField] = useState([]);
  const [bio, setBio] = useState("self");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const user = useSelector((state) => state.user);
  const status=useSelector(state=>state.status)
  console.log(user.languages)
  useEffect(()=>{
    user.image && setImg(`http://localhost:4000/${user.image}`)
   user.languages && setLanguageField(user.languages)
   user.bio && setBio(user.bio)

 
 },[status])
 console.log(languageField)
  const handleSubmit = async () => {
    if (!edit) {
      setEdit(true);
    }
    else {
      
      try {
        const formData=new FormData();
        formData.append("userId",user.user.Id)
        formData.append("languages",JSON.stringify(languageField))
        formData.append("bio",bio)
        formData.append("image",imgFile)
        console.log(Object.fromEntries(formData.entries()))
        const res = await axios.post(
          "http://localhost:4000/updateProfile/doctor",formData);
       
        setError(false);
        setSuccess("Your profile is succesfully updated");
        setEdit(false)
      } catch (error) {
        setError(error.response.data.message);
        setSuccess(false);
      }
    }
  };
  const getName = () => {
    if (user.user.lastName) {
      return `${user.user.firstName} ${user.user.lastName}`;
    }
    return user.user.firstName;
  };
  const disabled =
    img === "/broken-image.jpg" || bio === "self" || !languageField.length;
  const handleUpload = (e) => {
    if (e.target.files.length) {
      setImgFile(e.target.files[0]);

      setImg(URL.createObjectURL(e.target.files[0]));

      e.target.value = "";
    }
  };

  return (
    <div style={{minHeight:"80vh"}}>
      {user && (
        <Grid container sx={{ mt: 10 }}>
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
          <Grid item xs={6} sx={{ mt: 2, mb: 2 }}>
            <Avatar src={img} sx={{ height: 120, width: 120, ml: 2 }} />
            <Box>
              <Button
                component="label"
                variant="contained"
                disabled={!edit}
                sx={{ backgroundColor: "white", mt: 2 }}
              >
                {" "}
                <Typography sx={{ color: "#3f51b5", fontWeight: "bold" }}>
                  upload image
                </Typography>
                <input
                  type="file"
    
                  hidden
                  name="Image"
                  onChange={handleUpload}
                />
              </Button>
            </Box>
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
          <Grid item xs={5} sx={{ mt: 2, p: 1 }}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={`${getName()}`}
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={5} sx={{ mt: 2, p: 1, ml: "auto" }}>
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              value={user.user.contactNumber}
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={5} sx={{ mt: 2, p: 1 }}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={user.user.email}
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={5} sx={{ mt: 2, p: 1, ml: "auto" }}>
            <TextField
              id="outlined-basic"
              label="Gender"
              variant="outlined"
              value={user.user.gender}
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              disabled={!edit}
              id="tags-outlined"
              sx={{ mt: 2, p: 1 }}
              options={languages}
              value={languageField}
              onChange={(event, value) =>setLanguageField(value.map(lang=>({name:lang.name,code:lang.code}))) }
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Languages" />
              )}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              id="outlined-multiline-static"
              variant="outlined"
              disabled={!edit}
              label="Bio"
              value={bio}
              onChange={(e)=>setBio(e.target.value)}
              multiline
              fullWidth
              minRows={4}
              sx={{ mt: 2, p: 1, mb: 2 }}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default DoctorProfile;
