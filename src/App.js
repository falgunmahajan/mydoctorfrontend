
import { Route, Routes } from 'react-router-dom';
import './App.css';
import PatientSignUp from './pages/PatientSignUp';
import TabPage from './tab/tabpage';

function App() {
  return (
  <Routes>
     <Route path="/auth" element={<TabPage/>} >
      {/* <Route path="login" element={<Login/>}/> */}
      <Route path="signup" element={<PatientSignUp/>}/>
      {/* <Route path = "doctor-register" element={<DoctorSignUp/>}/> */}
      </Route> 
  </Routes>
  );
}

export default App;
