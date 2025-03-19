import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeContext/ThemeContext.jsx' // ✅ Use ThemeProvider

createRoot(document.getElementById('root')).render(
  <ThemeProvider> {/* ✅ Wrap with ThemeProvider */}
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </ThemeProvider>
);
