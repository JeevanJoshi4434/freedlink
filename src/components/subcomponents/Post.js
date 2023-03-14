import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { isMobileOnly } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { ReportPost } from '../APIs/UserControlCalls';
import "../css/Home.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { shareOnMobile } from "react-mobile-share";
import ShareContent from '../Share';
import styles from './Subcomp.module.css';
const Post = (props) => {
  let navigate = useNavigate();
  let { username, image, caption, comments, profile, time, date, userId, likeNo, commentNo, postId } = props;
  const userDetails = useSelector((state) => state.user);
  let Cuser = userDetails?.user;
  let CuserID = userDetails?.user?.other
  let accessToken = Cuser?.accessToken;
  // console.log(accessToken)
  let user_Id = CuserID?._id;
  // console.log(user_Id)
  const liked = 'red';
  const noLike = 0;
  const oneLike = 1;
  const disliked = "#808080";
  const socket = props?.socket;
  const [moreVert, setMoreVert] = useState(false);
  const [reportTitle, setReportTitle] = useState('');
  const [reportDesc, setReportDesc] = useState('');
  const [Data, setData] = useState();
  const [user, setUser] = useState();
  const [Like, setLike] = useState();
  const [notifyUser, setNotifyUser] = useState([]);
  const [postImage, setPostImage] = useState([]);
  const [senderProfile, setSenderProfile] = useState('');
  const [saved, setSaved] = useState(false);
  const [removeSaved, setRemoveSaved] = useState(false);
  const about = caption.split(' ');
  const aboutCount = about.length;
  const [seeMore, setSeeMore] = useState(aboutCount > 40 ? true : false);
  const seeMoreAction = ()=>{
    if(seeMore){
      setSeeMore(false);
      console.log("Clicked!")
    }
  }
  // console.log(props?.userId)
 useEffect(() => {
  const getuserimg = async()=>{
    const res = await axios.get(`/api/notification/user/${user_Id}`, {headers:{accessToken:accessToken
    }}); 
    setSenderProfile(res?.data?.img);
}
getuserimg();
 }, [])

 const savePost = async()=>{
    const res = await axios.put(`/api/post/save/${user_Id}/${postId}`);
    const data = await res.status;
    if(data === 200){
      setSaved(true);
      console.log('added')
    }
 }
 const removesavedPost = async()=>{
    const res = await axios.put(`/api/post/remove/${user_Id}/${postId}`);
    const data = await res.status;
    if(data === 200){
      setSaved(false);
      console.log('removed')
    }
 }
  let  postImg = image;
    const handleNotification =async(type,id) =>{
      if(props?.userId !== user_Id && Like !== 'red'){
        console.log({post:id,by:user_Id,to:props?.userId,socket:socket})

        socket.emit("sendNotify",{
        senderName: user_Id,
        receiverName: props?.userId,
        postID:id,
        type:type,
        senderProfile:senderProfile,
        postImg:postImg,
        sendername:CuserID?.name
      })
      // console.log(accessToken)
      const res = await fetch(`/api/notification/push/${props?.userId}/${id}`,{method:"PUT",headers:{"Content-Type":"application/json",accessToken:accessToken},body:JSON.stringify({
        type:type,
        senderProfile:senderProfile,
        postImg:postImg,
        name:CuserID?.name
      })});
    }
  }
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(`/api/post/user/details/${userId}`)
        setUser(res.data)
      } catch (error) {
      }
    }
    getuser();
  }, [userId])
  let reportData;
  const setReport = (e) =>{
      setReportTitle(e);
  }
  const Report =async(e)=>{
    e.preventDefault();
    // console.log("Reported");  
    let res = await fetch(`/api/report`, { method: "POST", headers: { "Content-Type": "application/Json",accessToken:accessToken }, body: JSON.stringify({ type:"POST",
    desc:reportDesc,
    title:reportTitle,
    to:props?.postId,
  img:props?.image }) })
    setData(res);
  }
  
  // console.log({report:Data})
  const moreVertOpen = () => {
    if (moreVert) {
      setMoreVert(false);
    } else {
      setMoreVert(true);
    }
  }
  // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDUzMDYwNDg0MGQ0MDc2ZjhhOTk2OSIsIm5hbWUiOiJKZWV3YW4gSm9zaGkiLCJpYXQiOjE2NzUwMDA5MDh9.DTywDV4-vdT8ji33dzuCPXVvM6mBKPFZ-_PNw1jutGA";
  // console.log(user?.notifications)
  const [likeCount, setLikeCount] = useState(noLike)

  const handleLike = async () => {
    if (Like === disliked) {
      setLikeCount(likeCount + 1);
      setLike(liked);
      await fetch(`/api/${postId}/like/`, { method: "PUT", headers: { "Content-Type": "application/Json", accessToken: accessToken } })
    } else {
      await fetch(`/api/${postId}/like/`, { method: "PUT", headers: { "Content-Type": "application/Json", accessToken: accessToken } })
      setLikeCount(likeCount - 1);
      setLike(disliked);
    }
  }
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(`/api/post/user/details/${userId}`)
        setUser(res.data)
      } catch (error) {
      }
    }
    getuser();
  }, [userId])
  useEffect(()=>{
    if(props?.like.includes(user_Id)){ 
      setLike(liked);
    }
    else {
      setLike(disliked);
    }
  },[user?._id]);
    const sharePost = (title,text,url)=>{
      shareOnMobile({
        title: `${title}`,
                text: `${text}`,
                url: `${url}`,
      })
    }
    const DeletePost = async()=>{
      const res = await fetch(`/api/delete/post/${props?.postId}`,{method:"DELETE",headers:{accessToken:accessToken}});
      const data = await res.status;
      if( data === 200 ){
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
    <div style={{width:"100%"}}>
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
      <div className="post">
        <div className="post__top">
          <img
            className="user__avatar post__avatar"
            src={user?.img} alt=""
          />
          <div className="post__topInfo">
            <Link to={`/profile/${userId}`} ><h3>{user?.name}</h3></Link>
            <p>{date} at {time}</p>
          </div>
          <div style={{ position: "absolute", right: "10px" }} className='dropdown' >
            <span class="material-icons dropbtn2">more_vert</span>
            <div className='dropdown-content2 button-hover'>
                            { !saved &&  <div onClick={()=>savePost()} >
                            <span className='material-icons'style={{marginRight:"10px"}}>bookmark</span><span className='dropicon' >Save</span>
                            </div>}
                            { saved &&  <div onClick={()=>removesavedPost()} >
                            <span className='material-icons'style={{marginRight:"10px"}}>bookmark</span><span className='dropicon' >Remove</span>
                            </div>}
                          {props?.userId !== user_Id &&<div>
                          <span className='material-icons'style={{marginRight:"10px"}}>report</span><span className='dropicon' onClick={moreVertOpen} >Report</span>
                          </div>}
                          {props?.userId === user_Id &&<div>
                          {/* <span className='material-icons'style={{marginRight:"10px"}}>trash</span> */}
                          <span className='dropicon' onClick={()=>DeletePost(props?.userId)} >Delete</span>
                          </div>}
                        </div>
          </div>
        </div>

        { seeMore===true && <div className="post__bottom">
          {aboutCount > 40 && <p style={{whiteSpace:"pre-wrap"}} >{caption.slice(0,40)}...<span style={{color:"#0000ff",cursor:"pointer"}} onClick={()=>seeMoreAction()} >read more</span> </p>} 
          
        </div>}
        { !seeMore && <div className="post__bottom">
           {<p style={{whiteSpace:"pre-wrap"}} >{caption} </p>}
        </div>}

        <div className="post__image">
          <img style={{objectFit:"contain", maxHeight:"640px"}} src={image} alt="" />
        </div>

        <div className="post__options">
          <div className="post__option" onClick={()=>{ handleLike(); handleNotification(1,props?.postId);}}>
            <span className="material-icons" style={{ color: `${Like}` }}> favorite </span>
            <p>{likeNo + likeCount} Likes</p>
          </div>

          {/* <div className="post__option">
            <span className="material-icons"> chat_bubble_outline </span>
            <p>{commentNo} Comments</p>
          </div> */}

          <div className="post__option">
            <span className="material-icons"> near_me </span>
            {/* <p>Share</p> */}
            
             {isMobileOnly ? <p onClick={()=>sharePost("Share Post",`post by @${user?.name}`,`http://192.168.1.5:3000/post/${props?.postId}`)} >Share</p> : <ShareContent
            label={"Share post"}
            title={`Post by ${user?.name}`}
            text={`Freedlink Post`}
            url={`http://192.168.1.5:3000/post/${props?.postId}`}
             /> }
          </div>
        </div>
      </div>
      {moreVert && <div style={{ position: "relative", top: "-499px",height:"10px",marginBottom:"50px" }} >
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          backgroundColor: "#f9f9f9",
          height: "450px",
          width: "100%",
          fontSize: "14px",
          right: "0",
          top:"-62px",
          position:"relative",
        }} >
            <div>
            <div style={{marginBottom:"20px",marginTop:"10px",display:'flex'}}  ><span className='material-icons' onClick={()=>{setMoreVert(false);setReportTitle('')}} style={{marginRight:"10px"}}>close</span><h4>Report</h4></div>
            </div>
            <button onClick={()=>setReportTitle('Suspicious,fake and spam')} className={styles.button} >Suspicious,fake and spam</button>
            <button onClick={()=>setReportTitle('Harassment or hateful post')} className={styles.button}>Harassment or hateful post</button>
            <button onClick={()=>setReportTitle('Violence or physical harm')} className={styles.button}>Violence or physical harm</button>
            <button onClick={()=>setReportTitle('Adult content')} className={styles.button}>Adult content</button>
            <span className={styles.bar} ></span>
            { reportTitle !== '' && <textarea style={{width:"100%",height:"100px"}} onChange={(e)=>setReportDesc(e.target.value)} placeholder={`tell more about ${reportTitle}...`} ></textarea>}
            {reportTitle !== '' && <div style={{display:"flex",alignContent:"end"}} >
            <button style={{
              backgroundColor:"rgba(123,123,123,0)",
              borderRadius:"6px",
              marginTop:"5px",
              width:"150px",
              height:"40px",
              marginBottom:"5px"
            }} onClick={(e)=>Report(e)} >Report</button>
            </div>}
          {/* </div> */}

        </div>
      </div>}
            
    </div>
  )
}

export default Post
