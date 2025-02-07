import { Search } from "../SearchBar/Search"
import "./Nav.css"


export const Nav = () => {
  return (
    <div className="nav-main">
        <Search />
        <div className="user-section">
            <p className="username">Kat_Ab</p>
            <img className="userImg" src="https://res.cloudinary.com/dxdsrmlcd/image/upload/v1738067039/default_profile_uj539l.png" alt="" />
        </div>
    </div>
  )
}
