import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Post from '../../subcomponents/Post';
import settingStyle from '../setting.module.css';

const Saved = (props) => {
    
  let navigate = useNavigate();
  const userDetails = useSelector((state) => state.user);
  // // // console.log()
  let user = userDetails?.user;
  let userId = user?.other?._id;
  let Cuser = user?.other;
  let accessToken = user?.accessToken;
  const [currentOption, setCurrentOption] = useState('');
  const [reportTitle, setReportTitle] = useState('');
  const [reportDesc, setReportDesc] = useState('');
  const [Data, setData] = useState('');
  const [personalField, setPersonalField] = useState('');
  const [newName, setNewName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [posts, setPosts] = useState([]);
  const [newPass, setNewPass] = useState('');
  const [CNewPass, setCNewPass] = useState('');
  const Report = async (e) => {
    e.preventDefault();
    // // console.log("Reported");  
    let res = await fetch(`/api/report`, {
      method: "POST", headers: { "Content-Type": "application/Json", accessToken: accessToken }, body: JSON.stringify({
        type: "SYSTEM",
        desc: reportDesc,
      })
    })
    setData(res);
  }

  const getpost = async () => {
    const res = await axios.get(`/api/post/saved/${userId}`, { method: "GET", headers: { accessToken: accessToken } });
    const data = [res.data];
    setPosts(data);
  }
  // console.log(posts)
  useEffect(() => {
    getpost();
  }, [userId])

  // apis
  const ChangeName = async()=>{
    const res = await fetch(`/api/user/change/name/${newName}/${password}`,{method:"PUT",headers:{accessToken:accessToken}})
    const data = await res.status;
    if(data === 200){
      // console.log('changed')
    }
    if(data === 400){
      // console.log("Fail")
    }
  }
  const ChangeEmail = async()=>{
    const res = await fetch(`/api/user/change/mail/${email}/${password}`,{method:"PUT",headers:{accessToken:accessToken}})
    const data = await res.data;
    if(data === 200){
      // console.log('changed')
    }
    if(data === 400){
      // console.log("Fail")
    }
}
  return (
    <div style={{ height: "100%",overflow:"auto",marginTop:"123px", marginLeft: "19px", marginTop: "20px", display: "flex", flexDirection:"column" }}>
            {posts?.map((i)=>(
                i?.posts?.map((item)=>{
                  return(
                    <>
                    <Post key={item._id} socket={props?.socket} username={item.name} postId={item._id} like={item.like} likeNo={item.like.length} commentNo={item.comments.length} userId={item.user} caption={item.title} image={item.image} profile={item.avatar} comments={""}
                  time={"2 AM"} date={"24 Aug"} />
                    </>
                  )
                })
              ))}
          </div>
  )
}

export default Saved