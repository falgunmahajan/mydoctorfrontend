import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppSelector } from "../../Redux/Store";
interface PatientDetailsProps{
    next:()=>void
}
const PatientDetails = ({next}:PatientDetailsProps) => {
  const user = useAppSelector((state) => state.user);
  return (
    <Grid container>
      <Grid item xs={4} sx={{ m: "auto" }}>
        <Typography variant="h4">Patient Details</Typography>
        <Box sx={{ mt: 2, border: 1, borderColor: "silver", p: 2,height:370 }}>
          <FormControl>
            <FormLabel
              id="demo-controlled-radio-buttons-group"
              sx={{ fontSize: 15, color: "black" }}
            >
              The appointment is for:
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value="Myself"
              // onChange={handleChange}
            >
              <FormControlLabel
                value="Myself"
                control={<Radio />}
                label="Myself"
                sx={{ "& .MuiFormControlLabel-label": { fontSize: 15 } }}
              />
              <FormControlLabel
                value="Someone Else"
                control={<Radio />}
                label="Someone Else"
                sx={{ "& .MuiFormControlLabel-label": { fontSize: 15 } }}
              />
            </RadioGroup>
          </FormControl>
          <Box sx={{ mx: 2 }}>
            <Typography sx={{ fontSize: 15 }}>
              Please provide the following information about the patient:
            </Typography>
            <TextField
              variant="outlined"
              label="Patient Name"
              value={user && `${user.user.firstName} ${user.user.lastName}`}
              disabled
              fullWidth
              sx={{ mt: 3 }}
            />
            <TextField
              variant="outlined"
              label="Patient's Mobile number "
              value={user && user.user.contactNumber}
              disabled
              fullWidth
              sx={{ mt: 3 }}
            />
            <Typography sx={{ fontSize: 14, mt: 2}}>
              Fee : Rs
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              fullWidth
              disabled
         
            >
              Back
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#3f51b5" }}
              onClick={next}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PatientDetails;
