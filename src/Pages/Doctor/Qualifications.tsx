import { Add, Close, Delete } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../Redux/Store";
interface QualificationType {
  degree: string;
  institute: string;
  year: string;
  degreeErr?: string;
  instituteErr?: string;
  yearErr?: string;
}
const Qualifications = () => {
  const user = useAppSelector((state) => state.user);
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState<string | boolean>(false);
  const [error, setError] = useState<string | boolean>(false);
  const status = useAppSelector((state) => state.status);
  const [qualification, setQualification] = useState([] as QualificationType[]);
  useEffect(() => {
    setQualificationData();
  }, [status]);
  const setQualificationData = () => {
    user?.Qualification
      ? setQualification(user.Qualification)
      : setQualification([]);
  };
  const disabledSubmit = () => {
    let disabled = false;
    qualification.map((item) => {
      if (
        !item.degree ||
        !item.institute ||
        !item.year ||
        item.degreeErr ||
        item.instituteErr ||
        item.yearErr
      ) {
        disabled = true;
      }
    });
    return disabled;
  };
  const isValidDegree = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
    index: number
  ) => {
    console.log(index);
    console.log(qualification[index]);
    console.log(qualification);
    let err = "";
    if (e.target.value.length < 3 || !/^[a-zA-Z]*$/.test(e.target.value)) {
      err = "Please enter the valid degree";
    } else {
      err = "";
    }
    const itemData = { ...qualification[index], degreeErr: err };
    setQualification([
      ...qualification.slice(0, index),
      itemData,
      ...qualification.slice(index + 1),
    ]);
  };
  const isValidInstitute = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
    index: number
  ) => {
    let err = "";
    if (e.target.value.length < 3 || !/^[a-zA-Z\s]*$/.test(e.target.value)) {
      err = "Please enter the valid institute name";
    } else {
      err = "";
    }
    const itemData = { ...qualification[index], instituteErr: err };
    setQualification([
      ...qualification.slice(0, index),
      itemData,
      ...qualification.slice(index + 1),
    ]);
  };
  const isValidYear = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
    index: number
  ) => {
    const todayYear = new Date().getFullYear();
    let err = "";
    if (
      Number(e.target.value) > todayYear ||
      !/^[12][0-9]{3}$/.test(e.target.value)
    ) {
      err = "Please enter the valid year";
    } else {
      err = "";
    }
    const itemData = { ...qualification[index], yearErr: err };
    setQualification([
      ...qualification.slice(0, index),
      itemData,
      ...qualification.slice(index + 1),
    ]);
  };
  const handleSubmit = async () => {
    if (!edit) {
      setEdit(true);
    } else {
      console.log(qualification);
      qualification.map((item) => {
        delete item.degreeErr;
        delete item.instituteErr;
        delete item.yearErr;
        return item;
      });
      try {
        const res = await axios.put(
          "http://localhost:4000/updateProfile/doctor",
          {
            userId: user?.user.Id,
            Qualification: qualification,
          }
        );
        setError(false);
        setSuccess("Your qualifications are succesfully updated");
        setEdit(false);
      } catch (error: any) {
        setError(error.response.data.message);
        setSuccess(false);
      }
    }
  };
  const handleClose = () => {
    setQualificationData();
    setEdit(false);
  };
  return (
    <div>
      {user && (
        <Grid container sx={{ width: "98%", m: "auto" }}>
          <Grid item xs={12}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              My Qualifications
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#3f51b5",
                display: edit ? "inline" : "none",
                mr: 1,
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={edit && disabledSubmit()}
              onClick={handleSubmit}
              sx={{ backgroundColor: "#3f51b5" }}
            >
              {edit ? "Save" : "Edit"}
            </Button>
          </Grid>

          {qualification.map((item, index) => {
            return (
              <Grid
                item
                xs={12}
                sx={{
                  backgroundColor: "white",
                  border: 1,
                  borderColor: "divider",
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Grid item xs={3.5} sx={{ p: 2 }}>
                  <TextField
                    id="outlined-basic"
                    required
                    label="Degree/Certifications"
                    variant="outlined"
                    onBlur={(e) => isValidDegree(e, index)}
                    helperText={item.degreeErr}
                    error={Boolean(item.degreeErr)}
                    onChange={(e) => {
                      const itemData = { ...item, degree: e.target.value };
                      setQualification([
                        ...qualification.slice(0, index),
                        itemData,
                        ...qualification.slice(index + 1),
                      ]);
                    }}
                    value={item.degree}
                    disabled={!edit}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3.5} sx={{ p: 2 }}>
                  <TextField
                    id="outlined-basic"
                    label="Institute Name"
                    required
                    variant="outlined"
                    helperText={item.instituteErr}
                    error={Boolean(item.instituteErr)}
                    onBlur={(e) => isValidInstitute(e, index)}
                    value={item.institute}
                    disabled={!edit}
                    onChange={(e) => {
                      const itemData = { ...item, institute: e.target.value };
                      setQualification([
                        ...qualification.slice(0, index),
                        itemData,
                        ...qualification.slice(index + 1),
                      ]);
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3.5} sx={{ p: 2 }}>
                  <TextField
                    id="outlined-basic"
                    label="Year Of Completion"
                    required
                    variant="outlined"
                    helperText={item.yearErr}
                    error={Boolean(item.yearErr)}
                    value={item.year}
                    onBlur={(e) => isValidYear(e, index)}
                    onChange={(e) => {
                      const itemData = { ...item, year: e.target.value };
                      setQualification([
                        ...qualification.slice(0, index),
                        itemData,
                        ...qualification.slice(index + 1),
                      ]);
                    }}
                    disabled={!edit}
                    fullWidth
                  />
                </Grid>
                <Grid
                  title="Delete Row"
                  item
                  xs={0.5}
                  sx={{ textAlign: "right", mr: 2 }}
                >
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      console.log(qualification)
                      setQualification([
                        ...qualification.slice(0, index),
                        ...qualification.slice(index + 1),
                      ]);
                      console.log(qualification)
                    }}
                    disabled={!edit}
                  >
                    <Close sx={{ color: "grey" }} />
                  </IconButton>
                  {/* <Close component="button" onClick={()=> setQualification(qualification.splice(index, 1))}  sx={{color:"grey",border:"none", backgroundColor:"white"}}/> */}
                </Grid>
              </Grid>
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
              variant="contained"
              sx={{ backgroundColor: "#3f51b5" }}
              // startIcon={<Add />}
              onClick={() => {
                setQualification([
                  ...qualification,
                  {
                    degree: "",
                    institute: "",
                    year: "",
                    degreeErr: "",
                    instituteErr: "",
                    yearErr: "",
                  },
                ]);
              }}
            >
              Add More
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Qualifications;
