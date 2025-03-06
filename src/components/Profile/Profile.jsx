import { SideBar } from "../SideBar/SideBar";
import "./Profile.css";
import img1 from "../../assets/images/-2059466.jpg"
import img2 from "../../assets/images/clouds-cloudy-countryside-236047 (2).jpg"

export const Profile = () => {
  return (
    <div className="profile-hero">
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
              src="https://res-console.cloudinary.com/dxdsrmlcd/thumbnails/v1/image/upload/v1741255321/RnJhbWVfMzZfbWYxbW16/drilldown"
              alt=""
              className="profile-pfp"
            />
            <h1 className="profile-username">Abdullah Butt</h1>
            <div className="info-counts">
              <div className="count-div">
                <p>12</p>
                <p className="bold-profile-att">Post</p>
              </div>
              <div className="count-div">
                <p>200</p>
                <p className="bold-profile-att">Followers</p>
              </div>
              <div className="count-div">
                <p>137</p>
                <p className="bold-profile-att">Following</p>
              </div>
            </div>
            <button className="profile-follow-btn">Follow</button>
          </div>
        </div>
        <div className="profile-main2">
            <div className="profile-main-temp">
            <img src={img1} alt="" />   
            </div>
            <div className="profile-main-temp">
            <img src={img2} alt="" />
            </div>
            <div className="profile-main-temp">
            <img src={img1} alt="" />   
            </div>
            <div className="profile-main-temp">
            <img src={img2} alt="" />
            </div>
            <div className="profile-main-temp">
            <img src={img1} alt="" />   
            </div>
            <div className="profile-main-temp">
            <img src={img2} alt="" />
            </div>
            <div className="profile-main-temp">
            <img src={img1} alt="" />   
            </div>
            <div className="profile-main-temp">
            <img src={img2} alt="" />
            </div>
          
        </div>
      </div>
    </div>
  );
};