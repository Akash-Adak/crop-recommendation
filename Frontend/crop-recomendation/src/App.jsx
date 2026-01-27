import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Recommendation from './pages/Recommendation';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CropPrediction from './pages/CropPrediction';
// import WeatherWidget from './api/NasaClimateWidget';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          onLogout={handleLogout} 
          user={user}
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route 
              path="/recommendation" 
              element={<Recommendation isAuthenticated={isAuthenticated} />} 
            /> */}
            <Route 
              path="/recommendation" 
              element={<CropPrediction isAuthenticated={isAuthenticated} />} 
            />
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
            />
            <Route 
              path="/register" 
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register onRegister={handleLogin} />} 
            />
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <Dashboard user={user} /> : <Navigate to="/login" />} 
            />

               {/* <Route 
              path="/weather" 
              element={<NasaClimateWidget isAuthenticated={isAuthenticated} />} 
            /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;