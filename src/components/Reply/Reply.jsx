import "./Reply.css"
import send from "../../assets/icons/postIt.svg"
import React, { useState } from 'react'

export const Reply = ({data}) => {
   

    const postReply = () =>
        {

        }
  return (
    <div className="reply-one">
        <img src={data.user.profilePic} className="repl-image" alt="" />
        <div className="name-content">
            <div className="Username repl-name">{data.user.name}</div>
            <div className="content repl-content"> {data.content}</div>
        </div>
        

    </div>
  )
}
