import axios from 'axios';
import React, { useEffect, useState } from 'react';
import search from "../Search/search.module.css";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
    const deleteUser = async(e)=>{
        await axios.delete(`/api/users/delete/${user?.other?._id}/${e}`,{header:{accessToken:accessToken}})
    }
    return (
        <div style={{ height: "95vh", backgroundColor: "#6e00ff", color: "white", padding: "40px 40px" }}>
            <h4>All Users</h4>
            <p style={{color:"red"}} >• Warning: By clicking on Delete Icon The User will be deleted Suddenly</p>
            <div style={{ height: "80vh", width: "100%",overflow:"auto",backgroundColor: "white", color: "black", borderRadius: "10px", padding: "10px 10px" }}>
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
                                    <span onClick={()=>deleteUser(i?._id)}  className={`material-icons ${search.actionIcon}`}>delete</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AdminUsers