import React from "react";
import dashboard from "../svg/dashboard.svg";
import Specialities from "../components/Specialities";
const Dashboard = () => {
  return (
    <>
      <img src={dashboard} alt="image not found"  />
      
      <Specialities length={8}/>
    </>
  );
};

export default Dashboard;
