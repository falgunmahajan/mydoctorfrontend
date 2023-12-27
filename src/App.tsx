
import './App.css';
import { Route, Routes } from 'react-router-dom';


import Sidebar from './components/Sidebar';
import { useState } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Dashboard from './Pages/Dashboard';
export const drawerWidth = 200;

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  return (
   <Routes>
    <Route path="/" element={<Navbar handleDrawerToggle={handleDrawerToggle}/>}>
    <Route path="/" element={ <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>}>
    <Route path="/" element={<Dashboard />} />
    </Route>
    </Route>
   </Routes>
 
  );
}

export default App;

