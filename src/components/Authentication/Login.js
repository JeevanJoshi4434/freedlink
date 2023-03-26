import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../Redux/apiCall';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Auth.css";
const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
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
  login(dispatch, {email:user.email.toLowerCase(), password:user.password},navigate);
}
  return (
    <div className='mainContainerForsignup container'>
      <ToastContainer />
      <div className='row'>
        <div className='col-sm-12 col-md-5'>
          <p className='logoText'>Freed<span  className='colorBlue'>Links</span></p>
          <p className='introtext'>Connect with the <span className='colorBlue'>right people</span>.</p>
        </div>
        <form className='col-sm-12 col-md-7 c-gray rounded'>
          <p className='createaccountTxt'>Login To Your Account...</p>
          <input type="email" id="#email" placeholder='email' name='email' onChange={handleInputs} value={user.email.toLowerCase()} className='inputText'/>
          <input type="password" placeholder='Password' name='password' onChange={handleInputs} value={user.password} id='#password' className='inputText'/>
          <button type='submit' className='btnforsignup' onClick={handleLogin} >Signin</button>  
          <div >
          <p className='signinportalbtn text-center'>New Here?<br/><span><Link to='/signup'>Create Account.</Link></span></p>
          <p className='signinportalbtn text-center'><span><Link to='/forgotpassword'>forgot password?</Link></span></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
