import { NavLink } from "react-router-dom"
import "./SideBar.css"
import home from "../../assets/icons/home.svg"
import explore from "../../assets/icons/explore.svg"
import message from "../../assets/icons/send.svg"
import mode from "../../assets/icons/Mode icon.svg"
import fav from '../../assets/icons/Save.svg'
import create from "../../assets/icons/create.svg"
import setting from "../../assets/icons/settings.svg"
import { useContext } from "react"
import { ThemeContext } from "../ThemeContext/ThemeContext"


export const SideBar = () => {

    const{ toggleTheme } = useContext(ThemeContext)

    const {theme} = useContext(ThemeContext)
  return (
    <div className={`side-main ${theme === "dark" ? "dark" : ""}`}>
        <div className="side-hero-wrap">
        <h1 className="side-hero"> ZYNC </h1>
        </div>

    <div className="nav-links">
             <NavLink to="/home"   className={({ isActive }) => isActive ? "link active" : "link"}> 
 
                <img src={home} alt="" />
                <p className="link-name">Feed</p>
            </NavLink>

            <NavLink to="/explore" className={({ isActive }) => isActive ? "link active" : "link"}> 
                <img src={explore} alt="" />
                <p className="link-name">Explore</p>
            </NavLink>

            <NavLink to="/inbox" className={({ isActive }) => isActive ? "link active" : "link"}> 
                <img src={message} alt="" />
                <p className="link-name">Message</p>
            </NavLink>

            <NavLink to="#" onClick={toggleTheme} className="themebutton">
                 <img src={mode} alt="" />
                <p className="link-name">Mode</p>
            </NavLink>

            <NavLink to="/fav" className={({ isActive }) => isActive ? "link active" : "link"}> 
                <img src={fav} alt="" />
                <p className="link-name">My Favourites</p>
            </NavLink>

            <NavLink to="/create" className={({ isActive }) => isActive ? "link active" : "link"}> 
                <img src={create} alt="" />
                <p className="link-name">Create</p>
            </NavLink>

            <NavLink to="/settings" className={({ isActive }) => isActive ? "link active" : "link"}> 
                <img src={setting} alt="" />
                <p className="link-name">Settings</p>
            </NavLink>
    </div>
    </div>
  )
}
