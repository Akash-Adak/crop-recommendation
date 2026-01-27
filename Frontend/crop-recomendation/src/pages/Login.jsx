import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

const Login = ({ onLogin }) => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setServerError("");

    try {
      const response = await loginUser(formData);

      // ✅ store JWT
      localStorage.setItem("token", response.token);
    onLogin(response.user);  
      // ✅ redirect
      navigate("/");
    } catch (error) {
      setServerError(error?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
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
            <h1 className="text-4xl font-bold text-farm-dark mb-4">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to continue to AgroAdvisor</p>
          </div>

          {/* Login Card */}
          <div className="card shadow-2xl">
            <form onSubmit={handleSubmit}>

              {serverError && (
                <p className="text-red-500 text-sm mb-4 text-center">
                  {serverError}
                </p>
              )}

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
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <i className="fas fa-lock absolute left-3 top-4 text-gray-400"></i>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5 text-lg font-semibold mb-6"
              >
                {loading ? (
                  <>
                    <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Signing In...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    Sign In
                  </>
                )}
              </button>

              {/* Register */}
              <div className="text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-farm-green font-semibold">
                    Register here
                  </Link>
                </p>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
