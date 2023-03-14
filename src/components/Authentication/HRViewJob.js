import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import jobStyle from '../Job/Job.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const HRViewJob = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [users, setUsers] = useState([]);
    const [sortedusers, setSortedUsers] = useState([]);
    const id = searchParams.get('jobid');
    // console.log(id)
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
            const res = await axios.get(`/api/advance/jobs/${id}`);
            setJob(res.data);
        }
        getData();
    }, [id])
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`/api/advance/job/applied/${id}/${userID}`, { headers: { accessToken: accessToken } });
            setUsers(res.data);
        }
        getData();
    }, [id])
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`/api/advance/job/sorted/${id}/${userID}`, { headers: { accessToken: accessToken } });
            setSortedUsers(res.data);
        }
        getData();
    }, [id])

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
        // // console.log(i?.skills)
        skillArr = i?.skills;
    })
    // console.log(users)
    // let userList = [users];
    // // // console.log(userList);
    // userList?.map((i) => {
    //     i?.map((item) =>{
    //          username = item?.name;
    //         // console.log(item)}
    //         )
    //     })
    const shortList = async (userid) => {
        const res = await axios.put(`/api/advance/job/user/push/${userid}/${id}/${userID}`);
        if (res.status === 200) {
            toast.success('Shortlisted!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate(0);
        } if (res.status === 401) {
            toast.error('Login to do any action!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } if (res.status === 500) {
            toast.error('Internal server error!', {
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
    const removeApplicant = async (userid) => {
        const res = await axios.put(`/api/advance/job/user/pull/${userid}/${id}/${userID}`);
        if (res.status === 200) {
            toast.success('removed!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate(0);
        } if (res.status === 401) {
            toast.error('Login to do any action!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } if (res.status === 500) {
            toast.error('Internal server error!', {
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
        // console.log(i)
        return ( */}
            <div className={jobStyle.mainElement} style={{ width: "860px" }}>
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
                        <span className='material-icons '>more_horiz</span>
                    </div>
                </div>
                <div className={jobStyle.mainContent}>
                    <div className={jobStyle.jobHighlight} >
                        <h6>Shortlisted:</h6>
                        {sortedusers?.map((i)=>{
                            // console.log(i?.data?.name)
                            return(
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "200px" }} >
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                                            <div style={{ margin: "10px 20px" }}>
                                                <img src={i?.data?.img} style={{ height: "70px", width: "70px", borderRadius: "50px" }} />
                                            </div>
                                            <div style={{ margin: "10px 20px" }} >
                                                <h4 style={{ cursor: "pointer" }} onClick={() => navigate(`/profile/${i?.data?._id}`)}>{i?.data?.name}</h4>
                                                <p>{i?.data?.education?.map((i) => i?.degree)} - {i?.data?.education?.map((i) => i?.universityName)}</p>
                                            </div>
                                            <div style={{ margin: "10px 20px", }} >
                                                <p>Skills: {i?.data?.skills?.map((i) => i)}</p>
                                                {/* <p>Work Experience:</p> */}
                                                {/* <p>{i?.company?.map((i)=> i?.nameCompany)} {i?.company?.map((i)=> i?.positionCompany)}</p> */}
                                            </div>
                                        </div>
                                        <div>
                                            <h6>View Resume</h6>
                                        </div>
                                        {/* <div style={{ cursor: "pointer" }}>
                                            <p style={{fontSize:"10px"}}>remove</p>
                                            <span className='material-icons' onClick={() => removeApplicant(i?._id)}>remove</span>
                                        </div> */}

                                    </div>
                            )
                        })}
                        {/* <p><span className='material-icons'>checklist</span> Skills: {skillArr?.map((i)=>(<>{i} </>))}</p> */}
                        {/* <p><span className='material-icons'>work</span> {Job?.routineType}</p> */}
                        {/* <p><span className='material-icons'>domain</span> {Job?.numOfEmployee} Employees</p> */}
                        {/* <p><span className='material-icons'>badge</span>applications Submitted: {Job?.enrolled?.length}</p> */}
                        {/* {Job?.referenceCompanyName !== "" && <p><span className='material-icons'>link</span>Referral {Job?.referenceCompanyName}</p>} */}
                        {/* <p>Applicable: {Job?.qualification}</p> */}
                        {/* <p>Posted on: {date?.slice(8,10)} {month} {date?.slice(0,4)}</p> */}

                    </div>
                    <div className={jobStyle.DetailJob} >
                        <h4>Applied List:</h4>
                        {users?.map((i) => {
                            // console.log(i?.skills?.map((i) => i))
                            return (
                                <>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "200px" }} >
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                                            <div style={{ margin: "10px 20px" }}>
                                                <img src={i?.data?.img} style={{ height: "70px", width: "70px", borderRadius: "50px" }} />
                                            </div>
                                            <div style={{ margin: "10px 20px" }} >
                                                <h4 style={{ cursor: "pointer" }} onClick={() => navigate(`/profile/${i?.data?._id}`)}>{i?.data?.name}</h4>
                                                <p>{i?.data?.education?.map((i) => i?.degree)} - {i?.data?.education?.map((i) => i?.universityName)}</p>
                                            </div>
                                            <div style={{ margin: "10px 20px", }} >
                                                <p>Skills: {i?.data?.skills?.map((i) => i)}</p>
                                                {/* <p>Work Experience:</p> */}
                                                {/* <p>{i?.company?.map((i)=> i?.nameCompany)} {i?.company?.map((i)=> i?.positionCompany)}</p> */}
                                            </div>
                                        </div>
                                        <div>
                                            <h6>View Resume</h6>
                                        </div>
                                        <div  style={{}}>
                                            <span className='material-icons' style={{marginRight:"20px", cursor: "pointer" }} onClick={() => shortList(i?._id)}>check</span>
                                            <span className='material-icons' style={{cursor: "pointer" }} onClick={() => removeApplicant(i?._id)}>remove</span>
                                        </div>

                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
            {/* )
      })} */}
        </div>
    )
}

export default HRViewJob