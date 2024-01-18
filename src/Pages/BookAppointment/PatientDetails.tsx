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
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { validName } from "../../utils/Validation";
import { setAppointmentData } from "../../Redux/slotsSlice";
interface PatientDetailsProps {
  next: () => void;
}
const PatientDetails = ({ next }: PatientDetailsProps) => {
  const user = useAppSelector((state) => state.userReducer.user);
  const [forSelf, setForSelf] = useState(true);
  const [patientName, setPatientName] = useState("");
  const [patientMobileNumber, setPatientMobileNumber] = useState("");
  const [nameError, setNameError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const appointmentData = useAppSelector((state) => state.slotsReducer.data);
  const dispatch = useAppDispatch();
  console.log(appointmentData);
  useEffect(() => {
    if (forSelf && user) {
      setPatientName(`${user.user.firstName} ${user.user.lastName}`);
      setPatientMobileNumber(user.user.contactNumber);
      setNameError(false);
      setMobileError(false);
    } else {
      setPatientName("");
      setPatientMobileNumber("");
    }
  }, [user, forSelf]);
  return (
    <Grid container>
      <Grid item xs={5} xl={4} sx={{ m: "auto" }}>
        <Typography variant="h4">Patient Details</Typography>
        <Box
          sx={{ mt: 2, border: 1, borderColor: "silver", p: 2, height: 370 }}
        >
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
              value={forSelf ? "Myself" : "Someone Else"}
              onChange={() => {
                setForSelf(!forSelf);
              }}
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
              error={nameError}
              label="Patient Name"
              value={patientName}
              disabled={forSelf}
              fullWidth
              helperText={nameError && "Please enter a valid name!"}
              sx={{ mt: 3 }}
              onKeyUp={() => validName(patientName, setNameError)}
              onChange={(e) => setPatientName(e.target.value)}
            />
            <TextField
              variant="outlined"
              error={mobileError}
              label="Patient's Mobile number "
              value={patientMobileNumber}
              disabled={forSelf}
              fullWidth
              sx={{ mt: 3 }}
              helperText={mobileError && "Please enter a valid 10-digit mobile number!"}
              onKeyUp={()=>{
                if(!(/^[1-9][0-9]{9}$/).test(patientMobileNumber) || patientMobileNumber.length<10){
                  setMobileError(true)
                }
                else{
                  setMobileError(false)
                }
              }}
              onChange={(e) => setPatientMobileNumber(e.target.value)}
            />
            <Typography sx={{ fontSize: 14, mt: 2 }}>
              Fee : Rs{" "}
              {
                appointmentData?.slots?.hospital.doctors[0]
                  .hospitalDoctorMapping.consultationFee
              }
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <Button variant="outlined" fullWidth disabled>
              Back
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#3f51b5" }}
              onClick={() => {
                if (!forSelf) {
                  dispatch(
                    setAppointmentData({
                      ...appointmentData,
                      otherName: patientName,
                      otherMobileNumber: patientMobileNumber,
                    })
                  );
                }
                next()
              }}
              disabled={!forSelf && (!patientName || !patientMobileNumber)}
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
