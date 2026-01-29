import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CropPrediction from "./pages/CropPrediction";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


useEffect(() => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (token && storedUser && storedUser !== "undefined") {
    try {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    } catch {
      // corrupted storage → clean once
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }

  setLoading(false);
}, []);


  const handleLogin = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return <div className="p-10 text-center">Loading app…</div>;
  }

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

            <Route
              path="/recommendation"
              element={
                isAuthenticated ? (
                  <CropPrediction />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

           <Route path="/login" element={<Login onLogin={handleLogin} />} />


            <Route
              path="/register"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Register onRegister={handleLogin} />
                )
              }
            />

            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard user={user} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
