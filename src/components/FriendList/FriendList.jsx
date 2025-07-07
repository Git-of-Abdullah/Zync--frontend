import { useState, useEffect, useContext } from "react"
import { User } from "../User/User"
import "./FriendList.css"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import { ThemeContext } from "../ThemeContext/ThemeContext"


export const FriendList = () => {
  const[data,setData] = useState([]);
  const[loading, setLoading] = useState(true)
  const token = localStorage.getItem("token")
  const {theme} = useContext(ThemeContext)
  const id = jwtDecode(token).id

  useEffect(()=>
  {
    const getFollowers =async() =>{

      const url = `${import.meta.env.VITE_AUTH_URL}/followers/${id}`
      try{
        const res = await axios.get(url, {
          headers: {
            authorization: `bearer ${token}`
          },
        });
  
        const tempdata = res.data;
        setData(tempdata.data.followers)
        // console.log(tempdata.data.followers)
        setLoading(false)
      }catch(error)
      {
        alert(error.response.message)
        setLoading(false)
      }
      
    }; getFollowers();
  },[token,id])



  return (
    <div className={`friend-main ${theme === "dark"? "dark" : " "}`}>
        <h1> Followers </h1>
        {/* Map function add here */}
        <div className="Friend-activites">
          { loading? (<><div className="activity-shimmer"></div><div className="activity-shimmer"></div><div className="activity-shimmer"></div></>)
          :
          data.length === 0 ? (<p style={{margin: "auto", fontSize: "12px" }}>No Followers</p>) 
        :
          data.map((user) => {
            return <User key={user._id} id={user._id} name={user.name} pfp = {user.profilePic}/>
          })}
            
        </div>
    </div>
  )
}
