import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ isAuthenticated, onLogout, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home', icon: 'fa-home' },
    { path: '/recommendation', label: 'Crop Advisor', icon: 'fa-leaf' },
    { path: '/dashboard', label: 'Dashboard', icon: 'fa-chart-bar', auth: true },
    { path: '/market', label: 'Market Prices', icon: 'fa-tag' },
    { path: '/weather', label: 'Weather', icon: 'fa-cloud-sun' },
  ];

  return (
    <nav className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo - Green Theme */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-farm-green to-green-600 rounded-2xl flex items-center justify-center shadow-md">
                <i className="fas fa-seedling text-2xl text-white"></i>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-2 border-white shadow-sm"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 font-roboto-slab tracking-tight">
                <span className="text-farm-green">Agro</span>
                <span className="text-gray-800">Advisor</span>
              </span>
              <p className="text-xs text-gray-500 font-medium tracking-wide">Smart Farming Platform</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              if (link.auth && !isAuthenticated) return null;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-farm-green border border-green-200 shadow-sm'
                      : 'text-gray-700 hover:text-farm-green hover:bg-green-50'
                  }`}
                >
                  <i className={`fas ${link.icon} text-lg ${
                    location.pathname === link.path ? 'text-farm-green' : 'text-gray-500'
                  }`}></i>
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full border border-green-200">
                  <div className="w-9 h-9 bg-gradient-to-br from-farm-green to-green-600 rounded-full flex items-center justify-center shadow-sm">
                    <i className="fas fa-user text-white text-sm"></i>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-800">{user?.name || 'Farmer'}</span>
                    <span className="text-xs text-gray-500">Premium Member</span>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-4 py-2.5 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-gray-200 hover:border-red-200"
                >
                  <i className="fas fa-sign-out-alt"></i>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex space-x-3 ml-4">
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-6 py-2.5 text-gray-700 hover:text-farm-green hover:bg-green-50 rounded-xl font-medium transition-all border border-gray-200 hover:border-green-300"
                >
                  <i className="fas fa-sign-in-alt"></i>
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-2 bg-gradient-to-r from-farm-green to-green-600 hover:from-green-600 hover:to-farm-dark text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
                >
                  <i className="fas fa-user-plus"></i>
                  <span>Get Started Free</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-farm-green hover:bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times text-2xl' : 'fa-bars text-xl'}`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white rounded-b-2xl shadow-lg animate-fadeIn">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                if (link.auth && !isAuthenticated) return null;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-3 px-5 py-4 rounded-xl transition-all ${
                      location.pathname === link.path
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-farm-green font-semibold border border-green-200'
                        : 'text-gray-700 hover:text-farm-green hover:bg-green-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      location.pathname === link.path
                        ? 'bg-farm-green text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <i className={`fas ${link.icon}`}></i>
                    </div>
                    <span className="font-medium">{link.label}</span>
                    {location.pathname === link.path && (
                      <div className="ml-auto w-2 h-2 bg-farm-green rounded-full"></div>
                    )}
                  </Link>
                );
              })}

              {isAuthenticated ? (
                <>
                  <div className="px-5 py-4 border-t border-gray-100 mt-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-farm-green to-green-600 rounded-xl flex items-center justify-center shadow-md">
                        <i className="fas fa-user text-white"></i>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{user?.name || 'Farmer'}</p>
                        <p className="text-sm text-gray-500">{user?.email || 'Premium Member'}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 px-5 py-4 text-red-600 hover:bg-red-50 rounded-xl transition-all mt-2 border border-red-100"
                  >
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-sign-out-alt text-red-600"></i>
                    </div>
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3 mt-2 px-5">
                    <Link
                      to="/login"
                      className="text-center px-4 py-3.5 text-gray-700 hover:text-farm-green hover:bg-green-50 rounded-xl font-medium border border-gray-200 hover:border-green-300 transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <i className="fas fa-sign-in-alt"></i>
                        <span>Login</span>
                      </div>
                    </Link>
                    <Link
                      to="/register"
                      className="text-center px-4 py-3.5 bg-gradient-to-r from-farm-green to-green-600 text-white rounded-xl font-medium shadow-sm hover:shadow transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <i className="fas fa-user-plus"></i>
                        <span>Register</span>
                      </div>
                    </Link>
                  </div>
                </>
              )}
              
              {/* Mobile Footer */}
              <div className="px-5 pt-4 mt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <i className="fas fa-headset text-farm-green mr-2"></i>
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-shield-alt text-farm-green mr-2"></i>
                    <span>Secure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;