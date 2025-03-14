import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signupUser } from "../api/apiHelper"; // Assuming the function is imported from apiHelper.js

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [alertMessage, setAlertMessage] = useState(""); // To store the alert message
  const [isError, setIsError] = useState(false); // To track if there is an error

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (!formData.username || !formData.password) {
      setAlertMessage("Both username and password are required.");
      setIsError(true);
      return;
    }

    try {
      const response = await signupUser(formData);
      if (response.status === 201) {
        setAlertMessage("User registered successfully!");
        setIsError(false);
        // Reset the form
        setFormData({ username: "", password: "" });
      }
    } catch (error) {
      setAlertMessage(error.response?.data?.message || "Signup failed, try again!");
      setIsError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="relative w-full max-w-md p-8 bg-opacity-30 backdrop-blur-md bg-gray-300 rounded-2xl shadow-lg">
        <div className="text-center">
          <div className=" mx-auto mb-4 items-center justify-center">
            <img src="./nea_logo.png" alt="NEA LOGO" />
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-3 text-center">MD Register</h2>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
              className="w-full px-4 py-2 bg-gray-200 bg-opacity-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-200 bg-opacity-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        {/* Show Alert Message */}
        {alertMessage && (
          <div
            className={`mt-4 text-center text-lg ${isError ? "text-red-600" : "text-green-600"}`}
          >
            {alertMessage}
          </div>
        )}

        {/* Login Link */}
        <div className="mt-4 text-sm text-gray-700 text-center">
          Already have an account?
          <Link to="/" className="pl-2 text-blue-600 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
