import { Route, Routes } from "react-router-dom";
import "./App.css";

import TabPage from "./tab/tabpage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Specialities from "./pages/Specialities";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./Redux/createSlice";
import ProfilePage from "./pages/Patient/ProfilePage";
import ChangePassword from "./pages/Patient/ChangePassword";
import Footer from "./components/Footer";
import OtpVerification from "./pages/OtpVerification";
import AppointmentsPage from "./pages/Patient/AppointmentsPage";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import Qualifications from "./pages/Doctor/Qualifications";
import Experience from "./pages/Doctor/Experience";
import Appointments from "./pages/Doctor/Appointments";
const drawerWidth = 240;
function App(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
console.log("hello")
  return (
    <>
    <Routes>
      <Route
        path="/"
        element={<Navbar handleDrawerToggle={handleDrawerToggle} />}
      >
        <Route
          path="/"
          element={
            <Sidebar
              handleDrawerToggle={handleDrawerToggle}
              window={window}
              drawerWidth={drawerWidth}
              mobileOpen={mobileOpen}
            />
          }
        >
          <Route path="/" element={<Dashboard />} />
      <Route path ="/specialities" element={<Specialities/>}/> 
      <Route path ="/myprofile" element={<ProfilePage/>}/> 
      <Route path ="/changepassword" element={<ChangePassword/>}/> 
      <Route path ="/myappointments" element={<AppointmentsPage/>}/> 
      <Route path="/doctordashboard" element={<DoctorDashboard/>}/>
      <Route path="/doctorprofile" element={<DoctorProfile/>}/>
      <Route path="/qualifications" element={<Qualifications/>}/>
      <Route path="/Experience" element={<Experience/>}/>
      <Route path="/doctorappointments" element={<Appointments/>}/>
        </Route>
        <Route path="/otpverification" element={<OtpVerification/>}/>
        <Route path="/auth" element={<TabPage />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp role="patient" />} />
          <Route path="hospital-signup" element={<SignUp role="hospital" />} />
          <Route path="doctor-register" element={<SignUp role="doctor" />} />
        </Route>
      </Route>
    </Routes>
     <Footer/>
     </>
  );
}

export default App;
