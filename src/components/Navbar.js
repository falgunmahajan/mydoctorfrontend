import React, { useEffect, useState } from "react";
import { AccountCircle, AccountCircleRounded, AccountCircleSharp, AccountCircleTwoTone, Menu, Search } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Toolbar,
} from "@mui/material";
import myDoctor from "../svg/mydoctor.svg";

import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import "swiper/css";

import SymptonsMenu from "./SymptonsMenu";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../Redux/createSlice";
import { Dialog, SimpleDialog } from "./Dialog";

const Navbar = ({ handleDrawerToggle }) => {
 

    const [open, setOpen] = useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [showDropDown, setShowDropDown] = useState(false);
  const [specialities, setSpecialities] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
//   const user = useSelector((state) => state.user);
//   const status = useSelector((state) => state.status);
const login=useSelector(state=>state.Login)
console.log(login)
// console.log(status)
//   useEffect(() => {
//       dispatch(fetchUser());
 
//   });

  async function showOptions() {
    const res = await axios.get(
      "http://localhost:4000/specializations?$limit=100&$sort[name]=1"
    );
    const speciality = res.data.data;
    setSpecialities(speciality);
    setShowDropDown(true);
  }
  return (
    <div>
      <AppBar
        component="header"
        sx={{ backgroundColor: "white", pt: 1, zIndex: 1201 }}
      >
        <Toolbar sx={{ flexWrap: "wrap", mb: 1 }}>
          <Grid container>
            <Grid item xs={4} lg={1} order={{ xs: 1}} sx={{display: { sm: "none" } }}>
              <IconButton
                color="black"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <Menu />
              </IconButton>
            </Grid>
            <Grid item xs={4} lg={4} order={{ xs: 2 }} >
              <img
                src={myDoctor}
                alt="image not found"
                width="120px"
                onClick={() => navigate("/")}
              />
            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
              order={{ xs: 4, lg: 3 }}
              sx={{ backgroundColor: "#fafafa", display: "flex" }}
            >
              <Box>
                <TextField
                  variant="standard"
                  placeholder="Select a Service"
                  autoComplete="off"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  onFocus={showOptions}
                  onBlur={() => setShowDropDown(false)}
                  sx={{ p: 1 }}
                />
                {showDropDown && (
                  <Box
                    sx={{
                      backgroundColor: "#e8e9ec",
                      height: "150px",
                      position: "absolute",
                      zIndex: 4,
                      color: "black",
                      px: 2,
                      boxShadow: "20px 20px 50px grey",
                      overflowY: "auto",
                    }}
                  >
                    {specialities.map((item, index) => {
                      return <div key={index}>{item.name}</div>;
                    })}
                  </Box>
                )}
              </Box>
              <TextField
                variant="standard"
                placeholder="Search Doctors"
                autoComplete="off"
                InputProps={{
                  endAdornment: <Search />,
                  disableUnderline: true,
                }}
                sx={{ p: 1 }}
              />
            </Grid>
            <Grid
              item
              xs={4}
              order={{ xs: 3, lg: 4 }}
              sx={{ textAlign: "right"}}
            >
             
                {login ?<Avatar src="/broken-image.jpg" sx={{ml:"auto"}} onClick={handleClickOpen} /> : <Button
                variant="contained"
                onClick={() => navigate("/auth/login")}
                sx={{ backgroundColor: "#3f51b5" }}
              >Login </Button>}
             <SimpleDialog
        open={open}
        onClose={handleClose}
      />
            </Grid>
          </Grid>
        </Toolbar>
        <SymptonsMenu />
      </AppBar>
      <Outlet />
    </div>
  );
};

export default Navbar;
