import "./Comment.css"
import { useContext, useState } from "react"
import axios from "axios"
import { Reply } from "../Reply/Reply"
import send from "../../assets/icons/postIt.svg"
import { ThemeContext } from "../ThemeContext/ThemeContext"

export const Comment = ({data}) => {
    const {theme} = useContext(ThemeContext)
    const token = localStorage.getItem("token")
    const [showReplies, setShowReplies] = useState(false)
    const [replies, setReplies] = useState([])
    const[newReply, setNewReply] = useState("")

    const postReply = async() => 
        {
            const url= `${import.meta.env.VITE_COMMENT_URL}/${data._id}/replies`
            try{
                const res = await axios.post(url,{content : newReply}, {
                    headers: {
                      authorization: `bearer ${token}`
                    },
                  });
                 setNewReply("Add your reply..")
                  const tempdata = res.data
                 
    
              }
              catch(error)
              {
                console.log(error)
              }

        }
    const handleReplyClick = async () => 
        {
            setShowReplies((prev) => !prev)
            try{
                const url = `${import.meta.env.VITE_COMMENT_URL}/${data._id}/replies`
                const res = await axios.get(url, {
                    headers: {
                      authorization: `bearer ${token}`
                    },
                  });
                
                  const tempdata = res.data
                  setReplies(tempdata.data.replies)
                 
    
              }
              catch(error)
              {
                console.log(error)
              }
        }

  return (
    <div className={`comment-single ${theme === "dark" ? "dark" : " "}`}>
        <img src={data.user.profilePic} alt="" />
        <div className="name-content">
            <div className="Username">{data.user.name}</div>
            <div className="content"> {data.content}</div>
            <div className="reply" onClick={handleReplyClick} > View replies({data.replies.length})</div>
            {showReplies && (<><div className="replies-section"> 
             {
             replies.length === 0 ? (<p style={{margin: "auto", fontSize: "11px"}}> No replies</p>)
             :
             replies.map(reply => { 
                return <Reply  data={reply}/>
             })}
            </div>
             <div className="add-reply"> 
             <input type="text" value={newReply} onChange={(e)=> setNewReply(e.target.value)} placeholder="Add your reply.." />
             <img src={send} alt="" onClick={postReply} />
         </div>
         </>
        ) }    
        </div>
        
    </div>
  )
}
