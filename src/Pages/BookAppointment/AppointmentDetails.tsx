import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../Redux/Store";
interface AppointmentDetailsProps {
  next: () => void;
  back: () => void;
}
const AppointmentDetails = ({ next, back }: AppointmentDetailsProps) => {
  const appointmentData = useAppSelector((state) => state.slotsReducer.data);

  console.log(appointmentData);
  const user = useAppSelector((state) => state.userReducer.user);
  return (
    <Grid container>
      <Grid item xs={4} sx={{ m: "auto" }}>
        <Typography variant="h4">Appointment Details</Typography>
        <Box
          sx={{ mt: 2, border: 1, borderColor: "silver", p: 2, height: 370 }}
        >
          <Grid container>
            <Grid item xs={6}>
              <Typography sx={{ fontSize: 15 }}>Patient's name</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ fontSize: 15 }}>
                {appointmentData?.otherName
                  ? appointmentData.otherName
                  : `${user?.user.firstName} ${user?.user.lastName}`}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={6}>
              <Typography sx={{ fontSize: 15 }}>
                Patient's contact number
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ fontSize: 15 }}>
                {appointmentData?.otherMobileNumber
                  ? appointmentData.otherMobileNumber
                  : user?.user.contactNumber}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={6}>
              <Typography sx={{ fontSize: 15 }}>Consultation fee</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ fontSize: 15 }}>
                Rs{" "}
                {
                  appointmentData?.slots?.hospital.doctors[0]
                    .hospitalDoctorMapping.consultationFee
                }
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={6}>
              <Typography sx={{ fontSize: 15 }}>Doctor's name</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ fontSize: 15 }}>Dr. {appointmentData?.doctor?.user.firstName} {appointmentData?.doctor?.user.lastName}</Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={6}>
              <Typography sx={{ fontSize: 15 }}>Appointment date</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ fontSize: 15 }}>
                Sunday, 14 Jan, 2024
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={6}>
              <Typography sx={{ fontSize: 15 }}>Appointment time</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ fontSize: 15 }}>{appointmentData?.slots?.startTime}</Typography>
            </Grid>
          </Grid>
          <Divider />
        </Box>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              fullWidth
              onClick={back}
              sx={{ color: "black", borderColor: "silver" }}
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
              Confirm and proceed
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AppointmentDetails;
