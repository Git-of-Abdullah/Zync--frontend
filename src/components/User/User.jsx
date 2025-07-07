import { useContext } from "react"
import "./User.css"
import { ThemeContext } from "../ThemeContext/ThemeContext"
import { Link } from "react-router-dom"


export const User = ({id,name,pfp}) => {

  const {theme} = useContext(ThemeContext)
    return (
        <Link to={`/profile/${id}`} className={`user ${theme === "dark"? "dark" : " "}`}>
         <img src={pfp} alt="" />
         <p>{name}</p>
        </Link>
      )
}
