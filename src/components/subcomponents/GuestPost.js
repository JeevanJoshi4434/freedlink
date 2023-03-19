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
const GuestPost = (props) => {
  let navigate = useNavigate();
  let { username, image, caption, comments, profile, time, date, userId, likeNo, commentNo, postId } = props;
  const userDetails = useSelector((state) => state.user);
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
  let  postImg = image;
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
  const [likeCount, setLikeCount] = useState(noLike)
const sharePost = (title,text,url)=>{
      shareOnMobile({
        title: `${title}`,
                text: `${text}`,
                url: `${url}`,
      })
    }
  return (
    <div style={{width:"100%"}}>
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
        </div>

        { seeMore===true && <div className="post__bottom">
          {aboutCount > 40 && <p style={{whiteSpace:"pre-wrap"}} >{caption.slice(0,40)}...<span style={{color:"#0000ff",cursor:"pointer"}} onClick={()=>seeMoreAction()} >read more</span> </p>} 
          
        </div>}
        { !seeMore && <div className="post__bottom">
           {<p style={{whiteSpace:"pre-wrap"}} >{caption} </p>}
        </div>}
        <div className="post__bottom">
          <p onClick={()=>navigate('/login')} style={{color:"#0000a7",fontSize:"12px",marginLeft:"10px",cursor:"pointer"}}>wants to like & follow? login with us.</p>
        </div>

        <div className="post__image">
          <img style={{objectFit:"contain", maxHeight:"640px"}} src={image} alt="" />
        </div>

        <div className="post__options">
          <div className="post__option">
            <span className="material-icons" style={{ color: `${Like}` }}> favorite </span>
            <p>{likeNo} Likes</p>
          </div>

          {/* <div className="post__option">
            <span className="material-icons"> chat_bubble_outline </span>
            <p>{commentNo} Comments</p>
          </div> */}

          <div className="post__option">
            <span className="material-icons"> near_me </span>
            {/* <p>Share</p> */}
            
             {isMobileOnly ? <p onClick={()=>sharePost("Share Post",`post by @${user?.name}`,`https://${process.env.REACT_APP_CLIENTPORT}/post/${props?.postId}`)} >Share</p> : <ShareContent
            label={"Share post"}
            title={`Post by ${user?.name}`}
            text={`Freedlink Post`}
            url={`https://${process.env.REACT_APP_CLIENTPORT}/post/${props?.postId}`}
             /> }
          </div>
        </div>
      </div>          
    </div>
  )
}

export default GuestPost
