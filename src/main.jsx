import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext/ThemeContext.jsx"; // ✅ Use ThemeProvider
import { ChatProvider } from "./components/ChatProvider/ChatProvider.jsx"; // ✅ Use your ChatProvider
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "animate.css"

const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null; // No token, no user

    const response = await axios.get(`${import.meta.env.VITE_AUTH_URL}/getProfile`, {
      headers: {
        authorization: `bearer ${token}`, // 
      },
    });

    const tmpres = response.data
    console.log(tmpres.status)
    if (tmpres.status === "successfull") {
      return tmpres.data.user;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

// 🚀 Initialize the app after getting the user profile
(async () => {
  const user = await fetchUserProfile();

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <ThemeProvider> {/* ✅ Wrap with ThemeProvider */}
        <BrowserRouter>
          {user ? (
            <ChatProvider user={user}>
              <App user={user}/>
            </ChatProvider>
          ) : (
            <App />
          )}
        </BrowserRouter>
      </ThemeProvider>
    </StrictMode>
  );
})();
