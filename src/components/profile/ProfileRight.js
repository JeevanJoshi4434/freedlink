import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './profile.css';
import styles from '../css/Pmargin.module.css';
const ProfileRight = (props) => {
    const [getFollowing, setGetFollowing] = useState([]);
    const [getFollower, setGetFollower] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        const getFollowingList = async () => {
            try {
                const res = await axios.get(`/api/following/${props.id}`,)
                setGetFollowing(res.data);

            } catch (error) {

            }
        }
        getFollowingList();
    }, [props.id])

    useEffect(() => {
        const getFollowerList = async () => {
            try {
                const res = await axios.get(`/api/follower/${props.id}`)
                setGetFollower(res.data);
            } catch (error) {

            }
        }
        getFollowerList();
    }, [props.id])
    // // // console.log(getFollowing)
    return (
        <>
            <div className='rightProfileBar'>
                <div className='rightContainer-suggestion'>
                    <h3 style={{ marginLeft: "25%", marginTop: "20px", textAlign: "start" }}>Following</h3>
                    {
                        getFollowing?.map((i) => {

                            return (
                                <div>
                                    <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
                                        <div style={{ display: 'flex', alignItems: "center" }}>
                                            <img className="ProfileImage"
                                                src={i.followings.img} alt="" />
                                            <div style={{ width: "200px" }}>
                                                <Link to={`/profile/${i.followings._id}`}><p style={{ marginLeft: "10px", textAlign: "start", fontSize: "13px" }}>{i.followings.name}</p></Link>
                                                <p className={styles.p} style={{ marginLeft: "10px", textAlign: "start", marginTop: "5px", fontSize: "11px", color: "#aaa" }}>{i.followings.shortBio}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )

                        })
                    }
                </div>
                
            </div>
            {/* <div>
                <button onClick={() => setModalVisible(true)}>Open Modal</button>
                {modalVisible && (
                    <div>
                        <p>Modal content here</p>
                        <button onClick={() => setModalVisible(false)}>Close Modal</button>
                    </div>
                )}
            </div> */}
        </>
    )
}

export default ProfileRight
