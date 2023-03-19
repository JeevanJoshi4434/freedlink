import React from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ResetPass = () => {
  const location = useLocation();
  const code = location.search.split("?")[1];
  // // console.log(code);
     const [user, setUser] = useState({
    password:'',cpassword:''
  })
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  let name,value;
  const handleInputs = (e) => {
    // // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
}
     let visible = true;
  let specialChar = "hidden";
  let borderColor = "black";
  if(user.cpassword === user.password && user.password.length>6 && user.cpassword.length>6 && user.password.match(format) && user.cpassword.match(format)){
    visible = false;
  }
  if((user.cpassword === user.password) && (user.password.length>6 && user.cpassword.length>6) && (!user.password.match(format) || !user.cpassword.match(format))){
    specialChar = "visible";
  }
  if(user.cpassword !== user.password && user.password.length>6 && user.cpassword.length>6){
    borderColor = "#DC4C64";
  }

  const handleReset = async(e)=>{
    e.preventDefault();
    await fetch(`/api/reset/password?${code}`, {method:'PUT',headers:{"Content-Type":"application/JSON"}, body:JSON.stringify({password:user.cpassword})});
  }
  return (
    <div>
      <div className='mainContainerForsignup'>
      <div className='submainContainer'>
        <div className='mobileScreen' style={{flex:1}}>
          <p className='logoText'>Freed<span className='part'style={{color:"#0000a7"}}>Links</span></p>
          <p className='introtext'>Password Recovery <span className='part'> & Protection.</span></p>
        </div>
        <div className='mobileScreen2' style={{flex:3}}>
          <p className='createaccountTxt'>Enter a new password</p>
          <input type="password" style={{outlineWidth:0}} placeholder='New Password' name='password' onChange={handleInputs} value={user.password} id='' className='inputText'/>
          <input type="password" style={{outlineWidth:0}} placeholder='Confirm New Password' name='cpassword' onChange={handleInputs} value={user.cpassword} id='' className='inputText'/>
          {user.cpassword !== user.password && user.password.length>6 && user.cpassword.length>6 &&
          <span className='notMatch'></span>
          }
          {user.cpassword !== user.password && user.password.length>6 && user.cpassword.length>6 &&
          // <span className='notMatch'></span>
          <span className='notMatchTxt'>Password Doesn't Match!</span>
          }
          <button onClick={handleReset} className='btnforsignup' disabled={visible}>Update Password</button>  
        </div>
      </div>
    </div>
    </div>
  )
}

export default ResetPass
