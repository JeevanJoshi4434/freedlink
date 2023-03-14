import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jobStyle from '../Job/Job.module.css';
const HRJobs = () => {
    const userDetails = useSelector((state) => state.user);
    let user = userDetails?.user;
    let accessToken = user?.accessToken;
    let userID = user?.other?._id;
        const [jobs, setJobs] = useState();
        useEffect(() => {
          const getJobs = async () => {
            const res = await axios.get(`/api/advance/jobs/hr/${userID}`);
            setJobs(res.data);
          }
      
          getJobs();
        }, [])
      
        // // console.log(jobs)
        let navigate = useNavigate();
  return (
    <div className={jobStyle.mainPage} >
    <div className={jobStyle.left}></div>
    <main>
      {jobs?.map((i) => {
        var date = new Date();
        date = i?.jobPostedAt;
        // console.log(i?.Address[0]?.City)
        const ref = (e)=>{
          navigate(`/hr/dashboard/all/job?jobid=${e}`);
        }
        return (
          <div onClick={()=>ref(i?._id)} style={{cursor:"pointer",display:"flex",justifyContent:"space-between",padding:"15px 10px",borderBottom:"1px solid #aaa"}} >
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
    <div className={jobStyle.Right}></div>
  </div>
  )
}

export default HRJobs