import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jobStyle from '../Job/Job.module.css';
import { Link } from 'react-router-dom';
import style from '../Admin/Admindashboard.module.css';
import { logoutUser } from '../Redux/apiCall';

const HRJobs = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  let accessToken = user?.accessToken;
  let userID = user?.other?._id;
  const [jobs, setJobs] = useState();
  useEffect(() => {
    const getJobs = async () => {
      const res = await axios.get(`/api/advance/jobs/hr/${userID}`);
      setJobs(res.data);
    }

    getJobs();
  }, [])
  const handleLogout = async(e) => {
    localStorage.clear();
    // cookies.remove("pokemon");
    // cookies.remove("searchHistory");
    logoutUser(dispatch);
    await navigate(0);
}
  // // console.log(jobs)
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
                                    <Link to={`/profile/${user?.other?._id}`}>
                                        <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >person</span> <p className={style.alignMiddle} >Profile</p>
                                    </Link>
                                </li>
                                {/* <li className={style.sidebarItem} >
                                    <Link  to="/">
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
                                    <Link to="/hr/alljobs" className={style.active}>
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
            <div className={style.adminNavRight}>
              <div className={style.adminUserProfile} >
                <img src={user?.other?.img} style={{ backgroundColor: "#0000a7", height: "45px", width: "45px", borderRadius: "12px", marginRight: "10px" }} />
                <p>{user?.other?.name}</p>
              </div>
            </div>
          </nav>
          <main>

            <div>
              <p>Uploaded Jobs.</p>
            </div>
            <div style={{ marginTop: "20px" }}>
              {/* <h4 style={{ fontSize: "30px", fontWeight: "500" }} >Recent Uploaded Jobs</h4> */}
              {/* <div style={{display:'flex',alignItems:'center'}}><span className='material-icons' style={{ color: "#000", fontSize: "16px", marginRight: "5px" }} >description</span><p>Recent Uploaded Jobs</p></div>  */}
            </div>
            <div className={style.recentUploaded}>
              {jobs?.map((i) => {
                var date = new Date();
                date = i?.jobPostedAt;
                // console.log(i?.Address[0]?.City)
                const ref = (e) => {
                  navigate(`/hr/dashboard/all/job?jobid=${e}`);
                }
                return (
                  <div className={style.box} onClick={() => ref(i?._id)} style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", padding: "15px 10px", width: "95%" }} >
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
}

export default HRJobs