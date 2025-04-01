import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import nealogo from "../assets/NEALOGO.png"

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const handleIsOpen = () => setIsOpen(!isOpen);

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div>
            <div className='relative'>
                <div className="md:rounded-b-3xl" style={{ backgroundColor: "#C0C0C0" }}>
                    {/* LOGO section */}
                    <div className='flex justify-center h-[12vh] p-[1.5vh] md:pt-[3vh] md:w-[98vw] md:h-[20vh] md:pb-[7vh]'>
                        <img src={nealogo} alt="NEA LOGO" />
                    </div>
                </div>

                {/* Nav bar section */}
                <nav>
                    <div className='absolute z-50 top-[16vh] left-[10vw] right-[10vw] md:w-[80vw] md:rounded-4xl bg-gradient-to-b from-gray-100 to-gray-400'>
                        {/* Desktop View */}
                        <div className="w-[80vw] h-[7vh] hidden md:flex justify-between items-center">
                            <div className="flex space-x-[4vw] h-[6vh]">
                                <Link
                                    to="/home"
                                    className={`flex items-center justify-center text-black px-[3vw] p-[0.5vh] ml-[6vw] h-full hover:text-white hover:rounded-4xl hover:px-[3vw] hover:p-[0.5vh] hover:bg-blue-700
                                    ${location.pathname.includes("/home") ? "bg-blue-600 px-[3vw] p-[0.5vh] text-white rounded-4xl" : ""}`}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/add-meeting"
                                    className={`flex items-center justify-center text-black px-[3vw] h-full hover:text-white hover:rounded-4xl hover:bg-blue-700
                                    ${location.pathname === "/add-meeting" ? "bg-blue-600 text-white rounded-4xl" : ""}`}
                                >
                                    Add Meeting
                                </Link>
                                {/* <Link
                                    to="/smsMeeting"
                                    className={`flex items-center justify-center text-black px-[3vw] h-full hover:text-white hover:rounded-4xl hover:bg-blue-700
                                    ${location.pathname === "/smsMeeting" || location.pathname === "/smsMeeting/smsTomorrow" || location.pathname === "/smsMeeting/smsOvermorrow" ? "bg-blue-600 text-white rounded-4xl" : ""}`}
                                >
                                    SMS
                                </Link> */}
                            </div>
                            <div className='flex h-[6vh]'>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center justify-center text-black px-[3vw] mr-[6vw] h-full hover:text-white hover:rounded-4xl hover:bg-blue-700"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile View Menu */}
                    <div className='flex flex-wrap justify-center'>
                        <div className="w-full md:hidden  flex items-center bg-gray-300">
                            <Link
                                to="/home"
                                className={`flex-1 flex items-center justify-center text-black p-2 hover:text-white hover:bg-blue-700
                                ${location.pathname === "/home" ? "bg-blue-600 text-white" : ""}`}
                            >
                                Home
                            </Link>
                            <button onClick={handleIsOpen} className="text-black p-2 hover:text-white hover:bg-blue-700 focus:outline-none">
                                ☰
                            </button>
                        </div>

                        {/* Mobile Dropdown Menu */}
                        {isOpen && (
                            <div className="md:hidden bg-gray-300">
                                <Link
                                    to="/add-meeting"
                                    className={`flex w-[100vw] items-center justify-center p-2 text-black hover:text-white hover:bg-blue-700
                                    ${location.pathname === "/add-meeting" ? "bg-blue-600 text-white" : ""}`}
                                >
                                    Add Meeting
                                </Link>
                                {/* <Link
                                    to="/smsMeeting"
                                    className={`flex w-[100vw] items-center justify-center p-2 text-black hover:text-white hover:bg-blue-700
                                    ${location.pathname === "/smsMeeting" || location.pathname === "/smsMeeting/smsTomorrow" || location.pathname === "/smsMeeting/smsOvermorrow" ? "bg-blue-600 text-white" : ""}`}
                                >
                                    SMS Meeting
                                </Link> */}
                                <Link
                                    to="/"
                                    className="flex w-[100vw] items-center justify-center p-2 text-black hover:bg-blue-700 hover:text-white"
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
};

export default Header;
