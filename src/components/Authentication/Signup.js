import "./Auth.css";
import React from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import countryList from 'react-select-country-list';
import Select from 'react-select';
import app from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector,useDispatch } from "react-redux";
import {signup } from '../Redux/apiCall';
const Signup = () => {
  const navigator = useNavigate();
  const {isFetching , error} = useSelector((state)=>state.user);
  const {user} = useSelector((state)=>state.user);
  const [checked, setChecked] = useState(false);
  const [preImage, setPreImage] = useState(null);
  const [file, setFile] = useState('');
  const [country, setCountry] = useState([]);
  const options = useMemo(() => countryList().getData(), [])
  let dispatch = useDispatch();
  const userDetail = user?.user;
  const handleCheckedChange = e =>{
    setChecked(checked ? false : true);
  }
  const [User, setUser] = useState({
    password:'',cpassword:'',name:'',email:''
  })
  const changeHandler = country => {
    setCountry(country)
  }
  let name,value;
  const handleInputs = (e) => {
    // // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...User, [name]: value });
}
var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  let visible = true;
  let specialChar = "hidden";
  let borderColor = "black";
  if(User.cpassword === User.password && checked &&User.password.length>6 && User.cpassword.length>6 && User.password.match(format) && User.cpassword.match(format) && User.name.length>0 && User.email.length>0 && country?.label !=='' && file!== ''){
    visible = false;
  }
  if((User.cpassword === User.password) && (User.password.length>6 && User.cpassword.length>6) && (!User.password.match(format) || !User.cpassword.match(format))){
    specialChar = "visible";
  }
  if(User.cpassword !== User.password && User.password.length>6 && User.cpassword.length>6){
    borderColor = "#DC4C64";
  }
  // signup handling
  const handleSignup = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + " " + file?.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // // console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            // // console.log('Upload is paused');
            break;
          case 'running':
            // // console.log('Upload is running');
            break;
          }
        },
        (error) => {
          // // console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            signup(dispatch, {name: User.name, img: downloadURL, email:User.email,password:User.password,country:country?.label},navigator);
        });
      }
    );
  }
// console.log(country)
  if(userDetail?.Status ==='pending'){
    navigator("/signup/email/verify");
  }
  return (
    <div className='mainContainerForsignup'>
      <div className='submainContainer'>
        <div className='mobileScreen' style={{flex:1}}>
          <p className='logoText'>Freed<span className='part'style={{color:"#0000a7"}}>Links</span></p>
          <p className='introtext'>Find the perfect <span className='part'>job & people</span>.</p>
        </div>
        <div className='mobileScreen2' style={{flex:3}}>
          <p className='createaccountTxt'>Create New Account</p>
          <label className="messageSender__option inputText" htmlFor='file' >
                  <h3>Profile Image</h3>
                  <input type="file" style={{display:"none"}} accept="image/*" name="file" id="file" onChange={(e) => { setFile(e.target.files[0]); setPreImage(window.URL.createObjectURL(e.target.files[0])) }} />
                  {/* <input type="file" accept="image/*" name="file" id="file" onChange={(e) => { setFile(e.target.files[0]); setPreImage(window.URL.createObjectURL(e.target.files[0])) }} /> */}
                 {preImage === null && <span style={{width:"70px",height:"70px",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",marginLeft: "15px",backgroundColor: "#fff",fontSize: "10px",}} ><p style={{marginLeft:"10px"}}>Choose an image</p></span>      }
                 {preImage !== null && <img src={preImage} style={{width:"70px",height:"70px",borderRadius:"50%",marginLeft: "15px"}} />      }
          </label>
          <input type="text" placeholder='Username' name='name' onChange={handleInputs} value={User.name} className='inputText'/>
          <input type="email" id="" placeholder='email' name='email' onChange={handleInputs} value={User.email} className='inputText'/>
          <input type="password" style={{outlineWidth:0}} placeholder='Password' name='password' onChange={handleInputs} value={User.password} id='' className='inputText'/>
          <input type="password" style={{outlineWidth:0}} placeholder='Confirm Password' name='cpassword' onChange={handleInputs} value={User.cpassword} id='' className='inputText'/>
          <p className='signinportalbtn'>Password must contain Symbols & Numbers. </p>
          {User.cpassword !== User.password && User.password.length>6 && User.cpassword.length>6 &&
          <span className='notMatch'></span>
          }
          {User.cpassword !== User.password && User.password.length>6 && User.cpassword.length>6 &&
          // <span className='notMatch'></span>
          <span className='notMatchTxt'>Password Doesn't Match!</span>
          }
          <div>
            <p className='inputText'>Select Country</p>
          <Select options={options} value={country} onChange={changeHandler} />
          </div>
          <div className="inputText">
          <input type="checkbox" checked={checked} onChange={handleCheckedChange} id="agreement-checkbox" />
          <label htmlFor="agreement-checkbox">I agree to the terms & conditions.</label>
          </div>
          <button onClick={handleSignup} className='btnforsignup' disabled={visible}>Signup</button>  
          <p className='signinportalbtn'>All section are required. </p>
          <p className='signinportalbtn'>Already have an account? <span><Link to='/login'>Login.</Link></span></p>
        </div>
      </div>
    </div>
  )
}

export default Signup
