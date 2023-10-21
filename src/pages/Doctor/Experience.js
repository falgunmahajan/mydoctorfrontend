import { Add, Delete } from "@mui/icons-material";
import {
  Alert,
  Autocomplete,
  Button,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDate } from "../../utils/validation";
import { getDateWithoutDate } from "../../utils/getDate";

const Experience = () => {
  const user = useSelector((state) => state.user);
  const [edit, setEdit] = useState(false);
  const [licenceNumber, setLicenceNumber] = useState();
  const [licenceErr, setLicenceErr] = useState(false);
  const [speciality, setSpeciality] = useState();
  const [specialities, setSpecialities] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const status = useSelector(state=>state.status)
  const [experience, setExperience] = useState([
    {
      position: "",
      hospitalName: "",
      startDate: getDateWithoutDate(new Date()),
      endDate: getDateWithoutDate(new Date()),
      positionErr: "",
      hospitalErr: "",
    },
  ]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "http://localhost:4000/specializations?limit=100"
      );
      setSpeciality(res.data.data);
    })();
    user.specialities && setSpecialities(user.specialities) 
    user.licenceNumber && setLicenceNumber(user.licenceNumber)
    user.experience && setExperience(user.experience)
  }, [status]);
  const isValidLicenceNumber = (e) => {
    if (/^[0-9a-zA-Z]*$/.test(e.target.value) && e.target.value.length > 3) {
      setLicenceErr(false);
    } else {
      setLicenceErr("Please enter the valid licence number");
    }
  };
  const isValidPosition = (e, index) => {
    let err = "";
    if (e.target.value.length < 3 || !/^[a-zA-Z]*$/.test(e.target.value)) {
      err = "Please enter the valid position";
    } else {
      err = "";
    }
    const itemData = { ...experience[index], positionErr: err };
    setExperience([
      ...experience.slice(0, index),
      itemData,
      ...experience.slice(index + 1),
    ]);
  };
  const isValidHospital = (e, index) => {
    let err = "";
    if (e.target.value.length < 3 || !/^[a-zA-Z\s]*$/.test(e.target.value)) {
      err = "Please enter the valid hospital Name";
    } else {
      err = "";
    }
    const itemData = { ...experience[index], hospitalErr: err };
    setExperience([
      ...experience.slice(0, index),
      itemData,
      ...experience.slice(index + 1),
    ]);
  };
  const handleSubmit = async () => {
    if (!edit) {
      setEdit(true);
    } else {
      console.log(specialities, licenceNumber);
      experience.map((item) => {
        delete item.positionErr;
        delete item.hospitalErr;
        return item;
      });
      console.log(experience)
      try {
        const res = await axios.put(
          "http://localhost:4000/updateProfile/doctor",
          {
            doctorId:user.Id,
            userId: user.user.Id,
            experience: experience,
            licenceNumber:licenceNumber,
            specialities:specialities
          }
        );
        setError(false);
        setSuccess("Your experience is succesfully updated");
        setEdit(false);
      } catch (error) {
        setError(error.response.data.message);
        setSuccess(false);
      }
    }
  };
  const disabledSubmit = () => {
    let disabled = false;
    experience.map((item) => {
      if (
        !item.position ||
        !item.hospitalName ||
        new Date(item.startDate).getFullYear()>new Date().getFullYear() ||
        new Date(item.startDate).getFullYear()>new Date().getFullYear() ||
        item.positionErr ||
        item.hospitalErr||
        item.startErr||
        item.endErr
      ) {
        disabled = true;
      }
    });
    if (licenceErr || !licenceNumber || !specialities.length) {
      disabled= true;
    }
    return disabled;
  };
  const isValidStartDate=(start,end,index)=>{
    let err = "";
    if (!isValidDate(start,end)) {
      err = "Start Date must be less than end Date";
      console.log(err)
    } else {
      err = "";
    }
    const itemData = { ...experience[index], startErr: err };
    setExperience([
      ...experience.slice(0, index),
      itemData,
      ...experience.slice(index + 1),
    ]);
  }
  const isValidEndDate=(start,end,index)=>{
    let err = "";
    if (!isValidDate(start,end)) {
      err = "End Date must be greater than end Date";
    } else {
      err = "";
    }
    const itemData = { ...experience[index], endErr: err };
    setExperience([
      ...experience.slice(0, index),
      itemData,
      ...experience.slice(index + 1),
    ]);
  }
  const isValidDate=(startDate,endDate)=>{
    console.log("hello")
    const startYear=new Date(startDate).getFullYear
    const endYear=new Date(endDate).getFullYear
    if(endYear>startYear){
      console.log("true")
      return true;
      
    }
    console.log("false")
    return false;
  }
  return (
    <div style={{ minHeight: "65vh" }}>
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
              Experience
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
          <Grid item xs={6} sx={{ mt: 2, p: 2 }}>
            <TextField
              id="outlined-basic"
              label="Licence Number"
              variant="outlined"
              onKeyUp={isValidLicenceNumber}
              helperText={licenceErr}
              error={licenceErr}
              value={licenceNumber}
              onChange={(e) => setLicenceNumber(e.target.value)}
              disabled={!edit}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            {speciality && (
              <Autocomplete
                multiple
                disabled={!edit}
                id="tags-outlined"
                sx={{ mt: 2, p: 2 }}
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
                  <TextField {...params} label="Specialities" />
                )}
              />
            )}
          </Grid>
          <Grid item xs={12} sx={{ px: 2 }}>
            <FormLabel required sx={{ fontSize: 20, color: "black" }}>
              Experience
            </FormLabel>
          </Grid>
          {experience.map((item, index) => {
            return (
              <>
                <Grid item xs={6} sx={{ p: 2 }}>
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
                <Grid item xs={6} sx={{ p: 2 }}>
                  <TextField
                    id="outlined-basic"
                    label="Hospital"
                    variant="outlined"
                    onKeyUp={(e) => isValidHospital(e, index)}
                    helperText={item.hospitalErr}
                    error={item.hospitalErr}
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
                <Grid item xs={6} sx={{ p: 2, mb: 3 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start Date"
                      sx={{ minWidth: { xs: 435, xl: 780 } }}
                      views={["year", "month"]}
                      value={dayjs(new Date(item.startDate))}
                      disabled={!edit}
                      error={item.startErr}
                      slotProps={{
                        textField: {
                          helperText:item.startErr ,
                        },
                      }}
                    
                      onChange={(value) => {
                        console.log(value)
                        isValidStartDate(value, item.endDate, index)
                        const itemData = { ...item, startDate: getDateWithoutDate(value) };  
                        setExperience([
                          ...experience.slice(0, index),
                          itemData,
                          ...experience.slice(index + 1),
                        ]);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6} sx={{ p: 2, mb: 3 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="End Date"
                      fullWidth
                      sx={{ minWidth: { xs: 435, xl: 780 } }}
                      views={["year", "month"]}
                      value={dayjs(new Date(item.endDate))}
                      disabled={!edit}
                      onChange={(value) => {
                        isValidEndDate(item.startDate,value, index)
                        const itemData = { ...item, endDate: getDateWithoutDate(value) };
                        setExperience([
                          ...experience.slice(0, index),
                          itemData,
                          ...experience.slice(index + 1),
                        ]);
                      }}
                    />
                  </LocalizationProvider>
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
                setExperience([
                  ...experience,
                  {
                    position: "",
                    hospitalName: "",
                    startDate: getDateWithoutDate(new Date()),
                    endDate:getDateWithoutDate(new Date()),
                    positionErr: "",
                    hospitalErr: "",
                    startErr: "",
                    endErr: "",
                  },
                ]);
              }}
              // sx={{ backgroundColor: "#3f51b5" }}
            >
              Add Row
            </Button>
          </Grid>
          {experience.length > 1 && (
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
                  setExperience(experience.slice(0, -1));
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

export default Experience;
