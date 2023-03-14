import axios from "axios";

export const getuserimg = async(id,accessToken)=>{
    const res = await axios.get(`/api/notification/user/${id}`, {headers:{accessToken:accessToken
    }}); 
    return res.data.img;

}