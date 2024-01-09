
import './App.css';
import { Route, Routes } from 'react-router-dom';


import Sidebar from './components/Sidebar';
import { useState } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Dashboard from './Pages/Dashboard';
import SpecialitiesPage from './Pages/Specialities';
import TabPage from './Tab/TabPage';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import OtpVerification from './Pages/OtpVerification';
import ProfilePage from './Pages/Patient/ProfilePage';
import ChangePassword from './Pages/Patient/ChangePassword';
import DoctorProfile from './Pages/Doctor/DoctorProfile';
import Qualifications from './Pages/Doctor/Qualifications';
import Experience from './Pages/Doctor/Experience';
import Professional from './Pages/Doctor/Professional';
import DoctorDashboard from './Pages/Doctor/DoctorDashboard';
import Search from './Pages/Search';
import DoctorDetails from './Pages/Doctor/DoctorDetails';
import PatientAppointment from './Pages/Patient/PatientAppointment';
import BookAppointment from './Pages/BookAppointment/BookAppointment';
export const drawerWidth = 220;

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  return (
    <>
   <Routes>
   <Route path="/" element={<Navbar handleDrawerToggle={handleDrawerToggle}/>}>
    <Route path="/" element={ <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>}>
   
    <Route path="/" element={<Dashboard />} />
   
    <Route path ="/specialities" element={<SpecialitiesPage/>}/> 
    <Route path ="/myprofile" element={<ProfilePage/>}/> 
    <Route path ="/changepassword" element={<ChangePassword/>}/> 
    <Route path="/appointments" element={<PatientAppointment/>}/>
    <Route path="/doctor-profile" element={<DoctorProfile/>}/>
    <Route path="/qualifications" element={<Qualifications/>}/>
    <Route path="/Experience" element={<Experience/>}/>
    <Route path="/professionalinformation" element={<Professional/>}/>
    <Route path="/doctor-dashboard" element={<DoctorDashboard/>}/>
    <Route path="/search" element={<Search/>}/>
    <Route path="/doctor/:Id" element={<DoctorDetails/>}/>
    <Route path="/book-appointment" element={<BookAppointment/>}/>
    </Route>
    <Route path="/auth" element={<TabPage />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp role="patient" />} />
          <Route path="hospital-signup" element={<SignUp role="hospital" />} />
          <Route path="doctor-register" element={<SignUp role="doctor" />} />
        </Route>
        <Route path="/otpverification" element={<OtpVerification/>}/>
    </Route>
   
   </Routes>
 <Footer/>
 </>
  );
}

export default App;

