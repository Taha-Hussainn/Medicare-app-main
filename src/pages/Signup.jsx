import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Stethoscope, Phone, MapPin } from "lucide-react";
import { signUp } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();
  const [userType, setUserType] = useState("patient");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    specialization: "",
    experience: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const result = await signUp(formData.email, formData.password, {
        name: formData.name,
        userType,
        phone: formData.phone,
        address: formData.address,
        specialization: formData.specialization,
        experience: formData.experience
      });

      if (!result.success) {
        setError(result.error);
        setLoading(false);
        return;
      }

      setCurrentUser(result.user);

      if (userType === "patient") navigate("/dashboard");
      else if (userType === "doctor") navigate("/doctor-dashboard");
      else navigate("/admin-dashboard");

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
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join Nucura today
          </p>
        </div>

        {/* User Type Selector */}
        <div className="flex rounded-lg overflow-hidden border border-gray-300">
          <button onClick={() => setUserType("patient")}
            className={`flex-1 py-3 text-sm font-medium ${userType === "patient" ? "bg-red-600 text-white" : "bg-white text-gray-700"}`}>
            <User className="inline h-4 w-4 mr-2" />Patient
          </button>
          <button onClick={() => setUserType("doctor")}
            className={`flex-1 py-3 text-sm font-medium ${userType === "doctor" ? "bg-red-600 text-white" : "bg-white text-gray-700"}`}>
            <Stethoscope className="inline h-4 w-4 mr-2" />Doctor
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              name="name" type="text" required
              className="w-full pl-10 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              name="email" type="email" required
              className="w-full pl-10 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              name="phone" type="text"
              className="w-full pl-10 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Address */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              name="address" type="text"
              className="w-full pl-10 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {/* Doctor-only fields */}
          {userType === "doctor" && (
            <>
              <div className="relative">
                <Stethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  name="specialization" type="text"
                  className="w-full pl-10 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Specialization (e.g. Cardiologist)"
                  value={formData.specialization}
                  onChange={handleChange}
                />
              </div>
              <input
                name="experience" type="text"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Years of experience"
                value={formData.experience}
                onChange={handleChange}
              />
            </>
          )}

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              name="password" type="password" required
              className="w-full pl-10 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              name="confirmPassword" type="password" required
              className="w-full pl-10 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition duration-300 disabled:opacity-50">
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-red-600 hover:text-red-500">Sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;