import React, { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client"
import { jwtDecode } from "jwt-decode";


//socket connection
const socket = io("http://localhost:8000", {
    auth:{token : localStorage.getItem("token")}
})


export const Chat_right = () => {
  //variables------------------------------------------
  const [text, setText] = useState("");
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [data, setData] = useState();
  const [animate, setAnimate] = useState(true);
  const [messages, setMessages] = useState([])
  const decoded = jwtDecode(token)
  const currentUserId = decoded.id
  const messagesEndRef = useRef(null)
  
useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);



  //UseEffect To Get User-----------------------------------------------
  useEffect(() => {
    const getUser = async () => {
      const url = `${import.meta.env.VITE_AUTH_URL}/getUserById/${id}`;
      try {
        const res = await axios.get(url, {
          headers: {
            authorization: `bearer ${token}`,
          },
        });
        setData(res.data.data.user);
      } catch (error) {
        alert(error.response.message);
      }
    };
    getUser();

    setAnimate(false); 
    const timer = setTimeout(() => setAnimate(true), 10); 

    return () => clearTimeout(timer);
  }, [id]);

// useEffect to receive real-time messages
useEffect(() => {
  socket.on("recieveMessage", (message) => {
    setMessages((prev) => [...prev, message]);
    console.log("Message Recieved: ", message.text);
  });

  return () => {
    socket.off("recieveMessage");
  };
}, []);

// useEffect to load history when chat opens
useEffect(() => {
  const fetchOldMessages = async () => {
    try {
      const url = `${import.meta.env.VITE_AUTH_URL}/chat/${id}`;
      const res = await axios.get(url, {
        headers: {
          authorization: `bearer ${token}`
        }
      });
      setMessages(res.data.messages);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  fetchOldMessages();
}, [id, token]);





  const handleSend = () => {
    if (!text.trim()) return
    const message = {
      sender :  currentUserId,
      receiverId: id,
      text
    }
    
    socket.emit("sendMessage", message )
    console.log("message Sent:", message.text)
    setMessages((prev => [...prev, message ]))
    setText("")
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`border border-2 relative w-[100%] h-screen overflow-y-auto ${
        animate ? "animate__animated animate__fadeIn" : ""
      }`}
    >
      <Link
        to={`/profile/${id}`}
        className="user !w-[100%] !rounded-none fixed bg-gray-200 !p-[20px] !py-[30px]  "
      >
        <img src={data?.profilePic} alt="" />
        <p className="font-semibold !text-[16px]">{data?.name}</p>
      </Link>

      <div className="messages border  flex flex-col gap-3 !my-[60px] h-[500px] w-full  !p-4 overflow-y-auto" ref={messagesEndRef}>
        {messages?.map((msg) => {
          return <ChatBubble key={msg.senderId} message={msg.text} isSender={msg.sender === currentUserId}/>
        })}
      </div>

      <div className="flex items-center p-2 gap-2 w-full fixed bottom-0 bg-white border-gray-300">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className=" w-[90%] border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-blue-600 text-white !text-[16px] !h-[50px] rounded-lg w-[100px] hover:bg-blue-700 !m-0 disabled:bg-blue-300"
          disabled={!text.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};
