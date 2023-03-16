import React from 'react'
import { useState } from 'react'

const ChangePass = () => {

    const [user, setUser] = useState({
        password: '', cpassword: '',oPass:''
    })
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let name, value;
    const handleInputs = (e) => {
        // console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }
    let visible = true;
    let specialChar = "hidden";
    let borderColor = "black";
    if (user.cpassword === user.password && user.password.length > 6 && user.cpassword.length > 6 && user.password.match(format) && user.cpassword.match(format) && user.name.length > 0 && user.email.length > 0) {
        visible = false;
    }
    if ((user.cpassword === user.password) && (user.password.length > 6 && user.cpassword.length > 6) && (!user.password.match(format) || !user.cpassword.match(format))) {
        specialChar = "visible";
    }
    if (user.cpassword !== user.password && user.password.length > 6 && user.cpassword.length > 6) {
        borderColor = "#DC4C64";
    }
    return (
        <div>
            <div className='mainContainerForsignup'>
                <div className='submainContainer'>
                    <div className='mobileScreen' style={{ flex: 1 }}>
                        <p className='logoText'>Freed<span className='part'style={{color:"#0000a7"}}>Links</span></p>
                        <p className='introtext'>Change Password <span className='part'> Privacy & Protection.</span></p>
                    </div>
                    <div className='mobileScreen2' style={{ flex: 3 }}>
                        <p className='createaccountTxt'>Enter old password</p>
                        <input type="password" style={{ outlineWidth: 0 }} placeholder='Old Password' name='oPass' onChange={handleInputs} value={user.oPass} id='' className='inputText' />
                        <p className='createaccountTxt'>Enter a new password</p>
                        <input type="password" style={{ outlineWidth: 0 }} placeholder='New Password' name='password' onChange={handleInputs} value={user.password} id='' className='inputText' />
                        <input type="password" style={{ outlineWidth: 0 }} placeholder='Confirm New Password' name='cpassword' onChange={handleInputs} value={user.cpassword} id='' className='inputText' />
                        {user.cpassword !== user.password && user.password.length > 6 && user.cpassword.length > 6 &&
                            <span className='notMatch'></span>
                        }
                        {user.cpassword !== user.password && user.password.length > 6 && user.cpassword.length > 6 &&
                            // <span className='notMatch'></span>
                            <span className='notMatchTxt'>Password Doesn't Match!</span>
                        }
                        <button className='btnforsignup' disabled={visible}>Finish</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePass
