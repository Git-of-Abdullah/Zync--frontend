import "./Post.css"
import tempImg from "../../../public/WhatsApp Image 2025-01-31 at 16.55.13_6040ebe9 1.png"
import like from "../../assets/icons/heart.svg"
import liked from "../../assets/icons/heart-filled.svg"
import commentIcon from "../../assets/icons/comment.svg"
import { useState, } from "react"
import emojiIcon from "../../assets/icons/smile.svg"
import Picker from "emoji-picker-react"
import PostIt from "../../assets/icons/postIt.svg" 
import axios from "axios"
import {jwtDecode} from "jwt-decode"
import ImageSlider from "../ImageSlider/ImageSlider"


export const Post = ({data, openComments}) => {
    const token = localStorage.getItem("token")
    const id = jwtDecode(token).id


    const [comment, setComment] = useState("");
    const [commentCount, setCommentCount] = useState(data.comments.length)
    const [showPicker, setShowPicker] = useState(false)
    const [likeCount, setLikeCount] = useState(data.likes.length);
    const [isLiked, setIsLiked] = useState(data.likes.includes(id))
   


  
    
    //function to handle like 
    const handleLike = async() => 
        {
            setIsLiked( (prev) => !prev)
            setLikeCount( (prev) => (prev !== undefined ? (isLiked ? prev - 1 : prev + 1) : 0))
            console.log(likeCount)
            try{
                const url = `${import.meta.env.VITE_POST_URL}/${data._id}/like`
                console.log(url)
                const res = await axios.get(url, {
                    headers: {
                      authorization: `bearer ${token}`
                    },
                  });
            }catch(error)
            {
                alert(error.response.data.message)
            }

        }
        //function to handle comment 
        const commentClickHandle = async() =>
            {
              try{
                const url = `${import.meta.env.VITE_COMMENT_URL}/${data._id}`
                const res = await axios.post(url,{ content : comment}, {
                    headers: {
                      authorization: `bearer ${token}`
                    },
                  });
                
                  setComment(" ")
                  setCommentCount((prev) => prev + 1)

              }
              catch(error)
              {
                alert(error.response.data.message)
              }
            }
            

    //function to handle emoji click
    const handleEmojiClick = (emojiData) => {
        setComment((prev) => prev + emojiData.emoji);
      };
  return (
    <>
    <div className="post-main">
        <div className="user-section">
            <img src="https://res.cloudinary.com/dxdsrmlcd/image/upload/v1738067039/default_profile_uj539l.png" alt="" className="user-pfp" />
            <div className="name-location">
                <p className="name">{data.user.name}</p>
                <p className="location">{data.location}</p>
            </div>
        </div>
        <p className="caption">
            
            {data.content}
        </p>
        <div className="post-img">
        <ImageSlider/>
        </div>
          
        <div className="likes-comments">
            <p>{likeCount} likes</p><p>{commentCount} comments</p>
        </div>
        <div className="post-actions">
                <div className="att">
                    <img src={isLiked ? liked : like} alt="" onClick={handleLike} />
                    <p>Like</p>
                </div>
                <div className="att">
                    <img src={commentIcon} alt="" onClick={openComments} />
                    <p>comments</p>
                </div>
        </div>
        <div className="comment">
                <img src="https://res.cloudinary.com/dxdsrmlcd/image/upload/v1738067039/default_profile_uj539l.png" alt="" className="user-img" />
                <div className="comment-temp">
                <textarea className="comment-text" placeholder="Write a comment.." value={comment} onChange = {(e) => setComment(e.target.value)}></textarea>
                <img 
                src={emojiIcon} 
                className="emoji-icon" 
                alt="" 
                onClick={() => setShowPicker(!showPicker)} 
                />


            {showPicker && (
                <div className="emoji-picker">
                <Picker width={400} height={400} searchDisabled={true} previewConfig={{showPreview: false}} style={{transform: "scale(0.65)" , margin : "0px"}} onEmojiClick={handleEmojiClick} />
                </div>
            )}
            </div>
            <div className="post-icon-temp">
            <img src={PostIt} alt=""  className="PostIcon" onClick={commentClickHandle}/>
            </div>
        </div>
        
    </div>
  
    </>
  )
}
