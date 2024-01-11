import React, { useEffect, useState } from "react";
import {
  DoctorsTypes,
  getDoctorById,
  getSlotsForDoctors,
  slotTypes,
} from "../../utils/Doctors";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  IconButton,
  Rating,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { ExpandMore, Favorite, Share, Star } from "@mui/icons-material";

import moment from "moment";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { setAppointmentData } from "../../Redux/slotsSlice";
// import { TabPanel } from "@mui/lab";
const labels: { [index: string]: string } = {
  1: "Very sad",
  2: "Sad",
  3: "Neutral",
  4: "Happy",
  5: "Very Happy",
};
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#3f51b5",
  },
  "& .MuiRating-iconHover": {
    color: "#3f51b5",
  },
});
const DoctorDetails = () => {
  const [slots, setSlots] = useState([] as slotTypes[]);
  const [doctor, setDoctor] = useState<null | DoctorsTypes>();
  const [tabValue, setTabValue] = React.useState(0);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [ratingValue, setRatingValue] = React.useState<number | null>(2);
  const [hover, setHover] = React.useState(-1);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const user = useAppSelector((state) => state.userReducer.user);
  const navigate = useNavigate();
  const dispatch=useAppDispatch()

  
  const handleExpandedChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setTabValue(newValue);
  };

  const { Id } = useParams();
  useEffect(() => {
    getDoctorsdata();
    getSlots();
  }, []);
  async function getDoctorsdata() {
    if (Id) {
      const doctor = await getDoctorById(Id);
      setDoctor(doctor);
    }
  }
  async function getSlots() {
    if (Id) {
      const slots = await getSlotsForDoctors(Id);
      setSlots(slots);
    }
  }
  const getDate = (startDate: string) => {
    const date = new Date(startDate);
    date.setHours(0, 0, 0, 0);
    return date.toISOString();
  };
  function groupSlotsByDate() {
    const group: any = {};

    slots.map((slot) => {
      if (slot.size !== slot.count) {
        const slotDate = getDate(slot.startTime);
        if (!group[slotDate]) {
          group[slotDate] = [];
        }
        group[slotDate].push(slot);
      }
    });
    return group;
  }
  const groupedSlots = groupSlotsByDate();
  console.log(groupedSlots);
  const getSlotTime = (slot: slotTypes) => {
    const start = moment(slot.startTime).format("hh:mm a");
    const end = moment(slot.endTime).format("hh:mm a");
    return `${start}-${end}`;
  };
  const bookSlots = (slots: slotTypes) => {
    if (!user) {
      setShowLoginMessage(true);
    } else {
      dispatch(setAppointmentData({slots,doctor}))
    
      navigate("/book-appointment");
    }
  };
  return (
    <div>
      {doctor && (
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={4} sx={{ mr: 3 }}>
            <Card sx={{ width: "100%" }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ backgroundColor: "red" }}>
                    <img
                      alt={`${doctor.user.firstName} ${doctor.user.lastName}`}
                    />
                  </Avatar>
                }
                title={`Dr. ${doctor.user.firstName} ${doctor.user.lastName}`}
                // subheader="September 14, 2016"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {doctor.bio ? doctor.bio : "Bio not available"}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <Favorite />
                </IconButton>
                <IconButton aria-label="share">
                  <Share />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={4}>
            {!slots.length ? (
              <Typography sx={{ fontSize: 15 }}>No slot available</Typography>
            ) : (
              <AppBar position="static" color="default">
                <Tabs
                  value={tabValue}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  {Object.keys(groupedSlots).map((slot, index) => {
                    return (
                      <Tab
                        label={moment(slot).format("MMM D, YYYY")}
                        id={`simple-tab-${index}`}
                        aria-controls={`simple-tabpanel-${index}`}
                      />
                    );
                  })}
                </Tabs>
              </AppBar>
            )}
            {slots.length > 0 &&
              Object.keys(groupedSlots).map((slot, index) => {
                return (
                  <TabPanel value={tabValue} index={index}>
                    <Box sx={{ backgroundColor: "white", p: 1 }}>
                      {groupedSlots[slot].map((slotData: slotTypes) => (
                        <Chip
                          label={
                            <>
                              {getSlotTime(slotData)}
                              <br />
                             Hospital: {slotData.hospital.hospitalName} <br />
                              Consultation Fee:
                              {
                                slotData.hospital.doctors[0].hospitalDoctorMapping
                                  .consultationFee
                              }
                            </>
                          }
                          variant="outlined"
                          color="primary"
                          sx={{ m: 1, height: "auto" }}
                          onClick={() => bookSlots(slotData)}
                        />
                      ))}
                    </Box>
                  </TabPanel>
                );
              })}
            {showLoginMessage && (
              <Box>
                <Typography sx={{ fontSize: 15, color: "red" }}>
                  Please
                  <Link to="/auth/login" style={{ textDecoration: "none" }}>
                    {" "}
                    Sign in{" "}
                  </Link>
                  /{" "}
                  <Link to="/auth/signup" style={{ textDecoration: "none" }}>
                    Register{" "}
                  </Link>{" "}
                  to book an appointment.
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid item xs={8} sx={{ backgroundColor: "white", mt: 3 }}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleExpandedChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  sx={{
                    width: "33%",
                    flexShrink: 0,
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  Hospitals
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {doctor.hospitals.length ? (
                  <ul>
                    {doctor.hospitals.map((hospital) => (
                      <li style={{ marginBottom: 1 }}>
                        <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
                          {hospital.hospitalName}
                        </Typography>
                        <Box sx={{ display: "flex" }}>
                          <Typography sx={{ fontSize: 14, mr: 3 }}>
                            Position:{hospital.hospitalDoctorMapping.position}
                          </Typography>
                          <Typography sx={{ fontSize: 14 }}>
                            Consultation Fee:
                            {hospital.hospitalDoctorMapping.consultationFee}
                          </Typography>
                        </Box>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography sx={{ fontSize: 14 }}>
                    No hospitals available
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleExpandedChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography
                  sx={{
                    width: "33%",
                    flexShrink: 0,
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  Specialities
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {doctor.specialities.length ? (
                  <ul>
                    {doctor.specialities.map((speciality) => (
                      <li style={{ marginBottom: 1, fontSize: 14 }}>
                        {speciality.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography sx={{ fontSize: 14 }}>
                    No specialities available
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleExpandedChange("panel3")}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography
                  sx={{
                    width: "33%",
                    flexShrink: 0,
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  Qualifications
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {doctor.Qualification ? (
                  <ul>
                    {doctor.Qualification.map((item) => (
                      <li style={{ marginBottom: 1, fontSize: 14 }}>
                        {item.degree}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography sx={{ fontSize: 14 }}>
                    No qualifications available
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleExpandedChange("panel4")}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography
                  sx={{
                    width: "33%",
                    flexShrink: 0,
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  Experience
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {doctor.experience ? (
                  <ul>
                    {doctor.experience.map((item) => (
                      <li style={{ marginBottom: 1, fontSize: 14 }}>
                        {item.position} at {item.hospitalName}({item.fromYear}-
                        {item.toYear})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography sx={{ fontSize: 14 }}>No experience</Typography>
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel5"}
              onChange={handleExpandedChange("panel5")}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel5bh-content"
                id="panel5bh-header"
              >
                <Typography
                  sx={{
                    width: "33%",
                    flexShrink: 0,
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  Languages
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {doctor.languages ? (
                  <ul>
                    {doctor.languages.map((language) => (
                      <li style={{ marginBottom: 1, fontSize: 14 }}>
                        {language.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography sx={{ fontSize: 14 }}>
                    No language available
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel6"}
              onChange={handleExpandedChange("panel6")}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel6bh-content"
                id="panel6bh-header"
              >
                <Typography
                  sx={{
                    width: "33%",
                    flexShrink: 0,
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  Reviews
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: 14 }}>
                  No reviews available
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel7"}
              onChange={handleExpandedChange("panel7")}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel7bh-content"
                id="panel7bh-header"
              >
                <Typography
                  sx={{
                    width: "33%",
                    flexShrink: 0,
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  Write a review
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component="legend" sx={{ fontSize: 15 }}>
                  Rating
                </Typography>
                <Box
                  sx={{
                    width: 300,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <StyledRating
                    name="hover-feedback"
                    value={ratingValue}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      setRatingValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={
                      <Star style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  {ratingValue !== null && (
                    <Box sx={{ ml: 2, fontSize: 15 }}>
                      {labels[hover !== -1 ? hover : ratingValue]}
                    </Box>
                  )}
                </Box>
                <form style={{ marginTop: 30 }}>
                  <input
                    type="text"
                    placeholder="Write a Review"
                    style={{
                      border: "1px solid grey",

                      borderRadius: 10,
                      padding: "40px 15px",
                    }}
                  />
                  <br />
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#3f51b5",
                      color: "#3f51b5",
                      mt: 4,
                      borderRadius: 10,
                      px: 6,
                    }}
                  >
                    Submit
                  </Button>
                </form>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default DoctorDetails;
