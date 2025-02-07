import "../LoginFrom/Login"
import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import axios from "axios"

export const ResetPassword = () => {

    const[password, setPassword] = useState("")
    const[confPassword, setConfPassword] = useState("")
    const [error, setError] = useState("")
    const {token} = useParams();
    const navigate = useNavigate();
    const handleSubmit = async(e) => 
    {
      e.preventDefault();

      console.log(token)
      setError("")
      // console.log(name,email,password,confPassword)


        try{
          const response = await axios.post(`${import.meta.env.VITE_AUTH_URL}/resetPassword/${token}`, { password, confirmPassword : confPassword})
          const res = response.data
          alert(res.message)
          navigate("/auth/login")
    
          
         
        } catch(err)
        {
         
          setError("failed to reset Password. Try Again later")
        }
      


    }

  return (
    <>
    <h1>Reset Password</h1>
    <form onSubmit={handleSubmit}>
    
    <input type="password" placeholder="Password" minLength="8" required value={password} onChange={(e) => setPassword(e.target.value)}/>
    <input type="password" placeholder="Confirm Password" minLength="8" required value={confPassword} onChange={(e) =>setConfPassword(e.target.value)} />
    <button type="submit" > Reset Password</button>
    {error && <p className="error">{error}</p>}
    </form>
    </>
  )
}
