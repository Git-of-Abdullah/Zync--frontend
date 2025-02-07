import { useState } from "react"
import "./SignUp.css"
import { Link, useNavigate } from "react-router-dom"

import axios from "axios"

export const SignUp = () => {

  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[confPassword, setConfPassword] = useState("")
  const[name, setName] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate();
   const handleSubmit = async(e) => 
    {
      e.preventDefault();
      setError("")
      // console.log(name,email,password,confPassword)

      if(password !== confPassword)
        {
          setError("Password and Confirm Password Don't Match")
    
          return 
        }

        try{
          console.log(`${import.meta.env.VITE_AUTH_URL}/signup`)
          const response = await axios.post(`${import.meta.env.VITE_AUTH_URL}/signup`, {name,mail : email,password,confirmPassword : confPassword})
          const res = response.data
          console.log(res.data.token)
          if(res.data.token)
            {
              console.log(res.data.token)
              localStorage.setItem('token',res.data.token)
              alert("account created Successfully")
              return navigate("/feed")
            }
         
        } catch(err)
        {
          
          setError(err.response.data.message)
        }
      


    }

  return (
    <>
    <h1>Sign Up</h1>
    <form onSubmit={handleSubmit}>
    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}required  />
    <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
    <input type="password" placeholder="Password" minLength="8" required value={password} onChange={(e) => setPassword(e.target.value)}/>
    <input type="password" placeholder="Confirm Password" minLength="8" required value={confPassword} onChange={(e) =>setConfPassword(e.target.value)} />

    <button type="submit" > Sign up</button>
    {error && <p className="error">{error}</p>}
    <p>Already have an Account? <Link className="link" to="login">Login</Link> </p>
    </form>
    </>
  )
}
