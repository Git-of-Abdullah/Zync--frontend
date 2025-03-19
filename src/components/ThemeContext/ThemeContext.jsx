import { createContext, useState, useEffect } from "react";

// Create ThemeContext
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Apply theme class to body
    document.body.style.backgroundColor = theme === "dark" ? "#0F0F0F" : "white";
    document.body.style.color = theme === "dark" ? "white" : "black";
    
    // Store theme in localStorage
    localStorage.setItem("theme", theme);
  }, [theme]); // Runs when theme changes

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
