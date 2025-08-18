import { useEffect, useState } from "react"
import { ActivityNotification } from "../ActivityNotification/ActivityNotification"
import "./Activity.css"
import axios from "axios";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import { io } from "socket.io-client";
const notificationAudio = new Audio("../../../public/notification-sound-effect-372475.mp3");

const socket = io("http://localhost:8000", {
    auth:{token : localStorage.getItem("token")}
})

export const Activity = () => {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true)
   const {theme} = useContext(ThemeContext)

   const token = localStorage.getItem("token")


   useEffect(() => {
  // Listen once when Profile mounts
  socket.on("recieveNotification", (newNoti) => {
    console.log("📩 New notification:", newNoti);
     setData((prev) => [newNoti, ...prev]);
     notificationAudio.play().catch((e) => console.log("Audio play error:", e));
  });

  // Cleanup on unmount
  return () => {
    socket.off("recieveNotification");
  };
}, []);

   useEffect(() => {
    const getNotifications = async() => 
      {
        const url = `${import.meta.env.VITE_AUTH_URL}/notifications`
        try{

          const res = await axios.get(url, {
            headers: {
              authorization: `bearer ${token}`
            },
          });
         const initdata = res.data
        //  console.log(initdata.data.notifications)
         setData(initdata.data.notifications)
         setLoading(false)
        }catch(error)
        {
          alert(error.response.message)
          setLoading(false)
        }
        };
        getNotifications();
       
   },[token])


  return (
    <div className={`activity-main ${theme === "dark" ? "dark" : ''}`}>
        <h1> Activity </h1>
        {/* Map function add here */}
        <div className="activites">
        {loading ? (<><div className="activity-shimmer"></div><div className="activity-shimmer"></div><div className="activity-shimmer"></div></>)
            :
            data.length === 0 ? (<p style={{margin: "auto", fontSize: "12px" }}>No Notifications Available</p>)
            : 

            data.map((noti) => { 
              return <ActivityNotification key={noti._id} sender={noti.sender} content={noti.content}/>
            })
          }
            
        </div>
    </div>
  )
}


