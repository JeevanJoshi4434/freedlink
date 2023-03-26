import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const HRForm = () => {
    let navigate = useNavigate();
    const usersDetails = useSelector((state) => state.user);
    let userC = usersDetails?.user;
    let accessToken = userC?.accessToken;
    const [submitButton, setSubmitButton] = useState(false);
    const [GSTNum, setGSTNum] = useState('');
    const [CompanyName, setCompanyName] = useState('');
    const [Address, setAddress] = useState('');
    const [PhoneNO, setPhoneNo] = useState('');
    const [SEmail, setSEmail] = useState('');
    const [Sector, setSector] = useState('');
    const submit = async () => {
        const notify = () => toast("Already a customer!");
        const data = await fetch(`/api/user/upgrade/professional/${userC?.other?._id}`, {
            method: "POST", headers: { "Content-Type": "application/Json", accessToken: accessToken }, body: JSON.stringify({
                CNo: PhoneNO, SEmail: SEmail, Address: Address, CName: CompanyName, GSTNum: GSTNum, Sector: Sector
            })
        }).then((res) => {
            if (res?.status === 200) {
                toast.success('Information Updated Successfully! go to profile>3dot>dashboard', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
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
            } else if (res.status === 403) {
                // // console.log(res.status)
                toast.warn('You are already a HR Holder', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else if (res.status === 401) {
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
            }
            if (res.status !== 200 && res.status !== 401 && res.status !== 500 && res.status !== 403) {
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
        });
    }
    const warningg = ()=>{
        toast.error('all fields are required!', {
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
    if(GSTNum.length>0&&CompanyName.length>0&&Address.length>0&& PhoneNO.length>0 && SEmail.length>0&&Sector.length>0){
        if(submitButton === false){
            setSubmitButton(true);
        }
    }
    return (
        <div style={{ height: "100%", backgroundColor: "#f8f8fb", display: "flex", justifyContent: "center", alignItems: "center" }}>
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
            <div className='mt-4 mb-4' style={{
                backgroundColor: "white",
                width: "450px",
                height: "100%",
                borderRadius: "12px",
                padding: "30px 30px"
            }} >
                <div className="my-2" >
                    <h4>HR Registration</h4>
                    <p style={{ fontSize: "14px", color: "#8d8d8d" }} >All fields are required to be filled.</p>
                </div>
                <div style={{ marginTop: "40px", display: "flex", flexDirection: "column" }} >
                <label className='py-2'>GST number*</label>
                    <input onChange={(e) => setGSTNum(e.target.value)} type="text" placeholder='GST Number' required className='hrFrominput' />
                    <label className='py-2'>Company Name*</label>
                    <input onChange={(e) => setCompanyName(e.target.value)} required type="text" placeholder='Your Company Name' className='hrFrominput' />
                    <label className='py-2'>Office Address*</label>
                    <input onChange={(e) => setAddress(e.target.value)} required type="text" placeholder='Office Address' className='hrFrominput' />
                    <label className='py-2'>Phone No.*</label>
                    <input onChange={(e) => setPhoneNo(e.target.value)} required type="text" placeholder='Phone No.' className='hrFrominput' />
                    <label className='py-2'>Secondory Email*</label>
                    <input onChange={(e) => setSEmail(e.target.value)} required type="email" placeholder='Secondory Email' className='hrFrominput' />
                    <label className='py-2'>Sector/Category*</label>
                    <input onChange={(e) => setSector(e.target.value)} required type="text" placeholder='IT etc...' className='hrFrominput' />
                    <p style={{ fontSize: "14px", color: "#8d8d8d",marginTop:'8px'}}>* required fields</p>
                    <p style={{ fontSize: "14px", color: "#8d8d8d" }}>Your senstive informations are safe with Us.</p>
                    {submitButton && <button onClick={()=>submit()} style={{ marginTop: "10px", backgroundColor: "#6e00ff", border: "none", width: "100px", color: "white", height: "40px", borderRadius: "50px", display: "flex", justifyContent: "center", alignItems: "center",marginBottom:'50px'  }} >Submit</button>}
                    {!submitButton && <button onClick={()=>warningg()} style={{ marginTop: "10px", backgroundColor: "#6e00ff", border: "none", width: "100px", color: "white", height: "40px", borderRadius: "50px", display: "flex", justifyContent: "center", alignItems: "center",marginBottom:'50px' }} >Submit</button>}
                </div>
            </div>
        </div>
    )
}

export default HRForm