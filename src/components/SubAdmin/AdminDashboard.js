import axios from 'axios';
import { CChart } from '@coreui/react-chartjs';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import mongoSVG from './assets/mongodb-ar21.svg';
import firebaseSVG from './assets/firebase-ar21.svg';
import style from './Admindashboard.module.css';
import { grabStatus } from '../APIs/UserControlCalls';
const SubAdminDashboard = () => {
    const userDetails = useSelector((state) => state.user);
    let user = userDetails?.user;
    let accessToken = user?.accessToken;
    let navigate = useNavigate();
    if (user?.other?.role !== "Admin") {
        // // console.log("not a admin")
        navigate("/");
    }
    var date = new Date();
    let changes = 0;
    var Thisyear = date.getFullYear();
    let year = JSON.stringify(Thisyear);
    const [currentMessage, setCurrentMessage] = useState('');
    const [usersTraffic, setUsersTraffic] = useState();
    const [time, setTime] = useState('');
    const [visitors, setVisitors] = useState(0);
    const [users, setUsers] = useState(0);
    const [posts, setPosts] = useState(0);
    const [report, setReport] = useState(0);
    const [jobs, setJobs] = useState(0);
    const [notify, setNotify] = useState(0);
    const [pending, setPending] = useState(0);
    const [verified, setVerified] = useState(0);
    const [totalStorage, setTotalStorage] = useState(0);
    const [pendingJob, setPendingJob] = useState([]);
    const [jobId, setJobId] = useState('');

    const [approvalStatus, setApprovalStatus] = useState([]);
    const getStatus = async()=>{
        const getData = await axios.get(`/api/jobstatus`);
        setApprovalStatus(getData.data);
    }
    console.log(approvalStatus);
    useEffect(()=>{
        getStatus();
    },[changes])
    useEffect(() => {
        const getVisitors = async () => {
            const res = await axios.get(`/api/visitors/all`);
            setVisitors(res.data);
        }
        const getUsers = async () => {
            const res = await axios.get(`/api/allusers`);
            setUsers(res.data);
        }
        const getPosts = async () => {
            const res = await axios.get(`/api/allposts`);
            setPosts(res.data);
        }
        const getReports = async () => {
            const res = await axios.get(`/api/totalreports`);
            setReport(res.data);
        }
        const getJobs = async () => {
            const res = await axios.get(`/api/alljobs`);
            setJobs(res.data);
        }
        const getNotify = async () => {
            const res = await axios.get(`/api/allnotifications`);
            setNotify(res.data);
        }
        const getPending = async () => {
            const res = await axios.get(`/api/verifypendingusers`);
            setPending(res.data);
        }
        const getStorage = async () => {
            const res = await axios.get(`/api/databasesize`);
            var data = res.data;
            setTotalStorage(data?.toFixed(4));

        }
        const getVerified = async () => {
            const res = await axios.get(`/api/verifiedusers`);
            setVerified(res.data);
        }
        getVisitors();
        getUsers();
        getPosts();
        getReports();
        getJobs();
        getNotify();
        getPending();
        getVerified();
        getStorage();
    }, [changes])
    const approvePost = async(postid)=>{
        const data = await fetch(`/api/verifypost/${postid}`,{method:"PUT",headers:{accessToken:accessToken}});
        changes++;
        console.log(data.status);
    }
    const deletePost = async(postid)=>{
        const data = await fetch(`/api/job-denied/${postid}`,{method:"DELETE",headers:{accessToken:accessToken}});
        changes++;
        console.log(data.status);
    }
    const autoAproval = async()=>{
        const data = await fetch(`/api/stopUpload`,{method:"PUT",headers:{accessToken:accessToken}});
        changes++;
        console.log(data.json);
        getStatus();
        // approvalStatus===true ? setApprovalStatus(false) : setApprovalStatus(true);
    }
    // console.log(visitors)

    let January = 0, February = 0, March = 0, April = 0, May = 0, June = 0, July = 0, August = 0, September = 0, October = 0, November = 0, December = 0, Year;
    var today = new Date();
    let day = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    // var interval = setInterval(() => {
    //     var curHour = today.getHours();
    //     var curMin = today.getMinutes();
    //     var curSec = today.getSeconds();
    //     setTime(`${curHour} : ${curMin} : ${curSec}`);

    // }, 1000);
    // location of people & report location & numbers
    useEffect(() => {
        const users = async () => {
            const res = await axios.get(`/api/users/all`, { headers: { accessToken: accessToken } })
            setUsersTraffic(res.data);
        }
        users();
    }, [changes]);
    useEffect(() => {
        const posts = async () => {
            const res = await axios.get(`/api/job-approval`, { headers: { accessToken: accessToken } })
            setPendingJob(res.data);
        }
        posts();
    }, [changes]);
    const approvalAction = ()=>{
        autoAproval();
    }
    usersTraffic?.map((i) => {
        if (i?.createdYear === year && i?.createdMonth === "1") {
            January = January + 1;
        }
        if (i?.createdYear === year && i?.createdMonth === "2") {
            February = February + 1;
        }
        if (i?.createdYear === year && i?.createdMonth === "3") {
            March = March + 1;
        }
        if (i?.createdYear === year && i?.createdMonth === "4") {
            April = April + 1;
        }
        if (i?.createdYear === year && i?.createdMonth === "5") {
            May = May + 1;
        }
        if (i?.createdYear === year && i?.createdMonth === "6") {
            June = June + 1;
        }
        if (i?.createdYear === year && i?.createdMonth === "7") {
            July = July + 1;
        }
        if (i?.createdYear === year && i?.createdMonth === "8") {
            August = August + 1;
        }
        if (i?.createdYear === year && i?.createdMonth === "9") {
            September = September + 1;
        }
        if (i?.createdYear === year && i?.createdMonth === "10") {
            October = October + 1;
        }
        if (i?.createdYear === year && i?.createdMonth === "11") {
            November = November + 1;
        }
        if (i?.createdYear === year && i?.createdMonth === "12") {
            December = December + 1;
        }
    })
    // // console.log(January)
    var curHr = today.getHours();
    useEffect(() => {
        if (curHr > 3 && curHr < 12) {
            setCurrentMessage('Good Morning, ');
        } else if (curHr > 11 && curHr < 18) {
            setCurrentMessage('Good Afternoon, ');
        } else {
            setCurrentMessage('Good Evening, ');
        }
    }, [curHr])
    // // // console.log({hour:curHr,day:today})
    let name = '';
    name = user?.other?.name;
    let firstname = [];
    for (let i = 0; i < 40; i++) {
        if (name.charAt(i) === " ") {
            break;
        } else {
            firstname[i] = name.charAt(i);
        }
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
                                <Link to="/admin/dashboard" className={style.active}>
                                    <span className='material-icons' style={{ fontSize: "16px", marginRight: "5px" }} >dashboard</span> <p className={style.alignMiddle} >Dashboard</p>
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
                                <Link to="/admin/reports">
                                    <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >description</span> <p className={style.alignMiddle} >Reports</p>
                                </Link>
                            </li>
                            <li className={style.sidebarItem} >
                                <Link to="/admin/users">
                                    <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >person</span> <p className={style.alignMiddle} >All Users</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={style.adminPages} >
                        <ul>
                            <div title="Payment system coming soon..." >
                                <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >workspace_premium</span><span className={style.sidebarHeader} style={{ fontSize: "12px", color: "#aeaeae" }} >Premium Management</span>
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
                            <h4 style={{ fontSize: "30px", fontWeight: "500" }} >{currentMessage}{firstname}!</h4>
                            <p>Have a nice day! {time}</p>
                        </div>
                        <div style={{ display: "flex" }}>

                            <div style={{

                                marginTop: "10px",
                                backgroundColor: "#fff",
                                color: "black",
                                height: "100%",
                                width: "48%",
                                borderRadius: "12px",
                                padding: "10px 10px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                boxShadow: "0 0 0.875rem 0 rgba(33,37,41,.05)"
                            }}>
                                <h6>User Traffic - Current year</h6>
                                <div style={{
                                    width: "100%",
                                    height: "100%",
                                }}>
                                    <CChart
                                        type="line"
                                        data={{
                                            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                                            datasets: [
                                                // {
                                                //     label: "2022",
                                                //     backgroundColor: "rgba(220, 220, 220, 0.2)",
                                                //     borderColor: "rgba(220, 220, 220, 1)",
                                                //     pointBackgroundColor: "rgba(220, 220, 220, 1)",
                                                //     pointBorderColor: "#fff",
                                                //     data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 150, 300]
                                                // },
                                                {
                                                    label: year,
                                                    backgroundColor: "rgba(151, 187, 205, 0.2)",
                                                    borderColor: "rgba(151, 187, 205, 1)",
                                                    pointBackgroundColor: "rgba(151, 187, 205, 1)",
                                                    pointBorderColor: "#fff",
                                                    data: [January, February, March, April, May, June, July, August, September, October, November, December]
                                                },
                                            ],
                                        }}
                                    />
                                </div>
                            </div>
                            <div style={{
                                backgroundColor: "#fff",
                                color: "black",
                                height: "100%",
                                width: "auto",
                                borderRadius: "12px",
                                padding: "10px 10px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                marginLeft: "10px",
                                marginTop: "10px",
                                boxShadow: "0 0 0.875rem 0 rgba(33,37,41,.05)"
                            }}>
                                <h6>Databases</h6>
                                <div style={{
                                    width: "auto",
                                    height: "100%",
                                    display: "flex"
                                }}>
                                    <div style={{ marginRight: "10px" }}>
                                        <img src={mongoSVG} />
                                        <h4>JSON Database</h4>
                                        <h6>{totalStorage}MB/512MB Storage Used</h6>
                                        <p style={{ marginTop: "10px" }}>No subscription</p>
                                    </div>
                                    <div>
                                        <img src={firebaseSVG} />
                                        <h4>Image & Video Database</h4>
                                        <h6>5GB Storage</h6>
                                        <p style={{ marginTop: "10px" }} >No subscription</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', marginTop: "10px" }}>
                            <h4 style={{ marginRight: "5px" }}>Database</h4><p> Analysis {process.env.DATA}</p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr 1fr" }}>
                            <div className={style.box}>
                                <div><p>Visitors</p><span style={{
                                    width: "45px", height: "45px", borderRadius: "50%", backgroundColor: "#d3e2f7", display: 'flex', alignItems: 'center', justifyContent: "center"
                                }}><span className='material-icons' style={{ color: '#3b7ddd' }} >person</span></span></div>
                                <div><h4>{visitors}</h4></div>
                            </div>
                            <div className={style.box}>
                                <div><p>Users</p><span style={{
                                    width: "45px", height: "45px", borderRadius: "50%", backgroundColor: "#d3e2f7", display: 'flex', alignItems: 'center', justifyContent: "center"
                                }}><span className='material-icons' style={{ color: '#3b7ddd' }} >groups</span></span></div>
                                <div><h4>{users}</h4></div>
                            </div>
                            <div className={style.box}>
                                <div><p>Posts</p><span style={{
                                    width: "45px", height: "45px", borderRadius: "50%", backgroundColor: "#d3e2f7", display: 'flex', alignItems: 'center', justifyContent: "center"
                                }}><span className='material-icons' style={{ color: '#3b7ddd' }} >web</span></span></div>
                                <div><h4>{posts}</h4></div>
                            </div>
                            <div className={style.box}>
                                <div><p>Reports</p><span style={{
                                    width: "45px", height: "45px", borderRadius: "50%", backgroundColor: "#d3e2f7", display: 'flex', alignItems: 'center', justifyContent: "center"
                                }}><span className='material-icons' style={{ color: '#3b7ddd' }} >report</span></span></div>
                                <div><h4>{report}</h4></div>
                            </div>
                            <div className={style.box}>
                                <div><p>Jobs</p><span style={{
                                    width: "45px", height: "45px", borderRadius: "50%", backgroundColor: "#d3e2f7", display: 'flex', alignItems: 'center', justifyContent: "center"
                                }}><span className='material-icons' style={{ color: '#3b7ddd' }} >work</span></span></div>
                                <div><h4>{jobs}</h4></div>
                            </div>
                            <div className={style.box}>
                                <div><p>Notifications</p><span style={{
                                    width: "45px", height: "45px", borderRadius: "50%", backgroundColor: "#d3e2f7", display: 'flex', alignItems: 'center', justifyContent: "center"
                                }}><span className='material-icons' style={{ color: '#3b7ddd' }} >notifications</span></span></div>
                                <div><h4>{notify}</h4></div>
                            </div>
                            <div className={style.box}>
                                <div><p>Unverified Users</p><span style={{
                                    width: "45px", height: "45px", borderRadius: "50%", backgroundColor: "#d3e2f7", display: 'flex', alignItems: 'center', justifyContent: "center"
                                }}><span className='material-icons' style={{ color: '#3b7ddd' }} >lock</span></span></div>
                                <div><h4>{pending}</h4></div>
                            </div>
                            <div className={style.box}>
                                <div><p>Verified Users</p><span style={{
                                    width: "45px", height: "45px", borderRadius: "50%", backgroundColor: "#d3e2f7", display: 'flex', alignItems: 'center', justifyContent: "center"
                                }}><span className='material-icons' style={{ color: '#3b7ddd' }} >lock_open</span></span></div>
                                <div><h4>{verified}</h4></div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', marginTop: "10px" }}>
                            <h4 style={{ marginRight: "5px" }}>Auto Job Post Approval</h4>
                            <div class="form-check form-switch d-flex justify-content-center">
                               {approvalStatus && <button  type="button" class="btn btn-primary" onClick={()=>autoAproval()} >Continue</button>}
                                {!approvalStatus &&<button onClick={()=>autoAproval()} type="button" class="btn btn-primary"  >Stop</button>}
                                <span className='material-icons mx-1' style={{ color: "#dee2e6", backgroundColor: "rgba(120,120,120,0)", cursor: "pointer" }} title="This switch is used to toggle whether job will auto approve or not.
                             As current the post will auto approve." >help</span>
                                {/* <label class="form-check-label" for="flexSwitchCheckDefault">Auto Job Approval is off</label> */}
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr" }}>
                            {pendingJob?.map((i) => {
                                console.log(i)
                                return (

                                    <div class="card mb-3" style={{ maxWidth: "540px" }} >
                                        <div class="row g-0">
                                            <div class="col-md-4">
                                                <img src={i?.image} class="img-fluid rounded-start" alt="..." />
                                            </div>
                                            <div class="col-md-8">
                                                <div class="card-body">
                                                    <Link to={`/jobs/${i?._id}`} target="_blank"  ><h5 class="card-title">{i?.title}</h5></Link>
                                                    <p class="card-text">{i?.description?.slice(0, 40)}...</p>
                                                    <p class="card-text"><small class="text-body-secondary">{i?.officeEmail} {i?.CompanyName}</small></p>
                                                    <p class="card-text"><small class="text-body-secondary">on: {i?.jobPostedAt?.slice(0, 10)}</small></p>
                                                    <button type="button" class="btn btn-success mx-1" data-bs-toggle="modal" data-bs-target="#approvalModal" onClick={()=>setJobId(i?._id)}  >Approve</button><button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={()=>setJobId(i?._id)} >Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </main>
                </div>
                <div class="modal fade " id="approvalModal" tabIndex="-1" aria-labelledby="approvalModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" >
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Approve Post</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setJobId("")}>Cancel</button>
                                <button type="button" class="btn btn-primary" onClick={()=>approvePost(jobId)}>Approve</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade " id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" >
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Post</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onClick={()=>setJobId("")} data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger" onClick={()=>deletePost(jobId)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubAdminDashboard