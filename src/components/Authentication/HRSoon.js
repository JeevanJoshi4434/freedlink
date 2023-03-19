import React from 'react'
import { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
import stylesheet from './HRCSS.module.css';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import style from '../Admin/Admindashboard.module.css';
import UnderC from '../Assets/undraw_building_blocks_re_5ahy.svg';
import jobStyle from '../Job/Job.module.css';
import axios from 'axios';
const HRSoon = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    let pagetype = searchParams.get('page');
    let navigate = useNavigate();
    const userDetails = useSelector((state) => state.user);
    let Cuser = userDetails?.user;
    let accessToken = Cuser?.accessToken;
    const [uploadBatchModal, setUploadBatchModal] = useState(false);
    const [batchScreen, setBatchScreen] = useState(false);
    const [currentMessage, setCurrentMessage] = useState('');
    let userID = Cuser?.other?._id;
    const [jobs, setJobs] = useState();
    console.log({data:process.env.REACT_APP_DATA})
    useEffect(() => {
        const getJobs = async () => {
            const res = await axios.get(`/api/advance/jobs/hr/${userID}`);
            setJobs(res.data);
        }

        getJobs();
    }, [])
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
    console.log({ arr2: arr2, arr: arr })
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
    // // console.log({hour:curHr,day:today})
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
                                    <Link to="/hr/dashboard">
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >dashboard</span> <p className={style.alignMiddle} >Dashboard</p>
                                    </Link>
                                </li>
                                <li className={style.sidebarItem} title='coming soon...' >
                                    {pagetype === 'stats' ? <Link to="/hr/soon?page=stats" className={style.active}>
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >bar_chart</span> <p className={style.alignMiddle} >Charts & Stats</p> <p className={style.alignMiddle} ><span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginLeft: "3px" }} >lock</span> Pro</p>
                                    </Link> : <Link to="/hr/soon?page=stats">
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >bar_chart</span> <p className={style.alignMiddle} >Charts & Stats</p> <p className={style.alignMiddle} ><span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginLeft: "3px" }} >lock</span> Pro</p>
                                    </Link> }
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
                                    <Link to="#">
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
                                    {pagetype === 'more' ? <Link to="/hr/soon?page=more" className={style.active}>
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >warning</span> <p style={{ color: "#aeaeae", }} className={style.alignMiddle} >More Actions</p><p className={style.alignMiddle} ><span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginLeft: "3px" }} >lock</span> Pro</p>
                                    </Link>:<Link to="/hr/soon?page=more">
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >warning</span> <p style={{ color: "#aeaeae", }} className={style.alignMiddle} >More Actions</p><p className={style.alignMiddle} ><span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginLeft: "3px" }} >lock</span> Pro</p>
                                    </Link>}
                                </li>
                            </ul>
                        </div>
                        <div className={style.adminPages} >
                            <ul>
                                <div title="Payment system coming soon..." >
                                    <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >workspace_premium</span><span className={style.sidebarHeader} style={{ fontSize: "12px", color: "#aeaeae" }} >Premium Actions <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginLeft: "3px" }} >lock</span> Pro </span>
                                </div>
                                <li className={style.sidebarItem} title="Payment system coming soon..." >
                                    {pagetype === 'filter' ? <Link to="/hr/soon?page=filter" className={style.active}>
                                        <span className='material-icons' style={{ fontSize: "16px", color: "#aeaeae", marginRight: "5px" }} >construction</span> <p style={{ color: "#aeaeae", }} className={style.alignMiddle} >AI tools & filtering</p>
                                    </Link>:<Link to="/hr/soon?page=filter">
                                        <span className='material-icons' style={{ fontSize: "16px", color: "#aeaeae", marginRight: "5px" }} >construction</span> <p style={{ color: "#aeaeae", }} className={style.alignMiddle} >AI tools & filtering</p>
                                    </Link>}
                                </li>
                                <li className={style.sidebarItem} title="Payment system coming soon..." >
                                  {pagetype === 'sponser' ? <Link to="/hr/soon?page=sponser" className={style.active}>
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >workspace_premium</span> <p style={{ color: "#aeaeae", }} className={style.alignMiddle} >Sponser</p>
                                    </Link>: <Link to="/hr/soon?page=sponser">
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >workspace_premium</span> <p style={{ color: "#aeaeae", }} className={style.alignMiddle} >Sponser</p>
                                    </Link>}
                                </li>
                                <li className={style.sidebarItem} title="Payment system coming soon..." >
                                    {pagetype==='history' ? <Link to="/hr/soon?page=history" className={style.active}>
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >receipt_long</span> <p style={{ color: "#aeaeae", }} className={style.alignMiddle} > Purchase History</p>
                                    </Link>:<Link to="/hr/soon?page=history">
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >receipt_long</span> <p style={{ color: "#aeaeae", }} className={style.alignMiddle} > Purchase History</p>
                                    </Link>}
                                </li>
                                <li className={style.sidebarItem} title="Payment system coming soon..." >
                                    {pagetype === 'livestats' ? <Link to="/hr/soon?page=livestats" className={style.active} >
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >bar_chart</span> <p style={{ color: "#aeaeae", }} className={style.alignMiddle} >Live Stats</p>
                                    </Link>:<Link to="/hr/soon?page=livestats">
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >bar_chart</span> <p style={{ color: "#aeaeae", }} className={style.alignMiddle} >Live Stats</p>
                                    </Link>}
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
                                    <img src={Cuser?.other?.img} style={{ backgroundColor: "#0000a7", height: "45px", width: "45px", borderRadius: "12px", marginRight: "10px" }} />
                                    <p>{Cuser?.other?.name}</p>
                                </div>
                            </div>
                        </nav>
                        <main style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>

                            <div>
                                <h4 style={{ fontSize: "30px", fontWeight: "500" }} >Stay tuned {firstname}!</h4>
                                <p>coming soon...</p>
                            </div>
                            <img src={UnderC} alt='Coming Soon...' style={{height:"40%",width:"40%"}} />

                            <div>
                                <h4 style={{ fontSize: "30px", fontWeight: "500" }} >Under Construction!</h4>
                                <p>coming soon...</p>
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

export default HRSoon