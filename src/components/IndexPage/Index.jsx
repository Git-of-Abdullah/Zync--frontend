import "./Index.css";
import React, { useEffect, useRef, useState } from "react";
import {gsap} from "gsap"
import { Link } from "react-router-dom";

export const Index = () => {
  const [bubbles, setBubbles] = useState([]);
  const main2ref = useRef(null)
  const introRef = useRef(null);
  const descRef = useRef(null);
  const btnContainerRef = useRef(null);
//gsap code here
useEffect(() => {
    const tl = gsap.timeline();
  
    // Faster fade-in and lift
    tl.fromTo(
      main2ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power1.out" }
    );
  
    // Lift intro and desc up faster and smoother
    tl.to(
      [introRef.current, descRef.current],
      { y: -50, duration: 0.8, ease: "power1.out" },
      "+=0.5" // shorter delay after previous animation
    );
  
    // Reveal buttons with quick fade-in
    tl.set(btnContainerRef.current, { display: "flex" })
      .fromTo(
        btnContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power1.out" }
      );
  }, []);
    


  useEffect(() => {
    const totalBubbles = 200; // Number of bubbles
    const generated = [];

    for (let i = 0; i < totalBubbles; i++) {
      generated.push({
        id: i,
        size: Math.floor(Math.random() * 40 + 10), // size: 10px–50px
        left: Math.random() * 100, // position from left: 0%–100%
        duration: Math.random() * 10 + 5, // duration: 5s–15s
        delay: Math.random() * 10, // delay: 0–10s
      });
    }

    setBubbles(generated);
  }, []);

  return (
    
    <div className="index-main" ref={main2ref}>
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
          }}
        ></div>
      ))}
      <div className="index-main-2"><h1 className="zync-intro" ref={introRef}>
        ZYNC.
    </h1>
    <p className="zync-desc" ref={descRef}>Stay in Sync With Everyone.</p>
    <div className="zync-btn-container" ref={btnContainerRef}>
  <Link to="/auth/login" className="zync-btn zync-btn-login">Login</Link>
  <Link to="/auth" className="zync-btn zync-btn-signup">Sign Up</Link>
</div>

    </div>
      
    </div>

    

  );
};
