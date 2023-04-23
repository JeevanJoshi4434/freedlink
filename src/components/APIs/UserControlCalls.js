const { default: axios } = require("axios");
const { useEffect } = require("react");
const { useState } = require("react");
const { useSelector } = require("react-redux");

export const Me = () => {
    const [userDetail, setUserDetail] = useState([]);
    const userDetails = useSelector((state) => state.user);
    const user = userDetails.user;
    let accessToken = user?.accessToken;
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`/api/me`, {
                    headers: {
                        accessToken: accessToken
                    }
                })
                setUserDetail(res.data);
            } catch (error) {

            }
        }
        getUser()
    });
    return userDetail;
}

export const Report = async(type, title, to, desc,img) => {
    const userDetails = useSelector((state) => state.user);
    const user = userDetails?.user;
    let accessToken = user?.accessToken;
    // // console.log(accessToken);
    const [Data, setData] = useState();
    let res = await fetch(`/api/report`, { method: "POST", headers: { "Content-Type": "application/Json",accessToken:accessToken }, body: JSON.stringify({ type:type,
    desc:desc,
    title:title,
    to:to,
    img:img
 }) })
    setData(res);
    // // console.log(Data);
} 

export const SavePost =  async(user,post)=>{
    const userDetails = useSelector((state) => state.user);
    let Cuser = userDetails?.user;
      let CuserID = userDetails?.user?.other
      let accessToken = Cuser?.accessToken;
      let user_Id = CuserID?._id;
        await fetch(`api/post/save/${user}/${post}`,{method:"PUT",headers:{accessToken:accessToken,"Content-Type":"application/json"}}).then((res)=>{
            if(res?.status === 200){
                return true;
            }else{
                return false;
            }
        })
        
    }

export const grabStatus =  async()=>{
        await fetch(`/api/approvalstatus`,{method:"GET",headers:{"Content-Type":"application/json"}}).then((res)=>{
            return res.status;
        });
        
    }