import React, { useEffect, useRef, useState } from "react";
import { SpecialitiesTypes, getSpecialities } from "../utils/getSpecialities";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import {
  Grid,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SpecialitiesCard from "../components/SpecialitiesCard";
import { Search } from "@mui/icons-material";

const SpecialitiesPage = () => {
  const [value, setValue] = useState(16);
  const [page, setPage] = useState(1);
  const [speciality, setSpeciality] = useState<SpecialitiesTypes[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null!);
  let start: number = 0,
    end: number = 0,
    count: number = 0;
  async function getSpecialitiesdata() {
    const speciality = await getSpecialities();
    console.log(speciality);
    setSpeciality(speciality);
  }
  useEffect(() => {
    getSpecialitiesdata();
    setLoading(false);

    setLoading(false);
  }, []);
  if (speciality) {
    count = Math.ceil(speciality.length / value);
    start = value * page - value;
    end = value * page;
  }
  const searchSpeciality = async () => {
    const res = await axios.get(
      `http://localhost:4000/specializations?name=${inputRef.current.value}`
    );
    setSpeciality(res.data.data);
  };
  let specialityGrid;
  if (speciality) {
    if (speciality.length) {
      specialityGrid = speciality.slice(start, end).map((item, index) => {
        return (
          <Grid item key={index} xs={12} lg={3} sx={{ mb: 3 }}>
            <SpecialitiesCard speciality={item.name} imageUrl={item.imageUrl} />
          </Grid>
        );
      });
    } else {
      specialityGrid = (
        <div style={{ textAlign: "center", width: "100%", marginTop: "10px" }}>
          No specialities found
        </div>
      );
    }
  } else {
    specialityGrid = (
      <ClipLoader
        loading={loading}
        size={50}
        color="blue"
        cssOverride={{ margin: "auto" }}
      />
    );
  }
  return (
    <div>
      <Grid
        container
        spacing={2}
        sx={{ pl: 3, mb: 3, justifyContent: "space-between" }}
      >
        {speciality && (
          <Grid item xs={12} md={8}>
            <Typography
              variant="h4"
              component="div"
              color="#3f51b5"
              fontWeight="Bold"
            >
              {speciality.length>10 ? speciality.length-(speciality.length%10):speciality.length}+ Specialities
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} md={3} sx={{ display: "flex" }}>
          <TextField
          
            // sx={{ mr: 1 }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchSpeciality();
              }
            }}
            variant="outlined"
            placeholder="Search Specialities"
            inputRef={inputRef}
            InputProps={{
              endAdornment: (
                <Search
                  sx={{ cursor: "context-menu" }}
                  onClick={searchSpeciality}
                />
              ),
            }}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            // label="Age"
            onChange={(e) => {
              setValue(Number(e.target.value));
              setPage(1);
            }}
          >
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={16}>16</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={40}>40</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ pl: 3 }}>
        {specialityGrid}
      </Grid>
      {count > 1 && (
        <Pagination
          count={count}
          page={page}
          onChange={(event, value) => setPage(value)}
          sx={{ display: "flex", justifyContent: "center" }}
        />
      )}
    </div>
  );
};

export default SpecialitiesPage;
