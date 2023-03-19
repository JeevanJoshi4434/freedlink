import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import "./Chat.css"

const ChatContainer = (props) => {
    const [messages, setMessages] = useState('');
    const userDetails = useSelector((state) => state.user);
    const [inputmessage, setInputmessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
  let user = userDetails?.user;
  let id = user?.other?._id;
  const socket = useRef();
  let accessToken = user?.accessToken;
  // // console.log(accessToken)
  // // console.log(props.currentUser?._id);
  let id2 = props.currentUser?._id;
  const scrollRef = useRef();
        useEffect(() => {
      const getMessages = async () => {
          try {
              const res = await axios.get(`/api/get/chat/msg/${id}/${id2}`, { })
              setMessages(res.data);
            } catch (error) {
                
            }
        }
        getMessages();
      }, [props.currentUser?._id])

      useEffect(()=>{
        if(props.currentUser?._id !== ''){
            socket.current = io(process.env.PORT);
            socket.current.emit("addUser", id);
        }
      },[id]);
      // // console.log(socket);
      useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
      },[messages])
      const handleSendMessage = ()=>{
        const currentMessage={
            myself:true,
            message:inputmessage
        };
        socket.current.emit("send-msg",{
            to:props.currentUser?._id,
            from:id,
            message:inputmessage
        } )
            fetch(`/api/msg`,{method:"POST",headers:{'Content-Type':"application/JSON", accessToken:accessToken}, body:JSON.stringify({
                from:id,
                to:props.currentUser?._id,
                message:inputmessage  
            })})
            setMessages(messages.concat(currentMessage))
      }

      useEffect(() => {
        if(socket.current){
            socket.current.on("msg-receive", (msg)=>{
                // // console.log(msg)
                setArrivalMessage({myself:false, message:msg})
            })
        }
      }, [arrivalMessage]);
      useEffect(()=>{
        arrivalMessage && setMessages((pre)=>[...pre, arrivalMessage])
      },[arrivalMessage]);
      
      if(id2){
      return (
        <div className='ChatContainerMain'>
            <div className='chat'>
                <div className='chat_header'>
                    <img src={props.currentUser?.img} style={{ height: '50px', width: '50px', borderRadius: '50%' }} />
                    <div className='chat_headerInfo'>
                        <h3>{props.currentUser?.name}</h3>
                        <p>{props.currentUser?.aboutBio}</p>
                    </div>

                    <div className='chat_headerRight'>
                    </div>
                </div>

                <div className='chat_body'>
                    {messages.map((i)=>
                    (

                    <div ref={scrollRef} className={`chat_message ${i?.myself && `chatSender`}`} >
                        <p>
                            <span className='chat_name'>{i?.myself ? user?.other?.name : props.currentUser?.name}</span>
                            {i?.message}
                        </p>
                    </div>
                    ))}
                </div>

                <div className='chat_footer'>
                    <div className='sendControl'>
                        <input placeholder="type a message" type="text" onChange={(e)=>setInputmessage(e.target.value)} />
                        <div className='buttonContainer'>
                            <button onClick={handleSendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}else{
        return(
            <>
            <div className='ChatContainerMain'>
            <div className='chat' style={{color:"#0000a7",display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',alignContent:'center'}} >
            <span className="material-icons" style={{fontSize:"40px"}}> chat </span>
            <p>Please select a message to start conversation</p>

            </div>

            </div>
            </>
        )
    }
}

export default ChatContainer