import { Avatar, Box, Button, Grid, TextField, Typography } from "@mui/material";
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
        <TextField id="outlined-basic" label="Gender" variant="outlined" value={`${user.gender}`} disabled fullWidth/>
        </Grid>
        <Grid item xs={3} sx={{mt:2,p:1}}>
        <TextField id="outlined-basic" label="Name" variant="outlined" value={`${getName
        ()}`} disabled={!edit} fullWidth />
       </Grid>
        <Grid item xs={3} sx={{mt:2,p:1}}>
        <TextField id="outlined-basic" label="Blood Group" variant="outlined"  disabled={!edit} fullWidth/>
        </Grid>
        <Grid item xs={3} sx={{mt:2,p:1}}>
        <TextField id="outlined-basic" label="House No." variant="outlined"  disabled={!edit} fullWidth/>
        </Grid>
        <Grid item xs={3} sx={{mt:2,p:1}}>
        <TextField id="outlined-basic" label="Colony" variant="outlined"  disabled={!edit} fullWidth/>
        </Grid>
        <Grid item xs={3} sx={{mt:2,p:1}}>
        <TextField id="outlined-basic" label="City" variant="outlined"  disabled={!edit} fullWidth />
       </Grid>
        <Grid item xs={3} sx={{mt:2,p:1}}>
        <TextField id="outlined-basic" label="State" variant="outlined"  disabled={!edit} fullWidth/>
        </Grid>
        <Grid item xs={3} sx={{mt:2,p:1}}>
        <TextField id="outlined-basic" label="Country" variant="outlined"  disabled={!edit} fullWidth/>
        </Grid>
        <Grid item xs={3} sx={{mt:2,p:1}}>
        <TextField id="outlined-basic" label="Pin Code" variant="outlined"  disabled={!edit} fullWidth/>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;
