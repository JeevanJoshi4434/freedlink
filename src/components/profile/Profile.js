import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Post from '../subcomponents/Post';
import EditProfile from './EditProfile';
import './profile.css';
import { AddEdu, AddProject, AddShortBio, AddSkill, DeleteSkill, } from './ProfileAPIs';
import ProfileLeft from './ProfileLeft';
import ProfileRight from './ProfileRight';
import UserPost from './UserPost';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Profile = (props) => {
  let navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const userDetails = useSelector((state) => state.user);
  const [editProfile, setEditProfile] = useState(false);
  const usersDetails = useSelector((state) => state.user);
  let userC = usersDetails?.user;
  let accessToken = userC?.accessToken;
  const paramId = useParams();
  const [userDetail, setUserDetail] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/user/details/${paramId.id}`, {
          headers: {
            accessToken: accessToken
          }
        })
        setUserDetail(res.data);
      } catch (error) {

      }
    }
    getUser()
  }, [paramId.id]);
  // let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDUzMDYwNDg0MGQ0MDc2ZjhhOTk2OSIsIm5hbWUiOiJKZWV3YW4gSm9zaGkiLCJpYXQiOjE2NzQ5OTQyOTl9.2kATc0NiIgzh6w0e5mQeZWo-OYy9nWXBkHPlrvy3vQQ";
 
  const user = userDetails.user;
  // 
  const [bio, setBio] = useState(``)
  const [CName, setCName] = useState('');
  const [Position, setPosition] = useState('');
  const [CFrom, setCFrom] = useState(new Date().toISOString().slice(0,10));
  const [CTo, setCTo] = useState(new Date().toISOString().slice(0,10));
  const [name, setName] = useState();
  const [University, setUniversity] = useState('');
  const [course, setCourse] = useState('');
  const [EduFrom, setEduFrom] = useState(new Date().toISOString().slice(0,10));
  const [Eduto, setTo] = useState(new Date().toISOString().slice(0,10));
  const [checked, setChecked] = useState(false);
  const [shortbio, setShortbio] = useState('')
  const [skill, setSkill] = useState('')
  const [ProjectName, setProjectName] = useState('');
  const [ProjectWebsite, setProjectWebsite] = useState('');
  const [ProjectDetail, setProjectDetail] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [loading, setLoading] = useState(false);
 
  
  // // console.log(EduFrom)
  const handleCheckedChange = e => {
    setChecked(checked ? false : true);
  }
  const changeDate = (Date) =>{
    var year = Date.getFullYear();
    // // console.log(year)
  }
  
 const UpdateBio =  async(bio, accessToken)=>{
  // const userDetails = useSelector((state) => state.user);
  // let Cuser = userDetails?.user;
  //   let CuserID = userDetails?.user?.other
  //   let accessToken = Cuser?.accessToken;
  //   let user_Id = CuserID?._id;
      await fetch(`/api/me/update/bio`,{method:"PUT",headers:{accessToken:accessToken,"Content-Type":"application/json"}, body:JSON.stringify({
          Bio:bio
      })}).then((res)=>{
        if(res.status === 200){
          toast.success('Updated successfully!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "light",
        });
        }else {
          toast.error('Error! try again later', {
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
      })
      
  }
  // Calls for update and delete 
  // // // console.log(userDetail)
  const updateBio = async(e)=>{
      let res = await UpdateBio(e, accessToken);
      navigate(0);
  }

  // User Updates....
  const getUserPost = async () => {
    const res = await axios.get(`/api/get/post/${paramId.id}?_page=${page}&_limits=${limit}`);
    let data = [res.data];
        if(page === 1 ){
          setUserPosts(data);
        }
        if(page > 1){
          setUserPosts((prev)=>[...prev,...data]);
        }
    }
    useEffect(() => {
    getUserPost();
  }, [paramId.id]);
    useEffect(() => {
    getUserPost();
  }, [page]);
  // console.log(userPosts)
   // iNFINITE SCROLL 
   const hadleInfiniteScroll = async ()=>{
    try {
      if(window.innerHeight + document.documentElement.scrollTop + 10 >=
        document.documentElement.scrollHeight ) {
          // console.log(true)
        setPage((prev)=>prev+1);
        // console.log(page);
      }
    } catch (error) {
      // console.log(error)
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", hadleInfiniteScroll);
    return ()=> window.removeEventListener("scroll",hadleInfiniteScroll);
  }, [])

  // // // console.log(userDetail)
  // // // console.log(userPosts)
  const settings = () => {
    setEditProfile(true);
  }
  const closeSetting = () => {
    setEditProfile(false);
  }
  const updateShortBio = async(e)=>{
    let res = await AddShortBio(e,accessToken);
    if( res === 200 ){
      toast.success('Updated successfully!', {
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
      toast.error('Error! try again later', {
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

  const uploadEduDetail = async()=>{
    let res = await  AddEdu(University,course,EduFrom,Eduto,accessToken);
    if( res === 200 ){
      toast.success('Added successfully!', {
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
      toast.error('Error! try again later', {
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
  const AddWork =  async(Position, CName, to, from,current,accessToken)=>{
    const res = await fetch(`/api/me/update/currentwork`,{method:"PUT",headers:{accessToken:accessToken,"Content-Type":"application/json"}, body:JSON.stringify({
        Position:Position, Name:CName, to:to, from:from,current:current
    })});

    return res.status;
    
}
  const uploadworkDetail = async()=>{
    let res = await  AddWork(Position,CName,CFrom,CTo,checked,accessToken);
    if( res === 200 ){
      toast.success('Added successfully!', {
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
      toast.error('Error! try again later', {
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
  const UploadProject = async()=>{
    let res = await  AddProject(ProjectName,ProjectDetail,ProjectWebsite,accessToken);
    if( res === 200 ){
      toast.success('Added successfully!', {
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
      toast.error('Error! try again later', {
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
  const UploadSkill = async()=>{
    let res = await  AddSkill(skill,accessToken);
    if( res === 200 ){
      toast.success('Added successfully!', {
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
      toast.error('Error! try again later', {
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
  const deleteSkill = async(i)=>{
    let res = await  DeleteSkill(i,accessToken);
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
    <div className='profileContainer'>
      <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                style={{zIndex:"9999999999999999999" }}
            />
      <div className='mainContainer' style={{ display: "flex", justifyContent: "space-between", width: "94%", margin: "auto" }}>
        <div className='profileLeftBar'>
          {paramId.id === userC?.other?._id &&<span className='EditProfileSpan' onClick={settings} ></span>}
          <ProfileLeft project={userDetail?.project} username={userDetail?.name} id={userDetail._id} bio={userDetail?.aboutBio} cover={userDetail.cover} profile={userDetail?.img} shortbio={userDetail?.shortBio} followers={userDetail.followers?.length} following={userDetail.following?.length} workExperience={userDetail?.workExperience} Education={userDetail?.education} Skills={userDetail?.skills} company={userDetail?.company}  email={userDetail?.email} />
          {/* <ProfileLeft username={userDetail?.name} bio={userDetail?.aboutBio} cover={userDetail.cover} profile={userDetail?.img} shortbio={userDetail?.shortBio}  /> */}
        </div>
        <div className='profileCenterBar'>
          {/* {user?.other?._id === userDetail?._id && <div className="messageSender">
            <div className="messageSender__top">
              <img
                className="user__avatar"
                src={userDetail?.img}
                alt=""
              />
              <form>
                <input className="messageSender__input" placeholder="What's on your mind?" type="text" />
              </form>
            </div>

            <div className="messageSender__bottom">
              <div className="messageSender__option">
                <span style={{ color: "green" }} className="material-icons"> photo_library </span>
                <h3>Photo</h3>
              </div>

              <div className="messageSender__option">
                <span style={{ color: "orange" }} className="material-icons"> send </span>
                <h3>Post</h3>
              </div>
            </div>
          </div>} */}
          {!editProfile && userPosts?.map((i) => (
            i?.mypost?.map((item)=>{
              let mo = item?.timestamp[0]?.month;
                let time = item?.timestamp[0]?.hour;
                // console.log(mo)
                let month = '';
                if(mo == 1){
                  month = 'Jan'
                }else if(mo == 2){
                  month = 'Feb';
                }else if(mo == 3){
                  month = 'March';
                }else if(mo == 4){
                  month = 'April';
                }else if(mo == 5){
                  month = 'May';
                }else if(mo == 6){
                  month = 'June';
                }else if(mo == 7){
                  month = 'July';
                }else if(mo == 8){
                  month = 'Aug';
                }else if(mo == 9){
                  month = 'Sep';
                }else if(mo == 10){
                  month = 'Oct';
                }else if(mo == 11){
                  month = 'Nov';
                }else if(mo == 12){
                  month = 'Dec';
                }
                if(time == 13){
                  time = 1;
                }else if(time == 14){
                  time = 2;
                }else if(time == 15){
                  time = 3;
                }else if(time == 16){
                  time = 4;
                }else if(time == 17){
                  time = 5;
                }else if(time == 18){
                  time = 6;
                }else if(time == 19){
                  time = 7;
                }else if(time == 20){
                  time = 8;
                }else if(time == 21){
                  time = 9;
                }else if(time == 22){
                  time = 10;
                }else if(time == 23){
                  time = 11;
                }else if(time == 0){
                  time = 12;
                }
                let stamp = 'AM';
                if(item?.timestamp[0]?.hour > 11 || item?.timestamp[0]?.hour < 0){
                   stamp = 'PM';
                  }

              return (
                <Post socket={props?.socket} postId={item?._id} like={item?.like} likeNo={item?.like?.length} commentNo={item?.comments?.length} userId={item?.user} caption={item?.title} image={item?.image}
                time={`${time} ${stamp}`} date={`${item?.timestamp[0]?.day} ${month}`}
                />
                )
              })
            ))  
          }
        </div>
        <div className='profileRightBar'>
          <ProfileRight id={paramId.id} />
        </div>
      </div>
      {editProfile && <div style={{ display: "flex", alignContent: "center", alignItems: "center", justifyContent: "center", justifyItems: "center" }}  >
          <div className='editProfileSection'>
            <div>
            <span className='material-icons' style={{ zIndex: "999999999", position: "absolute", top: "10px", left: "10px", color: "#fff", cursor: "pointer" }} onClick={closeSetting}  >close</span>
            <span className='material-icons' style={{ zIndex: "999999999", position: "absolute", top: "10px", right: "10px", color: "blue", cursor: "pointer",fontSize:"29px" }} onClick={closeSetting}  >check</span>
              <img src={userDetail?.cover} className='ProfileCoverEdit' />
              <div style={{ }} className='editprofileimg' >
                <img src={userDetail?.img} style={{ borderRadius: '50%' }} />
                <div style={{ display: "flex", flexDirection: "column" }}  >
                  <h4 style={{ fontSize: "10px" }} >About</h4>
                  <input type='text' placeholder={`About`} onChange={(e) => setBio(e.target.value)} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                <span className='material-icons' onClick={()=>updateBio(bio)}  style={{ color: "#00b5ff" }} >check</span>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column" }} >
                  <h4 style={{ fontSize: "10px" }} >short-bio</h4>
                  <input type='text' placeholder={`1st, 2st, He/His etc...`} onChange={(e) => setShortbio(e.target.value)} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                  <span className='material-icons' onClick={()=>updateShortBio(shortbio)}  style={{ color: "#00b5ff" }} >check</span>
                </div>
              </div>
            </div>
            <div style={{ margin: "10px 10px", display: "flex", flexDirection: "column" }} >
              <h4 style={{ fontSize: "10px" }} >Add Work Experience</h4>
              <div style={{}} className="workExp" >
                <div style={{ display: "flex" }} >
                  <input type='text' placeholder={`Company Name`} onChange={(e) => setCName(e.target.value)} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                  <input type='text' placeholder={`Position`} onChange={(e) => setPosition(e.target.value)} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                </div>
                <div style={{ margin: "10px 10px", display: "flex", flexDirection: "flex" }} >

                  <div>
                    <p style={{ fontSize: "10px" }} >From</p>
                    <input type='date' onChange={(e) => setCFrom(e.target.value)} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                  </div>
                  {!checked && <div>
                    <p style={{ fontSize: "10px" }} >to</p>
                    <input type='date' onChange={(e) => setCTo(e.target.value)} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                  </div>}
                  <div>
                  <label htmlFor="agreement-checkbox">Currently Working</label>
                  <input type="checkbox" checked={checked} onChange={handleCheckedChange} id="agreement-checkbox" />
                  </div>
                  </div>
                   {CName === '' || Position === ''  ? <span className='material-icons' style={{ color: "skyblue" }} >done</span>
                  : 
                  <span className='material-icons' onClick={()=>uploadworkDetail()} style={{ color: "#00b5ff" }} >check</span>
                 }


              </div>
            </div>
            <div style={{ margin: "10px 10px", display: "flex", flexDirection: "column" }} >
              <h4 style={{ fontSize: "10px" }} >Add Education </h4>
              <div style={{ display: "grid", }} >
                <input type='text' placeholder={`University Name`} onChange={(e) => setUniversity(e.target.value)} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                <input type='text' placeholder={`degree`} onChange={(e) => setCourse(e.target.value)} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                <div style={{ margin: "10px 10px", display: "flex", flexDirection: "flex" }} >

                  <div>
                    <p style={{ fontSize: "10px" }} >From</p>
                    <input type='date' value={EduFrom} onChange={(e)=>setEduFrom(e.target.value)} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: "10px" }} >to</p>
                    <input type='date' value={Eduto} onChange={(e) => setTo(e.target.value)} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                  </div>
                  {University === '' || course === ''  ? <span className='material-icons' style={{ color: "skyblue" }} >done</span>
                  : 
                  <span className='material-icons' onClick={()=>uploadEduDetail()} style={{ color: "#00b5ff" }} >check</span>
                 }
                </div>

              </div>
            </div>
            <div style={{ margin: "10px 10px", display: "flex", flexDirection: "column" }} >
              <h4 style={{ fontSize: "10px" }} >Add Skills</h4>
              <div>
                <input type='text' placeholder={`Java HTML C++...`} onChange={(e) => setSkill(e.target.value)} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                {skill === '' ? <span className='material-icons' style={{ color: "skyblue" }} >done</span>
                  : <span className='material-icons' onClick={()=>UploadSkill()} style={{ color: "#00b5ff" }} >check</span>
                }</div>
            </div>
            <div style={{ margin: "10px 10px", display: "flex", flexDirection: "column" }} >
              <h4 style={{ fontSize: "10px" }} >Skills</h4>
              {userDetail?.skills?.map((i)=>{
                  
                return(
                  <div style={{display:"flex",overflow:"auto"}}>
                <p style={{color:"#aaa",marginRight:"15px",fontSize:"12px"}}>
                  {i}<span className='material-icons' onClick={()=>deleteSkill(i)} style={{cursor:"pointer",fontSize:"16px",color:"#000"}}>delete</span>
              </p>
                  </div>
              )
              })}
            </div>
            <div style={{ margin: "10px 10px", display: "flex", flexDirection: "column" }} >
              <h4 style={{ fontSize: "10px" }} >Add Project</h4>
              <div>
                <input type='text' placeholder={`Name`} onChange={(e) => setProjectName(e.target.value)} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px", width: "190px" }} />
                <input type='website' placeholder={`Website link`} onChange={(e) => setProjectWebsite(e.target.value)} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                <textarea type='text' placeholder={`More Detail`} onChange={(e) => setProjectDetail(e.target.value)} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px", width: "80%" }} />
                {ProjectName === '' ? <span className='material-icons' style={{ color: "skyblue" }} >done</span>
                  : <span className='material-icons' onClick={()=>UploadProject()} style={{ color: "#00b5ff" }} >check</span>
                }
              </div>
            </div>
          </div>
        <span className='backgroundBlurEffect'></span>
         </div>}

    </div>
  )
}

export default Profile
