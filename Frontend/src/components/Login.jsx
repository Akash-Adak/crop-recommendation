import { useState } from 'react'
import './styles/Login.css'

const Login = ({ onLoginSuccess, onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleRegisterChange = (e) => {
    const { name, value } = e.target
    setRegisterData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateLogin = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.password) newErrors.password = 'Password is required'
    return newErrors
  }

  const validateRegister = () => {
    const newErrors = {}
    if (!registerData.name) newErrors.name = 'Name is required'
    if (!registerData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(registerData.email)) newErrors.email = 'Email is invalid'
    if (!registerData.phone) newErrors.phone = 'Phone number is required'
    else if (!/^\d{10}$/.test(registerData.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone must be 10 digits'
    if (!registerData.password) newErrors.password = 'Password is required'
    else if (registerData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (!registerData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password'
    else if (registerData.password !== registerData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    return newErrors
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateLogin()
    if (Object.keys(newErrors).length === 0) {
      onLoginSuccess({ email: formData.email })
      setFormData({ email: '', password: '' })
    } else {
      setErrors(newErrors)
    }
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateRegister()
    if (Object.keys(newErrors).length === 0) {
      onLoginSuccess({ email: registerData.email, name: registerData.name })
      setRegisterData({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        {isLogin ? (
          <div className="login-section">
            <div className="auth-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <h2>Login</h2>
            </div>

            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="login-email">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m10 9 5 4 5-4" />
                  </svg>
                  Email
                </label>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleLoginChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="login-password">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Password
                </label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleLoginChange}
                />
                {errors.password && <span className="error">{errors.password}</span>}
              </div>

              <button type="submit" className="submit-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Login
              </button>
            </form>

            <div className="auth-switch">
              <p>Don't have an account? <button type="button" onClick={() => setIsLogin(false)}>Register here</button></p>
            </div>
          </div>
        ) : (
          <div className="register-section">
            <div className="auth-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M20 8v6" />
                <path d="M23 11h-6" />
              </svg>
              <h2>Register</h2>
            </div>

            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label htmlFor="register-name">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Name
                </label>
                <input
                  type="text"
                  id="register-name"
                  name="name"
                  placeholder="Enter your full name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="register-email">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m10 9 5 4 5-4" />
                  </svg>
                  Email
                </label>
                <input
                  type="email"
                  id="register-email"
                  name="email"
                  placeholder="Enter your email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="register-phone">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="register-phone"
                  name="phone"
                  placeholder="10-digit phone number"
                  value={registerData.phone}
                  onChange={handleRegisterChange}
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="register-password">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Password
                </label>
                <input
                  type="password"
                  id="register-password"
                  name="password"
                  placeholder="Create a password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                />
                {errors.password && <span className="error">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="register-confirm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="register-confirm"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                />
                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
              </div>

              <button type="submit" className="submit-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Register
              </button>
            </form>

            <div className="auth-switch">
              <p>Already have an account? <button type="button" onClick={() => setIsLogin(true)}>Login here</button></p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
