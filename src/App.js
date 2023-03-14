import './App.css';
import React, { useEffect } from 'react';
import {
  BrowserRouter , Route, Routes,
} from "react-router-dom";
import Nav from './components/Nav';
import Home from './components/Home';
import Profile from './components/profile/Profile';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
// import ProfileGlobal from './components/GlobalScreen/ProfileGlobal';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom/dist';
import ChangePass from './components/Authentication/ChangePass';
import ForgotPass from './components/Authentication/ForgotPass';
import ResetPass from './components/Authentication/ResetPass';
import Verification from './components/Authentication/Verification';
import Chat from './components/Chat/Chat';
import Search from './components/Search/Search';
import Setting from './components/settings/Setting';
import Alert from './Alert';
import { useState } from 'react';
import AdminLogin from './components/Admin/AdminLogin';
import Admin from './components/Admin/Admin';
import AdminNav from './components/Admin/AdminNav';
import AdminReport from './components/Admin/AdminReport';
import AdminUsers from './components/Admin/AdminUsers';
import HRForm from './components/Authentication/HRForm';
import HRDashboard from './components/Authentication/HRDashboard';
import { UpdateBio } from './components/profile/ProfileAPIs';
import HRJobs from './components/Authentication/HRJobs';
import HRCreate from './components/Authentication/HRCreate';
import HRNav from './components/Authentication/HRNav';
import HRViewJob from './components/Authentication/HRViewJob';
import PdfRendering from './components/PDF/PdfRendering';
import { io } from 'socket.io-client';
import Personal from './components/settings/Screens/Personal';
import Security from './components/settings/Screens/Security';
import Saved from './components/settings/Screens/Saved';
import Help from './components/settings/Screens/Help';
import { Report } from './components/APIs/UserControlCalls';
import CheckEmail from './components/subcomponents/CheckEmail';

const Job = React.lazy(()=>import('./components/Job/Job')); 
const JobPage = React.lazy(()=>import('./components/Job/JobPage')); 

function App() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  let accessToken = user?.accessToken;
  let id = user?.other?._id;
  // console.log(user)
  let userData = user?.other;
  const [alert, setAlert] = useState(null);
  const [socket, setSocket] = useState(null);
  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  useEffect(() => {
    setSocket(io(process.env.PORT));
    console.log(socket)
  }, [])
  
  useEffect(() => {
    socket?.emit("addUser", id);
  }, [socket, id]);
 

  return (
    <>
      <BrowserRouter>
          {/* <Alert alert={alert}/> */}
        <Routes>
          <Route element={userData?.verified === true ? <><Nav socket={socket} /><Home socket={socket} username={"Jeet Joshi"} /></>: <Login />} path="/"></Route>
          <Route element={<><Nav socket={socket} /><Profile socket={socket} /></>} path="/profile/:id"></Route>
          <Route element={<><Nav socket={socket} /><Personal /></>} path="/settings/personal"></Route>
          <Route element={<><Nav socket={socket} /><Security  /></>} path="/settings/security"></Route>
          <Route element={<><Nav socket={socket} /><Saved socket={socket} /></>} path="/settings/saved"></Route>
          <Route element={<><Nav socket={socket} /><Help  /></>} path="/settings/help"></Route>
          <Route element={<><Nav socket={socket} /><Report  /></>} path="/settings/report"></Route>
          <Route element={<><Nav socket={socket} /><Search /></>} path="/find?"></Route>
          <Route element={<><Nav socket={socket} /><Chat /></>} path="/inbox"></Route>
          <Route element={<><Nav socket={socket} /><ChangePass /></>} path="/settings/authentication/changepassword"></Route>
          <Route element={<><ForgotPass/></>} path="/forgotpassword"></Route>
          <Route element={<><ResetPass/></>} path="/reset/password?"></Route>
          <Route element={<><PdfRendering/></>} path="/user/view?"></Route>
          <Route element={<><Nav socket={socket} /><Setting socket={socket} /></>} path="/settings"></Route>
          <Route element={<><AdminLogin /></>} path="/admin/login"></Route>
          <Route element={<><AdminNav/><Admin /></>} path="/admin"></Route>
          <Route element={<><AdminNav/><AdminReport /></>} path="/admin/reports"></Route>
          <Route element={<><AdminNav/><AdminUsers /></>} path="/admin/users"></Route>
          <Route element={<><AdminNav/></>} path="/admin/*"></Route>
          <Route element={<><CheckEmail/></>} path="/checkemail"></Route>
          <Route element={<><HRForm/></>} path="/hr/getstarted"></Route>
          <Route element={<><HRNav /><HRDashboard /></>} path="/hr/dashboard"></Route>
            <Route element={<><HRNav /><HRCreate /></>} path="/hr/dashboard/create" ></Route>
          <Route element={<><HRNav /><HRJobs /></>} path="/hr/dashboard/all"></Route>
          <Route element={<><HRNav /><HRViewJob /></>} path="/hr/dashboard/all/job?"></Route>
          <Route element={<><Nav socket={socket} /><React.Suspense fallback="Loading..."><Job /></React.Suspense></>} path="/jobs"></Route>
          <Route element={<><Nav socket={socket} /><React.Suspense fallback="Loading..."><JobPage /></React.Suspense></>} path="/jobs/:id"> </Route> 
          {/* <Route element={user!==null ? <Navigate to={'/'} /> :    <Login />} path="/login"></Route> */}
          <Route element={<Login />} path="/login"></Route>
          <Route element={<Verification />} path="/signup/email/verify"></Route>
          {/* <Route element={user!==null ? <Navigate to={'/'} /> :   <><Signup /></>} path="/signup">     */}
          <Route element={<><Signup /></>} path="/signup"></Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
