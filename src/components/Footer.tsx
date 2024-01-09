import { Outlet } from "@mui/icons-material";
import { AppBar, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <AppBar
      position="relative"
      sx={{
        top: "auto",
        bottom: 0,
        backgroundColor: "#eeeeee",
        color: "black",
        p: 5,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Typography sx={{ fontSize: 14 }}>
        {" "}
        This is some content in sticky footer
      </Typography>
    </AppBar>
  );
};

export default Footer;
