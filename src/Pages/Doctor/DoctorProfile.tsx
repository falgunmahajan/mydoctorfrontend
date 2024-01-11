import {
  Alert,
  Autocomplete,
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../Redux/Store";
import axios from "axios";
import languages from "../../languages.json";
import { language } from "../../utils/Doctors";
import { validMobile, validName } from "../../utils/Validation";
import { getUserName } from "../../utils/getData";

const DoctorProfile = () => {
  const [id, setId] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    mobileNo: "",
    email: "",
  });
  const [gender, setGender] = useState("");
  const [nameError, setNameError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [BioError, setBioError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [img, setImg] = useState("/broken-image.jpg");
  const [imgFile, setImgFile] = useState<null | File>();
  const [languageField, setLanguageField] = useState<Array<language>>([]);
  const [bio, setBio] = useState("self");
  const [success, setSuccess] = useState<string | boolean>(false);
  const [error, setError] = useState<string | boolean>(false);
  const user = useAppSelector((state) => state.userReducer.user);
  const status = useAppSelector((state) => state.userReducer.status);
  useEffect(() => {
    if (user) {
      setId(user.user.Id);
      setUserData({
        ...userData,
        name: getName(),
        mobileNo: user.user.contactNumber,
        email: user.user.email,
      });
      user.image && setImg(`http://localhost:4000/${user.image}`);
      user.languages && setLanguageField(user.languages);
      user.bio && setBio(user.bio);
      user.user.gender && setGender(user.user.gender);
    }
  }, [status]);
  console.log(languageField);
  const handleSubmit = async () => {
    if (!edit) {
      setEdit(true);
    } else {
      
      if (!nameError && !mobileError && !emailError && !BioError){
        console.log(imgFile);
        try {
            const formData = new FormData();
            formData.append("userId", id);
            formData.append("languages", JSON.stringify(languageField));
            formData.append("bio", bio);
            userData.email!==user?.user.email && formData.append("email",userData.email)
            userData.mobileNo!==user?.user.contactNumber && formData.append("contactNumber",userData.mobileNo)
            gender!==user?.user.gender && formData.append("gender",gender)
           if (userData.name!==getName() && user){
            let name=getUserName(user.user.role,userData.name)
            if(typeof name==="object"){
                formData.append("firstName", name.first);  
                formData.append("lastName", name.last);  
            }
            else{
                formData.append("firstName", name);  
            }
           }
            if (imgFile) {
              formData.append("image", imgFile);
            }
            console.log(Object.fromEntries(formData.entries()));
            const res = await axios.put(
              "http://localhost:4000/updateProfile/doctor",
              formData
            );
  
            setError(false);
            setSuccess("Your profile is succesfully updated");
            setEdit(false);
          } catch (error: any) {
            setError(error.response.data.message);
            setSuccess(false);
          }
      }
      }
        
  };
  const getName = (): string => {
    if (user) {
      if (user.user.lastName) {
        return `${user.user.firstName}${user.user.lastName}`;
      }
      return `${user.user.firstName}`;
    }
    return "";
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setImgFile(e.target.files[0]);

      setImg(URL.createObjectURL(e.target.files[0]));

      e.target.value = "";
    }
  };
  return (
    <div>
      {user && (
        <>
          <Grid container>
            <Grid item xs={12}>
              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                My Profile
              </Typography>

              <Avatar
                src={img}
                sx={{ height: 110, width: 110, ml: 2, mt: 1 }}
              />
              <Box>
                <Button
                  component="label"
                  variant="text"
                  disabled={!edit}
                  sx={{ mt: 1, ml: 3, textTransform: "none" }}
                >
                  {" "}
                  <Typography
                    sx={{ color: "#3f51b5", fontWeight: "bold", fontSize: 15 }}
                  >
                    {!edit ? "Upload Image" : "Change Image"}
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

            <Grid item xs={12} sx={{ textAlign: "right", mr: 2 }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ backgroundColor: "#3f51b5" }}
              >
                {edit ? "Save" : "Edit"}
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ mx: "auto", width: "98%" }}>
            <Grid
              container
              sx={{
                backgroundColor: "white",
                px: 1,
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                mt: 1,
              }}
            >
              <Grid item xs={5} sx={{ mt: 2, p: 1 }}>
                <TextField
                  id="outlined-basic"
                  error={nameError}
                  label="Name"
                  variant="outlined"
                  value={`${userData.name}`}
                  disabled={!edit}
                  onBlur={() => validName(userData.name, setNameError)}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  fullWidth
                />
                {nameError && (
                  <span style={{ color: "red", fontSize: 11 }}>
                    Please enter a valid name!
                  </span>
                )}
              </Grid>
              <Grid item xs={5} sx={{ mt: 2, p: 1, ml: "auto" }}>
                <TextField
                  error={mobileError}
                  id="outlined-basic"
                  label="Phone Number"
                  variant="outlined"
                  disabled={!edit}
                  value={userData.mobileNo}
                  onBlur={() => {
                    const regex = /^[1-9][0-9]{9}$/;
                    if (regex.test(userData.mobileNo)) {
                      setMobileError(false);
                    } else {
                      setMobileError(true);
                    }
                  }}
                  onChange={(e) =>
                    setUserData({ ...userData, mobileNo: e.target.value })
                  }
                  fullWidth
                />
                {mobileError && (
                  <span style={{ color: "red", fontSize: 11 }}>
                    Please enter a valid 10-digit mobile number!
                  </span>
                )}
              </Grid>
              <Grid item xs={5} sx={{ mt: 2, p: 1 }}>
                <TextField
                  error={emailError}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  value={userData.email}
                  disabled={!edit}
                  fullWidth
                  onBlur={() => {
                    const regex =
                      /^[_a-zA-Z0-9\.\s\-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
                    if (regex.test(userData.email)) {
                      setEmailError(false);
                    } else {
                      setEmailError(true);
                    }
                  }}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
                {emailError && (
                  <span style={{ color: "red", fontSize: 11 }}>
                    Please enter a valid e-mail address!
                  </span>
                )}
              </Grid>
              <Grid item xs={5} sx={{ mt: 2, p: 1, ml: "auto" }}>
                <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            disabled={!edit}
            value={gender}
            label="Gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
          </FormControl>
            
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  disabled={!edit}
                  id="tags-outlined"
                  sx={{ mt: 2, p: 1 }}
                  options={languages}
                  value={languageField}
                  onChange={(event, value) =>
                    setLanguageField(
                      value.map((lang) => ({
                        name: lang.name,
                        code: lang.code,
                      }))
                    )
                  }
                  getOptionLabel={(option) => option.name}
                  // filterSelectedOptions
                  renderInput={(params) => (
                    <TextField {...params} label="Languages" required />
                  )}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  required
                  error={BioError}
                  id="outlined-multiline-static"
                  variant="outlined"
                  disabled={!edit}
                  label="Bio"
                  value={bio}
                  onBlur={() => validName(bio, setBioError)}
                  onChange={(e) => setBio(e.target.value)}
                  multiline
                  fullWidth
                  minRows={4}
                  sx={{ mt: 2, p: 1 }}
                />
                {BioError && (
                  <span style={{ color: "red", fontSize: 11 }}>
                    Please enter valid bio
                  </span>
                )}
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </div>
  );
};

export default DoctorProfile;
