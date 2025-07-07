import { SideBar } from "../SideBar/SideBar";
import "./Profile.css";
import img1 from "../../assets/images/-2059466.jpg"
import img2 from "../../assets/images/clouds-cloudy-countryside-236047 (2).jpg"
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ThemeContext } from "../ThemeContext/ThemeContext";

export const Profile = () => {
  const {id} = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [user, setUser] = useState();
  const [post, setPost] = useState();
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const isSameUser = jwtDecode(token).id === id ? true : false
  const loggedInUserId = jwtDecode(token).id;
  const {theme} = useContext(ThemeContext)

  //data fetching
  useEffect(()=>
    {
      const getData =async() =>{
  
        const url = `${import.meta.env.VITE_AUTH_URL}/getProfile/${id}`
        try{
          const res = await axios.get(url, {
            headers: {
              authorization: `bearer ${token}`
            },
          });
          // console.log("hello")
          const tempdata = res.data;
          setData(tempdata.data)
          setIsFollowing(tempdata.data.user.followers.includes(loggedInUserId));
          setUser(tempdata.data.user)
          setPost(tempdata.data.posts)

          // console.log(tempdata.data.user.profilePic)
          setLoading(false)
        }catch(error)
        {
          console.log(error.response)
          setLoading(false)
        }
        
      }; getData();
    },[token,id])

    //function for setting click

    const handleSettingsClick = () =>
      {
        navigate("/settings");
      }

// FOLLOW USER
      const handleFollowClick = async () => {
        try {
          const url = `${import.meta.env.VITE_AUTH_URL}/follow/${id}`;
          const res = await axios.post(
            url,
            {},
            {
              headers: {
                authorization: `bearer ${token}`,
              },
            }
          );

          // Update followers count in UI
          setUser((prevUser) => ({
            ...prevUser,
            followers: [...prevUser.followers, jwtDecode(token).id],
          }));

          setIsFollowing(true);
        } catch (err) {
          console.error("Error while following:", err.response || err);
        }
      };

      // UNFOLLOW USER
      const handleUnfollowClick = async () => {
        try {
          const url = `${import.meta.env.VITE_AUTH_URL}/unfollow/${id}`;
          const res = await axios.post(
            url,
            {},
            {
              headers: {
                authorization: `bearer ${token}`,
              },
            }
          );

          // Update followers count in UI
          setUser((prevUser) => ({
            ...prevUser,
            followers: prevUser.followers.filter((followerId) => followerId !== jwtDecode(token).id),
          }));

          setIsFollowing(false);
        } catch (err) {
          console.error("Error while unfollowing:", err.response || err);
        }
      };
  

  return (
    
    <div className={`profile-hero  ${theme === 'dark' ? "dark" : " "}`}>
      {/* {console.log(data)}
    {  console.log(user)}
    {console.log(post)} */}
      <SideBar />
      <div className="profile-main">
        <div className="profile-main1">
          <div className="banner-hero">
            <img
              src="https://res-console.cloudinary.com/dxdsrmlcd/thumbnails/v1/image/upload/v1741254145/aW1nMl93amRydjU=/drilldown"
              alt=""
            />
          </div>
          <div className="profile-info">
            
            <img
              src={user?.profilePic}
              alt=""
              className="profile-pfp"
            />
            <h1 className="profile-username">{user?.name}</h1>
            <h1 className="profile-bio">{user?.bio}</h1>
            <div className="info-counts">
              <div className="count-div">
                <p>{post?.length}</p>
                <p className="bold-profile-att">Post</p>
              </div>
              <div className="count-div">
                <p>{user?.followers.length}</p>
                <p className="bold-profile-att">Followers</p>
              </div>
              <div className="count-div">
                <p>{user?.following.length}</p>
                <p className="bold-profile-att">Following</p>
              </div>
            </div>
            { isSameUser? <button className="profile-follow-btn" onClick={handleSettingsClick}>Settings</button> :
            isFollowing? <button className="profile-follow-btn unfollow-btn" onClick={handleUnfollowClick}>Unfollow</button> :
            <button className="profile-follow-btn" onClick={handleFollowClick}>Follow</button>}
            
          </div>
        </div>
        <div className="profile-main2">
        {post?.map((post, index) => (
  <NavLink to={`/post/${post._id}`} className="profile-main-temp" key={post._id || index}>
    <img src={post.media[0]} alt="" />   
  </NavLink>
))}

            
        </div>
      </div>
    </div>
  );
};