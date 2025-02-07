import "./ActivityNotification.css";
import followIcon from "../../assets/icons/follow-icon.svg";
import likeIcon from "../../assets/icons/heart-filled.svg";
import { useEffect, useState } from "react";

export const ActivityNotification = ({ sender, content }) => {
   const [like, setLike] = useState(false);
   const [follow, setFollow] = useState(false);

   useEffect(() => {
      // Run effect only when content changes
      if (content.includes("liked")) {
         setLike(true);
         setFollow(false);
      } else if (content.includes("following")) {
         setFollow(true);
         setLike(false);
      }
   }, [content]); // Dependency array ensures effect only runs when `content` changes

   return (
      <div className="notification">
         <img src={sender.profilePic} alt="" />
         <p>
            <b>{sender.name}</b> {content}
         </p>
         {like && <img className="follow-icon" src={likeIcon} alt="Liked" />}
      </div>
   );
};
