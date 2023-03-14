import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import settingStyle from '../setting.module.css';
const Help = () => {
    let navigate = useNavigate();
  return (
    <div>
        <div>
                  <span className='material-icons' onClick={() => navigate(-1)} style={{ cursor: "pointer" }} >arrow_back</span>
                </div>
        Help</div>
  )
}

export default Help