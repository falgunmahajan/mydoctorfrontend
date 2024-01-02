import { Close, Delete } from '@mui/icons-material';
import { Alert, Autocomplete, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../Redux/Store';
import { hospital, hospitalDoctor } from '../../utils/Doctors';
interface profileTypes{
    position: string,
    hospital:hospitalType,
    consultationFee:string,
    positionErr?: string,
    consultationErr?: string,
}
interface hospitalType{
    Id:string,hospitalName:string
}
const Professional = () => {
    const [edit, setEdit] = useState(false);
    const [success, setSuccess] = useState<string|boolean>(false);
    const [error, setError] = useState<string|boolean>(false);
    const [hospital,setHospital]=useState([] as hospitalType[])
    const user = useAppSelector((state) => state.user);
    const status = useAppSelector((state) => state.status);
    const [profile, setProfile] = useState<profileTypes[]|null>(null);
  
    useEffect(()=>{
      (async () => {
          const res = await axios.get(
            "http://localhost:4000/hospitals"
          );
          setHospital(res.data.data);
        })();
       setQualificationData()
    },[status])
    const setQualificationData = () => {
        user?.hospitals?.length
          ? setProfile(user.hospitals.map(item=>({
            position:item.hospitalDoctorMapping.position,
            hospital:{Id:item.Id,hospitalName:item.hospitalName},
            consultationFee:item.hospitalDoctorMapping.consultationFee,
            positionErr: "",
            consultationErr: "",
          })))
          : setProfile(null);
      };
    const isValidPosition = (  e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
        index: number) => {
      let err = "";
      if (e.target.value.length < 3 || !/^[a-zA-Z]*$/.test(e.target.value)) {
        err = "Please enter the valid position";
      } else {
        err = "";
      }
      if(profile){
        const itemData = { ...profile[index], positionErr: err };
        setProfile([
          ...profile.slice(0, index),
          itemData,
          ...profile.slice(index + 1),
        ]);
      }
     
    };
    
    const isValidConsultation = (  e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
        index: number) => {
      let err = "";
      if ( !/^[0-9]*$/.test(e.target.value)) {
        err = "Please enter the valid Consultation Fee";
      } else {
        err = "";
      }
      if(profile){
        const itemData = { ...profile[index], consultationErr: err };
        setProfile([
          ...profile.slice(0, index),
          itemData,
          ...profile.slice(index + 1),
        ]);
      }
     
    };
    const disabledSubmit = () => {
      let disabled = false;
      if(profile){
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
      }
     
    const handleSubmit = async () => {
      if (!edit) {
        setEdit(true);
        if(!profile){
            setProfile([
                {
                  position: "",
                  hospital: {Id:"", hospitalName:""},
                  consultationFee: "",
                  positionErr: "",
                  consultationErr: "",
                },
              ]);
        }
      }
      else{
          console.log(profile)
          profile?.map((item) => {
              delete item.positionErr;
              delete item.consultationErr;
              return item;
            });
            try {
              const res = await axios.put(
                "http://localhost:4000/updateProfile/doctor",
                {
                  doctorId:user?.Id,
                  profile:JSON.stringify(profile)
                }
              );
              setError(false);
              setSuccess("Your professional profile is succesfully updated");
              setEdit(false);
            } catch (error:any) {
              setError(error.response.data.message);
              setSuccess(false);
            }
          
      }
    };
    const handleClose = () => {
        setQualificationData()
        setEdit(false);
      };
  return (
    <div>
      {user && (
        <Grid container >
          <Grid item xs={12}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
          </Grid>

          <Grid item xs={6}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              My Hospitals
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "right" }}>
          <Button
              variant="contained"
              sx={{
                backgroundColor: "#3f51b5",
                display: edit ? "inline" : "none",
                mr: 1,
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={edit && disabledSubmit()}
              onClick={handleSubmit}
              sx={{ backgroundColor: "#3f51b5" }}
            >
              {edit ? "Save" : "Edit"}
            </Button>
          </Grid>
          {!profile?
          <Grid item xs={12}>
            <Typography sx={{color:"grey", textAlign:"center", fontSize:18}}>
            No Hospital added
            </Typography>
           
          </Grid>
          : profile.map((item, index) => {
            return (
              <>
              <Grid
                item
                xs={12}
                sx={{
                  backgroundColor: "white",
                  border: 1,
                  borderColor: "divider",
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Grid item xs={3.5} sx={{ p: 2 }}>
                  <TextField
                    id="outlined-basic"
                    required
                    label="Position"
                    variant="outlined"
                    onBlur={(e) => isValidPosition(e, index)}
                    helperText={item.positionErr}
                    error={Boolean(item.positionErr)}
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
                <Grid item xs={3.5} sx={{ p: 2 }}>
                <Autocomplete
              disabled={!edit}
              id="combo-box-demo"
              options={hospital}
              value={item.hospital}
              onChange={(event, value) =>{
                if(value){
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
                }
               
              getOptionLabel={(option) => option.hospitalName}
            //   filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} required label="Hospital" />
              )}
            />

          
                </Grid>
                <Grid item xs={3.5} sx={{ p: 2 }}>
                  <TextField
                    id="outlined-basic"
                    label="Consultation Fee"
                    variant="outlined"
                    required
                    onBlur={(e) => isValidConsultation(e, index)}
                    helperText={item.consultationErr}
                    error={Boolean(item.consultationErr)}
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
                <Grid
                  title="Delete Row"
                  item
                  xs={0.5}
                  sx={{ textAlign: "right", mr: 2 }}
                >
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      
                      setProfile([
                        ...profile.slice(0, index),
                        ...profile.slice(index + 1),
                      ]);
                      
                    }}
                    disabled={!edit}
                  >
                    <Close sx={{ color: "grey" }} />
                  </IconButton>
              
                </Grid>
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
              variant="contained"
              sx={{ backgroundColor: "#3f51b5" }}
              onClick={() => {
                if(profile){
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
                }
                
              }}
              
            >
              Add Row
            </Button>
          </Grid>
     
        </Grid>
      )}
    </div>
  )
}

export default Professional
