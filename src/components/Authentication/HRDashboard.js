import React, { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
import stylesheet from './HRCSS.module.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CChart } from '@coreui/react-chartjs';
const HRDashboard = () => {
  const userDetails = useSelector((state) => state.user);
  let Cuser = userDetails?.user;
  let accessToken = Cuser?.accessToken;
    const [uploadBatchModal, setUploadBatchModal] = useState(false);
    const [batchScreen, setBatchScreen] = useState(false);
    const [currentMessage, setCurrentMessage] = useState('');
    const uploadBatch = () => {
        uploadBatchModal === false ? setUploadBatchModal(true) : setUploadBatchModal(true);
        if (batchScreen) {
            setBatchScreen(false);
        }
    }
    const closeBatchScreen = () => {
        batchScreen === true ? setBatchScreen(false) : setBatchScreen(false)
    }
    const openBatchScreen = () => {
        if (!batchScreen) {
            setBatchScreen(true);
        }
        if (uploadBatchModal) {
            setUploadBatchModal(false);
        }
    }

    let number = 1;
    const closeBatch = () => {
        if (uploadBatchModal) {
            setUploadBatchModal(false);
        }
    }
    var today = new Date();
    var curHr = today.getHours();
    useEffect(() => {
        if (curHr > 3 && curHr < 12) {
            setCurrentMessage('Good Morning, ');
        } else if (curHr > 11 && curHr < 18) {
            setCurrentMessage('Good Afternoon, ');
        } else {
            setCurrentMessage('Good Evening, ');
        }
    }, [curHr])
    // // console.log({hour:curHr,day:today})
    let name = '';
    name = Cuser?.other?.name;
    let firstname = [];
    for (let i = 0; i < 40; i++) {
        if(name.charAt(i) === " "){
            break;
        }else{
            firstname[i] = name.charAt(i);
        }
    }

    if (Cuser?.other?.role === 'HR') {
        return (
          <div style={{ backgroundColor: "#6e00ff", height: "100%", color: "white", padding: "40px 40px" }}>
          <main>
              <div>
                  <h4 style={{ fontSize: "30px", fontWeight: "500" }} >{currentMessage}{firstname}!</h4>
                  <p>Have a nice day!</p>
              </div>
              <div style={{display:"flex"}}>

                  <div style={{

                      marginTop: "10px",
                      backgroundColor: "#fff",
                      color: "black",
                      height: "600px",
                      width: "1000px",
                      borderRadius: "12px",
                      padding: "10px 10px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                  }}>
                      <h6>Recent Uploaded Jobs</h6>
                      <div style={{
                          width: "100%",
                          height: "100%",
                      }}>
                      </div>
                  </div>
                  
              </div>
          </main>
      </div>
        )
    } else {
        return (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
                <h1 style={{ color: "red" }} >Only HR Can Access this resource !!</h1>
                <p>return to <Link style={{ color: "red" }} to="/">home</Link> page</p>
            </div>
        )
    }
}
export default HRDashboard
