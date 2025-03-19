import { Outlet } from "react-router-dom"
import { Activity } from "../Activity/Activity"
import { FriendList } from "../FriendList/FriendList"
import { Nav } from "../NavBar/Nav"
import { SideBar } from "../SideBar/SideBar"
import "./HomeLayout.css"
import { useContext } from "react"
import { ThemeContext } from "../ThemeContext/ThemeContext"


export const HomeLayout = () => {
  const {theme} = useContext(ThemeContext)
  return (
    <>
    <div className="bars">
        <SideBar/>
        <Nav/>
    </div>
    <div className={`main-center ${theme === "dark" ? "dark" : ""}`}>
        <Outlet/> 
        <div className="main2">
            {/* Here we will add notifications and followers hard codedly using .map function */}
            <Activity/>
            <FriendList/>
        </div>
    </div>
    
    </>    
  )
}
