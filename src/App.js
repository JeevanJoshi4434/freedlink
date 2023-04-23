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
// import { Report } from './components/settings/Screens/Reports';
import CheckEmail from './components/subcomponents/CheckEmail';
import AdminDashboard from './components/Admin/AdminDashboard';
import Stats from './components/Admin/Stats';
import SubAdminDashboard from './components/SubAdmin/AdminDashboard';
import HRSoon from './components/Authentication/HRSoon';
import PageNotFound from './components/PageNotFound';
import SinglePost from './components/subcomponents/SinglePost';
import ReportScreen from './components/settings/Screens/Report';

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
    // console.log(socket)
  }, [])
  
  useEffect(() => {
    socket?.emit("addUser", id);
  }, [socket, id]);
 useEffect(() => {
   if(!user?.other){
    const visitors = async()=>{
        const getVisitors = await fetch(`/api/visitors`);
    }
    visitors();
   }
 }, [])
 
  return (
    <>
      <BrowserRouter>
          {/* <Alert alert={alert}/> */}
        <Routes>
          <Route element={<><Nav socket={socket} /><Home socket={socket} /></>} path="/"></Route>
          <Route element={<><Nav socket={socket} /><Profile socket={socket} /></>} path="/profile/:id"></Route>
          <Route element={<><Nav socket={socket} /><Personal /></>} path="/settings/personal"></Route>
          <Route element={<><Nav socket={socket} /><Security  /></>} path="/settings/security"></Route>
          <Route element={<><Nav socket={socket} /><Saved socket={socket} /></>} path="/settings/saved"></Route>
          <Route element={<><Nav socket={socket} /><Help  /></>} path="/settings/help"></Route>
          <Route element={<><Nav socket={socket} /><ReportScreen  /></>} path="/settings/report"></Route>
          <Route element={<><Nav socket={socket} /><Search /></>} path="/find?"></Route>
          <Route element={<><Nav socket={socket} /><Chat /></>} path="/inbox"></Route>
          <Route element={<><Nav socket={socket} /><ChangePass /></>} path="/settings/authentication/changepassword"></Route>
          <Route element={<><ForgotPass/></>} path="/forgotpassword"></Route>
          <Route element={<><ResetPass/></>} path="/reset/password?"></Route>
          <Route element={<><PdfRendering/></>} path="/user/view?"></Route>
          <Route element={<><Nav socket={socket} /><Setting socket={socket} /></>} path="/settings"></Route>
          <Route element={<><AdminLogin /></>} path="/admin/login"></Route>
          <Route element={<><AdminDashboard /></>} path="/admin/dashboard"></Route>
          <Route element={<><AdminReport /></>} path="/admin/reports"></Route>
          <Route element={<><AdminUsers /></>} path="/admin/users"></Route>
          <Route element={<><Nav  socket={socket} /><PageNotFound/></>} path="/*"></Route>
          <Route element={<><Stats/></>} path="/admin/statistics"></Route>
          <Route element={<><Nav  socket={socket} /><SinglePost socket={socket} /></>} path="/post/:id"></Route>
          <Route element={<><CheckEmail/></>} path="/checkemail"></Route>
          <Route element={<><HRForm/></>} path="/hr/getstarted"></Route>
          <Route element={<><HRDashboard /></>} path="/hr/dashboard"></Route>
            <Route element={<><HRCreate /></>} path="/hr/create" ></Route>
          <Route element={<><HRJobs /></>} path="/hr/alljobs"></Route>
          <Route element={<><AdminDashboard /></>} path="/test/admin/dashboard"></Route>
          <Route element={<><HRViewJob /></>} path="/hr/dashboard/all/job?"></Route>
          <Route element={<><HRSoon /></>} path="/hr/soon?"></Route>
          <Route element={<><Nav socket={socket} /><React.Suspense fallback="Loading..."><Job /></React.Suspense></>} path="/jobs"></Route>
          <Route element={<><Nav socket={socket} /><React.Suspense fallback="Loading..."><JobPage /></React.Suspense></>} path="/jobs/:id"> </Route> 
          {/* <Route element={user!==null ? <Navigate to={'/'} /> :    <Login />} path="/login"></Route> */}
          <Route element={<Login />} path="/login"></Route>
          <Route element={ <Verification />} path="/signup/email/verify"></Route>
          {/* <Route element={user!==null ? <Navigate to={'/'} /> :   <><Signup /></>} path="/signup">     */}
          <Route element={<><Signup /></>} path="/signup"></Route>
          {/* SubAdmin */}
          <Route element={<><SubAdminDashboard /></>} path="/subadmin"></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
