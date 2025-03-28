import React, { useState } from "react";
import { signupUser } from "../api/apiHelper";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "",
    password: "",
    confirmpassword: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
      if (numericValue.length > 10) return; // Prevent more than 10 digits
  
      setFormData({ ...formData, [name]: numericValue });
    } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.phoneNumber || !formData.password || !formData.confirmpassword || !formData.role) {
      setAlertMessage("All fields are required.");
      setIsError(true);
      return;
    }
    if (formData.password !== formData.confirmpassword) {
      setAlertMessage("Passwords do not match!");
      setIsError(true);
      return;
    }
    if (formData.phoneNumber.length != 10 )
    {
      setAlertMessage("Phone number is Incorrect")
      setIsError(true);
      return;
    }

    try {
      const response = await signupUser(formData);
      if (response.status === 201) {
        setAlertMessage("User registered successfully!");
        setIsError(false);
        setFormData({ username: "", phoneNumber:"", password: "", confirmpassword: "", role: "" });
      }
    } catch (error) {
      setAlertMessage(error.response?.data?.message || "Signup failed, try again!");
      setIsError(true);
    }
  };

  return (
      <div className="flex items-center justify-center mt-[8vh] ">
      <div className="relative w-auto h-auto max-w-md px-10 py-6  bg-gray-300 rounded-2xl  ">
        {/* Show Alert Message */}
        {alertMessage && (
          <div
            className={`mt-4 text-center text-lg py-2 rounded-4xl ${isError ? "bg-red-500 text-gray-200" : "bg-green-500 text-gray-200"}`}
          >
            {alertMessage}
          </div>
        )}


        <form className="mt-6 " onSubmit={handleSubmit}>

          {/* Username Field */}
          <div className="mb-4 flex space-x-2">
            <div className="text-2xl m-2">
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

          {/* Phone number field */}
          <div className="mb-4 flex space-x-2">
            <div className="text-2xl m-2">
            <FaPhoneVolume />
            </div>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              autoComplete="off"
              className="w-full px-4 py-2 bg-gray-100 bg-opacity-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 flex space-x-2 items-center">
            <div className="text-2xl m-2">
              <FaLock />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-100 bg-opacity-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-600 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4 flex space-x-2 items-center">
            <div className="text-2xl m-2">
              <FaLock />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 bg-gray-100 bg-opacity-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-gray-600 focus:outline-none"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Role Selection*/}

          <div className=" flex text-xl space-x-[2vw] items-center">
            {/* <label className="text-xl font-sans pl-2 "> Role</label> */}
            <div className="text-2xl m-2 mr-5">
              <FaUsersCog />
            </div>

            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="role"
                value="MD"
                checked={formData.role === "MD"}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
              <span>MD</span>
            </label>

            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="role"
                value="PA"
                checked={formData.role === "PA"}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
              <span>PA</span>
            </label>

            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="role"
                value="GM"
                checked={formData.role === "GM"}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
              <span>GM</span>
            </label>

            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="role"
                value="Admin"
                checked={formData.role === "Admin"}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
              <span>Admin</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="py-2 w-40 text-white bg-blue-600 rounded-4xl hover:bg-blue-800"
            >
              Add
            </button>
          </div>


        </form>
      </div>
    </div>
  );
};

export default Register;
