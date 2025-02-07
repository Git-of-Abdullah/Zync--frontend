import "./AuthLayout.css"
import logo from "../../assets/images/ZYNC LOGO 1.svg"
import { Outlet } from "react-router-dom"

export const AuthLayout = () => {
  return (
    <section className='auth-main-section'>
        <div className="hero-div">
            <div className="logo">
                <div className="circle1"></div>
                <div className="circle2"></div>
                <div className="logo-main">
                    <h1 className="hero-head">WELCOME TO ZYNC</h1>
                    <img src={logo} alt="" />
                    
                </div>
            </div>
            <div className="logInfo">
              <Outlet/>
            </div>
        </div>
    </section>
  )
}
