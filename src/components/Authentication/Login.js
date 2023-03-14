import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../Redux/apiCall';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Auth.css";
const Login = () => {
  const dispatch = useDispatch();
  const notify = () => toast("Login Successfully!");
  const {isFetching , error} = useSelector((state)=>state.user);
  const [user, setUser] = useState({
    password:'',email:''
  })
  let name,value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
}

// login action
const handleLogin = (e)=>{
  e.preventDefault();
  login(dispatch, {email:user.email, password:user.password});
}
  return (
    <div className='mainContainerForsignup'>
      <ToastContainer />
      <div className='submainContainer'>
        <div className='mobileScreen' style={{flex:1}}>
          <p className='logoText'>Freed<span className='part'>Link</span></p>
          <p className='introtext'>Find the perfect <span className='part'>job & people</span>.</p>
        </div>
        <div className='mobileScreen2' style={{flex:3}}>
          <p className='createaccountTxt'>Login To Your Account</p>
          <input type="email" id="#email" placeholder='email' name='email' onChange={handleInputs} value={user.email.toLowerCase()} className='inputText'/>
          <input type="password" placeholder='Password' name='password' onChange={handleInputs} value={user.password} id='#password' className='inputText'/>
          <button className='btnforsignup' onClick={handleLogin} >Signin</button>  
          <p className='signinportalbtn'>New Here? <span><Link to='/signup'>Create Account.</Link></span></p>
          <p className='signinportalbtn'><span><Link to='/forgotpassword'>forgot password?</Link></span></p>
        </div>
      </div>
    </div>
  )
}

export default Login