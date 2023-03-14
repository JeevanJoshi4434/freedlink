import React from 'react'
import "./profile.css"
const UserPost = (props) => {
    const {username,image,caption,comments,profile,time,date} = props;
    return (
      <div>   <div className="post">
      <div className="post__top">
        <img
          className="user__avatar post__avatar"
          src={profile} alt=""
        />
        <div className="post__topInfo">
          <h3>{username}</h3>
          <p>{date} at {time}</p>
        </div>
      </div>
  
      <div className="post__bottom">
        <p>{caption}</p>
      </div>
  
      <div className="post__image">
        <img src={image}  alt="" />
      </div>
  
      <div className="post__options">
        <div className="post__option">
          <span className="material-icons"> favorite </span>
          <p>Like</p>
        </div>
  
        <div className="post__option">
          <span className="material-icons"> chat_bubble_outline </span>
          <p>Comment</p>
        </div>
  
        <div className="post__option">
          <span className="material-icons"> near_me </span>
          <p>Share</p>
        </div>
      </div>
    </div>
        
      </div>
    )
}

export default UserPost
