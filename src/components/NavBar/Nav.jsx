import { useContext } from "react"
import { Search } from "../SearchBar/Search"
import "./Nav.css"
import { ThemeContext } from "../ThemeContext/ThemeContext"
import { NavLink } from "react-router-dom"


export const Nav = ({user}) => {

  const {theme} = useContext(ThemeContext)
  return (
    <div className={`nav-main ${theme === "dark" ? "dark" : " "}`}>
        <Search />
        
        <div className="user-section-nav">
            <p className="username">{user.name}</p>
            <NavLink to={`/profile/${user._id}`}><img className="userImg" src={user.profilePic} alt="" /></NavLink>
            
        </div>
    </div>
  )
}
