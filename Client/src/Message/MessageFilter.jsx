import React from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import nealogo from "../assets/NEALOGO.png"

const MessageFilter = () => {
    // const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); //  Get the current route
    // const handleIsOpen = () => setIsOpen(!isOpen);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token
        navigate("/"); // Redirect to login page
    };

    return (
        <>                
                {/* Filtering meeting  */}
                <div className=" bg-gray-200 p-1 md:pt-[1vh]  md:mt-[1vh]">
                <h2 className="text-xl text-center font-semibold text-blue-700 p-[1vh] md:pt-[3vh] md:pb-[2vh]">SMS</h2>
                </div>
 
            {/* using aboslute position, so div will be positioned according to it's nearest relative ancestor or window -> used for Floating Effect */}
            <div className='top-[25vh] md:top-[34vh]  
                                        ml-[5vw] md:ml-[23vw] lg:ml-[25vw] xl:ml-[30vw]
                                        w-[90vw] md:w-[54vw] lg:w-[50vw] xl:w-[40vw]
                                        rounded-4xl mb-[5vh]
                                        bg-gray-300 '>
                                    
                                    {/*  Desktop View */}
                                    {/* md: it applies css for display with pixel > apprx. 750 , ones with no specifiers are known as default that apply css only if all specified display sizes req. don't meet*/}
                                    <div className=" w-[90vw] md:w-[54vw] lg:w-[50vw] xl:w-[40vw] 
                                                    min-h-[4vh]  text-sm py-[0.5vh] 
                                                    pl-[2vw] md:pl-[4vw] lg:pl-[5vw] xl:pl-[4vw]
                                                    pr-[2vw] md:pr-[4vw] lg:pr-[5vw] xl:pr-[4vw] 
                                                    flex justify-between items-center space-x-[1vw]">
                                    
                                        
                                        {/* relative index  */}
                                        <Link 
                                            to= "/smsMeeting"     
                                            className={`text-black  p-[0.5vh] px-[1vw] hover:text-white hover:rounded-4xl hover:px-[1vw] hover:p-[0.5vh] hover:bg-blue-700
                                            ${location.pathname === "/smsMeeting" ? "bg-blue-600 p-[0.5vh] px-[1vw] text-white rounded-4xl" : ""}`}      
                                            >{/* ternary operator */}
                                            Today
                                        </Link>
                                        <Link 
                                            to="/smsMeeting/smsTomorrow" 
                                            className={`text-black  p-[0.5vh] px-[1vw] hover:text-white hover:rounded-4xl hover:px-[1vw] hover:p-[0.5vh] hover:bg-blue-700 
                                            ${location.pathname === "/smsMeeting/smsTomorrow" ? "bg-blue-600 p-[0.5vh] px-[1vw] text-white rounded-4xl" : ""}`}      
                                            >{/* ternary operator */}
                                            Tomorrow
                                        </Link>
                                        <Link 
                                            to="/smsMeeting/smsOvermorrow" 
                                            className={`text-black p-[0.5vh] px-[1vw]  hover:text-white hover:rounded-4xl hover:px-[1vw] hover:p-[0.5vh] hover:bg-blue-700  
                                            ${location.pathname === "/smsMeeting/smsOvermorrow" ? "bg-blue-600 p-[0.5vh] px-[1vw] text-white rounded-4xl" : ""}`}      
                                            >{/* ternary operator */}
                                            Overmorrow
                                        </Link>
                                    </div>
                                    
               
                        </div>
        </>
    );

}

export default MessageFilter;


