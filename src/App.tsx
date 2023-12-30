
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

