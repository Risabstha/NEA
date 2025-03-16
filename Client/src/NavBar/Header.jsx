import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); //  Get the current route
    const handleIsOpen = () => setIsOpen(!isOpen);

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token
        navigate("/"); // Redirect to login page
    };

    return (

        <div>
            <div className='relative'>
            <div className="rounded-b-3xl" style={{ backgroundColor: "#C0C0C0" }}>  


                    {/* LOGO section */}
                    <div className='flex justify-center h-[12vh] p-[1.5vh] md:pt-[3vh] md:w-[98vw] md:h-[20vh] md:pb-[7vh]'>
                        <img className='' src="./NEALOGO.png" alt="NEA LOGO" />
                    </div>
                    {/* h-[12vh] -> defines the height so p-[1.5vh] can be used to reize the image*/}
                </div>

                {/* Nav bar section */}
                <nav >
                    {/* using aboslute position, so div will be positioned according to it's nearest relative ancestor or window -> used for Floating Effect */}
                    <div className=' absolute top-[16vh] left-[10vw] right-[10vw] md:w-[80vw] md:rounded-4xl bg-gradient-to-b from-gray-100 to-gray-400'>
                        {/*  Desktop View */}
                        {/* md: it applies css for display with pixel > apprx. 750 , ones with no specifiers are known as default that apply css only if all specified display sizes req. don't meet*/}
                        <div className="w-[80vw]  h-[7vh] hidden md:flex justify-between items-center">
                            <div className="flex space-x-[4vw] h-[6vh]">
                                <Link
                                    to="/home"
                                    className={`text-black  pl-[3vw] pr-[3vw] p-[1.2vh] ml-[7vw] hover:text-white hover:rounded-4xl hover:bg-blue-700 
                                ${location.pathname === "/home" || location.pathname === "/home/yesterday" || location.pathname === "/home/tomorrow" || location.pathname === "/home/overmorrow" ? "bg-blue-600 text-white rounded-4xl" : ""}`}
                                >{/* ternary operator */}
                                    Home
                                </Link>
                                <Link
                                    to="/add-meeting"
                                    className={`text-black  pl-[3vw] pr-[3vw]  p-[1.2vh] hover:text-white hover:rounded-4xl hover:bg-blue-700 
                                ${location.pathname === "/add-meeting" ? "bg-blue-600 text-white rounded-4xl" : ""}`}
                                >
                                    Add Meeting
                                </Link>
                            </div>
                            <div className='flex'>
                                <button
                                    onClick={handleLogout}
                                    className="text-black  pl-[3vw] pr-[3vw] mr-[7vw] p-[1.2vh] hover:text-white hover:rounded-4xl hover:bg-blue-700 "
                                >
                                    Logout
                                </button>

                            </div>
                        </div>
                    </div>
                    {/*  Mobile View Menu */}
                    <div className='flex flex-wrap justify-center'>
                        <div className="w-[96vw]  md:hidden flex items-center bg-gray-300">
                            <Link
                                to="/home"
                                className={`text-black flex-1 p-2  hover:text-white hover:bg-blue-700
                                ${location.pathname === "/home" ? "bg-blue-600 text-white" : ""}`}
                            >
                                Home
                            </Link>
                            <button onClick={handleIsOpen} className="text-black p-2 hover:text-white hover:bg-blue-700 focus:outline-none">
                                ☰
                            </button>
                        </div>

                        {/*  Mobile Dropdown Menu */}
                        {isOpen && (
                            <div className="md:hidden  bg-gray-300">
                                <Link
                                    to="/add-meeting"
                                    className={`text-black flex w-[96vw] flex-wrap p-2 hover:text-white hover:bg-blue-700
                                    ${location.pathname === "/add-meeting" ? "bg-blue-600 text-white " : ""}`}
                                >
                                    Add Meeting
                                </Link>

                                {/* absolute index */}
                                <Link
                                    to="/"
                                    className={`text-black p-2 flex w-[96vw] flex-wrap text-left hover:bg-blue-700 hover:text-white
                                ${location.pathname === "/"}`}
                                >
                                    Logout
                                </Link>
                            </div>
                        )}
                    </div>

                </nav>
            </div>
        </div>
    );
}
export default Header;