import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect';
import { useSelector } from 'react-redux';
import ChatContainer from './ChatContainer';
import './css/Sidebar.css';
import './css/SidebarChat.css';

const Sidebar = (props) => {

  const [users, setUsers] = useState();
  const [currentUser, setCurrentUser] = useState('');
  const userDetails = useSelector((state) => state.user);
  const [currentChat, setCurrentChat] = useState(false);
  let user = userDetails.user;
  let id = user?.other?._id;
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`/api/following/${id}`, {
          headers: {
            accessToken: user.accessToken

          }
        })
        setUsers(res.data);
      } catch (error) {

      }
    }
    getUsers();
  }, [])
  const handleUser = (e)=>{
    setCurrentUser(e);
    // // console.log(currentUser)
    setCurrentChat(true);
  }
    return (
    <>
    <div className='sidebar_ChatScreen'>
      <div className='sidebar_search'>
        <div className='sidebar_searchContainer'>
          <input placeholder='Search or start a new chat' type="text" />
        </div>
      </div>

      <div className='sidebar_chats'>
        {users?.map((item) => (
          <div>
            {item.followings._id !== id &&
              <div className='sidebarChat mx-2' onClick={(e)=>handleUser(item?.followings)} key={item.followings?._id}>
                <img src={item.followings?.img} style={{ height: '50px', width: '50px', borderRadius: '50%' }} />
                <div className='sidebarChat_info'>
                  <h2>{item.followings?.name}</h2>
                  {/* <p>This is the last msg</p> */}
                  <p>Start messaging</p>

                </div>
              </div>
            }
          </div>
        )
        )}
      </div>
    </div>
    
    <ChatContainer currentUser={currentUser} />
    </>
  );}


export default Sidebar