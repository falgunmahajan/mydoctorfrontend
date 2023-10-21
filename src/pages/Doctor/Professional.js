import { Add, Delete } from "@mui/icons-material";
import { Alert, Autocomplete, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Professional = () => {
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [hospital,setHospital]=useState("")
  const user = useSelector((state) => state.user);
  const status = useSelector((state) => state.status);
  const [profile, setProfile] = useState([
    {
      position: "",
      hospital:{Id:"",hospitalName:""},
      consultationFee: "",
      positionErr: "",
      consultationErr: "",
    },
  ]);

  useEffect(()=>{
    (async () => {
        const res = await axios.get(
          "http://localhost:4000/hospitals"
        );
        setHospital(res.data.data);
      })();
      user.hospitals && setProfile(user.hospitals.map(item=>({
        position:item.hospitalDoctorMapping.position,
        hospital:{Id:item.Id,hospitalName:item.hospitalName},
        consultationFee:item.hospitalDoctorMapping.consultationFee,
        positionErr: "",
        consultationErr: "",
      })))
  },[status])
  const isValidPosition = (e, index) => {
    let err = "";
    if (e.target.value.length < 3 || !/^[a-zA-Z]*$/.test(e.target.value)) {
      err = "Please enter the valid position";
    } else {
      err = "";
    }
    const itemData = { ...profile[index], positionErr: err };
    setProfile([
      ...profile.slice(0, index),
      itemData,
      ...profile.slice(index + 1),
    ]);
  };
  
  const isValidConsultation = (e, index) => {
    let err = "";
    if ( !/^[0-9]*$/.test(e.target.value)) {
      err = "Please enter the valid Consultation Fee";
    } else {
      err = "";
    }
    const itemData = { ...profile[index], consultationErr: err };
    setProfile([
      ...profile.slice(0, index),
      itemData,
      ...profile.slice(index + 1),
    ]);
  };
  const disabledSubmit = () => {
    let disabled = false;
    profile.map((item) => {
      if (
        !item.position ||
        !item.hospital ||
        !item.consultationFee ||
        item.positionErr ||
        item.consultationErr
      ) {
        disabled = true;
      }
    });
    return disabled;
  };
  const handleSubmit = async () => {
    if (!edit) {
      setEdit(true);
    }
    else{
        console.log(profile)
        profile.map((item) => {
            delete item.positionErr;
            delete item.consultationErr;
            return item;
          });
          try {
            const res = await axios.put(
              "http://localhost:4000/updateProfile/doctor",
              {
                doctorId:user.Id,
                profile:JSON.stringify(profile)
              }
            );
            setError(false);
            setSuccess("Your professional profile is succesfully updated");
            setEdit(false);
          } catch (error) {
            setError(error.response.data.message);
            setSuccess(false);
          }
        
    }
  };
  return (
    <div style={{ minHeight: "80vh" }}>
      {user && (
        <Grid container sx={{ mt: 15 }}>
          <Grid item xs={12}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="h4"
              sx={{ color: "#3f51b5", fontWeight: "bold" }}
            >
              Professional Profile
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              disabled={edit && disabledSubmit()}
              onClick={handleSubmit}
              sx={{ backgroundColor: "#3f51b5" }}
            >
              {edit ? "Save" : "Edit"}
            </Button>
          </Grid>
          {profile.map((item, index) => {
            return (
              <>
                <Grid item xs={4} sx={{ p: 2 }}>
                  <TextField
                    id="outlined-basic"
                    label="Position"
                    variant="outlined"
                    onKeyUp={(e) => isValidPosition(e, index)}
                    helperText={item.positionErr}
                    error={item.positionErr}
                    value={item.position}
                    onChange={(e) => {
                      const itemData = { ...item, position: e.target.value };
                      setProfile([
                        ...profile.slice(0, index),
                        itemData,
                        ...profile.slice(index + 1),
                      ]);
                    }}
                    disabled={!edit}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4} sx={{ p: 2 }}>
                <Autocomplete
              disabled={!edit}
              id="combo-box-demo"
              options={hospital}
              value={item.hospital}
              onChange={(event, value) =>{
                const itemData = {
                            ...item,
                            hospital:{Id:value.Id,hospitalName:value.hospitalName}
                          };
                          setProfile([
                            ...profile.slice(0, index),
                            itemData,
                            ...profile.slice(index + 1),
                          ]);
                        }} 
              getOptionLabel={(option) => option.hospitalName}
            //   filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Hospital" />
              )}
            />

          
                </Grid>
                <Grid item xs={4} sx={{ p: 2 }}>
                  <TextField
                    id="outlined-basic"
                    label="Consultation Fee"
                    variant="outlined"
                    onKeyUp={(e) => isValidConsultation(e, index)}
                    helperText={item.consultationErr}
                    error={item.consultationErr}
                    value={item.consultationFee}
                    onChange={(e) => {
                      const itemData = { ...item, consultationFee: e.target.value };
                      setProfile([
                        ...profile.slice(0, index),
                        itemData,
                        ...profile.slice(index + 1),
                      ]);
                    }}
                    disabled={!edit}
                    fullWidth
                  />
                </Grid>
              </>
            );
          })}
          <Grid
            item
            xs={2}
            sx={{
              ml: "auto",
              textAlign: "right",
              mt: 3,
              display: edit ? "block" : "none",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => {
                setProfile([
                  ...profile,
                  {
                    position: "",
                    hospital: {Id:"", hospitalName:""},
                    consultationFee: "",
                    positionErr: "",
                    consultationErr: "",
                  },
                ]);
              }}
              // sx={{ backgroundColor: "#3f51b5" }}
            >
              Add Row
            </Button>
          </Grid>
          {profile.length > 1 && (
            <Grid
              item
              xs={2}
              sx={{
                mt: 3,
                ml: 2,
                display: edit ? "block" : "none",
              }}
            >
              <Button
                variant="outlined"
                startIcon={<Delete />}
                onClick={() => {
                  setProfile(profile.slice(0, -1));
                }}
                // sx={{ backgroundColor: "#3f51b5" }}
              >
                Delete Row
              </Button>
            </Grid>
          )}
        </Grid>
      )}
    </div>
  );
};

export default Professional;
