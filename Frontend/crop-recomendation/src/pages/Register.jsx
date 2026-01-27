import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from "../api/auth";

const Register = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    farmSize: '',
    location: '',
    farmType: 'crops',
    agreeTerms: false
  });
   const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }
    
    return newErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors({});
  setServerError("");

  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setErrors({ confirmPassword: "Passwords do not match" });
    return;
  }

  try {
    const payload = {
      username: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    };

    const response = await registerUser(payload);
    console.log(response);
    localStorage.setItem("token", response.token);
    navigate("/dashboard");

  } catch (error) {
    if (Array.isArray(error?.errors)) {
      setServerError(error.errors.join(", "));
    } else {
      setServerError(error?.msg || "Registration failed");
    }
  }
};



  return (
    <div className="min-h-[80vh] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Join AgroAdvisor Community</h1>
          <p className="text-gray-600 mt-2">Create your free account and start smart farming today</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Registration Form */}
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name *</label>
                  <div className="relative">
                    <i className="fas fa-user absolute left-3 top-3 text-gray-400"></i>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input-field pl-10 ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="John Farmer"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Phone Number *</label>
                  <div className="relative">
                    <i className="fas fa-phone absolute left-3 top-3 text-gray-400"></i>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`input-field pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email Address *</label>
                <div className="relative">
                  <i className="fas fa-envelope absolute left-3 top-3 text-gray-400"></i>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input-field pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="farmer@example.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        

          
              </div>

       

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 mb-2">Password *</label>
                  <div className="relative">
                    <i className="fas fa-lock absolute left-3 top-3 text-gray-400"></i>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`input-field pl-10 ${errors.password ? 'border-red-500' : ''}`}
                      placeholder="At least 6 characters"
                    />
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Confirm Password *</label>
                  <div className="relative">
                    <i className="fas fa-lock absolute left-3 top-3 text-gray-400"></i>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`input-field pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      placeholder="Re-enter your password"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-farm-green focus:ring-farm-green mt-1"
                />
                <label className="ml-2 text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-farm-green hover:text-farm-dark">Terms of Service</a> and{' '}
                  <a href="#" className="text-farm-green hover:text-farm-dark">Privacy Policy</a> *
                </label>
              </div>
              {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}

              <button type="submit" className="w-full btn-primary">
                Create Account <i className="fas fa-user-plus ml-2"></i>
              </button>

              <div className="text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-farm-green hover:text-farm-dark font-medium">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Benefits Section */}
          <div>
            <div className="card h-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Benefits of Joining</h3>
              
              <div className="space-y-6">
                {[
                  {
                    icon: 'fa-chart-line',
                    title: 'Personalized Dashboard',
                    desc: 'Track your farm performance and get insights'
                  },
                  {
                    icon: 'fa-cloud-sun',
                    title: 'Weather Alerts',
                    desc: 'Get real-time weather updates for your location'
                  },
                  {
                    icon: 'fa-seedling',
                    title: 'Crop Planning',
                    desc: 'Plan your crops based on season and market demand'
                  },
                  {
                    icon: 'fa-users',
                    title: 'Community Support',
                    desc: 'Connect with other farmers and share experiences'
                  },
                  {
                    icon: 'fa-book',
                    title: 'Learning Resources',
                    desc: 'Access farming guides and best practices'
                  },
                  {
                    icon: 'fa-tags',
                    title: 'Market Access',
                    desc: 'Get better prices with direct market connections'
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-green-50">
                      <i className={`fas ${benefit.icon} text-farm-green`}></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{benefit.title}</h4>
                      <p className="text-gray-600 text-sm">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-green-50 rounded-lg">
                <div className="flex items-start">
                  <i className="fas fa-shield-alt text-green-600 mt-1 mr-3"></i>
                  <div>
                    <h4 className="font-bold text-gray-800">100% Secure & Free</h4>
                    <p className="text-gray-600 text-sm">
                      Your data is protected with enterprise-grade security. No hidden charges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;