import "./Login.css"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import axios from "axios"



export const Login = () => {
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const handleSubmit = async(e) => 
    {
      e.preventDefault();
      setError("")
      // console.log(name,email,password,confPassword)


        try{
          const response = await axios.post(`${import.meta.env.VITE_AUTH_URL}/login`, { email,password,})
          const res = response.data
          console.log(res.token)
    
            localStorage.setItem('token', res.token)
            return navigate("/home")
          
         
        } catch(err)
        {
         console.log(err)
         console.log(err.response)
          setError(err.response.data.message)
        }
      


    }

  return (
    <>
    <h1>Log In</h1>
    <form onSubmit={handleSubmit}>
    
    <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
    <input type="password" placeholder="Password" minLength="8" required value={password} onChange={(e) => setPassword(e.target.value)}/>
    <button type="submit" > Log in</button>
    {error && <p className="error">{error}</p>}
     <Link className="link" to="/auth/forgotPassword">Forgot Password</Link> 
    </form>
    </>
  )
  
}
