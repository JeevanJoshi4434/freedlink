import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile';
import './profile.css';
import { RemoveEdu, RemoveProject, RemoveWork } from './ProfileAPIs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProfileLeft = (props) => {
    let { username, bio, cover, profile, id, shortbio, followers, following, workExperience, Education, company, email } = props;
    let navigate = useNavigate();
    const [moreVert, setMoreVert] = useState(false);
    const moreVertOpen = () => {
        if (moreVert) {
            setMoreVert(false);
        } else {
            setMoreVert(true);
        }
    }
    const [userDetail, setUserDetail] = useState([]);
    const [getFollowing, setGetFollowing] = useState([]);
    const [getFollower, setGetFollower] = useState([]);
    const [editProfile, setEditProfile] = useState(false);
    const userDetails = useSelector((state) => state.user);
    const user = userDetails.user;
    let accessToken = user?.accessToken;
    const handleFollow = async (e) => {
        await fetch(`/api/follow/${props.id}`, { method: "PUT", headers: { accessToken: accessToken, "Content-Type": 'application.json' } })

    }
    const handleUnfollow = async (e) => {

        await fetch(`/api/unfollow/${props.id}`, { method: "PUT", headers: { accessToken: accessToken, "Content-Type": 'application.json' } })
    }
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`/api/me`, {
                    headers: {
                        accessToken: accessToken
                    }
                })
                setUserDetail(res.data);
            } catch (error) {

            }
        }
        getUser()
    }, [props?.id])

    useEffect(() => {
        const getFollowingList = async () => {
            try {
                const res = await axios.get(`/api/following/${id}`,)
                setGetFollowing(res.data);

            } catch (error) {

            }
        }
        getFollowingList();
    }, [props?.id])
    useEffect(() => {
        const getFollowerList = async () => {
            try {
                const res = await axios.get(`/api/follower/${id}`)
                setGetFollower(res.data);
            } catch (error) {

            }
        }
        getFollowerList();
    }, [props?.id])


    const onclick = () => {
        // console.log("Hello There")
    }
    let skill = [];
    let edu = [];
    let education = [];
    let works = [];
    let work = [];
    let pro = [];
    let projects = [];
    skill = props?.Skills
    edu = props?.Education;
    works = props?.company;
    pro = props?.project;
    for (let i = 0; i < edu?.length; i++) {
        education[i] = edu[edu?.length - 1 - i]; 
    }
    for (let i = 0; i < works?.length; i++) {
        work[i] = works[works?.length - 1 - i]; 
    }
    for (let i = 0; i < pro?.length; i++) {
        projects[i] = pro[pro?.length - 1 - i]; 
    }
    // console.log(edu)
    // console.log(work)
    // console.log(skill)
    const deleteWork = async(po,CName,from)=>{
        const res = await RemoveWork(po,CName,from,accessToken);
        if( res === 200 ){
            toast.success('removed successfully!', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: 0,
              theme: "light",
          });
          navigate(0);
          }else {
            toast.error('Error! check Internet connection', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: 0,
              theme: "light",
          }); 
          }
    }
    const deleteEdu = async(EduID)=>{
        const res = await RemoveEdu(EduID,accessToken);
        if( res === 200 ){
            toast.success('removed successfully!', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: 0,
              theme: "light",
          });
          navigate(0);
          }else {
            toast.error('Error! check Internet connection', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: 0,
              theme: "light",
          }); 
          }
    }
    const deleteProject = async(T,D,L)=>{
        const res = await RemoveProject(T,D,L,accessToken);
        if( res === 200 ){
            toast.success('removed successfully!', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: 0,
              theme: "light",
          });
          navigate(0);
          }else {
            toast.error('Error! check Internet connection', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: 0,
              theme: "light",
          }); 
          }
    }
    return (
        <div>
            <div className='leftBar-notification'>
                <div className='NotificationsContainer'>
                    <img src={cover} className="ProfileCover" alt="" />
                    <div style={{ display: "flex", alignItems: "center", marginTop: "-25px" }}>
                        <span className='material-icons' style={{ position: "absolute", marginTop: "-76px", color: "white" }} >add_a_photo</span>
                        <img src={profile} style={{ marginLeft: "5px" }} className="ProfileImg" alt="" />
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <p style={{ marginLeft: "9px", marginTop: "20px" }}>{username}</p>
                            <p style={{ marginLeft: "9px", fontSize: "10px", color: "#aaa" }}>{shortbio}</p>
                            {id === userDetail?._id ? <div className='profileControllers'>
                                <button onClick={onclick} className='EditProfilebtn'>Edit profile</button>
                                {/* <button onClick={onclick} className='addSectionbtn'>Share Profile</button> */}
                                {/* <span onClick={onclick} className='addSectionbtn'></span> */}
                                <div  onClick={moreVertOpen} ><span className='material-icons' style={{ fontSize: "13px" }}>more_horiz</span></div>
                                {moreVert && <div className='moreProfile'>
                                    <div onClick={() => {navigator.clipboard.writeText(`http://${process.env.PORT}/profile/${props?.id}`)}} >
                                        <span className='material-icons' style={{ marginRight: "10px" }}>content_copy</span><span className='' >Copy Profile URL</span>
                                    </div>
                                    <div>
                                        {user?.other?.role === "user" && <Link to="/hr/getstarted" className='' ><span className='material-icons' style={{ marginRight: "10px" }}>toggle_on</span>Switch to HR</Link>}
                                        {user?.other?.role === "Admin" && <Link to="/admin/dashboard" className='' ><span className='material-icons' style={{ marginRight: "10px" }}>admin_panel_settings</span>View Admin Panel</Link>}
                                        {user?.other?.role === "HR" && <Link to="/hr/dashboard" className='' ><span className='material-icons' style={{ marginRight: "10px" }}>dashboard</span>View HR Panel</Link>}
                                    </div>
                                    <div>
                                        <span className='' onClick={moreVertOpen} >&times; Close</span>
                                    </div>
                                </div>}
                            </div> :
                                <div>
                                    {userDetail?.following?.includes(id) ? <div className='profileControllers'>
                                        <button className='EditProfilebtn' onClick={(e) => handleUnfollow(id)} >Unfollow</button>
                                        {(!userDetail?.followers.includes(id) && !userDetail?.following.includes(id)) ? <button className='EditProfilebtn' disabled={true} ><span className='material-icons' style={{ fontSize: "12px" }}  >lock</span>Message</button>
                                            : <button className='EditProfilebtn'>Message</button>}

                                    </div> :
                                        <div className='profileControllers'>
                                            <button className='EditProfilebtn' onClick={(e) => handleFollow(id)} >follow</button>
                                        </div>}
                                </div>}
                        </div>
                    </div>
                    <div className='aboutUser' style={{ width: "290px" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-around', fontSize: "12px" }}>
                                <div style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }} >
                                    <p style={{ marginLeft: "9px", marginTop: "15px" }}>Followers</p>
                                    <span>{followers}</span>
                                </div>
                                <div style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <p style={{ marginLeft: "9px", marginTop: "15px" }}>Following</p>
                                    <span>{following}</span>
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <h3 style={{ marginLeft: "9px", marginTop: "15px", fontSize: "14px",fontWeight:"400" }}>About</h3>
                                {bio !== '' ? <p className='bio' style={{ fontSize: "12px", marginLeft: "15px", color: "#aaa" }}>{bio}</p> : <p className='bio' style={{ fontSize: "12px", marginLeft: "15px", color: "#aaa" }}>Add Bio</p>}
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <p style={{ marginLeft: "9px", marginTop: "15px" }}>Work Experience</p>
                            {work?.length > 0 && work?.map((i)=>{
                                var time = Date();
                                time = i?.yearFrom;
                                // console.log(time);
                                // console.log(i)
                                return(
                                    <>
                                    <div style={{display:"flex"}}>
                                    <h5 style={{ marginLeft: "9px", fontSize: "10px", color: "#aaa" }}>{i?.nameCompany} </h5>{id === userDetail?._id  && <span onClick={()=>deleteWork(i?.positionCompany,i?.nameCompany,time)} style={{fontSize:"8px",cursor:"pointer",color:"#0000ff",marginLeft:"10px"}}>• remove</span>}
                                    </div>
                                    <p style={{ marginLeft: "9px", fontSize: "10px", color: "#aaa" }}>{i?.positionCompany}</p>
                                    <p style={{ marginLeft: "9px", fontSize: "10px", color: "#aaa" }}>joined on: {time?.slice(0,10)}</p>
                                    </>

                                )
                            })}
                            {work?.length === 0 &&
                            <p style={{ marginLeft: "9px", fontSize: "10px", color: "#aaa" }}>Currently don't have any work experience.</p>
                            
                            }
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <p style={{ marginLeft: "9px", marginTop: "15px" }}>Education</p>
                            {edu?.length === 0 && 
                            <p style={{ marginLeft: "9px", fontSize: "10px", color: "#aaa" }}>Currently don't have Education Details</p>
                            }
                            {edu?.length > 0 && education?.map((i)=>{
                                var {Fromtime,Totime} = Date();
                                Fromtime = i?.fromTo?.dateFrom;
                                Totime = i?.fromTo?.dateTo;
                            return(
                            <>
                            <div style={{display:"flex"}}>
                            <p style={{ marginLeft: "9px", fontSize: "10px", color: "#aaa" }}>{i?.universityName}</p>
                                   {id === userDetail?._id && <span onClick={()=>deleteEdu(i?._id) } style={{fontSize:"8px",cursor:"pointer",color:"#0000ff",marginLeft:"10px"}}>• remove</span>}
                                    </div>
                            <p style={{ marginLeft: "9px", fontSize: "10px", color: "#aaa" }}>{i?.degree}</p>
                            <p style={{ marginLeft: "9px", fontSize: "10px", color: "#aaa" }}>({Fromtime?.slice(0,4)}-{Totime?.slice(0,4)})</p>
                            </>
                            )}) }
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <p style={{ marginLeft: "9px", marginTop: "15px" }}>Project</p>
                            {projects?.length === 0 && 
                            <p style={{ marginLeft: "9px", fontSize: "10px", color: "#aaa" }}>Currently don't have any project.</p>
                            }
                            {projects?.length > 0 && projects?.map((i)=>{
                               
                                var {Fromtime,Totime} = Date();
                                Fromtime = i?.fromTo?.dateFrom;
                                Totime = i?.fromTo?.dateTo;
                            return(
                            <>
                            <div style={{display:"flex",marginTop:"10px"}}>
                            <h6 style={{ marginLeft: "9px", fontSize: "10px", color: "#aaa" }}>• {i?.projectTitle}</h6>
                            {id === userDetail?._id && <span onClick={()=>deleteProject(i?.projectTitle,i?.projectDescription,i?.projectWebsite)}  style={{fontSize:"8px",cursor:"pointer",color:"#0000ff",marginLeft:"10px"}}>• remove</span>}
                            </div>
                            <p style={{ marginLeft: "9px",whiteSpace: "pre-wrap", fontSize: "10px", color: "#aaa" }}>{i?.projectDescription}</p>
                            { i?.projectWebsite !== "" && <Link to={i?.projectWebsite} target="__blank" style={{fontWeight:500, marginLeft: "10px", fontSize: "10px", color: "#aaa" }}>{i?.projectWebsite}<span style={{ marginLeft: "10px", fontSize: "12px", color: "black" }} className="material-icons" >open_in_new</span></Link>}
                            </>
                            )}) }
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <p style={{ marginLeft: "9px", marginTop: "15px", }}>Skills</p>
                            <div style={{display:"flex",marginLeft:"10px",height:"12px"}}>
                            { skill?.length > 0 && skill?.map((i)=>{
                                return(
                                    <>
                                        <p style={{ marginLeft: "9px", fontSize: "10px", color: "#aaa" }}>{i}, </p>
                                    </>
                                        )
                                    })}
                                    </div>
                            {skill?.length === 0 && <div>
                            <p style={{ marginLeft: "9px", fontSize: "10px", color: "#aaa" }}>No skills are added! </p>
                                </div>}
                        </div>
                    </div>


                </div>
            </div>
            {/* <EditProfile profile={profile} bio= {bio} shortbio={shortbio} name={username} cover={cover} />
            <span className='backgroundBlurEffect'></span> */}
        </div>
    )
}

export default ProfileLeft
