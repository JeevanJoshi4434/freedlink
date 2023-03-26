import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Follow from '../subcomponents/Follow';
import jobStyle from './Job.module.css';
const Job = (props) => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState([]);
  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  let accessToken = user?.accessToken;
  useEffect(() => {
    const getSuggestion = async () => {
      try {
        if (user?.other) {

          const res = await axios.get(`/api/all/user`, {
            headers: {
              accessToken: accessToken
            }
          })
          setSuggestion(res.data);
        }
      } catch (error) {

      }
    }
    getSuggestion();
  }, [])
  const getJobs = async () => {
    const res = await axios.get(`/api/advance/jobs?_page=${page}&_limits=${limit}`);
    if (page === 1) {
      setJobs(res.data);
    } else {
      setJobs((prev) => [...prev, ...res.data]);
    }
  }

  useEffect(() => {
    getJobs();
  }, [page])
  // console.log(jobs)
  // iNFINITE SCROLL 
  const hadleInfiniteScroll = async () => {
    // // console.log("ScrollHeight" + document.documentElement.scrollHeight);
    // // console.log("basicHeight" + window.innerHeight);
    // // console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      // console.log(error)
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", hadleInfiniteScroll);
    return () => window.removeEventListener("scroll", hadleInfiniteScroll);
  }, [])
  // // // console.log(jobs)
  let navigate = useNavigate();
  return (
    <div className={jobStyle.mainPage} >
      <div className={jobStyle.Left}>
        <div className="sidebar">
          {user?.other && <Link to={`profile/${user?.other?._id}`}><div className="sidebarRow">
            <img
              className="user__avatar"
              src={user?.other?.img} alt=""
            />
            <h4>{user?.other?.name}</h4>
          </div></Link>}

          {/* <div className="sidebarRow">
          <span className="material-icons"> local_hospital </span>
          <h4>Covid - 19 Information Center</h4>
        </div> */}

          {/* <div className="sidebarRow">
          <span className="material-icons"> emoji_flags </span>
          <h4>Pages</h4>
        </div> */}

          {user?.other && <div className="sidebarRow" onClick={() => navigate("/inbox")}>
            <span className="material-icons"> chat </span>
            <h4>Chats</h4>
          </div>}

          <div className="sidebarRow" onClick={() => navigate("/jobs")} >
            <span className="material-icons"> home </span>
            <h4>Feed</h4>
          </div>
        </div>
      </div>
      <main className='my-5 rounded'>
        {jobs?.map((i) => {
          var date = new Date();
          date = i?.jobPostedAt;
          // // console.log(i?.Address[0]?.City)
          const ref = (e) => {
            navigate(`/jobs/${e}`);
          }
          return (
            <div onClick={() => ref(i?._id)} style={{ height: "112px", cursor: "pointer", display: "flex", justifyContent: "space-between", padding: "15px 10px", borderBottom: "1px solid #aaa" }} >
              <div className={jobStyle.jobLeft} >
                <div className={jobStyle.Image} >
                  <img src={i?.image} />
                </div>
                <div className={jobStyle.Detail} >
                  <h4>{i?.title}</h4>
                  <h6>{i?.subject}</h6>
                  <div>
                    <p>Requirement: {i?.qualification}</p>
                    <p>{date?.slice(0, 10)}</p>
                    <p>{i?.referenceCompanyName}</p>
                  </div>
                </div>
              </div>
              <div className={jobStyle.jobRight}>
                <p>
                  {i?.CompanyName}
                </p>
                <p>
                  {i?.Address[0]?.City}, {i?.Address[0]?.state} ({i?.Address[0]?.country})
                </p>
              </div>
            </div>
          )
        })}
      </main>
      <div className={jobStyle.Right}>
        <div className='rightContainer-suggestion' style={{ overflowY: "scroll" }}>
          {user?.other && <h3 style={{ marginLeft: "10px", marginTop: "20px", textAlign: "start" }}>Suggested for you</h3>}
          {!user?.other && <h3 style={{ marginLeft: "10px", marginTop: "20px", textAlign: "start" }}>Welcome To Freedlinks</h3>}
          <div >
            {suggestion?.map((i) => {
              return (
                <Follow userDetail={i} socket={props?.socket} />
              )
            })}
          </div>
          {!user?.other &&
            <>
              <div>
                <div >
                  <div style={{ marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: 'flex', alignItems: "center" }}>
                      <div>
                        <p style={{ marginLeft: "10px", textAlign: "start", fontSize: "12px" }}>• Find Your Tribe</p>
                        <p style={{ marginLeft: "10px", textAlign: "start", marginTop: "5px", fontSize: "11px", color: "#aaa" }}></p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
              <div>
                <div >
                  <div style={{ marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: 'flex', alignItems: "center" }}>
                      <div>
                        <p style={{ marginLeft: "10px", textAlign: "start", fontSize: "12px" }}>• "Connect, Collaborate, and Succeed": FreedLink brings together job seekers and employers to create a dynamic community where everyone can achieve their goals. </p>
                        <p style={{ marginLeft: "10px", textAlign: "start", marginTop: "5px", fontSize: "11px", color: "#aaa" }}></p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
};

export default Job