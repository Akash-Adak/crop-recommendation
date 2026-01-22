import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin({
        name: 'Rajesh Kumar',
        email: formData.email,
        location: 'Punjab',
        farmSize: '10 acres'
      });
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-r from-farm-green to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <i className="fas fa-tractor text-3xl text-white"></i>
            </div>
            <h1 className="text-4xl font-bold font-roboto-slab text-farm-dark mb-4">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to continue to AgroAdvisor</p>
          </div>

          {/* Login Card */}
          <div className="card shadow-2xl">
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  <i className="fas fa-envelope mr-2"></i>
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className="input-field pl-10"
                    placeholder="farmer@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                  <i className="fas fa-envelope absolute left-3 top-4 text-gray-400"></i>
                </div>
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  <i className="fas fa-lock mr-2"></i>
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="input-field pl-10"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                  <i className="fas fa-lock absolute left-3 top-4 text-gray-400"></i>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex justify-between items-center mb-8">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="w-4 h-4 text-farm-green rounded" />
                  <span className="text-gray-700">Remember me</span>
                </label>
                <a href="#" className="text-farm-green hover:text-farm-dark font-medium">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5 text-lg font-semibold mb-6"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    Sign In
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  type="button"
                  className="flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <i className="fab fa-google text-red-500"></i>
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <i className="fas fa-phone text-farm-green"></i>
                  <span>Phone</span>
                </button>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-farm-green hover:text-farm-dark font-semibold">
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-farm-dark">50K+</div>
              <div className="text-sm text-gray-600">Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-farm-dark">100+</div>
              <div className="text-sm text-gray-600">Crops</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-farm-dark">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;