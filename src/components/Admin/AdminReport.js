import { autoBatchEnhancer } from '@reduxjs/toolkit';
import axios from 'axios';
import { CanvasJSChart } from 'canvasjs-react-charts';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
//    // console.log({all,message,post,profile,system,job});
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
        <div style={{
            display: "flex",
            backgroundColor: "#6e00ff",
        }}  >
            <div style={{ flex: "0.20", height: "93vh", borderRight: "1px solid black",display:"flex",flexDirection:"column",backgroundColor:"#fff"}} >
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
                    borderBottom:"1px solid #c1c1c1"
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
                    borderBottom:"1px solid #c1c1c1"
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
                    borderBottom:"1px solid #c1c1c1"
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
                    borderBottom:"1px solid #c1c1c1"
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
                    borderBottom:"1px solid #c1c1c1"
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
                    borderBottom:"1px solid #c1c1c1"
                }}>
                    <h4 style={{fontSize:"20px",fontWeight:"400"}}>Message Reports</h4>
                </div>
            </div>
            {reportType==='all' && <div style={{
                flex: "0.80", height: "93vh",
                backgroundColor: "#6e00ff",padding:"10px 10px",
                justifyContent:'center',alignItems:"center",display:"flex"
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
                    justifyContent:"center"}}>
                    <CanvasJSChart options = {options}/>
                    </div>
                    
                    
                    </div>
            </div>}
            {reportType==='system' && <div style={{
                flex: "0.80", height: "93vh",
                backgroundColor: "#6e00ff",padding:"10px 10px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr"
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
                            justifyContent:"center"}}>
                                <h4>{i?.desc}</h4>
                                <p>userID: {i?.reportedBy}</p>
                                <p>{i?.type}</p>
                                <p>{i?.createdAt}</p>
                            </div>
                    
                    )
                        })}
            </div>}
            {reportType==='post' && <div style={{
                flex: "0.80", height: "93vh",overflow:"auto",
                backgroundColor: "#6e00ff",padding:"10px 10px",display:"grid",gridTemplateColumns:"repeat(3, 1fr)"
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
                            justifyContent:"center"}}>
                                <h4>{i?.title}</h4>
                                <p>Reported by userID: {i?.reportedBy}</p>
                                <p>Reported to userID: {i?.reportedTo}</p>
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
                flex: "0.80", height: "93vh",
                backgroundColor: "#6e00ff",padding:"10px 10px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr"
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
                            justifyContent:"center"}}>
                                <h4>{i?.Title}</h4>
                                <p>userID: {i?.reportedBy}</p>
                                <p>Reported to: {i?.reportedTo}</p>
                                <p>{i?.type}</p>
                                <h4>{i?.desc}</h4>
                                <p>{i?.createdAt}</p>
                                <Link to={i?.img} target="__blank" >View Image</Link>
                            </div>
                    
                    )
                        })}
            </div>}
            {reportType==='profile' && <div style={{
                flex: "0.80", height: "93vh",
                backgroundColor: "#6e00ff",padding:"10px 10px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr"
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
                            justifyContent:"center"}}>
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
                flex: "0.80", height: "93vh",overflow:"auto",
                backgroundColor: "#6e00ff",padding:"10px 10px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr"
            }}>
                    {messageReport?.map((i)=>{
                        // console.log(i)
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
    )
}

export default AdminReport