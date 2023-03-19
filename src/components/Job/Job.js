import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jobStyle from './Job.module.css';
const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [loading, setLoading] = useState(false);
 
  
  const getJobs = async () => {
    const res = await axios.get(`/api/advance/jobs?_page=${page}&_limits=${limit}`);
    if(page === 1){
      setJobs(res.data);
    }else{
        setJobs((prev)=>[...prev,...res.data]);
      }
    }
    
    useEffect(() => {
    getJobs();
  }, [page])
  // console.log(jobs)
   // iNFINITE SCROLL 
   const hadleInfiniteScroll = async ()=>{
    // // console.log("ScrollHeight" + document.documentElement.scrollHeight);
    // // console.log("basicHeight" + window.innerHeight);
    // // console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if(window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight ) {
          setLoading(true);
        setPage((prev)=>prev+1);
      }
    } catch (error) {
      // console.log(error)
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", hadleInfiniteScroll);
    return ()=> window.removeEventListener("scroll",hadleInfiniteScroll);
  }, [])
  // // // console.log(jobs)
  let navigate = useNavigate();
  return (
    <div className={jobStyle.mainPage} >
      <div className={jobStyle.left}></div>
      <main>
        {jobs?.map((i) => {
          var date = new Date();
          date = i?.jobPostedAt;
          // // console.log(i?.Address[0]?.City)
          const ref = (e)=>{
            navigate(`/jobs/${e}`);
          }
          return (
            <div onClick={()=>ref(i?._id)} style={{height:"112px",cursor:"pointer",display:"flex",justifyContent:"space-between",padding:"15px 10px",borderBottom:"1px solid #aaa"}} >
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
};

export default Job