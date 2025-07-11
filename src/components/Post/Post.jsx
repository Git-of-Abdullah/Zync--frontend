import "./Post.css"
import tempImg from "../../../public/WhatsApp Image 2025-01-31 at 16.55.13_6040ebe9 1.png"
import like from "../../assets/icons/heart.svg"
import liked from "../../assets/icons/heart-filled.svg"
import commentIcon from "../../assets/icons/comment.svg"
import { useContext, useState, } from "react"
import emojiIcon from "../../assets/icons/smile.svg"
import Picker from "emoji-picker-react"
import PostIt from "../../assets/icons/postIt.svg" 
import axios from "axios"
import {jwtDecode} from "jwt-decode"
import ImageSlider from "../ImageSlider/ImageSlider"
import { ThemeContext } from "../ThemeContext/ThemeContext"
import { NavLink } from "react-router-dom"


export const Post = ({data, openComments, currentUser}) => {
    const token = localStorage.getItem("token")
    const id = jwtDecode(token).id

    console.log(data)


    const [comment, setComment] = useState("");
    const [commentCount, setCommentCount] = useState(data.comments.length)
    const [showPicker, setShowPicker] = useState(false)
    const [likeCount, setLikeCount] = useState(data.likes.length);
    const [isLiked, setIsLiked] = useState(data.likes.includes(id))
    

    //theme
    const {theme} = useContext(ThemeContext)


  
    
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
    <div className={`post-main ${theme === 'dark' ? "dark" : " "}`}>

        <div className="user-section">
            <NavLink to={`/profile/${data.user._id}`}>
            <img src={data.user.profilePic} alt="" className="user-pfp" />
            </NavLink>
            <div className="name-location">
                <p className="name">{data.user.name}</p>
                <p className="location">{data.location}</p>
            </div>
        </div>
        <p className="caption">
            
            {data.content}
        </p>
        <div className="post-img">
        <ImageSlider data = {data.media}/>
        </div>
          
        <div className="likes-comments">
            <p>{likeCount} likes</p><p>{commentCount} comments</p>
        </div>
        <div className="post-actions">
                <div className="att">
                    <img className={isLiked ? "liked-icon" : "unliked-icon"} src={isLiked ? liked : like} alt="" onClick={handleLike} />
                    <p>Like</p>
                </div>
                <div className="att">
                    <img className="unliked-icon" src={commentIcon} alt="" onClick={openComments} />
                    <p>comments</p>
                </div>
        </div>
        <div className="comment">
                <img src={currentUser?.profilePic} alt="" className="user-img" />
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
