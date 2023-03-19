import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const AdminNav = () => {
    const userDetails = useSelector((state) => state.user);
    let user = userDetails?.user;
    
    
    // // // console.log(user?.other?.name)
    let accessToken = user?.accessToken;
    let name = '';
    name = user?.other?.name;
    let firstname = [];
    for (let i = 0; i < 40; i++) {
        if(name.charAt(i) === " "){
            break;
        }else{
            firstname[i] = name.charAt(i);
        }
    }
    
    
  return (
    <>
    <nav style={{
        display:"flex",
        justifyContent:"space-around",
        backgroundColor:"#0101c4",
        alignItems:"center",
        color:"#fff",
    }}>
        <div style={{display:"flex"}} ><h4 style={{fontSize:"29px",fontWeight:"300"}} >FreedLink - Admin</h4></div>
        <div style={{display:"flex",color:"#fff"}}>
            <Link to="/admin"><p style={{color:"#fff",marginRight:"10px",fontWeight:"200"}}>Home</p></Link>
            <Link to="/admin/reports"><p style={{color:"#fff",marginRight:"10px",fontWeight:"200"}}>Reports</p></Link>
            <Link to="/admin/users"><p style={{color:"#fff",marginRight:"10px",fontWeight:"200"}} >All Users</p></Link>
            {/* <Link to="/admin/jobs"><p style={{color:"#fff",marginRight:"10px",fontWeight:"200"}} >All Jobs</p></Link> */}
            {/* <Link to="/admin/hr"><p style={{color:"#fff",marginRight:"10px",fontWeight:"200"}} >HR</p></Link> */}
        </div>
        <div>
            <div style={{borderRadius:"50px",backgroundColor:"#5800cc",display:"flex",padding:"4px 10px",alignItems:"center",marginTop:"10px",height:"50px"}}>
                <img style={{marginRight:"10px",width:"40px",height:"40px",borderRadius:"50%"}} src={user?.other?.img} />
                <h4 style={{fontSize:"14px",fontWeight:"500"}} > {user?.other?.name}</h4>
            </div>
        </div>
    </nav>
    </>
  )
}

export default AdminNav