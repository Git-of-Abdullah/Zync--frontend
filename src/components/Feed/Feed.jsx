import { useEffect, useState } from "react"
import { Post } from "../Post/Post"
import "./Feed.css"
import axios from "axios"
import { CommentModal } from "../CommentModal/CommentModal"
import { useParams } from "react-router-dom"


export const Feed = ({currentUser}) => {
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState([])
  const [postSingle, setPostSingle] = useState()
  const [showComments, setShowComments] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const token = localStorage.getItem("token")
  const postIdd = useParams();
  const postId = postIdd.id

  // console.log(postId)
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

    const getPostById = async () =>
      {
        try{
        const url = `${import.meta.env.VITE_POST_URL}/getPostById/${postId}`
        const response = await axios.get(url, {
          headers: {
            authorization: `bearer ${token}`
          },
        });
        const temp = response.data;
        setPostSingle(temp.data)
        
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }

      } 
   if(!postId)
    getPosts();
   else
   getPostById(); // Calling the function inside useEffect
  }, [token]); // Dependency array to run useEffect when token changes

  //function to open comment
  const openComments = (post) => 
    {
      setSelectedPost(post);
      setShowComments(true);
    }
  
  return (
    
    <>
    {console.log(postSingle)}
    <div className="animate__animated animate__slideInLeft main1">
    {loading ? (
  <div className="post-shimmer"></div>
) : postId && postSingle ? (
  <Post
    currentUser={currentUser}
    key={postSingle._id}
    data={postSingle}
    openComments={() => openComments(postSingle)}
  />
) : Array.isArray(post) && post.length === 0 ? (
  <p>No posts available. Follow users to get posts.</p>
) : (
  post?.map((p) =>
    p ? (
      <Post
        currentUser={currentUser}
        key={p._id}
        data={p}
        openComments={() => openComments(p)}
      />
    ) : null
  )
)}


    </div>
    {showComments && (
      <CommentModal post={selectedPost} onClose={() => setShowComments(false)} />
    )}
    </>
  )
  
}
