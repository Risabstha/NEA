import React, { useState } from 'react'
import { Link, useLocation } from "react-router-dom";

const RoleFilter = () => {
    // const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); //  Get the current route
    // const handleIsOpen = () => setIsOpen(!isOpen);
    return (
        <>
            <div className="flex justify-center">
                <div className="font-semibold text-center text-3xl text-blue-600  mb-[3vh] font-sans">
                    Welcome Admin
                </div>
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
                                        min-h-[4vh]  text-sm py-[0.5vh] 
                                        pl-[2vw] md:pl-[4vw] lg:pl-[5vw] xl:pl-[4vw]
                                        pr-[2vw] md:pr-[4vw] lg:pr-[5vw] xl:pr-[4vw] 
                                        flex justify-between items-center space-x-[1vw]">

                    <Link
                        to="/admin_dashboard"
                        className={`text-black p-[0.5vh] px-[1vw] hover:text-white hover:rounded-4xl hover:px-[1vw] hover:p-[0.5vh]  hover:bg-blue-700 
                                ${location.pathname === "/admin_dashboard" ? "bg-blue-600 py-[0.5vh] px-[1vw] text-white rounded-4xl" : ""}`}
                    >{/* ternary operator */}
                        MD
                    </Link>

                    {/* relative index  */}
                    <Link
                        to="/admin_dashboard/gm"
                        className={`text-black  p-[0.5vh] px-[1vw] hover:text-white hover:rounded-4xl hover:px-[1vw] hover:p-[0.5vh] hover:bg-blue-700
                                ${location.pathname === "/admin_dashboard/gm" ? "bg-blue-600 p-[0.5vh] px-[1vw] text-white rounded-4xl" : ""}`}
                    >{/* ternary operator */}
                        GM
                    </Link>
                    <Link
                        to="/admin_dashboard/pa"
                        className={`text-black  p-[0.5vh] px-[1vw] hover:text-white hover:rounded-4xl hover:px-[1vw] hover:p-[0.5vh] hover:bg-blue-700 
                                ${location.pathname === "/admin_dashboard/pa" ? "bg-blue-600 p-[0.5vh] px-[1vw] text-white rounded-4xl" : ""}`}
                    >{/* ternary operator */}
                        PA
                    </Link>
                    <Link
                        to="/admin_dashboard/admin"
                        className={`text-black p-[0.5vh] px-[1vw]  hover:text-white hover:rounded-4xl hover:px-[1vw] hover:p-[0.5vh] hover:bg-blue-700  
                                ${location.pathname === "/admin_dashboard/admin" ? "bg-blue-600 p-[0.5vh] px-[1vw] text-white rounded-4xl" : ""}`}
                    >{/* ternary operator */}
                        Admin
                    </Link>
                </div>


            </div>
        </>
    );

}

export default RoleFilter;