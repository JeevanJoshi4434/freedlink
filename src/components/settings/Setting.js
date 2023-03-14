import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Post from '../subcomponents/Post';
import settingStyle from './setting.module.css';
const Setting = (props) => {
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
  const ChangePassword = async()=>{
    const res = await fetch(`/api/user/change/password/${password}/${newPass}`,{method:"PUT",headers:{accessToken:accessToken}})
    const data = await res.status;
    if(data === 200){
      console.log('changed')
    }
}

  if (isMobile) {
    return (
      <>
        <div className={settingStyle.MobileView}>
          <div className={settingStyle.mobileSettingOptions}>
            <div className={settingStyle.browserSettingOptions}>
              <div style={{ display: "flex" }} onClick={() => navigate('/settings/personal')} ><span style={{ marginRight: "10px" }} className='material-icons'>account_circle</span><h4>Personal Details</h4></div>
              <div style={{ display: "flex" }} onClick={() => navigate('/settings/security')} ><span style={{ marginRight: "10px" }} className='material-icons'>security</span><h4>Change Password</h4></div>
              <div style={{ display: "flex" }} onClick={() => navigate('/settings/saved')} ><span style={{ marginRight: "10px" }} className='material-icons'>bookmark</span><h4>Saved</h4></div>
              {/* <div style={{display:"flex"}} ><span style={{marginRight:"10px"}} className='material-icons'>shield</span><h4>Privacy</h4></div> */}
              {/* <div style={{display:"flex"}} ><span style={{marginRight:"10px"}} className='material-icons'>workspace_premium</span><h4>Professional</h4></div> */}
              <div style={{ display: "flex" }} onClick={() => navigate('/settings/help')}><span style={{ marginRight: "10px" }} className='material-icons'>help</span><h4>Help</h4></div>
              <div style={{ display: "flex" }} onClick={() => navigate('/settings/report')}><span style={{ marginRight: "10px" }} className='material-icons'>report</span><h4>Report</h4></div>
            </div>
          </div>
        </div>
      </>
    )
  }
  else {
    return (
      <div className={settingStyle.BrowserView}>
        <div className={settingStyle.BrowserLeft}>

          <div className={settingStyle.browserSettingOptions}>
            <div style={{ display: "flex" }} onClick={() => setCurrentOption('Personal Details')} ><span style={{ marginRight: "10px" }} className='material-icons'>account_circle</span><h4>Personal Details</h4></div>
            <div style={{ display: "flex" }} onClick={() => setCurrentOption('security')} ><span style={{ marginRight: "10px" }} className='material-icons'>security</span><h4>Change Password</h4></div>
            <div style={{ display: "flex" }} onClick={() => setCurrentOption('saved')} ><span style={{ marginRight: "10px" }} className='material-icons'>bookmark</span><h4>Saved</h4></div>
            {/* <div style={{display:"flex"}} ><span style={{marginRight:"10px"}} className='material-icons'>shield</span><h4>Privacy</h4></div> */}
            {/* <div style={{display:"flex"}} ><span style={{marginRight:"10px"}} className='material-icons'>workspace_premium</span><h4>Professional</h4></div> */}
            <div style={{ display: "flex" }} onClick={() => setCurrentOption('Help')} ><span style={{ marginRight: "10px" }} className='material-icons'>help</span><h4>Help</h4></div>
            <div style={{ display: "flex" }} onClick={() => setCurrentOption('Report')} ><span style={{ marginRight: "10px" }} className='material-icons'>report</span><h4>Report</h4></div>
          </div>
        </div>
        <div className={settingStyle.BrowserRight} style={{maxHeight:"600px"}} >
          {currentOption === '' && <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <span className='material-icons'>settings</span>
            <h4>Welcome to setting panel, Choose any option you want to change.</h4>
          </div>}
          {currentOption === 'Report' && <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <div className={settingStyle.reportPanel} >
              <h4>Something error happened ? tell us.</h4>
              <p>Type what happen.</p>
              <textarea onChange={(e) => setReportDesc(e.target.value)} placeholder="type what's the problem"></textarea>
              <p>Attach screenshot</p>
              <input type="file" accept='image/*' />
              <button onClick={(e) => Report(e)}>Submit</button>
            </div>
          </div>}
          {currentOption === 'security' && <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
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
          </div>}
          {currentOption === 'Personal Details' && <div style={{ height: "100%", marginLeft: "19px", marginTop: "20px", display: "flex",backgroundColor:"#f6f6f6" }}>
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
          </div>}
          {currentOption === 'saved' && <div style={{ height: "100%",overflow:"auto",marginTop:"123px", marginLeft: "19px", marginTop: "20px", display: "flex", flexDirection:"column" }}>
            {posts?.map((i)=>(
                i?.posts?.map((item)=>{
                  return(
                    <>
                    <Post key={item._id} socket={props?.socket} username={item.name} postId={item._id} like={item.like} likeNo={item.like.length} commentNo={item.comments.length} userId={item.user} caption={item.title} image={item.image} profile={item.avatar} comments={""}
                  time={"2 AM"} date={"24 Aug"} />
                    </>
                  )
                })
              ))}
          </div>}
        </div>
      </div>
    )
  }
}

export default Setting