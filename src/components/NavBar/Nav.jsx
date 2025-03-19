import { useContext } from "react"
import { Search } from "../SearchBar/Search"
import "./Nav.css"
import { ThemeContext } from "../ThemeContext/ThemeContext"


export const Nav = () => {

  const {theme} = useContext(ThemeContext)
  return (
    <div className={`nav-main ${theme === "dark" ? "dark" : " "}`}>
        <Search />
        <div className="user-section">
            <p className="username">Kat_Ab</p>
            <img className="userImg" src="https://res.cloudinary.com/dxdsrmlcd/image/upload/v1738067039/default_profile_uj539l.png" alt="" />
        </div>
    </div>
  )
}
