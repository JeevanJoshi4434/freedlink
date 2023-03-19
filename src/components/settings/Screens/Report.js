import React from 'react';
import { useState } from 'react';
import settingStyle from '../setting.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ReportScreen = () => {

    let navigate = useNavigate();
    const userDetails = useSelector((state) => state.user);
    let user = userDetails?.user;
    let accessToken = user?.accessToken;
    // console.log(accessToken)
    const [currentOption, setCurrentOption] = useState('');
    const [reportTitle, setReportTitle] = useState('');
    const [reportDesc, setReportDesc] = useState('');
    const [Data, setData] = useState('');
    const Report = async (e) => {
        e.preventDefault();
        // // console.log("Reported");  
        let res = await fetch(`/api/report`, {
            method: "POST", headers: { "Content-Type": "application/Json", accessToken: accessToken }, body: JSON.stringify({
                type: "SYSTEM",
                desc: reportDesc,
            })
        })
        setData(res.json());
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <div>
                <span className='material-icons' onClick={() => navigate(-1)} style={{ cursor: "pointer" }} >arrow_back</span>
            </div>
            <div className={settingStyle.reportPanel} >
                <h4>Something error happened ? tell us.</h4>
                <p>Type what happen.</p>
                <textarea onChange={(e) => setReportDesc(e.target.value)} placeholder="type what's the problem"></textarea>
                <p>Attach screenshot</p>
                <input type="file" accept='image/*' />
                <button onClick={(e) => Report(e)}>Submit</button>
            </div>
        </div>
    )
}

export default ReportScreen