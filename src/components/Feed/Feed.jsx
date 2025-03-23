import { useEffect, useState } from "react"
import { Post } from "../Post/Post"
import "./Feed.css"
import axios from "axios"
import { CommentModal } from "../CommentModal/CommentModal"


export const Feed = () => {
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState([])
  const [showComments, setShowComments] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const token = localStorage.getItem("token")

  useEffect(() => {
    const getPosts = async () => {
      try {
       const url = `${import.meta.env.VITE_POST_URL}/feed`
        const response = await axios.get(url, {
          headers: {
            authorization: `bearer ${token}`
          },
        });
        const temp = response.data;
        const tmppost = temp.data.posts
        //console.log(response);
        setPost(tmppost);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };
  
    getPosts(); // Calling the function inside useEffect
  }, [token]); // Dependency array to run useEffect when token changes

  //function to open comment
  const openComments = (post) => 
    {
      setSelectedPost(post);
      setShowComments(true);
    }
  
  return (
    <>
    <div className="animate__animated animate__slideInLeft main1">
        {  loading ? (<div className="post-shimmer"></div>) 
        :
        post.length === 0 ?(<p>No posts Available. Follow users To get Posts</p>) 
        :
         post.map((post) => { return <Post key={post._id} data={post} openComments={() => openComments(post)}/>})
        
        }
    </div>
    {showComments && (
      <CommentModal post={selectedPost} onClose={() => setShowComments(false)} />
    )}
    </>
  )
  
}
