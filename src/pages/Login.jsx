import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Stethoscope, Shield } from "lucide-react";
import { signIn } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();
  const [loginType, setLoginType] = useState("patient");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn(formData.email, formData.password);

      if (!result.success) {
        setError(result.error);
        setLoading(false);
        return;
      }

      setCurrentUser(result.user);

      if (result.user.userType === "patient") navigate("/dashboard");
      else if (result.user.userType === "doctor") navigate("/doctor-dashboard");
      else if (result.user.userType === "admin") navigate("/admin-dashboard");

    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="h-12 w-12 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">+</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to MediCare
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your healthcare portal
          </p>
        </div>

        {/* Login Type Selector */}
        <div className="flex rounded-lg overflow-hidden border border-gray-300">
          <button onClick={() => setLoginType("patient")}
            className={`flex-1 py-3 text-sm font-medium ${loginType === "patient" ? "bg-red-600 text-white" : "bg-white text-gray-700"}`}>
            <User className="inline h-4 w-4 mr-2" />Patient
          </button>
          <button onClick={() => setLoginType("doctor")}
            className={`flex-1 py-3 text-sm font-medium ${loginType === "doctor" ? "bg-red-600 text-white" : "bg-white text-gray-700"}`}>
            <Stethoscope className="inline h-4 w-4 mr-2" />Doctor
          </button>
          <button onClick={() => setLoginType("admin")}
            className={`flex-1 py-3 text-sm font-medium ${loginType === "admin" ? "bg-red-600 text-white" : "bg-white text-gray-700"}`}>
            <Shield className="inline h-4 w-4 mr-2" />Admin
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email" required
                className="appearance-none relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="password" required
                className="appearance-none relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" type="checkbox"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>
            <a href="#" className="text-sm font-medium text-red-600 hover:text-red-500">Forgot your password?</a>
          </div>

          <button type="submit" disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none transition duration-300 disabled:opacity-50">
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-red-600 hover:text-red-500">Sign up now</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;