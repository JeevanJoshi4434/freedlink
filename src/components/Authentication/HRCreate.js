import React, { useState } from 'react';
import "./HRStyle.css";
import app from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const HRCreate = () => {
    
    let navigate = useNavigate();
    const userDetails = useSelector((state) => state.user);
    let user = userDetails?.user;
    let accessToken = user?.accessToken;
    let userID = user?.other?._id;
    const [batchThumb, setBatchTumb] = useState(null);
    const [batchThumbnail, setBatchThumbnail] = useState(null);
    const [title, settitle] = useState('');
    const [Detail, setDetail] = useState('');
    const [qualification, setQualification] = useState('');
    const [subject, setSubject] = useState('');
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [exp, setExp] = useState('');
    const [expAboveSector, setExpAboveSector] = useState('');
    const [refCompany, setRefCompany] = useState('');
    const [currentWork, setCurrentWork] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    // const [skills, setSkills] = useState();
    const [routineType, setRoutineType] = useState('');
    const [currentSkill, setCurrentSkill] = useState([]);
    const [currentSkills, setCurrentSkills] = useState('');
    const [numOfEmployee, setNumOfEmployee] = useState('');
    const add = async(e)=>{
        await currentSkill.push(e);
        await setCurrentSkills('');
        toast.success(`${e} Added successfully`, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    const remove = async(e)=>{
       const index = await currentSkill.indexOf(e);
        if(index > -1){
            await currentSkill.splice(index,1);
            toast.success(`${e} removed successfully`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const uploadJob = (e) => {
        e.preventDefault();
        const fileName = new Date().getTime() + "_" + batchThumbnail?.name + "_" + user?.other?._id;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, batchThumbnail);
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        toast.success('Upload Paused! Check your Internet connection to continue!', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        break;
                    case 'running':
                        toast.success('Uploading Hang on please!', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        break;
                }
            },
            (error) => {
                // console.log(error)
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // // console.log('File available at', downloadURL);
                    fetch(`/api/advance/jobs/upload/${user?.other?._id}`, {
                        method: "POST", headers: { "Content-Type": "application/Json" }, body: JSON.stringify({
                            title: title,
                            subject: subject,
                            description: Detail,
                            country: country,
                            Email: email,
                            CompanyName: companyName,
                            qualification: qualification,
                            workExperience: exp,
                            experienceAboveSector: expAboveSector,
                            referenceCompanyName: refCompany,
                            currentWork: currentWork,
                            state: state,
                            city: city,
                            img:downloadURL,
                            routineType:routineType,
                            skills:currentSkill,
                            numOfEmployee:numOfEmployee,
                        })
                    }).then((res) => {
                        if(res === null ){
                            toast.loading("Hang on your request is on process!",{
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            })
                        }
                        if (res?.status === 200) {
                            toast.success('Uploaded Successfully', {
                                position: "top-center",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                            navigate("/hr/dashboard");
                        } else if (res.status === 500) {
                            toast.error('Internal server Error! try again later', {
                                position: "top-center",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: 0,
                                theme: "light",
                            });
                        }
                         else if (res.status === 401) {
                           toast.error('Login First to continue!', {
                                position: "top-center",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: 0,
                                theme: "light",
                            });
                        }if (res.status !== 200 && res.status !== 401 && res.status !== 500 && res.status !== 403) {
                            toast.error('Check your Internet connection', {
                                position: "top-center",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: 0,
                                theme: "light",
                            });
                        }
                    })
                });
            }
        );
    }
    
    return (
        <main id="mainPage" >
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
            />
            <div className='uploadSectionBatch' style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }} >
                <div className='uploadSectionBatchVideo' >
                    <h5>Choose Thumbnail (use 1x1 images only!)</h5>
                    <label htmlFor='imageThumb' id="uploadSectionBatchThumbnail" >
                        <input type='file' accept='image/*' name="imageThumb" id="imageThumb" style={{ display: "none" }} onChange={(e) => { setBatchThumbnail(e.target.files[0]); setBatchTumb(window.URL.createObjectURL(e.target.files[0])) }} />
                        {batchThumb === null ? <span><i class="fa-solid fa-2x fa-plus"></i><p>Add Thumbnail</p></span>
                            : <img src={batchThumb} />}
                    </label>
                </div>
                <div className='uploadSectionBatchDetail' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }} >
                    <div style={{ display: "flex", flexDirection: "column" }} >
                        <h5>Subject</h5>
                        <input type='text' placeholder='Subject...' onChange={(e) => setSubject(e.target.value)} style={{ marginBottom: "10px" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }} >
                        <h5>Title</h5>
                        <input type='text' placeholder='title' onChange={(e) => settitle(e.target.value)} style={{ marginBottom: "10px" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }} >
                        <h5>description</h5>
                        <textarea type='text' placeholder='Description' onChange={(e) => setDetail(e.target.value)} style={{ marginBottom: "10px" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }} >
                        <h5>Secondary Email</h5>
                        <input type='email' placeholder='Secondary Email' onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: "10px" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }} >
                        <h5>Company Name</h5>
                        <input type='name' placeholder='XYZ...' onChange={(e) => setCompanyName(e.target.value)} style={{ marginBottom: "10px" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }} >
                        <h5>Qualifications</h5>
                        <input type='text' placeholder='B.Tech, M.Tech etc...' onChange={(e) => setQualification(e.target.value)} style={{ marginBottom: "10px" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }} >
                        <h5>Current Work</h5>
                        <input type='text' placeholder='Current work' onChange={(e) => setCurrentWork(e.target.value)} style={{ marginBottom: "10px" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }} >
                        <h5>Routine Type</h5>
                        <input type='text' placeholder='Full Time/Half time etc...' onChange={(e) => setRoutineType(e.target.value)} style={{ marginBottom: "10px" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }} >
                        <h5>skills required</h5>
                        <input type='text' placeholder='Java,OOPS,C++ etc...' onChange={(e) => setCurrentSkills(e.target.value)} style={{ marginBottom: "10px" }} />
                        <span className='material-icons' onClick={()=>add(currentSkills)} >check</span>
                        <p>{currentSkill?.map((i)=>(<>{i} <span className='material-icons' onClick={()=>remove(i)} style={{color:"blue"}}>remove</span> ,</>))}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }} >
                        <h5>Number of Employees</h5>
                        <input type='text' placeholder='' onChange={(e) => setNumOfEmployee(e.target.value)} style={{ marginBottom: "10px" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }} >
                        <h5>Experience </h5><p>(use 0 for freshers.)</p>
                        <input type='number' placeholder='' onChange={(e) => setExp(e.target.value)} style={{ marginBottom: "10px" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }} >
                        <h5>Experience above sector</h5>
                        <input type='text' placeholder='' onChange={(e) => setExpAboveSector(e.target.value)} style={{ marginBottom: "10px" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }} >
                        <h5>Refrence company name</h5>
                        <input type='text' placeholder='Refrence company name' onChange={(e) => setRefCompany(e.target.value)} style={{ marginBottom: "10px" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }} >
                        <div style={{ display: "flex", flexDirection: "column" }} >
                            <h5>Country</h5>
                            <input type='text' placeholder='Country' onChange={(e) => setCountry(e.target.value)} style={{ marginBottom: "10px" }} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }} >
                            <h5>State</h5>
                            <input type='text' placeholder='State' onChange={(e) => setState(e.target.value)} style={{ marginBottom: "10px" }} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }} >
                            <h5>City</h5>
                            <input type='text' placeholder='City' onChange={(e) => setCity(e.target.value)} style={{ marginBottom: "10px" }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='actionSectionBatch'  >
                <button onClick={(e)=>uploadJob(e)} >Upload</button>
            </div>
        </main>
    )
}

export default HRCreate