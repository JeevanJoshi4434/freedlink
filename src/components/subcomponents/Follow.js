import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';


export default function Follow({userDetail,socket}){
    // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDUzMDYwNDg0MGQ0MDc2ZjhhOTk2OSIsIm5hbWUiOiJKZWV3YW4gSm9zaGkiLCJpYXQiOjE2NzQ5OTQyOTl9.2kATc0NiIgzh6w0e5mQeZWo-OYy9nWXBkHPlrvy3vQQ";
    const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  let id = user?.other?._id;
  let accessToken = user?.accessToken;
//   // console.log(user);
//   // console.log(accessToken)
    const [follow, setFollow] = useState('person_add')
    const handleFollow =async(e)=>{
        await fetch(`/api/follow/${userDetail._id}`, {method:"PUT",headers:{accessToken:accessToken,"Content-Type":'application.json'}})
        setFollow('check')
    }
    const handleNotification =async() =>{
          socket.emit("sendNotify",{
          senderName: id,
          receiverName: userDetail?._id,
          postID:"",
          type:2,
          senderProfile:user?.other?.img,
          sendername:user?.other?.name
        })
        // console.log(accessToken)
        const res = await fetch(`/api/notification/follow/${userDetail?._id}`,{method:"PUT",headers:{"Content-Type":"application/json",accessToken:accessToken},body:JSON.stringify({
          type:2,
          senderProfile:user?.other?.img,
          postImg:"",
          name:user?.other?.name
        })});
    }
    if(userDetail._id !== user?.other?._id){
    return (
         <div>
            <div >
                <div style={{ marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: 'flex', alignItems: "center" }}>
                        <img className="ProfileImage"
                            src={userDetail.img}
                            alt="" />
                        <div>
                            <p style={{ marginLeft: "10px", textAlign: "start" }}>{userDetail.name}</p>
                            <p style={{ marginLeft: "10px", textAlign: "start", marginTop: "5px", fontSize: "11px", color: "#aaa" }}>{userDetail.shortBio}</p>
                        </div>
                    </div>
                    <div className='AddFriend'>
                        <span className='material-icons' style={{cursor:"pointer"}} onClick={(e)=>{handleFollow(userDetail._id);handleNotification()}} >{follow}</span>
                    </div>
                </div>
            </div>

        </div>
    )
    }
}
