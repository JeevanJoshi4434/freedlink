import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

export const UpdateBio =  async(bio, accessToken)=>{
// const userDetails = useSelector((state) => state.user);
// let Cuser = userDetails?.user;
//   let CuserID = userDetails?.user?.other
//   let accessToken = Cuser?.accessToken;
//   let user_Id = CuserID?._id;
    await fetch(`/api/me/update/bio`,{method:"PUT",headers:{accessToken:accessToken,"Content-Type":"application/json"}, body:JSON.stringify({
        Bio:bio
    })}).then((res)=>{
        if(res?.status === 200){
            return true;
        }else{
            return false;
        }
    })
    
}
export const AddSkill =  async(skill, accessToken)=>{
    const res =   await fetch(`/api/me/update/skill`,{method:"PUT",headers:{accessToken:accessToken,"Content-Type":"application/json"}, body:JSON.stringify({
        skill:skill
    })});
    return res.status;
    
}
export const DeleteSkill =  async(skill,accessToken)=>{
    const res = await fetch(`/api/me/update/skill/delete`,{method:"PUT",headers:{accessToken:accessToken,"Content-Type":"application/json"}, body:JSON.stringify({
        skill:skill
    })})
    return res.status;
    
}
export const AddEdu =  async(university,degree,From,To,accessToken)=>{

    const res = await fetch(`/api/me/update/education`,{method:"PUT",headers:{accessToken:accessToken,"Content-Type":"application/json"}, body:JSON.stringify({
        universityName:university,
        degree:degree,
        From:From,
        To:To
    })});

    return res.status;
    
}
export const RemoveEdu =  async(id,accessToken)=>{
    const res = await fetch(`/api/me/update/education/delete`,{method:"PUT",headers:{accessToken:accessToken,"Content-Type":"application/json"}, body:JSON.stringify({
        id:id
    })});
    return res.status;
}
export const RemoveWork =  async(Position, CName, from,accessToken)=>{
    const res = await fetch(`/api/me/update/currentwork/delete`,{method:"PUT",headers:{accessToken:accessToken,"Content-Type":"application/json"}, body:JSON.stringify({
        Position:Position, Name:CName,from:from,
    })})
    return res.status;
}
export const AddWork =  async(Position, CName, to, from,current,accessToken)=>{
    const res = await fetch(`/api/me/update/currentwork`,{method:"PUT",headers:{accessToken:accessToken,"Content-Type":"application/json"}, body:JSON.stringify({
        Position:Position, Name:CName, to:to, from:from,current:current
    })});

    return res.status;
    
}
export const AddShortBio =  async(shortbio,accessToken)=>{
    const res = await fetch(`/api/me/update/shortbio`,{method:"PUT",headers:{accessToken:accessToken,"Content-Type":"application/json"}, body:JSON.stringify({
        shortbio:shortbio
    })})
    return res.status;
    
}
export const RemoveShortBio =  async(shortbio)=>{
const userDetails = useSelector((state) => state.user);
let Cuser = userDetails?.user;
  let CuserID = userDetails?.user?.other
  let accessToken = Cuser?.accessToken;
  let user_Id = CuserID?._id;
    await fetch(`/api/me/update/delete`,{method:"PUT",headers:{accessToken:accessToken,"Content-Type":"application/json"}}).then((res)=>{
        if(res?.status === 200){
            return true;
        }else{
            return false;
        }
    })
    
}

export const AddProject =  async(title,more,link,accessToken)=>{
      const res =   await fetch(`/api/me/update/project`,{method:"PUT",headers:{accessToken:accessToken,"Content-Type":"application/json"}, body:JSON.stringify({
            title:title,more:more,webLink:link
        })});
        return res.status;
        
    }
export const RemoveProject =  async(title,more,link,accessToken)=>{
        const res = await fetch(`/api/me/update/project/delete`,{method:"PUT",headers:{accessToken:accessToken,"Content-Type":"application/json"}, body:JSON.stringify({
            title:title,more:more,webLink:link
        })});
        
        return res.status;
}

