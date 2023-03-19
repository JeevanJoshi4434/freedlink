import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../Redux/apiCall';
import settingStyle from '../setting.module.css';

const Security = () => {
  let navigate = useNavigate();
  const userDetails = useSelector((state) => state.user);
  // // // console.log()
  let user = userDetails?.user;
  let userId = user?.other?._id;
  let Cuser = user?.other;
  let accessToken = user?.accessToken;
  const [currentOption, setCurrentOption] = useState('');
  const [reportTitle, setReportTitle] = useState('');
  const [reportDesc, setReportDesc] = useState('');
  const [Data, setData] = useState('');
  const [personalField, setPersonalField] = useState('');
  const [newName, setNewName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [posts, setPosts] = useState([]);
  const [newPass, setNewPass] = useState('');
  const [CNewPass, setCNewPass] = useState('');
  let dispatch = useDispatch();
  const Report = async (e) => {
    
    e.preventDefault();
    // // console.log("Reported");  
    let res = await fetch(`/api/report`, {
      method: "POST", headers: { "Content-Type": "application/Json", accessToken: accessToken }, body: JSON.stringify({
        type: "SYSTEM",
        desc: reportDesc,
      })
    })
    setData(res);
  }
  const handleLogout = async(e) => {
    localStorage.clear();
    await navigate('/');
    // cookies.remove("pokemon");
    // cookies.remove("searchHistory");
    logoutUser(dispatch);
}

  const getpost = async () => {
    const res = await axios.get(`/api/post/saved/${userId}`, { method: "GET", headers: { accessToken: accessToken } });
    const data = [res.data];
    setPosts(data);
  }
  // console.log(posts)
  useEffect(() => {
    getpost();
  }, [userId])

  // apis
  const ChangeName = async()=>{
    const res = await fetch(`/api/user/change/name/${newName}/${password}`,{method:"PUT",headers:{accessToken:accessToken}})
    const data = await res.status;
    if(data === 200){
      // console.log('changed')
    }
    if(data === 400){
      // console.log("Fail")
    }
  }
  const ChangeEmail = async()=>{
    const res = await fetch(`/api/user/change/mail/${email}/${password}`,{method:"PUT",headers:{accessToken:accessToken}})
    const data = await res.data;
    if(data === 200){
      // console.log('changed')
    }
    if(data === 400){
      // console.log("Fail")
    }
}

const ChangePassword = async()=>{
  const res = await fetch(`/api/user/change/password/${password}/${newPass}`,{method:"PUT",headers:{accessToken:accessToken}})
  const data = await res.status;
  if(data === 200){
    
  }
}
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div className={settingStyle.securityPanel}>
              <h4>Change Password</h4>
              <div>
                <p>Enter Old Password</p>
                <input  placeholder='Old password' onChange={(e)=>setPassword(e.target.value)} type="password" />
                <p>Enter New Password</p>
                <input  placeholder=' new password' onChange={(e)=>setNewPass(e.target.value)} type="password" />
                <p>Confirm New Password</p>
                <input placeholder='confirm new password' onChange={(e)=>setCNewPass(e.target.value)} type="password" />
              </div>
              { newPass !== CNewPass ? <><p style={{fontSize:"10px",color:"red"}} >New Password Doesn't Match!</p> <button disabled={true} >Save Changes</button></>  : <><button onClick={()=>ChangePassword()} >Save Changes</button></> }
              
            </div>
          </div>
  )
}

export default Security