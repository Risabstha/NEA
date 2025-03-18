import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdLogout } from "react-icons/md";

const MdMeeting_Filter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); //  Get the current route
    const handleIsOpen = () => setIsOpen(!isOpen);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token
        navigate("/"); // Redirect to login page
    };

    return (
        <>
            {/* Filtering meeting  */}
            <div className="bg-gray-200 p-1 md:pt-[1vh] flex justify-center relative items-center">
                <h2 className="text-3xl text-center font-sans text-blue-700 p-[1vh] md:pt-1 md:pb-3">
                    Meeting Schedule
                </h2>

                <button
                    onClick={handleLogout}
                    className="absolute right-5 text-black text-3xl p-2 hover:text-blue-600 "
                >
                    <MdLogout />
                </button>
            </div>


            {/* using aboslute position, so div will be positioned according to it's nearest relative ancestor or window -> used for Floating Effect */}
            <div className='top-[25vh] md:top-[34vh]  
                            ml-[5vw] md:ml-[23vw] lg:ml-[25vw] xl:ml-[30vw]
                            w-[90vw] md:w-[54vw] lg:w-[50vw] xl:w-[40vw]
                            rounded-4xl
                            bg-gray-300 '>

                {/*  Desktop View */}
                {/* md: it applies css for display with pixel > apprx. 750 , ones with no specifiers are known as default that apply css only if all specified display sizes req. don't meet*/}
                <div className=" w-[90vw] md:w-[54vw] lg:w-[50vw] xl:w-[40vw] 
                                        min-h-[4vh] 
                                        pl-[2vw] md:pl-[4vw] lg:pl-[5vw] xl:pl-[4.5vw]
                                        pr-[2vw] md:pr-[4vw] lg:pr-[5vw] xl:pr-[4.5vw] 
                                        flex justify-between items-center">

                    <Link
                        to="/mdhome/yesterday"
                        className={`text-black p-[0.5vw] hover:text-white hover:rounded-4xl hover:bg-blue-700 
                                ${location.pathname === "/mdhome/yesterday" ? "bg-blue-600 p-[0.5vw] text-white rounded-4xl" : ""}`}
                    >{/* ternary operator */}
                        Yesterday
                    </Link>

                    {/* relative index  */}
                    <Link
                        to="/mdhome"
                        className={`text-black p-[0.5vw] hover:text-white hover:rounded-4xl hover:bg-blue-700
                                ${location.pathname === "/mdhome" ? "bg-blue-600 p-[0.5vw] text-white rounded-4xl" : ""}`}
                    >{/* ternary operator */}
                        Today
                    </Link>
                    <Link
                        to="/mdhome/tomorrow"
                        className={`text-black p-[0.5vw] hover:text-white hover:rounded-4xl hover:bg-blue-700 
                                ${location.pathname === "/mdhome/tomorrow" ? "bg-blue-600 p-[0.5vw] text-white rounded-4xl" : ""}`}
                    >{/* ternary operator */}
                        Tommorrow
                    </Link>
                    <Link
                        to="/mdhome/overmorrow"
                        className={`text-black p-[0.5vw]  hover:text-white hover:rounded-4xl hover:bg-blue-700  
                                ${location.pathname === "/mdhome/overmorrow" ? "bg-blue-600 p-[0.5vw] text-white rounded-4xl" : ""}`}
                    >{/* ternary operator */}
                        Overmorrow
                    </Link>
                </div>


            </div>
        </>
    );

}

export default MdMeeting_Filter;