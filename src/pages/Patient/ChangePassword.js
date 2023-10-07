import { CancelOutlined, CheckCircleOutlineOutlined, CircleOutlined, Close, Done } from '@mui/icons-material';
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Footer from '../../components/Footer';

const ChangePassword = () => {
  const [validLowercase, setValidLowerCase] = useState(false);
  const [validUpperCase, setValidUpperCase] = useState(false);
  const [validSpecialCharacter, setValidSpecialCharacter] = useState(false);
  const [validNumber, setValidNumber] = useState(false);
  const [validLength, setValidLength] = useState(false);
  const [matchPassword, setMatchPassword] = useState(false);
  return (
   <Grid container sx={{ mt:18}}>
    <Grid item xs={4} sx={{m:"auto"}}>
     <Typography 
            variant="h4"
            sx={{ color: "#3f51b5", fontWeight: "bold"}}
          >
            Change Password
          </Typography>
          <TextField id="outlined-basic" label="Current Password" variant="outlined" fullWidth required sx={{mt:2}}/>
          <TextField id="outlined-basic" label="New Password" variant="outlined" fullWidth required sx={{mt:2}}/>
          <TextField id="outlined-basic" label="Confirm Password" variant="outlined" fullWidth required sx={{mt:2}}/>
          <Box sx={{my:3 }}>
            <Box sx={{display:"flex"}}>
              {validLowercase?<Done sx={{color:"green"}}/>:<Close sx={{color:"red"}}/>}
              <span style={{marginLeft:5}}>A lowercase letter.</span>
            </Box>
            <Box sx={{display:"flex"}}>
              {validUpperCase?<Done sx={{color:"green"}}/>:<Close sx={{color:"red"}}/>}
              <span style={{marginLeft:5}}>An uppercase letter.</span>
            </Box>
            <Box sx={{display:"flex"}}>
              {validSpecialCharacter?<Done sx={{color:"green"}}/>:<Close sx={{color:"red"}}/>}
              <span style={{marginLeft:5}}>At least one special letter.</span>
            </Box>
            <Box sx={{display:"flex"}}>
              {validNumber?<Done sx={{color:"green"}}/>:<Close sx={{color:"red"}}/>}
              <span style={{marginLeft:5}}>At least one number.</span>
            </Box>
            <Box sx={{display:"flex"}}>
              {validLength?<Done sx={{color:"green"}}/>:<Close sx={{color:"red"}}/>}
              <span style={{marginLeft:5}}>At least six characters.</span>
            </Box>
            <Box sx={{display:"flex"}}>
              {matchPassword?<Done sx={{color:"green"}}/>:<Close sx={{color:"red"}}/>}
              <span style={{marginLeft:5}}>Passwords must match</span>
            </Box>
          </Box>
          <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled
        >
          Submit
        </Button>
   </Grid>
   </Grid>
  
  )
}

export default ChangePassword
