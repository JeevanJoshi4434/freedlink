import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import search from "./search.module.css";
import { useMemo } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import countryList from 'react-select-country-list';
import Select from 'react-select';
import axios from 'axios';
import { async } from '@firebase/util';
import { useSelector } from 'react-redux';
import Follow from '../subcomponents/Follow';

const Search = (props) => {
  let navigate = useNavigate();
  const userDetails = useSelector((state) => state.user);
  let Cuser = userDetails?.user;
  let accessToken = Cuser?.accessToken;
  const [suggestion, setSuggestion] = useState([]);
  const [result, setResult] = useState([])
  const [interest, setInterest] = useState('');
  // // console.log({"Interest":interest})
  let user = result?.data?.user;
  let job = result?.data?.job;
  const location = useLocation();
  const searchContent = location.search.split("?")[1];
  // // console.log(result);
  const [country, setCountry] = useState([]);
  const options = useMemo(() => countryList().getData(), [])
  const changeHandler = country => {
    setCountry(country)
  }
  useEffect(() => {
    const searchApi = async () => {
      try {
        const res = await axios.get(`/api/people?${searchContent}`, { headers: { "Content-Type": "application/JSON" } });
        setResult(res);
      } catch (error) {
        // // console.log(error);
      }
    }

    searchApi();
  }, [searchContent]);
  useEffect(() => {
    const interestData = async () => {
      try {
        const res = await axios.get(`/api/interest`, { headers: { "Content-Type": "application/JSON" } });
        setInterest(res);
      } catch (error) {
        // // console.log(error)
      }
    }
    interestData();
  }, [])
  useEffect(() => {
    const getSuggestion = async () => {
      try {
        if (Cuser?.other) {

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
  return (
    <div className={search.SearchField} >
      <div className={search.leftFilter} >
        {/* <div><p>Filter:</p></div>
        <div className={search.filterCountry}>
          <label>Select Country:</label>
          <Select options={options} value={country} onChange={changeHandler} />
        </div> */}
        <div className="sidebar">
          {Cuser?.other && <Link to={`profile/${Cuser?.other?._id}`}><div className="sidebarRow">
            <img
              className="user__avatar"
              src={Cuser?.other?.img} alt=""
            />
            <h4>{Cuser?.other?.name}</h4>
          </div></Link>}

          {/* <div className="sidebarRow">
          <span className="material-icons"> local_hospital </span>
          <h4>Covid - 19 Information Center</h4>
        </div> */}

          {/* <div className="sidebarRow">
          <span className="material-icons"> emoji_flags </span>
          <h4>Pages</h4>
        </div> */}
          <div className="sidebarRow" onClick={() => navigate("/jobs")} >
            <span className="material-icons"> home </span>
            <h4>Feed</h4>
          </div>
          {Cuser?.other && <div className="sidebarRow" onClick={() => navigate("/inbox")}>
            <span className="material-icons"> chat </span>
            <h4>Chats</h4>
          </div>}
          <div className="sidebarRow" onClick={() => navigate("/jobs")} >
            <span className="material-icons"> business_center </span>
            <h4>Job</h4>
          </div>
        </div>
      </div>
      <div className={search.mainCenter} >
        {user?.map((i) => {
          return (
            <div className={search.userProfile}>
              <div className={search.userIcon}>
                <img src={`${i?.img}`} style={{ width: "45px", height: "45px", borderRadius: "50%" }} />
              </div>
              <div className={search.userDetail} >
                <div className={search.userName}>
                  <Link to={`/profile/${i?._id}`} ><h4>{i?.name}</h4></Link><p> •  Student</p>
                </div>
                <p>{user?.shortBio}</p>
                <div className={search.skills} >
                  {i?.skills?.map((item) => (item))}
                </div>
              </div >
              <div className={search.userAction} >
                <div className='AddFriend'>
                  <span className={`material-icons ${search.actionIcon}`}>person_add</span>
                </div>
              </div>
            </div>
          )
        })}
        {/* Job filter */}

        {job?.map((i) => {
          var date = new Date();
          date = i?.jobPostedAt;
          const ref = (e) => {
            navigate(`/jobs/${e}`);
          }
          return (
            <div onClick={() => ref(i?._id)} className={search.userProfile}>
              <div className={search.userIcon}>
                <img src={i?.image} style={{ width: "45px", height: "45px", borderRadius: "50%" }} />
              </div>
              <div className={search.userDetail} >
                <div className={search.userName}>
                  <h4>{i.title}</h4><p> •  {i.country}</p>
                </div>
                <p>{i.subject} -  {i?.qualification}</p>
                <div className={search.skills} >
                  <p>{date?.slice(0, 10)}</p>
                </div>
              </div >
              <div className={search.userAction} >
                <div className='AddFriend'>
                  <p style={{ fontSize: "10px" }} className={``}>{i?.CompanyName}</p>
                  <p style={{ fontSize: "10px" }} className={``}>{i?.Address[0]?.City}, {i?.Address[0]?.state} ({i?.Address[0]?.country})</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className={search.rightAds} >
        {/* <div className={search.Featured} >
          <div className={search.FeaturedAdPoster} >
            <img style={{ height: "100px", width: "100%", objectFit: "cover", borderRadius: "20% 20% 0% 0%" }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDTHCpnfXvKv-uap21E9Fozjd8_aVdTiCOZdFPJI3J-cLJvefp6bcQDN0_qGnoAa_M1W8&usqp=CAU' />
            <span>Featured</span>
            <div className={search.Details}>

              <div className={search.FeaturedAdTitle} >
                <h1>Software Tester</h1><p>At google India</p>
              </div>
              <div className={search.FeaturedAdDescription} >
                <h4>ST-1</h4>
                <h6>B.Tech/M.Tech/BCA/MCA/IT/EC</h6>
                <p>2 years experience</p>
                <p>A gem position for you...</p>
              </div>
            </div>
          </div>
        </div>
        <div className={search.SponserAdContainer} >
          <div className={search.SponserAdPoster} >
            <img style={{ height: "100px", width: "100%", objectFit: "cover", borderRadius: "3% 5% 0% 0%" }} className={search.SponserAdImage} src='https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d2ViJTIwZGV2ZWxvcGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=2000&q=60' />
            <span>Sponsered</span>
            <div className={search.Details}>
              <div className={search.SponserAdTitle} >
                <h1>Software Developer</h1><p>At @flipkart India</p>
              </div>
              <div className={search.SponserAdDescription} >
                <h4>SDE-1</h4>
                <h6>B.Tech/M.Tech/BCA/MCA/IT/EC</h6>
                <p>No experience needed</p>
                <p>A gem position for you...</p>
              </div>
            </div>
          </div>
        </div> */}
        <div className='p25 pr-25'>

        <div className='rightContainer-suggestion' style={{ overflowY: "scroll" }}>
          {Cuser?.other && <h3 style={{ marginLeft: "10px", marginTop: "20px", textAlign: "start" }}>Suggested for you</h3>}
          {!Cuser?.other && <h3 style={{ marginLeft: "10px", marginTop: "20px", textAlign: "start" }}>Welcome To Freedlinks</h3>}
          <div >
            {suggestion?.map((i) => {
              return (
                <Follow userDetail={i} socket={props?.socket} />
              )
            })}
          </div>
          {!Cuser?.other &&
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
    </div>
  )
}

export default Search 
