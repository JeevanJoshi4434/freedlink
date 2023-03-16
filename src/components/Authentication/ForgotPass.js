import React from 'react'
import { useState } from 'react';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const handleForgotPass = async(e)=>{
    e.preventDefault();
    await fetch(`/api/forgot/password`,{method:'POST',headers:{"Content-Type":"application/JSON"},body:JSON.stringify({email:email})}).then({
    })
  }
  return (
    <div>
      <div className='mainContainerForsignup'>
        <div className='submainContainer'>
          <div className='mobileScreen' style={{ flex: 1 }}>
            <p className='logoText'>Freed<span className='part'style={{color:"#0000a7"}}>Links</span></p>
            <p className='introtext'>Password Recovery <span className='part'> & Protection.</span></p>
          </div>
          <div className='mobileScreen2' style={{ flex: 3 }}>
            <p className='createaccountTxt'>Enter your email & find your account</p>
            <input type="email" id="#email" placeholder='email' name='email'onChange={(e)=>{setEmail(e.target.value)}} className='inputText' />
            <button className='btnforsignup'  onClick={handleForgotPass}  >Find & Send email.</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPass
