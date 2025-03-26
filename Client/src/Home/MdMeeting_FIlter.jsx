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
            <div className=''>
                <div className="rounded-b-3xl h-[10vh]" style={{ backgroundColor: "#C0C0C0" }}>
                    {/* LOGO section */}
                    <div className='flex justify-center h-[4vh] p-[1.5vh] md:pt-[1vh] md:w-[98vw] md:h-[10vh] md:pb-[1vh]'>
                        <img className='' src="./NEALOGO.png" alt="NEA LOGO" />
                    </div>
                    {/* h-[12vh] -> defines the height so p-[1.5vh] can be used to reize the image*/}
                </div>

                {/* Filtering meeting  */}
                <div className="bg-gray-200 px-1 md:pt-[1vh] flex justify-center relative items-center">
                    <h2 className="text-xl text-center font-sans text-blue-700 mb-[2vh] px-[1vh] md:pt-1 ">
                        MD Meeting Schedule
                    </h2>

                    <button
                        onClick={handleLogout}
                        className="absolute right-5 text-black text-3xl p-2 hover:text-blue-600 "
                    >
                        <MdLogout />
                    </button>
                </div>
            </div>



            {/* using aboslute position, so div will be positioned according to it's nearest relative ancestor or window -> used for Floating Effect */}
            <div className='top-[25vh] md:top-[24vh]  
                            ml-[5vw] md:ml-[23vw] lg:ml-[25vw] xl:ml-[30vw]
                            w-[90vw] md:w-[54vw] lg:w-[50vw] xl:w-[40vw]
                            rounded-4xl text-sm
                            bg-gray-300 '>

                {/*  Desktop View */}
                {/* md: it applies css for display with pixel > apprx. 750 , ones with no specifiers are known as default that apply css only if all specified display sizes req. don't meet*/}
                {/* // add it to desktop view */}
                <div className=" w-[90vw] md:w-[54vw] lg:w-[50vw] xl:w-[40vw] 
                    min-h-[5.5vh]  text-xl
                    pl-[2vw] md:pl-[4vw] lg:pl-[5vw] xl:pl-[4vw]
                    pr-[2vw] md:pr-[4vw] lg:pr-[5vw] xl:pr-[4vw] 
                    flex justify-between items-center">

                    <Link
                        to="/mdhome/yesterday"
                        className={`text-black  p-[0.5vh] px-[2vw] hover:text-white hover:px-[2vw] hover:p-[0.5vh] hover:rounded-4xl hover:bg-blue-700 
${location.pathname === "/mdhome/yesterday" ? "bg-blue-600 py-[0.5vh] px-[2vw]  text-white rounded-4xl" : ""}`}
                    >{/* ternary operator */}
                        हिजो
                    </Link>

                    {/* relative index  */}
                    <Link
                        to="/mdhome"
                        className={`text-black p-[0.5vh] px-[2vw] hover:text-white hover:px-[2vw] hover:p-[0.5vh] hover:rounded-4xl hover:bg-blue-700
${location.pathname === "/mdhome" ? "bg-blue-600 py-[0.5vh] px-[2vw]    text-white rounded-4xl" : ""}`}
                    >{/* ternary operator */}
                        आज      
                    </Link>
                    <Link
                        to="/mdhome/tomorrow"
                        className={`text-black p-[0.5vh] px-[2vw] hover:text-white hover:px-[2vw] hover:p-[0.5vh] hover:rounded-4xl hover:bg-blue-700 
${location.pathname === "/mdhome/tomorrow" ? "bg-blue-600 py-[0.5vh] px-[2vw]   text-white rounded-4xl" : ""}`}
                    >{/* ternary operator */}
                        भोलि  
                    </Link>
                    <Link
                        to="/mdhome/overmorrow"
                        className={`text-black p-[0.5vh] px-[2vw]  hover:text-white hover:px-[2vw] hover:p-[0.5vh] hover:rounded-4xl hover:bg-blue-700  
${location.pathname === "/mdhome/overmorrow" ? "bg-blue-600 py-[0.5vh] px-[2vw] text-white rounded-4xl" : ""}`}
                    >{/* ternary operator */}
                        पर्सी
                    </Link>
                </div>


            </div>
        </>
    );

}

export default MdMeeting_Filter;


