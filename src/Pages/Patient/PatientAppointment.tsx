import {
  Alert,
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { appointmentTypes, getSlotTime } from "../../utils/appointments";
import { useAppSelector } from "../../Redux/Store";
import axios from "axios";
import { Close, QuestionAnswerOutlined } from "@mui/icons-material";
import moment from "moment";

const PatientAppointment = () => {
  const [value, setValue] = useState(10);
  const location = useLocation();
  console.log(location);
  const success = location.state ? location.state.success : "";
  const error = location.state ? location.state.error : "";
  const [appointment, setAppointment] = useState([] as appointmentTypes[]);
  const user = useAppSelector((state) => state.userReducer.user);
  const [page, setPage] = useState(1);
  let start, end, count;

  count = Math.ceil(appointment.length / value);
  start = value * page - value;
  end = value * page;

  useEffect(() => {
    getAppointmentData();
  }, [user]);
  const getAppointmentData = async () => {
    try {
      const resp = await axios.get(
        `http://localhost:4000/appointments?patientId=${user?.Id}`
      );
      console.log(resp);
      setAppointment(resp.data);
    } catch (error) {}
  };
  return (
    <div>
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container>
        <Grid item xs={6}>
          <Typography
            sx={{ color: "#3f51b5", fontWeight: "bold", fontSize: 28 }}
          >
            My Appointments
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: 15, color: "grey", mr: 1 }}>
              {" "}
              Number of records
            </Typography>

            <FormControl variant="standard">
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={value}
                onChange={(e) => {
                  setValue(Number(e.target.value));
                }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        {!appointment.length ? (
          <Grid item xs={12} sx={{ backgroundColor: "white", mt: 1 }}>
            <Typography
              sx={{ fontSize: 15, color: "grey", p: 3, textAlign: "center" }}
            >
              No appointments are made yet
            </Typography>
          </Grid>
        ) : (
          <>
            {appointment.slice(start, end).map((item) => (
              <Grid
                item
                xs={12}
                sx={{
                  backgroundColor: "white",
                  mt: 2,
                  py: 1,
                  px: 2,
                  border: 1,
                  borderColor: "divider",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src="/broken-image.jpg"
                    sx={{ width: 80, height: 80, mr: 2 }}
                  />
                  <Typography sx={{ fontSize: 15, fontWeight: "bold" }}>
                    {item.doctor?.user.firstName}{" "}
                    {item.doctor?.user.lastName
                      ? item.doctor.user.lastName
                      : "self"}
                  </Typography>
                </Box>
                <Box>
                  <span style={{ display: "flex" }}>
                    <Typography sx={{ fontSize: 14, color: "#7986cb" }}>
                      Date:
                    </Typography>
                    <Typography sx={{ fontSize: 14, ml: 0.5 }}>
                      {moment(item.slot.startTime).format("D MMM, YYYY")}
                    </Typography>
                  </span>
                  <span style={{ display: "flex" }}>
                    <Typography sx={{ fontSize: 14, color: "#7986cb" }}>
                      Timing:
                    </Typography>
                    <Typography sx={{ fontSize: 14, ml: 0.5 }}>
                      {getSlotTime(item.slot)}
                    </Typography>
                  </span>
                </Box>
                <Box>
                  <span style={{ display: "flex" }}>
                    <Typography sx={{ fontSize: 14, color: "#7986cb" }}>
                      Patient:
                    </Typography>
                    <Typography sx={{ fontSize: 14, ml: 0.5 }}>
                      {item.otherName ? item.otherName : "Self"}
                    </Typography>
                  </span>
                  <span style={{ display: "flex" }}>
                    <Typography sx={{ fontSize: 14, color: "#7986cb" }}>
                      Status:
                    </Typography>
                    <span
                      style={{
                        borderRadius: "50rem",
                        backgroundColor: "#64b5f6",
                        padding: "2px 8px 0 3px",
                      }}
                    >
                      <Typography sx={{ fontSize: 12, ml: 0.5, color: "#fff" }}>
                        {item.appointmentStatus}
                      </Typography>
                    </span>
                  </span>
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<QuestionAnswerOutlined />}
                  sx={{ borderColor: "#3f51b5", color: "#3f51b5" }}
                >
                  Consult
                </Button>
              </Grid>
            ))}

            {count && (
              <Grid item xs={12}>
                {" "}
                <Pagination
                  variant="outlined"
                  count={count}
                  page={page}
                  color="primary"
                  onChange={(event, value) => setPage(value)}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 3,
                   
                  }}
                />
              </Grid>
            )}
          </>
        )}
      </Grid>
    </div>
  );
};

export default PatientAppointment;
