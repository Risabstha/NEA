import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signupUser } from "../api/apiHelper"; // Assuming the function is imported from apiHelper.js
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="relative w-full max-w-md p-8 bg-opacity-30 backdrop-blur-4xl bg-gray-200 rounded-2xl shadow-2xl">
        <div className="text-center">
          <div className=" mx-auto mb-4 items-center justify-center">
            <img src="./NEAText.png" alt="NEA LOGO" />
          </div>
        </div>

        <h2 className="text-2xl opacity-80 font-sans text-center text-blue-700 my-3">Register</h2>

        {/* Show Alert Message */}
        {alertMessage && (
          <div
            className={`mt-4 text-center text-lg py-2 rounded-4xl ${isError ? "bg-red-500 text-gray-200" : "bg-green-500 text-gray-200"}`}
          >
            {alertMessage}
          </div>
        )}

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4 flex space-x-2">
            <div className="text-2xl m-2 ">
              <FaUserAlt />
            </div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
              autoComplete="off"
              className="w-full px-4 py-2 bg-gray-100 bg-opacity-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4 flex space-x-2">
            <div className="text-2xl m-2 ">
              <FaLock />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-100 bg-opacity-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-center ">
            <button
              type="submit"
              className="py-2 w-40 text-white bg-blue-600 rounded-4xl hover:bg-blue-800"
            >
              Sign Up
            </button>
          </div>

        </form>

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
