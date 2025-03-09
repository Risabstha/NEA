import React from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="relative w-full max-w-md p-8 bg-opacity-30 backdrop-blur-md bg-gray-300 rounded-2xl shadow-lg">
        <div className="text-center">
          <div className=" mx-auto mb-4 items-center justify-center">
            <img src="./nea_logo.png" alt="NEA LOGO"></img>
          </div>
        </div>
                  
        <div>
          <h2 className="text-xl font-semibold mt-3 ">MD Login</h2>
        {/* action={} */}
        <form className="mt-6" method="post" >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 bg-gray-200 bg-opacity-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-200 bg-opacity-50  rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Sign In
          </button>
        </form>
          </div>
          

        

        {/* <p className="mt-4 text-sm text-gray-400 text-center">
          Don't have an account? <a href="#" className="text-blue-400">Sign up, it's free</a>
        </p> */}

      </div>
    </div>
  );
};

export default Login;
