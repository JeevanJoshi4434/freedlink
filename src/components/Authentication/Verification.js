import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { VerifyEmail } from '../Redux/apiCall';

const Verification = () => {
  let navigate = useNavigate();
    let dispatch = useDispatch();
    const [User, setUser] = useState({
        OTP:''
    });
    const {user} = useSelector((state)=>state.user);
    const userDetail = user.user;
  let name,value;
  const handleInputs = (e) => {
    // // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...User, [name]: value });
}

const handleVerify = (e)=>{
    VerifyEmail(dispatch, {user:userDetail,OTP:User.OTP},navigate);
       
}
    return (
    <div>
      <div className='mainContainerForsignup'>
      <div className='submainContainer'>
        <div className='mobileScreen' style={{flex:1}}>
          <p className='logoText'>Freed<span className='part'style={{color:"#0000a7"}}>Links</span></p>
          <p className='introtext'>Email <span className='part'>Verification.</span></p>
        </div>
        <div className='mobileScreen2' style={{flex:3}}>
          <p className='createaccountTxt'>Enter OTP</p>
          <input type="text" maxLength={4} id="#OTP" placeholder='4 Digit OTP' name='OTP' onChange={handleInputs} value={User.OTP} className='inputText'/>
          { User.OTP.length <4 && <button className='btnforsignup' disabled={true} >Complete Signup</button>} 
          {User.OTP.length === 4 && <button className='btnforsignup' onClick={handleVerify} >Complete Signup</button>} 
        </div>
      </div>
    </div>
    </div>
  )
}

export default Verification
