import React, { useEffect, useState } from 'react';
import "./css/Main.css";
import "./css/SubDesign.css";
import logo from "./css/logo.png";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { logoutUser } from './Redux/apiCall';
import { Cookies } from 'react-cookie';
import { io } from 'socket.io-client';
import { getuserimg } from './subcomponents/NotificationAPI';
const Nav = (props) => {
    const userDetails = useSelector((state) => state.user);
    let user = userDetails?.user;
    let id = user?.other?._id;
    let accessToken = user?.accessToken;
    let username = user?.other?.name;
    let history = useNavigate();
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState();
    const [notification, setNotification] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [searchHistory, setSearchHistory] = useState(
        JSON.parse(localStorage.getItem('searchHistory')) || []
    );
    const [post, setPost] = useState('');
    const [notifications, setNotifications] = useState([]);
    // console.log(notifications)
    const socket = props?.socket;
    useEffect(() => {
        socket?.on("getNotification", data => {
            setNotifications((prev) => [...prev, data])
            // console.log(data)
        })
    }, [socket]);
    // // console.log(notifications);
    // const [result, setResult] = useState([]);
    const [country, setCountry] = useState('');
    // // console.log(result);
    let navigate = useNavigate();
    // const cookies = Cookies();

    let dispatch = useDispatch();
    const handleKeyDown = (e) => {
        // e.preventDefault();
        if (e.key === 'Enter') {
            history(`/find?search=${search}&country=${country}`);
            setSearchTerm(e.target.value);
            if (!searchTerm) return;
            if (searchHistory.includes(searchTerm)) {
                const newSearchHistory = [searchTerm, ...searchHistory.filter(item => item !== searchTerm)];
                setSearchHistory(newSearchHistory);
                localStorage.setItem('searchHistory', JSON.stringify(newSearchHistory));
                document.cookie = `searchHistory=${JSON.stringify(newSearchHistory)};max-age=3600`;
                setSearchTerm('');
                return;
            }
            const newSearchHistory = [...searchHistory, searchTerm];
            setSearchHistory(newSearchHistory);
            localStorage.setItem('searchHistory', JSON.stringify(newSearchHistory));
            document.cookie = `searchHistory=${JSON.stringify(newSearchHistory)};max-age=3600`;
            setSearchTerm('');
        }
    }

    const handleLogout = async(e) => {
        localStorage.clear();
        // cookies.remove("pokemon");
        // cookies.remove("searchHistory");
        logoutUser(dispatch);
        await navigate('/');
        await navigate(0);
    }
    useEffect(() => {
        const searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
        if (searchHistory) {
            const pokemonData = JSON.stringify(searchHistory);
            document.cookie = `pokemon=${pokemonData};max-age=3600`;
        }
    }, [searchHistory]);
    useEffect(() => {
        const getNotify = async () => {
            if(user?.other){
                const res = await axios.get(`/api/get/notification/${id}`, { headers: { accessToken: accessToken } });
                setNotification(res.data);
            }
        }
        getNotify();
    }, [])
    // // console.log(notification);
    notification?.notify?.map((i) => {
        notification?.user?.map((item) => {
            // // console.log(i);
            // // console.log(item?.data?.name);
        })
    })
    let image = '';

    const [data, setData] = useState([]);
    return (
        <div className='Topmainnav'>
            {/* <!-- header starts --> */}
            <div className="header">
                <div className="header__left">
                    <Link to="/">
                        <img
                            src={logo}
                            alt="FreedLink"
                        /></Link>
                    <div className="header__input">
                        <span className="material-icons"> search </span>
                        <input type="text" style={{fontSize:'10px'}} placeholder="Search Freedlink" onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => { setSearch(e.target.value); }} />
                    </div>
                </div>

                <div className="header__middle">
                    <div className="header__option">
                        <Link to="/">
                            <span className="material-icons"> home </span>
                        </Link>
                    </div>
                    <div className="header__option">
                        <Link to="/jobs">
                            <span className="material-icons"> card_travel </span>
                        </Link>
                    </div>
                    {user?.other && <div className="header__option">
                        <Link to="/inbox"><span className="material-icons"> chat </span></Link>
                    </div>}
                    {!user?.other && <>
                        <div className="header__option">
                            <Link to="/login" title='Login' className='mainScreen' style={{fontSize:"12px"}} ><span className='material-icons'>login</span></Link>
                        </div>
                    </>}

                </div>

                <div className="header__right">
                    {user?.other ? <div className="header__info pc-device">
                        <img
                            className="user__avatar"
                            src={user?.other?.img}
                            alt=""
                        />
                        <h4>{username}</h4>
                    </div> : <>
                    <Link to="/login" className='pcScreen' title='Login' style={{fontSize:"12px"}} ><span class="material-icons" style={{color:"navy"}}>lock_person</span></Link></>}
                    <div className='dropdown'>
                        <span className="material-icons dropbtn2" style={{ fontSize: "20px" }}> notifications_active</span>
                        <div className='dropdown-content2 button-hover' style={{ width: "260px", marginLeft: "-171px", height: "450px", overflow: "auto", justifyContent: "start", alignItems: "flex-start" }}>
                           {!user?.other && <>
                            <div style={{ display: "flex" }} >
                                <img src={logo} style={{ backgroundColor: "#aaa", height: "40px", width: "40px", borderRadius: "50px", marginRight: "5px" }} /><span><p style={{ fontSize: "12px", objectFit: "cover" }} >New here? Create Account.</p> </span><button style={{ height: "20px", width: "50px", fontSize:'10px',backgroundColor: "rgba(123,123,123,0)", border: "1px solid black", borderRadius: "50px" }} onClick={()=>history('/signup')} >Signup</button>
                            </div>
                            <div style={{ display: "flex" }} >
                                <img src={logo} style={{ backgroundColor: "#aaa", height: "40px", width: "40px", borderRadius: "50px", marginRight: "5px" }} /><span><p style={{ fontSize: "12px", objectFit: "cover" }} >Login and access all widgets.</p> </span><button style={{ height: "20px", width: "50px",fontSize:'10px', backgroundColor: "rgba(123,123,123,0)", border: "1px solid black", borderRadius: "50px" }}  onClick={()=>history('/login')} >Login</button>
                            </div>
                           </>}
                            {notifications?.map((i) => {
                                // console.log(i)
                                if (i?.type === 1) {
                                    return (
                                        <>
                                            {i?.type === 1 && <div style={{ display: "flex" }} >
                                                <img src={i?.senderProfile} style={{ backgroundColor: "#aaa", height: "45px", width: "45px", borderRadius: "50px", marginRight: "5px" }} /><span><p style={{ fontSize: "12px" }} >{i?.sendername} Liked your post </p> </span><span><img src={i?.postImg} style={{ backgroundColor: "#aaa", height: "45px", width: "45px", marginLeft: "10px", objectFit: "contain" }} /></span>
                                            </div>}
                                            {i?.type === 2 && <div style={{ display: "flex" }} >
                                                <img src={i?.senderProfile} style={{ backgroundColor: "#aaa", height: "45px", width: "45px", borderRadius: "50px", marginRight: "5px" }} /><span><p style={{ fontSize: "12px", objectFit: "cover" }} >{i?.sendername} started following you. </p> </span><button style={{ height: "20px", width: "50px", backgroundColor: "rgba(123,123,123,0)", border: "1px solid black", borderRadius: "50px" }}>follow</button>
                                            </div>}
                                        </>
                                    )
                                }
                            })
                            }
                            {
                                notification?.notify?.map((item) => {
                                    // // console.log(item);
                                    return (
                                        <>
                                            {item?.type === 1 && <div style={{ display: "flex" }} >
                                                <img src={item?.senderprofile} style={{ backgroundColor: "#aaa", height: "45px", width: "45px", borderRadius: "50px", marginRight: "5px" }} /><span><p style={{ fontSize: "12px", objectFit: "cover" }} >{item?.sendername} Liked your post </p> </span><span><img src={item?.postImg} style={{ backgroundColor: "#aaa", height: "45px", width: "45px", marginLeft: "10px", objectFit: "contain" }} /></span>
                                            </div>}
                                            {item?.type === 2 && <div style={{ display: "flex" }} >
                                                <img src={item?.senderprofile} style={{ backgroundColor: "#aaa", height: "45px", width: "45px", borderRadius: "50px", marginRight: "5px" }} /><span><p style={{ fontSize: "12px", objectFit: "cover" }} >{item?.sendername} started following you. </p> </span><button style={{ height: "20px", width: "50px", backgroundColor: "rgba(123,123,123,0)", border: "1px solid black", borderRadius: "50px" }}>follow</button>
                                            </div>}
                                        </>
                                    )

                                })
                            }
                        </div>

                    </div>

                    <div className='dropdown'>
                        <span className="material-icons dropbtn2"> menu </span>
                        <div className='dropdown-content2 button-hover'>
                            {user?.other && <Link to={`/profile/${id}`}><div>
                                <span className="material-icons dropicon"> person</span><span>Profile</span>
                            </div></Link>}
                            {user?.other && <div>
                                <Link to="/settings" className='dropicon' style={{ display: "flex" }}  ><span className="material-icons"> settings</span><span>Settings</span></Link>
                            </div>}
                            <div>
                                <span className="material-icons dropicon"> policy</span><span>Policies</span>
                            </div>
                            <div>
                                <span className="material-icons dropicon"> feedback</span><span>Feedback</span>
                            </div>
                            {user?.other && <div onClick={handleLogout}>
                                <span className="material-icons dropicon"> logout</span><span>Logout</span>
                            </div>}
                        </div>

                    </div>


                </div>
            </div>
            {/* <!-- header ends --> */}


        </div >
    )
}

export default Nav
