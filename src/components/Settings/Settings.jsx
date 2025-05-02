import "./Settings.css";
import React, { useContext, useRef, useState } from "react";
import edit from "../../assets/icons/Edit.svg";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import axios from "axios";
import { ring } from 'ldrs'

ring.register()

// Default values shown

export const Settings = ({ user }) => {
  
  const [name, setName] = useState(user.name);
  const [mail, setMail] = useState(user.mail);
  const [bio, setBio] = useState(user.bio);
  const [loading, setLoading] = useState(false);
  const [isEditable, setIsEditable] = useState({
    name: false,
    mail: false,
    bio: false,
  });
  const { theme } = useContext(ThemeContext);

  const nameRef = useRef(null);
  const mailRef = useRef(null);
  const bioRef = useRef(null);
  const pfpRef = useRef(null);

  const isChanged = name !== user.name || mail !== user.mail || bio !== user.bio;

  const handleEditClick = (field) => {
    setIsEditable((prev) => ({ ...prev, [field]: true }));
    setTimeout(() => {
      if (field === "name") nameRef.current?.focus();
      if (field === "mail") mailRef.current?.focus();
      if (field === "bio") bioRef.current?.focus();
    }, 0);
  };

  const handlePicInput = () => {
    pfpRef.current.click();
  };

  const handlePicChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true); // Show loader before upload starts

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_AUTH_URL}/updatePfp`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response);
      alert("Profile picture updated successfully!");
      window.location.reload();
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || "Failed to upload profile picture"}`);
    } finally {
      setLoading(false); // Stop loader after request completes
    }
  };

  return (
    <>
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        className="pfp-upload"
        onChange={handlePicChange}
        ref={pfpRef}
        style={{ display: "none" }}
      />

      <div className={`animate__animated animate__slideInLeft settings-main ${theme === "dark" ? "dark" : ""}`}>
        <div className="settings-sub">
          <div className="setting-sub-1">
            <button className="update-profile" disabled={!isChanged}>Save Changes</button>
            
            {/* Profile Picture Section */}
            <div className="settings-pfp" onClick={handlePicInput} style={{ position: "relative" }}>
              {loading ? (
                // Loader Overlay
                <div className="loader-overlay">
                 <l-ring
                    size="20"
                    stroke="1=2"
                    bg-opacity="0"
                    speed="2" 
                    color="white" 
                    ></l-ring> 

                </div>
              ) : (
                <img src={user.profilePic} className="settings-pfp-img" alt="Profile" />
              )}
            </div>

            {/* Form Fields */}
            <div className="settings-form">
              <div className="settings-input i1">
                <label htmlFor="sett-name" className="sett-label"> Name </label>
                <div className="input-tag-wrapper">
                  <input
                    className="setting-filed"
                    type="text"
                    name="sett-name"
                    value={name}
                    readOnly={!isEditable.name}
                    onChange={(e) => setName(e.target.value)}
                    ref={nameRef}
                  />
                  <img
                    src={edit}
                    className="setting-edit-icon"
                    onClick={() => handleEditClick("name")}
                    alt="Edit"
                  />
                </div>
              </div>

              <div className="settings-input">
                <label htmlFor="sett-mail" className="sett-label"> Email </label>
                <div className="input-tag-wrapper mail-i">
                  <input
                    className="setting-filed"
                    type="email"
                    name="sett-mail"
                    value={mail}
                    readOnly={!isEditable.mail}
                    onChange={(e) => setMail(e.target.value)}
                    ref={mailRef}
                  />
                  <img
                    src={edit}
                    className="setting-edit-icon"
                    onClick={() => handleEditClick("mail")}
                    alt="Edit"
                  />
                </div>
              </div>

              <div className="settings-input">
                <label htmlFor="sett-bio" className="sett-label"> Bio </label>
                <div className="input-tag-wrapper bio">
                  <input
                    className="setting-filed"
                    type="text"
                    name="sett-bio"
                    value={bio}
                    readOnly={!isEditable.bio}
                    onChange={(e) => setBio(e.target.value)}
                    ref={bioRef}
                  />
                  <img
                    src={edit}
                    className="setting-edit-icon"
                    onClick={() => handleEditClick("bio")}
                    alt="Edit"
                  />
                </div>
              </div>
            </div>

            <NavLink to="/auth/forgotPassword" className="pswd-link"> Click Here To Change Your Password</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
