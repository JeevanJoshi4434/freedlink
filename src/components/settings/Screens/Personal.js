import React, { useEffect } from 'react';
import { useState } from 'react';
import settingStyle from '../setting.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isMobileOnly } from 'react-device-detect';
import axios from 'axios';

const Personal = () => {

    let navigate = useNavigate();
    const userDetails = useSelector((state) => state.user);
    // // console.log()
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
    const Report = async (e) => {
      e.preventDefault();
      // console.log("Reported");  
      let res = await fetch(`/api/report`, {
        method: "POST", headers: { "Content-Type": "application/Json", accessToken: accessToken }, body: JSON.stringify({
          type: "SYSTEM",
          desc: reportDesc,
        })
      })
      setData(res);
    }
  
    const getpost = async () => {
      const res = await axios.get(`/api/post/saved/${userId}`, { method: "GET", headers: { accessToken: accessToken } });
      const data = [res.data];
      setPosts(data);
    }
    console.log(posts)
    useEffect(() => {
      getpost();
    }, [userId])
  
    // apis
    const ChangeName = async()=>{
      const res = await fetch(`/api/user/change/name/${newName}/${password}`,{method:"PUT",headers:{accessToken:accessToken}})
      const data = await res.status;
      if(data === 200){
        console.log('changed')
      }
      if(data === 400){
        console.log("Fail")
      }
    }
    const ChangeEmail = async()=>{
      const res = await fetch(`/api/user/change/mail/${email}/${password}`,{method:"PUT",headers:{accessToken:accessToken}})
      const data = await res.data;
      if(data === 200){
        console.log('changed')
      }
      if(data === 400){
        console.log("Fail")
      }
  }
    if(isMobileOnly)
    return (
        <div style={{ height: "100%", marginLeft: "19px", marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <span className='material-icons' onClick={() => navigate(-1)} style={{ cursor: "pointer" }} >arrow_back</span>
                  <div className={settingStyle.personalPanel}>
            <h4>Name</h4>
              <div>
                <input value={Cuser?.name} type="text" />
                <h6 style={{cursor:"pointer"}} onClick={()=>setPersonalField('name')}  >change</h6>
              </div>
              <h4>Email</h4>
              <div>
                <input value={Cuser?.email} type="email" />
                <h6 style={{cursor:"pointer"}} onClick={()=>setPersonalField('mail')}  >change</h6>
              </div>
              {personalField === 'mail' && <>
              <div>
                <p>Enter new email</p>
                <input placeholder="email" onChange={(e)=>setEmail(e.target.value)} type="email" />
              </div>
              <div>
                <p>Enter your password</p>
                {/* <input type="password" /> */}
                <input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)} />
                {/* <button style={{cursor:"pointer",width:"300px",height:"100px",border:"1px solid black",backgroundColor:"rgba(123,123,123,0)"}} onClick={()=>setPersonalField('mail')}  >change</button> */}
              </div>
                <button onClick={()=>ChangeEmail()} style={{cursor:"pointer",width:"150px",borderRadius:"50px",height:"200px",border:"1px solid black",backgroundColor:"rgba(123,123,123,0)"}}  >change</button>
              </>}
              {personalField === 'name' && <>
              <div>
                <p>Enter new name</p>
                <input placeholder="name" onChange={(e)=>setNewName(e.target.value)} type="text" />
              </div>
              <div>
                <p>Enter your password</p>
                <input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)} />
              </div>
            <button onClick={()=>ChangeName()} style={{cursor:"pointer",width:"150px",borderRadius:"50px",height:"200px",border:"1px solid black",backgroundColor:"rgba(123,123,123,0)"}} >change</button>
                {/* <button style={{cursor:"pointer",width:"150px",height:"150px",border:"1px solid black",backgroundColor:"rgba(123,123,123,0)"}} onClick={()=>setPersonalField('mail')}  >change</button> */}
              </>}
            </div>
        </div>
    )
}

export default Personal