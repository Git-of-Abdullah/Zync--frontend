import "./Search.css"
import search from "../../assets/icons/search.svg"
import { useContext } from "react"
import { ThemeContext } from "../ThemeContext/ThemeContext"


export const Search = () => {

  const {theme} = useContext(ThemeContext)
  return (
    <div className={`search ${theme === "dark" ? "dark" : " "}`}>
        <input type="text" placeholder="Search.." className="search-text"></input>
        <img className="searchIcon" src={search} alt="" />

    </div>
  )
}
