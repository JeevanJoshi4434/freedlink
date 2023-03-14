import { CChart } from '@coreui/react-chartjs';
import React, { useEffect, useState } from 'react'
import { getStorage, ref, getMetadata, listAll } from "firebase/storage";
import app from '../../firebase';
import mongoSVG from './assets/mongodb-ar21.svg';
import firebaseSVG from './assets/firebase-ar21.svg';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const userDetails = useSelector((state) => state.user);
    let user = userDetails?.user;
    let accessToken = user?.accessToken;
    let navigate = useNavigate();
    if(user?.other?.role !== "Admin"){
        // console.log("not a admin")
        navigate("/");
    }
    const [currentMessage, setCurrentMessage] = useState('');
    const [usersTraffic, setUsersTraffic] = useState();
    const [time, setTime] = useState('');
    
    let January=0,February=0,March=0,April=0,May=0,June=0,July=0,August=0,September=0,October=0,November=0,December=0,Year;
    var today = new Date();
    let day = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    const storage = getStorage(app);
    const forestRef = ref(storage, '1675441554141 DSCF_6026.jpg');
    getMetadata(forestRef)
        .then((metadata) => {
            // // console.log(metadata.size)
        })
        .catch((error) => {
            // // console.log(error)
        });
    // var interval = setInterval(() => {
    //     var curHour = today.getHours();
    //     var curMin = today.getMinutes();
    //     var curSec = today.getSeconds();
    //     setTime(`${curHour} : ${curMin} : ${curSec}`);

    // }, 1000);
    // location of people & report location & numbers
    useEffect(()=>{
        const users = async()=>{
            const res = await axios.get(`/api/users/all`,{headers:{accessToken:accessToken}})
            setUsersTraffic(res.data);
        }
        users();
    },[]);
    usersTraffic?.map((i)=>{
        if(i?.createdYear === "2023" && i?.createdMonth === "1"){
            January = January+1;
        }
        if(i?.createdYear === "2023" && i?.createdMonth === "2"){
            February = February+1;
        }
        if(i?.createdYear === "2023" && i?.createdMonth === "3"){
            March = March+1;
        }
        if(i?.createdYear === "2023" && i?.createdMonth === "4"){
            April = April+1;
        }
        if(i?.createdYear === "2023" && i?.createdMonth === "5"){
            May = May+1;
        }
        if(i?.createdYear === "2023" && i?.createdMonth === "6"){
            June = June+1;
        }
        if(i?.createdYear === "2023" && i?.createdMonth === "7"){
            July = July+1;
        }
        if(i?.createdYear === "2023" && i?.createdMonth === "8"){
            August = August+1;
        }
        if(i?.createdYear === "2023" && i?.createdMonth === "9"){
            September = September+1;
        }
        if(i?.createdYear === "2023" && i?.createdMonth === "10"){
            October = October+1;
        }
        if(i?.createdYear === "2023" && i?.createdMonth === "11"){
            November = November+1;
        }
        if(i?.createdYear === "2023" && i?.createdMonth === "12"){
            December = December+1;
        }
    })
    // console.log(January)
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
    name = user?.other?.name;
    let firstname = [];
    for (let i = 0; i < 40; i++) {
        if(name.charAt(i) === " "){
            break;
        }else{
            firstname[i] = name.charAt(i);
        }
    }
    return (
        <div style={{ backgroundColor: "#0101c4", height: "100%", color: "white", padding: "40px 40px" }}>
            <main>
                <div>
                    <h4 style={{ fontSize: "30px", fontWeight: "500" }} >{currentMessage}{firstname}!</h4>
                    <p>Have a nice day! {time}</p>
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
                        <h6>User Traffic</h6>
                        <div style={{
                            width: "100%",
                            height: "100%",
                        }}>
                            <CChart style={{ width: "100%", height: "100%" }}
                                type="line"
                                data={{
                                    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                                    datasets: [
                                        // {
                                        //     label: "2022",
                                        //     backgroundColor: "rgba(220, 220, 220, 0.2)",
                                        //     borderColor: "rgba(220, 220, 220, 1)",
                                        //     pointBackgroundColor: "rgba(220, 220, 220, 1)",
                                        //     pointBorderColor: "#fff",
                                        //     data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 150, 300]
                                        // },
                                        {
                                            label: "2023",
                                            backgroundColor: "rgba(151, 187, 205, 0.2)",
                                            borderColor: "rgba(151, 187, 205, 1)",
                                            pointBackgroundColor: "rgba(151, 187, 205, 1)",
                                            pointBorderColor: "#fff",
                                            data: [January, February, March, April, May, June, July, August, September, October, November, December]
                                        },
                                    ],
                                }}
                            />
                        </div>
                    </div>
                    <div style={{
                    backgroundColor: "#fff",
                    color: "black",
                    height: "300px",
                    width: "350px",
                    borderRadius: "12px",
                    padding: "10px 10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginLeft:"10px",
                    marginTop:"10px"
                }}>
                    <h6>Databases</h6>
                    <div style={{
                        width: "100%",
                        height: "100%",
                        display:"flex"
                    }}>
                        <div >
                        <img src={mongoSVG} />
                        <h4>JSON Database</h4>
                        <h6>512MB Storage</h6>
                        <p>No subscription</p>
                        </div>
                        <div>
                        <img src={firebaseSVG} />
                        <h4>Image & Video Database</h4>
                        <h6>5GB Storage</h6>
                        <p>No subscription</p>
                        </div>

                        {/* <CChart style={{ width: "100%", height: "100%" }}
                            type="line"
                            data={{
                                labels: day,
                                datasets: [
                                    {
                                        label: "2022",
                                        backgroundColor: "rgba(220, 220, 220, 0.2)",
                                        borderColor: "rgba(220, 220, 220, 1)",
                                        pointBackgroundColor: "rgba(220, 220, 220, 1)",
                                        pointBorderColor: "#fff",
                                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 150, 300]
                                    },
                                    {
                                        label: "2023",
                                        backgroundColor: "rgba(151, 187, 205, 0.2)",
                                        borderColor: "rgba(151, 187, 205, 1)",
                                        pointBackgroundColor: "rgba(151, 187, 205, 1)",
                                        pointBorderColor: "#fff",
                                        data: [50, 12, 28, 29, 7, 25, 12, 70, 100, 450, 350, 100]
                                    },
                                ],
                            }}
                        /> */}
                    </div>
                </div>
                </div>
            </main>
        </div>
    )
}

export default Admin