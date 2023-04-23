import React, { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
import stylesheet from './HRCSS.module.css';
import { useSelector,useDispatch } from 'react-redux';
import { logoutUser } from '../Redux/apiCall';
import { Link, useNavigate } from 'react-router-dom';
import { CChart } from '@coreui/react-chartjs';
import style from '../Admin/Admindashboard.module.css';

import jobStyle from '../Job/Job.module.css';
import axios from 'axios';
const HRDashboard = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const userDetails = useSelector((state) => state.user);
    let Cuser = userDetails?.user;
    let accessToken = Cuser?.accessToken;
    const [uploadBatchModal, setUploadBatchModal] = useState(false);
    const [batchScreen, setBatchScreen] = useState(false);
    const [currentMessage, setCurrentMessage] = useState('');
    const [user, setUser] = useState([]);
    let userID = Cuser?.other?._id;
    const [jobs, setJobs] = useState();
    useEffect(() => {
        const getJobs = async () => {
            const res = await axios.get(`/api/advance/jobs/hr/${userID}`);
            setJobs(res.data);
        }

        getJobs();
    }, [])
    const getUser = async () => {
        try {
          const res = await axios.get(`/api/user/details/${userID}`, {
            headers: {
                accessToken: accessToken
              }
            })
            setUser(res.data);
          } catch (error) {
            
          }
        }
      useEffect(() => {
        getUser()
      }, []);
    let arr = [];
    let arr2 = [];
    jobs?.map((i) => {
        arr.push(i);
    })
    let j = 0;
    while (j < 4) {
        arr2[j] = arr[j];
        j++;
    }
    // console.log({ arr2: arr2, arr: arr })
    const uploadBatch = () => {
        uploadBatchModal === false ? setUploadBatchModal(true) : setUploadBatchModal(true);
        if (batchScreen) {
            setBatchScreen(false);
        }
    }
    const closeBatchScreen = () => {
        batchScreen === true ? setBatchScreen(false) : setBatchScreen(false)
    }
    const openBatchScreen = () => {
        if (!batchScreen) {
            setBatchScreen(true);
        }
        if (uploadBatchModal) {
            setUploadBatchModal(false);
        }
    }

    let number = 1;
    const closeBatch = () => {
        if (uploadBatchModal) {
            setUploadBatchModal(false);
        }
    }
    var today = new Date();
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
    name = Cuser?.other?.name;
    let firstname = [];
    for (let i = 0; i < 40; i++) {
        if (name.charAt(i) === " ") {
            break;
        } else {
            firstname[i] = name.charAt(i);
        }
    }
    const handleLogout = async(e) => {
        localStorage.clear();
        // cookies.remove("pokemon");
        // cookies.remove("searchHistory");
        logoutUser(dispatch);
        await navigate(0);
    }

    if (Cuser?.other?.role === 'HR') {
        return (
            <>
                <div className={style.AdminDashboard} >
                    <input type='checkbox' id="sidebarCheckbox" style={{ display: "none" }} />
                    <div className={style.adminWidgets}>
                        <h4>Freedlink - HR</h4>
                        <div className={style.adminPages} >
                            <ul>
                                <div>
                                    <span style={{ fontSize: "12px", color: "#aeaeae", marginRight: "5px" }} className="material-icons">web</span><span className={style.sidebarHeader} style={{ fontSize: "12px", color: "#aeaeae" }} >Pages</span>
                                </div>
                                <li className={style.sidebarItem} >
                                    <Link to="/hr/dashboard" className={style.active}>
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >dashboard</span> <p className={style.alignMiddle} >Dashboard</p>
                                    </Link>
                                </li>
                                <li className={style.sidebarItem} title='coming soon...' >
                                    <Link to="/hr/soon?page=stats">
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >bar_chart</span> <p className={style.alignMiddle} >Charts & Stats</p> <p className={style.alignMiddle} ><span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginLeft: "3px" }} >lock</span> Pro</p>
                                    </Link>
                                </li>
                                <li className={style.sidebarItem} >
                                    <Link to="/">
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >home</span> <p className={style.alignMiddle} >Freedlinks Home</p>
                                    </Link>
                                </li>
                                <li className={style.sidebarItem} >
                                    <Link to={`/profile/${Cuser?.other?._id}`}>
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >person</span> <p className={style.alignMiddle} >Profile</p>
                                    </Link>
                                </li>
                                {/* <li className={style.sidebarItem} >
                                    <Link  onClick={()=>handleLogout()} to="/login" >
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >logout</span> <p className={style.alignMiddle} >Logout</p>
                                    </Link>
                                </li> */}
                            </ul>
                        </div>
                        <div className={style.adminPages} >
                            <ul>
                                <div >
                                    <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >construction</span><span className={style.sidebarHeader} style={{ fontSize: "12px", color: "#aeaeae" }} >Tools</span>
                                </div>
                                <li className={style.sidebarItem} title="Payment system coming soon..." >
                                    <Link to="/hr/create" title="Payment system coming soon...">
                                        <span className='material-icons' style={{ fontSize: "16px", color: "#aeaeae", marginRight: "5px" }} >note_add</span> <p style={{ color: "#aeaeae", }} className={style.alignMiddle} >Create Job</p>
                                    </Link>
                                </li>
                                <li className={style.sidebarItem} >
                                    <Link to="/hr/alljobs">
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >description</span> <p style={{ color: "#aeaeae", }} className={style.alignMiddle} >View Uploaded Jobs</p>
                                    </Link>
                                </li>
                                <li className={style.sidebarItem}>
                                    <Link to="/hr/soon?page=more">
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >warning</span> <p style={{ color: "#aeaeae", }} className={style.alignMiddle} >More Actions</p><p className={style.alignMiddle} ><span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginLeft: "3px" }} >lock</span> Pro</p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className={style.adminPages} >
                            <ul>
                                <div title="Payment system coming soon..." >
                                    <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >workspace_premium</span><span className={style.sidebarHeader} style={{ fontSize: "12px", color: "#aeaeae" }} >Premium Actions <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginLeft: "3px" }} >lock</span> Pro </span>
                                </div>
                                <li className={style.sidebarItem} title="Payment system coming soon..." >
                                    <Link to="/hr/soon?page=filter" title="Payment system coming soon...">
                                        <span className='material-icons' style={{ fontSize: "16px", color: "#aeaeae", marginRight: "5px" }} >construction</span> <p style={{ color: "#aeaeae", }} className={style.alignMiddle} >AI tools & filtering</p>
                                    </Link>
                                </li>
                                <li className={style.sidebarItem} title="Add balance" >
                                    <Link to="/hr/soon?page=sponser">
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >add_card</span> <p style={{ color: "#aeaeae", }} className={style.alignMiddle} >Add Balance</p>
                                    </Link>
                                </li>
                                <li className={style.sidebarItem} title="Payment system coming soon..." >
                                    <Link to="/hr/soon?page=sponser">
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >workspace_premium</span> <p style={{ color: "#aeaeae", }} className={style.alignMiddle} >Sponser</p>
                                    </Link>
                                </li>
                                <li className={style.sidebarItem} title="Payment system coming soon..." >
                                    <Link to="/hr/soon?page=history">
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >receipt_long</span> <p style={{ color: "#aeaeae", }} className={style.alignMiddle} > Purchase History</p>
                                    </Link>
                                </li>
                                <li className={style.sidebarItem} title="Payment system coming soon..." >
                                    <Link to="/hr/soon?page=livestats">
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >bar_chart</span> <p style={{ color: "#aeaeae", }} className={style.alignMiddle} >Live Stats</p>
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
                            <div className={`${style.adminNavRight} d-flex`} >
                                <div className={`${style.adminUserProfile} mx-3`} >
                                    <img src={user?.img} style={{ backgroundColor: "#0000a7", height: "45px", width: "45px", borderRadius: "12px", marginRight: "10px" }} />
                                    <p>{user?.name}</p>
                                </div>
                                <div className={style.adminUserProfile} title='Account Balance'  style={{cursor:'pointer'}} >
                                <span class="material-icons mx-2" title='Add balance'>account_balance_wallet</span>
                                    {!user?.credits && <p className='mx-2'  style={{fontSize:'7px'}}>Loading...</p> }
                                    {user?.credits > 20 ? <p className='mx-2' >{user?.credits}</p> : <p className='mx-2'  style={{color:'red'}} >{user?.credits}</p>}
                                </div>
                            </div>
                        </nav>
                        <main>

                            <div>
                                <h4 style={{ fontSize: "30px", fontWeight: "500" }} >{currentMessage}{firstname}!</h4>
                                <p>Have a nice day!</p>
                            </div>
                            <div style={{marginTop:"20px"}}>
                                {/* <h4 style={{ fontSize: "30px", fontWeight: "500" }} >Recent Uploaded Jobs</h4> */}
                               <div style={{display:'flex',alignItems:'center'}}><span className='material-icons' style={{ color: "#000", fontSize: "16px", marginRight: "5px" }} >description</span><p>Recent Uploaded Jobs</p></div> 
                            </div>
                            <div className={style.recentUploaded}>
                                {arr2?.map((i) => {
                                    var date = new Date();
                                    date = i?.jobPostedAt;
                                    // // console.log(i?.Address[0]?.City)
                                    const ref = (e) => {
                                        navigate(`/hr/dashboard/all/job?jobid=${e}`);
                                    }
                                    return (
                                        <div className={style.box} onClick={() => ref(i?._id)} style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", padding: "15px 10px", width:"95%" }} >
                                            <div className={jobStyle.jobLeft} >
                                                <div className={jobStyle.Image} >
                                                    <img src={i?.image} />
                                                </div>
                                                <div className={jobStyle.Detail} >
                                                    <h4>{i?.title}</h4>
                                                    <h6>{i?.subject}</h6>
                                                    <div>
                                                        <p>Requirement: {i?.qualification}</p>
                                                        <p>{date?.slice(0, 10)}</p>
                                                        <p>{i?.referenceCompanyName}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={jobStyle.jobRight}>
                                            { !i?.visible ?<span title='Job post is under approvel' style={{backgroundColor:'#ffc107',width:'10px',height:'10px',borderRadius:'50%',marginRight:'10px'}}></span>
                      : <span title='Job post is approved'  style={{backgroundColor:'#198754',width:'10px',height:'10px',borderRadius:'50%',marginRight:'10px'}}></span>}
                                                <p>
                                                    {i?.CompanyName}
                                                </p>
                                                <p>
                                                    {i?.Address[0]?.City}, {i?.Address[0]?.state} ({i?.Address[0]?.country})
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </main>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
                <h1 style={{ color: "red" }} >Only HR Can Access this resource !!</h1>
                <p>return to <Link style={{ color: "red" }} to="/">home</Link> page</p>
            </div>
        )
    }
}
export default HRDashboard
