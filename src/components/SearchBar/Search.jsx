import "./Search.css";
import searchIcon from "../../assets/icons/search.svg";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import axios from "axios";
import { User } from "../User/User";
import debounce from "lodash.debounce";

export const Search = () => {
  const { theme } = useContext(ThemeContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const VITE_AUTH_URL = import.meta.env.VITE_AUTH_URL;

  const fetchUsers = async (searchText) => {
    if (!searchText.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${VITE_AUTH_URL}/searchUsers?name=${searchText}`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      setResults(res.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(fetchUsers, 400);

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query]);

  return (
    <div className={`search-wrapper ${theme === "dark" ? "dark" : ""}`}>
      <div className="search">
        <input
          type="text"
          placeholder="Search.."
          className="search-text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <img className="searchIcon" src={searchIcon} alt="search" />
      </div>

      {query.trim() && (
        <div className="search-results show">
          {loading && <p>Searching...</p>}

          {!loading && results.length > 0 && (
            <>
              {results.map((user) => (
                <User
                  key={user._id}
                  id={user._id}
                  name={user.name}
                  pfp={user.profilePic}
                />
              ))}
            </>
          )}

          {!loading && results.length === 0 && <p>No users found.</p>}
        </div>
      )}
    </div>
  );
};
