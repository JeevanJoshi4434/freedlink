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
                // console.log(res.status)
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
        <div style={{ height: "100vh", backgroundColor: "#f8f8fb", display: "flex", justifyContent: "center", alignItems: "center" }}>
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
            <div style={{
                backgroundColor: "white",
                width: "450px",
                height: "600px",
                borderRadius: "12px",
                padding: "30px 30px"
            }} >
                <div style={{ margin: "20px 0px" }} >
                    <h4 style={{ fontSize: "22px", fontWeight: "400" }}  >HR Registration</h4>
                    <p style={{ fontSize: "14px", color: "#8d8d8d" }} >All fields are required to be filled.</p>
                </div>
                <div style={{ marginTop: "40px", display: "flex", flexDirection: "column" }} >
                    <h4 style={{ fontSize: "12px", fontWeight: "500" }} >GST number*</h4>
                    <input onChange={(e) => setGSTNum(e.target.value)} type="text" placeholder='GST Number' required style={{ border: "1px solid #8d8d8d", borderRadius: "8px", outlineWidth: "0", backgroundColor: "rgba(123,123,123,0)", height: "40px" }} />
                    <h4 style={{ fontSize: "12px", fontWeight: "500" }} >Company Name*</h4>
                    <input onChange={(e) => setCompanyName(e.target.value)} required type="text" placeholder='Your Company Name' style={{ border: "1px solid #8d8d8d", borderRadius: "8px", outlineWidth: "0", backgroundColor: "rgba(123,123,123,0)", height: "40px" }} />
                    <h4 style={{ fontSize: "12px", fontWeight: "500" }} >Office Address*</h4>
                    <input onChange={(e) => setAddress(e.target.value)} required type="text" placeholder='Office Address' style={{ border: "1px solid #8d8d8d", borderRadius: "8px", outlineWidth: "0", backgroundColor: "rgba(123,123,123,0)", height: "40px" }} />
                    <h4 style={{ fontSize: "12px", fontWeight: "500" }} >Phone No.*</h4>
                    <input onChange={(e) => setPhoneNo(e.target.value)} required type="text" placeholder='Phone No.' style={{ border: "1px solid #8d8d8d", borderRadius: "8px", outlineWidth: "0", backgroundColor: "rgba(123,123,123,0)", height: "40px" }} />
                    <h4 style={{ fontSize: "12px", fontWeight: "500" }} >Secondory Email*</h4>
                    <input onChange={(e) => setSEmail(e.target.value)} required type="email" placeholder='Secondory Email' style={{ border: "1px solid #8d8d8d", borderRadius: "8px", outlineWidth: "0", backgroundColor: "rgba(123,123,123,0)", height: "40px" }} />
                    <h4 style={{ fontSize: "12px", fontWeight: "500" }} >Sector/Category*</h4>
                    <input onChange={(e) => setSector(e.target.value)} required type="text" placeholder='IT etc...' style={{ border: "1px solid #8d8d8d", borderRadius: "8px", outlineWidth: "0", backgroundColor: "rgba(123,123,123,0)", height: "40px" }} />
                    <p style={{ fontSize: "14px", color: "#8d8d8d" }}>* required fields</p>
                    <p style={{ fontSize: "14px", color: "#8d8d8d" }}>Your senstive informations are safe with Us.</p>
                    {submitButton && <button onClick={()=>submit()} style={{ marginTop: "10px", backgroundColor: "#6e00ff", border: "none", width: "100px", color: "white", height: "40px", borderRadius: "50px", display: "flex", justifyContent: "center", alignItems: "center" }} >Submit</button>}
                    {!submitButton && <button onClick={()=>warningg()} style={{ marginTop: "10px", backgroundColor: "#6e00ff", border: "none", width: "100px", color: "white", height: "40px", borderRadius: "50px", display: "flex", justifyContent: "center", alignItems: "center" }} >Submit</button>}
                </div>
            </div>
        </div>
    )
}

export default HRForm