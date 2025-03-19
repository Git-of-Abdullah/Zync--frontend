import "./ForgotPassword.css"
import { useState } from "react"


import axios from "axios"


export const ForgotPassword = () => {
    const[email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const handleSubmit = async(e) => 
    {
      e.preventDefault();
      setError("")
      // console.log(name,email,password,confPassword)


        try{
          const response = await axios.post(`${import.meta.env.VITE_AUTH_URL}/forgotPassword`, { mail : email})
          const res = response.data
          setMessage(res.message)
    
          
         
        } catch(err)
        {
    
          setError(err.response.data.message)
        }
      

        
    }

  return (
    <>
    <h1 className="login-head forgot">Forgot Password</h1>
    <form onSubmit={handleSubmit}>
    
    <input className="login-input" type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
    <button type="submit" > Get Mail </button>
    {error && <p className="error">{error}</p> || message &&  <p className="message">{message}</p>}
     
    </form>
    </>
  )
  
}
