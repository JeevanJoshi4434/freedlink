import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import AdminStyle from './AdminStyle.css';
const AdminLogin = () => {
    const [inputType, setInputType] = useState('password');
    const isVisible = ()=>{
        inputType === 'password' ? setInputType('text') : setInputType('password')
    }
  return (
    <div style={{height:"100vh",backgroundColor:"#f8f8fb",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div style={{
            backgroundColor:"white",
            width:"450px",
            height:"500px",
            borderRadius:"12px",
            padding:"30px 30px"
        }} >
            <div className={AdminStyle.loginTitle} style={{margin:"20px 0px"}} >
                <h4 style={{fontSize:"22px",fontWeight:"400"}}  >Admin Login</h4>
                <p style={{fontSize:"14px", color:"#8d8d8d" }} >Sign in to your account to continue.</p>
            </div>
            <div className={AdminStyle.loginMain} style={{marginTop:"70px",display:"flex",flexDirection:"column"}} >
                <h4 style={{fontSize:"12px",fontWeight:"500"}} >Email address</h4>
                <input type="email" placeholder='name@example.com' style={{border:"1px solid #8d8d8d",borderRadius:"8px",outlineWidth:"0",backgroundColor:"rgba(123,123,123,0)",height:"40px"}} />
                <div className={AdminStyle.loginPassword} style={{marginTop:"20px",display:"flex", justifyContent:"space-between"}}>
                    <h4 style={{fontSize:"12px",fontWeight:"500"}} >Password</h4>
                    <Link to="/" style={{fontSize:"12px",color:"#8d8d8d"}}>Lost Password?</Link>
                </div>
                <div style={{ padding:"0px 2px",backgroundColor:"rgba(123,123,123,0)",border:"1px solid #8d8d8d",borderRadius:"8px",marginBottom:"20px",display:"flex", justifyContent:"space-between",alignItems:"center"}}><input type={inputType} style={{backgroundColor:"rgba(123,123,123,0)",outlineWidth:"0",border:"none",height:"40px"}} placeholder='Password' /><span className='material-icons' onClick={isVisible}>visibility</span></div>
                <Link to="/admin" style={{backgroundColor:"#6e00ff",border:"none",width:"100px",color:"white",height:"40px",borderRadius:"50px",display:"flex",justifyContent:"center",alignItems:"center"}} >Sign in</Link>
            </div>
        </div>
    </div>
  )
}

export default AdminLogin