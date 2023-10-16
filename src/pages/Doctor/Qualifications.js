import { Add, Delete } from "@mui/icons-material";
import {
  Alert,
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Qualifications = () => {
  const user = useSelector((state) => state.user);
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [qualification, setQualification] = useState([
    {
      degree: "",
      institute: "",
      year: "",
      degreeErr: "",
      instituteErr: "",
      yearErr: "",
    },
  ]);
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
  const isValidDegree = (e, index) => {
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
  const isValidInstitute = (e, index) => {
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
  const isValidYear = (e, index) => {
    const todayYear = new Date().getFullYear();
    let err = "";
    if (e.target.value > todayYear || !/^[12][0-9]{3}$/.test(e.target.value)) {
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
        const res = await axios.post(
          "http://localhost:4000/updateProfile/doctor",
          {
            userId: user.user.Id,
            Qualification: qualification,
          }
        );
        setError(false);
        setSuccess("Your profile is succesfully updated");
        setEdit(false);
      } catch (error) {
        setError(error.response.data.message);
        setSuccess(false);
      }
    }
  };
  return (
    <div style={{ minHeight: "65vh" }}>
      {user && (
        <Grid container sx={{ mt: 15 }}>
          <Grid item xs={12}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="h4"
              sx={{ color: "#3f51b5", fontWeight: "bold" }}
            >
              Qualifications
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "right" }}>
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
              <>
                <Grid item xs={4} sx={{ mt: 2, p: 2 }}>
                  <TextField
                    id="outlined-basic"
                    label="Degree"
                    variant="outlined"
                    onKeyUp={(e) => isValidDegree(e, index)}
                    helperText={item.degreeErr}
                    error={item.degreeErr}
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
                <Grid item xs={4} sx={{ mt: 2, p: 2 }}>
                  <TextField
                    id="outlined-basic"
                    label="Institute"
                    variant="outlined"
                    helperText={item.instituteErr}
                    error={item.instituteErr}
                    onKeyUp={(e) => isValidInstitute(e, index)}
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
                <Grid item xs={4} sx={{ mt: 2, p: 2 }}>
                  <TextField
                    id="outlined-basic"
                    label="Year"
                    variant="outlined"
                    helperText={item.yearErr}
                    error={item.yearErr}
                    value={item.year}
                    onKeyUp={(e) => isValidYear(e, index)}
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
              </>
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
              variant="outlined"
              startIcon={<Add />}
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
              // sx={{ backgroundColor: "#3f51b5" }}
            >
              Add Row
            </Button>
          </Grid>
          {qualification.length > 1 && (
            <Grid
              item
              xs={2}
              sx={{
                mt: 3,
                ml: 2,
                display: edit ? "block" : "none",
              }}
            >
              <Button
                variant="outlined"
                startIcon={<Delete />}
                onClick={() => {
                  console.log(qualification);
                  setQualification(qualification.slice(0, -1));
                }}
                // sx={{ backgroundColor: "#3f51b5" }}
              >
                Delete Row
              </Button>
            </Grid>
          )}
        </Grid>
      )}
    </div>
  );
};

export default Qualifications;
