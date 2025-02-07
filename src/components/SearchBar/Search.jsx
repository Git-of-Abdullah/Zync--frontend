import "./Search.css"
import search from "../../assets/icons/search.svg"


export const Search = () => {
  return (
    <div className="search">
        <input type="text" placeholder="Search.." className="search-text"></input>
        <img className="searchIcon" src={search} alt="" />

    </div>
  )
}
