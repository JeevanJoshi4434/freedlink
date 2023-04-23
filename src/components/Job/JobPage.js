import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import jobStyle from './Job.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isMobileOnly } from 'react-device-detect';
import { shareOnMobile } from "react-mobile-share";
import ShareContent from '../Share';
const JobPage = () => {
  const [Job, setJob] = useState();
  let params = useParams();
  let skillArr = [];
  let navigate = useNavigate();
  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  let accessToken = user?.accessToken;
  let userID = user?.other?._id;

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`/api/advance/jobs/${params?.id}`);
      setJob(res.data);
    }
    getData();
  }, [params?.id])
  let date = Job?.createdAt;
  let m = date?.slice(5, 7);
  let month;
  if (m === '01') {
    month = 'Jan';
  } else if (m === '02') {
    month = 'Feb';
  } else if (m === '03') {
    month = 'March';
  } else if (m === '04') {
    month = 'Apr';
  } else if (m === '05') {
    month = 'May';
  } else if (m === '06') {
    month = 'June';
  } else if (m === '07') {
    month = 'July';
  } else if (m === '08') {
    month = 'Aug';
  } else if (m === '09') {
    month = 'Sep';
  } else if (m === '10') {
    month = 'Oct';
  } else if (m === '11') {
    month = 'Nov';
  } else if (m === '12') {
    month = 'Dec';
  }
  Job?.skills?.map((i) => {
    // // // console.log(i?.skills)
    skillArr = i?.skills;
  })
  const apply = async (ID) => {
    const res = await fetch(`/api/advance/job/${ID}/${userID}`, { method: "PUT", headers: { accessToken: accessToken } });
    if (res.status === 200) {
      toast.success('Applied!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (res.status === 409) {
      toast.success('Already Applied!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }if (res.status === 410) {
      toast.warn('Application Acceptance Closed Temporary!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (res.status === 404) {
      toast.warn('Job Post Not Valid!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
     if (res.status === 401) {
      toast.error('Login to apply!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  const sharePost = (title,text,url)=>{
    shareOnMobile({
      title: `${title}`,
              text: `${text}`,
              url: `${url}`,
    })
  }
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "10px" }} >
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
        style={{ zIndex: "99999999999" }}
      />
      {/* {Job?.map((i) => {
        // // console.log(i)
        return ( */}
      <div className={jobStyle.mainElement}>
        <div className={jobStyle.jobNav} >
          <div className={jobStyle.jobNavleft}>
            <div>
              <span className='material-icons' onClick={() => navigate(-1)} style={{ cursor: "pointer" }} >arrow_back</span>
            </div>
            <div>
              <h4>{Job?.title}</h4>
              <h6>{Job?.subject} - {Job?.Address[0]?.City} {Job?.Address[0]?.state},{Job?.Address[0]?.country}</h6>
            </div>
          </div>
          <div className={jobStyle.jobNavright}>
            <div style={{ position: "absolute", right: "10px" }} className='dropdown' >
              <span class="material-icons dropbtn2">more_vert</span>
              <div className='dropdown-content2 button-hover'>
                <div >
                  <span className='material-icons' style={{ marginRight: "10px" }}>near_me</span>
                  {isMobileOnly ? <p onClick={() => sharePost("Share Post", `post by @${user?.name}`, `https://${process.env.REACT_APP_CLIENTPORT}/jobs/${params?.id}`)} >Share</p> : <ShareContent
                    label={"Share post"}
                    title={`Post by ${user?.name}`}
                    text={`Freedlink Post`}
                    url={`https://${process.env.REACT_APP_CLIENTPORT}/jobs/${params?.id}`}
                  />}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={jobStyle.mainContent}>
          <div className={jobStyle.jobHighlight} >
            <p><span className='material-icons'>checklist</span> Skills: {skillArr?.map((i) => (<>{i} </>))}</p>
            <p><span className='material-icons'>work</span> {Job?.routineType}</p>
            <p><span className='material-icons'>domain</span> {Job?.numOfEmployee} Employees</p>
            <p><span className='material-icons'>badge</span>applications Submitted: {Job?.enrolled?.length}</p>
            {Job?.referenceCompanyName !== "" && <p><span className='material-icons'>link</span>Referral {Job?.referenceCompanyName}</p>}
            <p>Applicable: {Job?.qualification}</p>
            <p>Posted on: {date?.slice(8, 10)} {month} {date?.slice(0, 4)}</p>
            <button onClick={() => apply(params?.id)}>Apply Now</button>
          </div>
          <div className={jobStyle.DetailJob} >
            <h4>About the job</h4>
            <p>{Job?.description}</p>
          </div>
        </div>
      </div>
      {/* )
      })} */}
    </div>
  )
}

export default JobPage
