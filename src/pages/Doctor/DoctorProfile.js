import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const DoctorProfile = () => {
    const [edit,setEdit]=useState(false)
    const [img, setImg] = useState("/broken-image.jpg");
    const user = useSelector((state) => state.user)
    const handleSubmit = async () => {
        if (!edit) {
          setEdit(true);
        }
    }
    const getName = () => {
        if (user.user.lastName) {
          return `${user.user.firstName} ${user.user.lastName}`;
        }
        return user.user.firstName;
      };
  return (
    <div >
        <Grid container sx={{ mt: 15, minHeight: "65vh" }}>
        <Grid item xs={12}>
          {/* {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>} */}
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{ color: "#3f51b5", fontWeight: "bold" }}
          >
            My Profile
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt: 2}}>
          <Avatar src={img} sx={{ height: 120, width: 120, ml:2 }} />
          <Box >
            <Button component="label" variant='contained' sx={{backgroundColor:"white",mt:2}}> <Typography sx={{color:"#3f51b5",fontWeight:"bold"}}>upload image</Typography>
              <input
                type="file"
                hidden
                name="Image"
                accept=".jpg, .jpeg, .png"
                // onChange={handleUpload}
              />
            </Button>
          </Box>
          
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            // disabled={edit && disabled}
            onClick={handleSubmit}
            sx={{ backgroundColor: "#3f51b5" }}
          >
            {edit ? "Save" : "Edit"}
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ mt: 2, p: 1 }}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={`${getName()}`}
            disabled
            fullWidth
          />
        </Grid>
        </Grid>
    </div>
  )
}


export default DoctorProfile
