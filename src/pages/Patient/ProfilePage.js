import { Avatar, Box, Button, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
    const [edit,setEdit]=useState(false)
    const user=useSelector(state=>state.user)
    console.log(user.contactNumber)
    const getName=()=>{
        if(user.lastName){
            return `${user.firstName} ${user.lastName}`
        }
        return user.firstName
    }
  return (
    <div style={{backgroundColor:"#fafafa"}}>
      <Grid container sx={{ mt: 15 }}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{ color: "#3f51b5", fontWeight: "bold" }}
          >
            My Profile
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:2}}>
        <Avatar src="/broken-image.jpg" sx={{height:120 , width:120}} />
        <Typography sx={{fontSize:"12px", color:"grey", mt:2}}>JPEG, JPG or PNG image less than 1 MB<br/>
(Close up face picture looks great)</Typography>
        </Grid>
        <Grid item xs={6} sx={{textAlign:"right"}}>
        <Button
                  variant="contained"
                  disabled={edit}
                  onClick={() => setEdit(true)}
                  sx={{ backgroundColor: "#3f51b5" }}
                >
                  {edit ? "Save":"Edit"}
                </Button>
        </Grid>
        <Grid item xs={3} sx={{mt:2,p:1}}>
        <TextField id="outlined-basic" label="Name" variant="outlined" value={`${getName
        ()}`} disabled={!edit} fullWidth />
       </Grid>
        <Grid item xs={3} sx={{mt:2,p:1}}>
        <TextField id="outlined-basic" label="Phone Number" variant="outlined" value={`${user.contactNumber}`} disabled fullWidth/>
        </Grid>
        <Grid item xs={3} sx={{mt:2,p:1}}>
        <TextField id="outlined-basic" label="Email" variant="outlined" value={`${user.email}`} disabled fullWidth/>
        </Grid>
        <Grid item xs={3} sx={{mt:2,p:1}}>
        <FormControl sx={{ minWidth: 395 }}>
        <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          fullWidth
          value={`${user.gender}`}
          label="Gender"
          disabled={!edit}
          // onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={3} sx={{mt:2,p:1}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Date Of Birth" sx={{ minWidth: 390 }}
                defaultValue={dayjs(new Date())}
                disabled={!edit}
                // onChange={(value) => setUser({ ...user, dob: getDate(value) })}
              />
            </LocalizationProvider>
       </Grid>
        <Grid item xs={3} sx={{mt:2,p:1}}>
        <FormControl sx={{ minWidth: 395 }}>
        <InputLabel id="demo-simple-select-helper-label">Blood Group</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          fullWidth
          disabled={!edit}
          // value={age}
          label="Blood Group"
          // onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={3} sx={{mt:2,p:1}}>
        <TextField id="outlined-basic" label="House No./Street/Area" variant="outlined" value={'N/a'} disabled={!edit} fullWidth/>
        </Grid>
        <Grid item xs={3} sx={{mt:2,p:1}}>
        <TextField id="outlined-basic" label="Colony/Street/Locality" variant="outlined" value="N/a" disabled={!edit} fullWidth/>
        </Grid>
        <Grid item xs={3} sx={{mt:2,p:1}}>
        <TextField id="outlined-basic" label="City" variant="outlined" value="N/a"  disabled={!edit} fullWidth />
       </Grid>
        <Grid item xs={3} sx={{mt:2,p:1}}>
        <TextField id="outlined-basic" label="State" variant="outlined" value="N/a" disabled={!edit} fullWidth/>
        </Grid>
        <Grid item xs={3} sx={{mt:2,p:1}}>
        <TextField id="outlined-basic" label="Country" variant="outlined" value="N/a"  disabled={!edit} fullWidth/>
        </Grid>
        <Grid item xs={3} sx={{mt:2,p:1}}>
        <TextField id="outlined-basic" label="Pin Code" variant="outlined"value="N/a" disabled={!edit} fullWidth/>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;
