import { Add } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Qualifications = () => {
  const user = useSelector((state) => state.user);
  const [edit, setEdit] = useState(false);
  const [qualification, setQualification] = useState([
    {
      degree: "",
      institute: "",
      year: "",
    },
  ]);
  const handleSubmit = async () => {
    if (!edit) {
      setEdit(true);
    }
  };
  return (
    <div style={{ minHeight: "65vh" }}>
      {user && (
        <Grid container sx={{ mt: 15 }}>
          <Grid item xs={12}>
            {/* {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>} */}
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
              // disabled={edit && disabled}
              onClick={handleSubmit}
              sx={{ backgroundColor: "#3f51b5" }}
            >
              {edit ? "Save" : "Edit"}
            </Button>
          </Grid>
          {qualification.map((item) => {
            return (
              <>
                <Grid item xs={4} sx={{ mt: 2, p: 2 }}>
                  <TextField
                    id="outlined-basic"
                    label="Degree"
                    variant="outlined"
                    onChange={(e)=>{
                      const itemData={...item,[item.degree]:e.target.value}
                      setQualification([...qualification,itemData])
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
                    value={item.institute}
                    disabled={!edit}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4} sx={{ mt: 2, p: 2 }}>
                  <TextField
                    id="outlined-basic"
                    label="Year"
                    variant="outlined"
                    value={item.year}
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
                  },
                ]);
              }}
              // sx={{ backgroundColor: "#3f51b5" }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Qualifications;
