
import { Route, Routes } from 'react-router-dom';
import './App.css';

import TabPage from './tab/tabpage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
  return (
  <Routes>
     <Route path="/auth" element={<TabPage/>} >
      <Route path="login" element={<Login/>}/>
      <Route path="signup" element={<SignUp role="patient"/>}/>
      <Route path="hospital-signup" element={<SignUp role="hospital"/>}/>
      <Route path = "doctor-register" element={<SignUp role="doctor"/>}/>
      </Route> 
  </Routes>
  );
}

export default App;
