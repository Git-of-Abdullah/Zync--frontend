import { useContext } from "react"
import "./User.css"
import { ThemeContext } from "../ThemeContext/ThemeContext"


export const User = ({name,pfp}) => {

  const {theme} = useContext(ThemeContext)
    return (
        <div className={`user ${theme === "dark"? "dark" : " "}`}>
         <img src={pfp} alt="" />
         <p>{name}</p>
        </div>
      )
}
