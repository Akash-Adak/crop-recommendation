import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Login from './components/Login'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (userData) => {
    setIsLoggedIn(true)
    setCurrentPage('home')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentPage('home')
  }

  const renderPage = () => {
    if (currentPage === 'home') {
      return (
        <div className="home-container">
          <div className="hero">
            <h1>🌾 CropLogic - AI Crop Recommendation System</h1>
            <p>Get intelligent crop recommendations based on your soil conditions and climate</p>
            {!isLoggedIn ? (
              <button className="cta-button" onClick={() => setCurrentPage('login')}>
                Get Started
              </button>
            ) : (
              <div className="welcome-section">
                <h2>Welcome to Crop Recommendations!</h2>
                <p>Use our AI-powered system to get personalized crop recommendations for your land.</p>
              </div>
            )}
          </div>
        </div>
      )
    } else if (currentPage === 'about') {
      return <About />
    } else if (currentPage === 'contact') {
      return <Contact />
    } else if (currentPage === 'login') {
      return <Login onLoginSuccess={handleLogin} onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="app">
      <Navbar 
        onNavigate={setCurrentPage} 
        currentPage={currentPage}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  )
}

export default App
