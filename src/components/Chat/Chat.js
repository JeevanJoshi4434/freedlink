import React from 'react'
import { useSelector } from 'react-redux'
import "./Chat.css"
import ChatContainer from './ChatContainer'
import Sidebar from './Sidebar'
const Chat = () => {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  return (
    <div className='MainChatContainer'>
      <Sidebar img={user?.other?.img} />
    </div>
  )
}

export default Chat
