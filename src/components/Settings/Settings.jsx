import "./Settings.css";
import React, { useRef, useState } from "react";
import edit from "../../assets/icons/Edit.svg";
import { NavLink } from "react-router-dom";

export const Settings = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [mail, setMail] = useState(user.mail);
  const [bio, setBio] = useState(user.bio);
  const [isEditable, setIsEditable] = useState({
    name: false,
    mail: false,
    bio: false,
  });

  // Separate refs for each input field
  const nameRef = useRef(null);
  const mailRef = useRef(null);
  const bioRef = useRef(null);
  const pfpRef = useRef(null);

  const isChanged = name !== user.name || mail !== user.mail || bio !== user.bio;

  // Function to enable editing and focus the input field
  const handleEditClick = (field) => {
    setIsEditable((prev) => ({ ...prev, [field]: true }));

    setTimeout(() => {
      if (field === "name") nameRef.current?.focus();
      if (field === "mail") mailRef.current?.focus();
      if (field === "bio") bioRef.current?.focus();
    }, 0);
  };

  const handlePicInput = () =>
    {
        pfpRef.current.click();
    }

  const handlePicChange = () =>
    {

    }
  return (
    <>
    <input type="file"
    accept="image/*"
    className="pfp-upload"
    onClick={handlePicChange}
    ref={pfpRef}
    ></input>
    <div className="settings-main">
      <div className="settings-sub">
        <div className="setting-sub-1">
          <button className="update-profile" disabled={!isChanged}>Save Changes</button>
          <img src={user.profilePic} className="settings-pfp" alt="Profile" onClick={handlePicInput} />

          <div className="settings-form">
            {/* Name Field */}
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

            {/* Email Field */}
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

            {/* Bio Field */}
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
