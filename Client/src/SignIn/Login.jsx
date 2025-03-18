import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./ThunderEffect.css"
import logo from "../../public/ThunderEffect.png"; // Import the NEA logo

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false); // To track if there is an error
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
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        // console.log(data);
        localStorage.setItem("token", data.token); // Store token in localStorage

        setErrorMessage(null);   //  Clear the error message

        // Redirect to Home page 
        // and  handling animation 
        e.preventDefault();
        setLoading(true); // Show loading GIF

        setTimeout(() => {
          setLoading(false); // Hide loading GIF after 2 sec
          navigate("/home"); // Redirect to home
        }, 2500);
      } else {
        setErrorMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred, please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="relative w-full max-w-md p-8 bg-opacity-30 backdrop-blur-4xl bg-gray-200 rounded-2xl shadow-2xl">
        <div className="text-center">
          <div className="mx-auto mb-4 items-center justify-center">
            <img src="./NEAText.png" alt="NEA LOGO" />
          </div>
        </div>
        <div className="text-xl font-sans opacity-80 text-center flex justify-center text-blue-700 ">    
            <Link to="/" >
            <div className={`w-40 border-1 hover:bg-blue-700 hover:text-white  hover:border-blue-500 rounded-l-4xl  py-1
          ${location.pathname === "/" ? "bg-blue-600 text-white rounded-l-4xl border-blue-600" : ""}`}>
              Login</div>
  
            </Link>
            <Link to="/mdlogin"  >
            <div className="w-40 border-1 hover:bg-blue-700 hover:text-white hover:border-blue-500 rounded-r-4xl  py-1">MD-Login</div>
            </Link>
          
        </div>

        {errorMessage && <div className={`mt-4 text-center text-lg py-2 rounded-4xl ${errorMessage ? "bg-red-500 text-gray-200" : ""}`}>{errorMessage}</div>}

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4 flex space-x-2">
            <img src="./username.png" className="w-7 h-7 m-2 " alt="user" />
            <input
              type="test"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              autoComplete="off"
              className="w-full px-4 py-2  bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <div className="mb-4 flex space-x-2">
              <img src="./password.png" className="w-7 h-7 m-2 " alt="Password" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 bg-gray-100 bg-opacity-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>


          {/* Animation after login sucessfull */}
          {loading ? (
            <div className="flex justify-center mt-4 ">
              <div className="flex items-center justify-center h-20 p-0 m-0 bg-transparent"> {/*  frame height */}
                <div className="relative flex justify-center mt-1 w-24 h-24"> {/* container size */}

                  {/* NEA Logo */}
                  <img src={logo} alt="ThunderEffect" className="absolute w-20 h-20" /> {/* // logo size */}

                  {/* Flashing Thunder Animation */}
                  <svg
                    className="absolute top-10 left-11 w-11 h-13 transform -translate-x-1/2 -translate-y-1/2"
                    viewBox="0 0 100 100"
                  >
                    <polygon
                      className="fill-[#010c2a] stroke-[#05173df1] stroke-[1] drop-shadow-[0_0_5px_#04377e] opacity-0 animate-thunder-flash"
                      points="48.5,24.5 10,95.5 46.5,51 68,73.5 97.5,1 70,48.5 48.5,24.5"
                    />
                  </svg>

                </div>
              </div>
            </div>

          ) : ""}

          <div className="flex justify-center ">
            <button type="submit" className="py-2 w-40 text-white bg-blue-600 rounded-4xl hover:bg-blue-800">
              Sign In
            </button>
          </div>

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