import axios from 'axios';
import { CanvasJSChart } from 'canvasjs-react-charts';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './Admindashboard.module.css';
import { CChart } from '@coreui/react-chartjs';
import { useNavigate } from 'react-router-dom';
// import { getStorage, ref, getMetadata } from "firebase/storage";
// const storage = getStorage();
// const forestRef = ref(storage, 'images/forest.jpg');
// getMetadata(forestRef)
//   .then((metadata) => {
//   })
//   .catch((error) => {
//     cl
//   });
const AdminReport = () => {
    let all = [],job = [],system=[],message = [],post = [],profile=[];
    const [reportType, setReportType] = useState('all');
    const [allReports, setAllReports] = useState();
    const [messageReport, setMessageReport] = useState();
    const [postReport, setPostReport] = useState();
    const [systemReport, setSystemReport] = useState();
    const [jobReport, setJobReport] = useState();
    const [profileReport, setProfileReport] = useState();
    const userDetails = useSelector((state) => state.user);
    let user = userDetails?.user;
    let accessToken = user?.accessToken;
        useEffect(()=>{
        const allReport = async()=>{
            const res = await axios.get(`/api/allreports`,{headers:{accessToken:accessToken}})
            setAllReports(res.data);
        }
        const messageReport = async()=>{
            const res = await axios.get(`/api/reports/message`,{headers:{accessToken:accessToken}})
            setMessageReport(res.data);
        }
        const postReport = async()=>{
            const res = await axios.get(`/api/reports/post`,{headers:{accessToken:accessToken}})
            setPostReport(res.data);
        }
        const systemReport = async()=>{
            const res = await axios.get(`/api/reports/system`,{headers:{accessToken:accessToken}})
            setSystemReport(res.data);
        }
        const jobReport = async()=>{
            const res = await axios.get(`/api/reports/job`,{headers:{accessToken:accessToken}})
            setJobReport(res.data);
        }
        const profileReport = async()=>{
            const res = await axios.get(`/api/reports/profile`,{headers:{accessToken:accessToken}})
            setProfileReport(res.data);
        }
        allReport();
        postReport();
        messageReport();
        jobReport();
        profileReport();
        systemReport();
    },[]);
    all = allReports;
    job = jobReport;
    system = systemReport;
    message = messageReport;
    post = postReport;
    profile = profileReport;
//    // // console.log({all,message,post,profile,system,job});
    const options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "All Reports"
        },
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                { y: (system?.length/all?.length)*100, label: "System Reports" },
                { y: (post?.length/all?.length)*100, label: "Post Reports" },
                { y: (profile?.length/all?.length)*100, label: "Profile Reports" },
                { y: (job?.length/all?.length)*100, label: "Job Reports" },
                { y: (message?.length/all?.length)*100, label: "message Reports" }
            ]
        }]
    }
    return (
        <>
        <div className={style.AdminDashboard} >
            <input type='checkbox' id="sidebarCheckbox" style={{ display: "none" }} />
            <div className={style.adminWidgets}>
                <h4>Freedlink - Admin</h4>
                <div className={style.adminPages} >
                    <ul>
                        <div>
                            <span style={{ fontSize: "12px", color: "#aeaeae", marginRight: "5px" }} className="material-icons">web</span><span className={style.sidebarHeader} style={{ fontSize: "12px", color: "#aeaeae" }} >Pages</span>
                        </div>
                        <li className={style.sidebarItem} >
                            <Link to="/admin/dashboard">
                                <span className='material-icons' style={{color:"#aeaeae", fontSize: "16px", marginRight: "5px" }} >dashboard</span> <p className={style.alignMiddle} >Dashboard</p>
                            </Link>
                        </li>
                        <li className={style.sidebarItem} >
                            <Link to="/admin/Statistics">
                                <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >bar_chart</span> <p className={style.alignMiddle} >Charts & Stats</p>
                            </Link>
                        </li>
                        <li className={style.sidebarItem} >
                            <Link to="/">
                                <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >home</span> <p className={style.alignMiddle} >Freedlinks Home</p>
                            </Link>
                        </li>
                        <li className={style.sidebarItem} >
                            <Link to={`/profile/${user?.other?._id}`}>
                                <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >person</span> <p className={style.alignMiddle} >Profile</p>
                            </Link>
                        </li>
                        {/* <li className={style.sidebarItem} >
                            <Link to="#">
                                <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >logout</span> <p className={style.alignMiddle} >Logout</p>
                            </Link>
                        </li> */}
                    </ul>
                </div>
                <div className={style.adminPages} >
                    <ul>
                        <div>
                            <span style={{ fontSize: "12px", color: "#aeaeae", marginRight: "5px" }} className="material-icons">construction</span><span className={style.sidebarHeader} style={{ fontSize: "12px", color: "#aeaeae" }} >Tools</span>
                        </div>
                        <li className={style.sidebarItem} >
                            <Link to="/admin/reports"  className={style.active} >
                                <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >description</span> <p className={style.alignMiddle} >Reports</p>
                            </Link>
                        </li>
                        <li className={style.sidebarItem} >
                            <Link to="/admin/users">
                                <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >person</span> <p className={style.alignMiddle} >All Users</p>
                            </Link>
                        </li>
                        <li className={style.sidebarItem} >
                            <Link to="/admin/user/action" title='delete user suspend and more...'>
                                <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >warning</span> <p className={style.alignMiddle} >Actions</p>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={style.adminPages} >
                    <ul>
                        <div title="Payment system coming soon..." >
                            <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >workspace_premium</span><span className={style.sidebarHeader} style={{ fontSize: "12px", color: "#aeaeae" }} >Premium Actions</span>
                        </div>
                        <li className={style.sidebarItem} title="Payment system coming soon..." >
                            <Link to="#" title="Payment system coming soon...">
                                <span className='material-icons' style={{ fontSize: "16px", color: "#aeaeae", marginRight: "5px" }} >store</span> <p style={{ color: "#aeaeae", }} className={style.alignMiddle} >Payment Page</p>
                            </Link>
                        </li>
                        <li className={style.sidebarItem} title="Payment system coming soon..." >
                            <Link to="#">
                                <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >groups</span> <p style={{ color: "#aeaeae", }} className={style.alignMiddle} >Customers</p>
                            </Link>
                        </li>
                        <li className={style.sidebarItem} title="Payment system coming soon..." >
                            <Link to="#">
                                <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >receipt_long</span> <p style={{ color: "#aeaeae", }} className={style.alignMiddle} >Transitions</p>
                            </Link>
                        </li>
                        <li className={style.sidebarItem} title="Payment system coming soon..." >
                            <Link to="#">
                                <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >group</span> <p style={{ color: "#aeaeae", }} className={style.alignMiddle} >Live Customers</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={style.adminMain}>
                <nav className={style.adminNav} >
                    <div className={style.adminNavLeft} >
                        <label htmlFor='sidebarCheckbox' className={style.navSidebarClick} >
                            <span className='material-icons' style={{ cursor: "pointer" }} >sort</span>
                        </label>
                    </div>
                    <div className={style.adminNavRight}>
                        <div className={style.adminUserProfile} >
                        <img src={user?.other?.img} style={{ backgroundColor: "#0000a7", height: "45px", width: "45px", borderRadius: "12px", marginRight: "10px" }} />
                            <p>{user?.other?.name}</p>
                        </div>
                    </div>
                </nav>
                <main>
                    <div>
                        {/* <h4 style={{ fontSize: "30px", fontWeight: "500" }} ></h4> */}
                        {/* <p>Have a nice day! {time}</p> */}
                    </div>
                    <div style={{
            display: "flex",flexDirection:"column"
        }}  >
            <div style={{ flex: "0.20", height: "auto",display:"flex",flexDirection:"row",backgroundColor:"#fff",
                    boxShadow: "0 0 0.875rem 0 rgba(33,37,41,.05)"}} >
                <div onClick={()=>setReportType('all')} style={{
                    height:"70px",
                    width:"100%",
                    backgroundColor:"#fff",
                    color:"black",
                    margin:"10px 0px",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    cursor:"pointer",
                   // borderBottom:"1px solid #c1c1c1"
                }}>
                    <h4 style={{fontSize:"20px",fontWeight:"400"}}>All Reports</h4>
                </div>
                <div onClick={()=>setReportType('system')} style={{
                    height:"70px",
                    width:"100%",
                    backgroundColor:"#fff",
                    color:"black",
                    margin:"10px 0px",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    cursor:"pointer",
                   // borderBottom:"1px solid #c1c1c1"
                }}>
                    <h4 style={{fontSize:"20px",fontWeight:"400"}}>System Report</h4>
                </div>
                <div onClick={()=>setReportType('post')} style={{
                    height:"70px",
                    width:"100%",
                    backgroundColor:"#fff",
                    color:"black",
                    margin:"10px 0px",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    cursor:"pointer",
                   // borderBottom:"1px solid #c1c1c1"
                }}>
                    <h4 style={{fontSize:"20px",fontWeight:"400"}}>Post reports</h4>
                </div>
                <div onClick={()=>setReportType('job')} style={{
                    height:"70px",
                    width:"100%",
                    backgroundColor:"#fff",
                    color:"black",
                    margin:"10px 0px",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    cursor:"pointer",
                   // borderBottom:"1px solid #c1c1c1"
                }}>
                    <h4 style={{fontSize:"20px",fontWeight:"400"}}>Job Reports</h4>
                </div>
                <div onClick={()=>setReportType('profile')} style={{
                    height:"70px",
                    width:"100%",
                    backgroundColor:"#fff",
                    color:"black",
                    margin:"10px 0px",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    cursor:"pointer",
                   // borderBottom:"1px solid #c1c1c1"
                }}>
                    <h4  style={{fontSize:"20px",fontWeight:"400"}}>Profile Reports</h4>
                </div>
                <div onClick={()=>setReportType('message')} style={{
                    height:"70px",
                    width:"100%",
                    backgroundColor:"#fff",
                    color:"black",
                    margin:"10px 0px",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    cursor:"pointer",
                   // borderBottom:"1px solid #c1c1c1"
                }}>
                    <h4 style={{fontSize:"20px",fontWeight:"400"}}>Message Reports</h4>
                </div>
            </div>
            {reportType==='all' && <div style={{
                flex: "0.80", height: "93vh",
                padding:"10px 10px",
                justifyContent:'center',alignItems:"center",display:"flex",
            }}>
                
                 <div>
                    <div style={{
                    backgroundColor: "#fff",
                    color: "black",
                    height: "400px",
                    width: "700px",
                    borderRadius: "12px",
                    padding: "10px 10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent:"center",
                    boxShadow: "0 0 0.875rem 0 rgba(33,37,41,.05)"}}>
                    <CanvasJSChart options = {options}/>
                    </div>
                    
                    
                    </div>
            </div>}
            {reportType==='system' && <div style={{
                flex: "0.80", height: "100%",padding:"10px 10px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",
               
            }}>
                    {systemReport?.map((i)=>{
                        return(
                       
                        <div style={{
                            backgroundColor: "#fff",
                            color: "black",
                            height: "100px",
                            width: "300px",
                            borderRadius: "12px",
                            padding: "10px 10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent:"center",
                            boxShadow: "0 0 0.875rem 0 rgba(33,37,41,.05)"}}>
                                <h4>{i?.desc}</h4>
                                <p>userID: {i?.reportedBy}</p>
                                <p>{i?.type}</p>
                                <p>{i?.createdAt}</p>
                            </div>
                    
                    )
                        })}
            </div>}
            {reportType==='post' && <div style={{
                flex: "0.80", height: "100%",overflow:"auto",padding:"10px 10px",display:"grid",gridTemplateColumns:"repeat(3, 1fr)",
              
            }}>
                    {postReport?.map((i)=>{
                        return(
                       <>
                        <div style={{marginBottom:"10px",
                            backgroundColor: "#fff",
                            color: "black",
                            height: "100%",
                            width: "100%",
                            borderRadius: "12px",
                            padding: "10px 10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent:"center",}}>
                                <h4>{i?.title}</h4>
                                <p>Reported by userID: {i?.reportedBy}</p>
                                <Link to={`/profile/${i?.reportedBy}`}>view User</Link>
                                <p>Reported to userID: {i?.reportedTo}</p>
                                <Link to={`/post/${i?.reportedTo}`}>view Post</Link>
                                <p>{i?.desc}</p>
                                <p>{i?.type}</p>
                                <p>{i?.createdAt}</p>
                                <img src={i?.img} style={{width:"210px",height:"230px"}}  />
                            </div>
                            </>
                    
                    )
                        })}
            </div>}
            {reportType==='job' && <div style={{
                flex: "0.80", height: "100%",padding:"10px 10px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",
               
            }}>
                    {jobReport?.map((i)=>{
                        return(
                       
                        <div style={{
                            backgroundColor: "#fff",
                            color: "black",
                            height: "100%",
                            width: "100%",
                            borderRadius: "12px",
                            padding: "10px 10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent:"center",
                            boxShadow: "0 0 0.875rem 0 rgba(33,37,41,.05)"}}>
                                <h4>{i?.Title}</h4>
                                <p>userID: {i?.reportedBy}</p>
                                <Link to={`/profile/${i?.reportedBy}`}>view User</Link>
                                <p>Reported to: {i?.reportedTo}</p>
                                <Link to={`/jobs/${i?.reportedTo}`}>view Job</Link>
                                <p>{i?.type}</p>
                                <h4>{i?.desc}</h4>
                                <p>{i?.createdAt}</p>
                            </div>
                    
                    )
                        })}
            </div>}
            {reportType==='profile' && <div style={{
                flex: "0.80", height: "100%",padding:"10px 10px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",
            }}>
                    {profileReport?.map((i)=>{
                        return(
                       
                        <div style={{
                            backgroundColor: "#fff",
                            color: "black",
                            height: "100%",
                            width: "100%",
                            borderRadius: "12px",
                            padding: "10px 10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent:"center",
                            boxShadow: "0 0 0.875rem 0 rgba(33,37,41,.05)"}}>
                                <h4>{i?.title}</h4>
                                <p>userID: {i?.reportedBy}</p>
                                <p>profile ID: {i?.reportedTo}</p>
                                <p>{i?.type}</p>
                                <p>{i?.createdAt}</p>
                            </div>
                    
                    )
                        })}
            </div>}
            {reportType==='message' && <div style={{
                flex: "0.80", height: "100%",overflow:"auto",padding:"10px 10px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr"
            }}>
                    {messageReport?.map((i)=>{
                        // // console.log(i)
                        return(
                       
                        <div style={{
                            backgroundColor: "#fff",
                            color: "black",
                            height: "100%",
                            width: "100%",
                            borderRadius: "12px",
                            padding: "10px 10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                boxShadow: "0 0 0.875rem 0 rgba(33,37,41,.05)",
                            justifyContent:"center"}}>
                                <h4>{i?.title}</h4>
                                <p>userID: {i?.reportedBy}</p>
                                <p>Reported To ID: {i?.reportedTo}</p>
                                <p>{i?.type}</p>
                                <p>{i?.createdAt}</p>
                            </div>
                    
                    )
                        })}
            </div>}
        </div>
                </main>
            </div>
        </div>
        
        </>
    )
}

export default AdminReport