import "./CommentModal.css"
import ReactDOM from "react-dom";
import cross from "../../assets/icons/cross.svg"
import { Comment } from "../Comment/Comment";
import { useContext, useEffect, useState } from "react";
import emojiIcon from "../../assets/icons/smile.svg"
import Picker from "emoji-picker-react"
import PostIt from "../../assets/icons/postIt.svg" 
import axios from "axios"
import {jwtDecode} from "jwt-decode"
import { ThemeContext } from "../ThemeContext/ThemeContext";


export const CommentModal = ({pfp,post, onClose}) => {
    const token = localStorage.getItem("token")
    const [data, setData] = useState([])
    const [comment, setComment] = useState("");
    const [showPicker, setShowPicker] = useState(false)
    const {theme} = useContext(ThemeContext)
    
    //function to handle comment show and click
    //fetching comments data
    const commentClickHandle = async() =>
        {
          try{
            const url = `${import.meta.env.VITE_COMMENT_URL}/${post._id}`
            const res = await axios.post(url,{ content : comment}, {
                headers: {
                  authorization: `bearer ${token}`
                },
              });
            
              setComment(" ")
             

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
    useEffect( () => {

        const fetchComments = async()=>
            {
                const url = `${import.meta.env.VITE_COMMENT_URL}/${post._id}`
                try{
                    const res = await axios.get(url, {
                        headers: {
                          authorization: `bearer ${token}`
                        },
                      });
                      const tempdata = res.data
                      setData(tempdata.data.comment)
                }catch(error)
                {
                    alert(error.response.data.message)
                }
                
            }; 
            fetchComments()

    }, [post, token])


    //return null for no post
    if (!post) return null;
    //========================

    



    return ReactDOM.createPortal(
        
        <div className="main-comment-modal" onClick={onClose}>
          <div className={`comment-box ${theme === 'dark' ? "dark" : " "}`} onClick={(e) => {e.stopPropagation()}}>
            <div className="comment-head">
                <h1>Comments</h1> <img src={cross} alt="" onClick={onClose} />
            </div>
            <div className="comments-main">
                {data.length === 0 ? (<p style={{margin: "auto", fontSize: "16px" }}> This post has No comments </p>)
                :
                data.map((comment) => {
                    return <Comment key={comment._id} data={comment}/>
                })
                }
            </div>
            <div className="comment">
                <img src={pfp} alt="" className="user-img" />
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
        </div>,
        document.getElementById("modal-root") 
      );
}
