import {  Close,  } from "@mui/icons-material";

import {
  Alert,
  Autocomplete,

  Button,

  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getDateWithoutDate } from "../../utils/getData";
import { useAppSelector } from "../../Redux/Store";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { getSpecialities } from "../../utils/getSpecialities";
import { ExperienceInterface, speciality } from "../../utils/Doctors";
interface ExperienceType extends ExperienceInterface {
  positionErr?: string;
  hospitalErr?: string;
  startErr?: string;
  endErr?: string;
}
const Experience = () => {
  const user = useAppSelector((state) => state.user);
  const [edit, setEdit] = useState(false);
  const [licenceNumber, setLicenceNumber] = useState("");
  const [licenceErr, setLicenceErr] = useState<string | boolean>(false);
  const [speciality, setSpeciality] = useState();
  const [specialities, setSpecialities] = useState([
    { Id: "", name: "" },
  ] as speciality[]);
  const [success, setSuccess] = useState<string | boolean>(false);
  const [error, setError] = useState<string | boolean>(false);
  const status = useAppSelector((state) => state.status);
  const [experience, setExperience] = useState<null | ExperienceType[]>();

  useEffect(() => {
    getSpecialitiesdata();
    if (user) {
      user.specialities?.length && setSpecialities(user.specialities);
      user.licenceNumber && setLicenceNumber(user.licenceNumber);
      setExperienceData()
    }
  }, [status]);
  const setExperienceData = () => {
    user?.experience?.length ? setExperience(user.experience)
      : setExperience(null);
  };
  async function getSpecialitiesdata() {
    const speciality = await getSpecialities();
    console.log(speciality);
    setSpeciality(speciality);
  }
  const isValidLicenceNumber = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    if (/^[0-9]*$/.test(e.target.value) && e.target.value.length > 3) {
      setLicenceErr(false);
    } else {
      setLicenceErr("Please enter the valid licence number");
    }
  };
  const isValidPosition = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
    index: number
  ) => {
    console.log(experience)
    let err = "";
    if (e.target.value.length < 3 || !/^[a-zA-Z]*$/.test(e.target.value)) {
      err = "Please enter the valid position";
    } else {
      err = "";
    }
    if (experience) {
      const itemData = { ...experience[index], positionErr: err };
      setExperience([
        ...experience.slice(0, index),
        itemData,
        ...experience.slice(index + 1),
      ]);
    }
  };
  const isValidHospital = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
    index: number
  ) => {
    let err = "";
    if (e.target.value.length < 3 || !/^[a-zA-Z\s]*$/.test(e.target.value)) {
      err = "Please enter the valid hospital Name";
    } else {
      err = "";
    }
    if (experience) {
      const itemData = { ...experience[index], hospitalErr: err };
      setExperience([
        ...experience.slice(0, index),
        itemData,
        ...experience.slice(index + 1),
      ]);
    }
  };
  const handleSubmit = async () => {
    if (!edit) {
      setEdit(true);
      if (!experience) {
        setExperience([
          {
            position: "",
            hospitalName: "",
            startDate: getDateWithoutDate(new Date()),
            endDate: getDateWithoutDate(new Date()),
            positionErr: "",
            hospitalErr: "",
            startErr: "",
            endErr: "",
          },
        ]);
      }
    } else {
      console.log(specialities, licenceNumber);
      experience?.map((item) => {
        delete item.positionErr;
        delete item.hospitalErr;
        return item;
      });
      console.log(experience);
      try {
        const res = await axios.put(
          "http://localhost:4000/updateProfile/doctor",
          {
            doctorId: user?.Id,
            userId: user?.user.Id,
            experience: experience,
            licenceNumber: licenceNumber,
            specialities: specialities,
          }
        );
        setError(false);
        setSuccess("Your experience is succesfully updated");
        setEdit(false);
      } catch (error: any) {
        setError(error.response.data.message);
        setSuccess(false);
      }
    }
  };
  const disabledSubmit = () => {
    let disabled = false;
    experience?.map((item) => {
      if (
        !item.position ||
        !item.hospitalName ||
        new Date(item.startDate).getFullYear() > new Date().getFullYear() ||
        new Date(item.startDate).getFullYear() > new Date().getFullYear() ||
        item.positionErr ||
        item.hospitalErr ||
        item.startErr ||
        item.endErr
      ) {
        disabled = true;
      }
    });
    if (licenceErr || !licenceNumber || !specialities.length) {
      disabled = true;
    }
    return disabled;
  };
  const setStartDate = (start: string, end: string, index: number) => {
    console.log(start,end)
    let starterr="";
    let enderr = "";
    if (!isValidDate(start, end)) {
      starterr = "Start Date must be less than end Date";
      enderr="End Date must be greater than start Date"
     
    } else {
      starterr = "";
      enderr=""
    }
    if (experience) {
      const itemData = { ...experience[index], startErr: starterr, endErr:enderr, startDate: getDateWithoutDate(start), };
      console.log(itemData)
      setExperience([
        ...experience.slice(0, index),
        itemData,
        ...experience.slice(index + 1),
      ]);
      
    }
    
  };
  const setEndDate = (start: string, end: string, index: number) => {
    let starterr="";
    let enderr = "";
    if (!isValidDate(start, end)) {
      starterr = "Start Date must be less than end Date";
      enderr="End Date must be greater than start Date"
     
    } else {
      starterr = "";
      enderr=""
    }
    if (experience) {
      const itemData = { ...experience[index], startErr: starterr, endErr:enderr,  endDate: getDateWithoutDate(end)};
      setExperience([
        ...experience.slice(0, index),
        itemData,
        ...experience.slice(index + 1),
    
      
      ]);
    }
  };
  const isValidDate = (startDate: string, endDate: string) => {
    console.log(startDate,endDate)
    console.log("hello");
    const startYear = new Date(startDate).getFullYear();
    const endYear = new Date(endDate).getFullYear();
    console.log(startYear,endYear)
    if (endYear >= startYear) {
      console.log("true");
      return true;
    }
    console.log("false");
    return false;
  };
  const handleClose = () => {
    setExperienceData()
    setEdit(false);
  };
  return (
    <div>
      {user && (
        <Grid container>
          <Grid item xs={12}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              My Experience
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
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: "white",
              border: 1,
              borderColor: "divider",
              mt: 2,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Grid item xs={5} sx={{ p: 2 }}>
              <TextField
                id="outlined-basic"
                label="Licence Number"
                variant="outlined"
                required
                onBlur={isValidLicenceNumber}
                helperText={licenceErr}
                error={Boolean(licenceErr)}
                value={licenceNumber}
                onChange={(e) => setLicenceNumber(e.target.value)}
                disabled={!edit}
                fullWidth
              />
            </Grid>
            <Grid item xs={5}>
              {speciality && (
                <Autocomplete
                  multiple
                  disabled={!edit}
                  id="tags-outlined"
                  sx={{ p: 2 }}
                  options={speciality}
                  value={specialities}
                  onChange={(event, value) => {
                    console.log(value);
                    setSpecialities(
                      value.map((speciality) => ({
                        name: speciality.name,
                        Id: speciality.Id,
                      }))
                    );
                  }}
                  getOptionLabel={(option) => option.name}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField {...params} required label="Speciality(ies)" />
                  )}
                />
              )}
            </Grid>
          </Grid>
          {experience &&
            experience.map((item, index) => {
              return (
                <>
                <Grid item xs={12} sx={{textAlign:"right"}}>
                <IconButton
                    aria-label="delete"
                    
                    onClick={() => {
                     console.log(experience)
                      setExperience([
                        ...experience.slice(0, index),
                        ...experience.slice(index + 1),
                      ]);
                     
                    }}
                    disabled={!edit}
                  >
                    <Close sx={{ color: "grey"}} />
                  </IconButton>
                </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      backgroundColor: "white",
                      border: 1,
                      borderColor: "divider",
                  
                      display: "flex",
                      justifyContent:"space-evenly",
                    
                    }}
                  >
                    <Grid
                      item
                      xs={6}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                       
                      }}
                    >
                      <Grid item xs={10} sx={{ p: 2 }}>
                        <TextField
                          id="outlined-basic"
                          label="Position"
                          variant="outlined"
                        
                          onBlur={(e) => isValidPosition(e, index)}
                          helperText={item.positionErr}
                          error={Boolean(item.positionErr)}
                          value={item.position}
                          onChange={(e) => {
                            const itemData = {
                              ...item,
                              position: e.target.value,
                            };
                            setExperience([
                              ...experience.slice(0, index),
                              itemData,
                              ...experience.slice(index + 1),
                            ]);
                          }}
                          disabled={!edit}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={10} sx={{ p: 2, }}>
                        <TextField
                          id="outlined-basic"
                          label="Hospital"
                          variant="outlined"
                          onBlur={(e) => isValidHospital(e, index)}
                          helperText={item.hospitalErr}
                          error={Boolean(item.hospitalErr)}
                          value={item.hospitalName}
                          onChange={(e) => {
                            const itemData = {
                              ...item,
                              hospitalName: e.target.value,
                            };
                            setExperience([
                              ...experience.slice(0, index),
                              itemData,
                              ...experience.slice(index + 1),
                            ]);
                          }}
                          disabled={!edit}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Grid item xs={8} sx={{ p: 2, mb: 3 }}>
                        <LocalizationProvider  dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Start Date"
                          disableFuture
                            views={["month","year" ]}
                            value={dayjs(new Date(item.startDate))}
                            disabled={!edit}
                            slotProps={{
                              textField: {
                                helperText: item.startErr,
                                error:Boolean(item.startErr)
                           
                              
                              },
                            }}
                           
                            onChange={(value) => {
                              console.log(value);
                              if(value){
                              setStartDate(
                                value.format('YYYY/MM/DD'),
                                item.endDate,
                                index
                              );
                            
                              }
                           
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={8} sx={{ p: 2, mb: 3 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="End Date"
                            disableFuture
                            views={[ "month","year"]}
                            value={dayjs(new Date(item.endDate))}
                            disabled={!edit}
                            slotProps={{
                              textField: {
                                helperText: item.endErr,
                                error:Boolean(item.startErr)
                              },
                            }}
                            
                            onChange={(value) => {
                                console.log(value);
                                if(value){
                                    setEndDate(
                                        item.startDate,
                                        value.format('YYYY/MM/DD'),
                                        index
                                      );
                                     
                                }
                            
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
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
                console.log(experience)
                if (experience) {
                  setExperience([
                    ...experience,
                    {
                      position: "",
                      hospitalName: "",
                      startDate: getDateWithoutDate(new Date()),
                      endDate: getDateWithoutDate(new Date()),
                      positionErr: "",
                      hospitalErr: "",
                      startErr: "",
                      endErr: "",
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
  );
};

export default Experience;
