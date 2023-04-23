import axios from 'axios';
import React, { useEffect, useState } from 'react';
import search from "../Search/search.module.css";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './Admindashboard.module.css';
import { useNavigate } from 'react-router-dom';
const AdminUsers = () => {

    const userDetails = useSelector((state) => state.user);
    let user = userDetails?.user;
    let accessToken = user?.accessToken;
    const [usersTraffic, setUsersTraffic] = useState();
    useEffect(() => {
        const users = async () => {
            const res = await axios.get(`/api/users/all`, { headers: { accessToken: accessToken } })
            setUsersTraffic(res.data);
        }
        users();
    }, []);
    const deleteUser = async (e) => {
        await axios.delete(`/api/users/delete/${user?.other?._id}/${e}`, { header: { accessToken: accessToken } })
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
                                    <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >dashboard</span> <p className={style.alignMiddle} >Dashboard</p>
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
                                <Link to="/admin/reports" >
                                    <span className='material-icons' style={{ color: "#aeaeae", fontSize: "16px", marginRight: "5px" }} >description</span> <p className={style.alignMiddle} >Reports</p>
                                </Link>
                            </li>
                            <li className={style.sidebarItem}  >
                                <Link to="/admin/users" className={style.active} >
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
                        <h4>All Users</h4>
                <p style={{ color: "red" }} >• Warning: By clicking on Delete Icon The User will be deleted Suddenly</p>
                <div style={{ height: "100%", width: "100%", overflow: "auto", backgroundColor: "white", color: "black", borderRadius: "10px", padding: "10px 10px",display:'grid',gridTemplateColumns:"1fr 1fr 1fr" }}>
                    {usersTraffic?.map((i) => {
                        let id = i?._id;
                        return (
                            <div className={search.userProfile}>
                                <div className={search.userIcon}>
                                    <img src={`${i?.img}`} style={{ width: "45px", height: "45px", borderRadius: "50%" }} />
                                </div>
                                <div className={search.userDetail} >
                                    <div className={search.userName}>
                                        <Link to={`/profile/${i?._id}`} target="__blank" ><h4>{i?.name}</h4></Link><p> •  {i?.country}</p>
                                    </div>
                                    <div className={search.skills} >
                                        •<p>ID: {i?._id}</p>
                                    </div>
                                </div >
                                <div className={search.userAction} >
                                    <div className='AddFriend'>
                                        <span onClick={() => deleteUser(i?._id)} className={`material-icons ${search.actionIcon}`}>delete</span>
                                    </div>
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

export default AdminUsers