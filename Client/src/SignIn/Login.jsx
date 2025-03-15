import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import loadingAnimation from "../assets/loading.json"; // Import JSON animation
import Lottie from "lottie-react";

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleChange = async (e) => {

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', { // Correct API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        localStorage.setItem("token", data.token); // Store token in localStorage

        // Redirect to Home page
        // navigate("/home");
        e.preventDefault();
        setLoading(true); // Show loading GIF

        setTimeout(() => {
          setLoading(false); // Hide loading GIF after 2 sec
          navigate("/home"); // Redirect to home
        }, 4000);
      } else {
        setErrorMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred, please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="relative w-full max-w-md p-8 bg-opacity-30 backdrop-blur-md bg-gray-300 rounded-2xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto mb-4 items-center justify-center">
            <img src="./nea_logo.png" alt="NEA LOGO" />
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-3">MD Login</h2>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="test"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 bg-gray-200 bg-opacity-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-200 bg-opacity-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {loading ? (
             <div className="flex justify-center mt-4">
                <Lottie animationData={loadingAnimation} className="w-[50vw] h-[15vh] rotate-60" />
             </div>
          ) : ""}

          <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Log In
          </button>

          {errorMessage && <div className="mt-4 text-center text-lg text-red-600">{errorMessage}</div>}
          <div className="mt-4 text-sm text-gray-700 text-center">
            Don't have an account?
            <Link to="/register" className="pl-2 text-sm text-gray-900 hover:text-blue-600">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;