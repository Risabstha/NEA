import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";

const PA_panel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); //  Get the current route
    const handleIsOpen = () => setIsOpen(!isOpen);

    const [meetings, setMeeting] = useState([{
        date: "2025-03-06",
        type: "Project Discussion",
        description: "Discuss project timeline and deliverables.",
        time: "10:00 AM",
      },
      {
        date: "2025-03-07",
        type: "Client Meeting",
        description: "Meeting with the client to present progress.",
        time: "02:30 PM",
      },
      {
        date: "2025-03-08",
        type: "Team Standup",
        description: "Daily standup meeting for task updates.",
        time: "09:00 AM",
      },
      {
        date: "2025-03-06",
        type: "Project Discussion",
        description: "Discuss project timeline and deliverables.",
        time: "10:00 AM",
      },
      {
        date: "2025-03-07",
        type: "Client Meeting",
        description: "Meeting with the client to present progress.",
        time: "02:30 PM",
      },
      {
        date: "2025-03-08",
        type: "Team Standup",
        description: "Daily standup meeting for task updates.",
        time: "09:00 AM",
      },
      {
        date: "2025-03-06",
        type: "Project Discussion",
        description: "Discuss project timeline and deliverables.",
        time: "10:00 AM",
      },
      {
        date: "2025-03-07",
        type: "Client Meeting",
        description: "Meeting with the client to present progress.",
        time: "02:30 PM",
      },
      {
        date: "2025-03-08",
        type: "Team Standup",
        description: "Daily standup meeting for task updates.",
        time: "09:00 AM",
      },
      {
        date: "2025-03-06",
        type: "Project Discussion",
        description: "Discuss project timeline and deliverables.",
        time: "10:00 AM",
      },
      {
        date: "2025-03-07",
        type: "Client Meeting",
        description: "Meeting with the client to present progress.",
        time: "02:30 PM",
      },
      {
        date: "2025-03-08",
        type: "Team Standup",
        description: "Daily standup meeting for task updates.",
        time: "09:00 AM",
      },
      {
        date: "2025-03-06",
        type: "Project Discussion",
        description: "Discuss project timeline and deliverables.",
        time: "10:00 AM",
      },
      {
        date: "2025-03-07",
        type: "Client Meeting",
        description: "Meeting with the client to present progress.",
        time: "02:30 PM",
      },
      {
        date: "2025-03-08",
        type: "Team Standup",
        description: "Daily standup meeting for task updates.",
        time: "09:00 AM",
      },
      {
        date: "2025-03-06",
        type: "Project Discussion",
        description: "Discuss project timeline and deliverables.",
        time: "10:00 AM",
      },
      {
        date: "2025-03-07",
        type: "Client Meeting",
        description: "Meeting with the client to present progress.",
        time: "02:30 PM",
      },
      {
        date: "2025-03-08",
        type: "Team Standup",
        description: "Daily standup meeting for task updates.",
        time: "09:00 AM",
      },
      {
        date: "2025-03-06",
        type: "Project Discussion",
        description: "Discuss project timeline and deliverables.",
        time: "10:00 AM",
      },
      {
        date: "2025-03-07",
        type: "Client Meeting",
        description: "Meeting with the client to present progress.",
        time: "02:30 PM",
      },
      {
        date: "2025-03-08",
        type: "Team Standup",
        description: "Daily standup meeting for task updates.",
        time: "09:00 AM",
      },
      {
        date: "2025-03-06",
        type: "Project Discussion",
        description: "Discuss project timeline and deliverables.",
        time: "10:00 AM",
      },
      {
        date: "2025-03-07",
        type: "Client Meeting",
        description: "Meeting with the client to present progress.",
        time: "02:30 PM",
      },
      {
        date: "2025-03-08",
        type: "Team Standup",
        description: "Daily standup meeting for task updates.",
        time: "09:00 AM",
      },]);
    const seeMeeting = ()=>
    {
        fetch().then().catch();
    }
    return (
        <div className='relative'>
            <div className='bg-gray-300'>
                {/* LOGO section */}
                <div className='flex justify-center h-[12vh] p-[1.5vh] md:pt-[3vh] md:w-[98vw] md:h-[20vh] md:pb-[7vh]'>
                    <img className='' src="./nea_logo.png" alt="NEA LOGO" />
                </div>
                {/* h-[12vh] -> defines the height so p-[1.5vh] can be used to reize the image*/}
            </div>
            {/* Nav bar section */}
           
                <nav >
                    {/* using aboslute position, so div will be positioned according to it's nearest relative ancestor or window -> used for Floating Effect */}
                 <div className=' absolute top-[16vh] left-[10vw] right-[10vw] md:w-[80vw] md:rounded-4xl bg-gradient-to-b from-gray-100 to-gray-400'>
                    {/*  Desktop View */}
                    {/* md: it applies css for display with pixel > apprx. 750 , ones with no specifiers are known as default that apply css only if all specified display sizes req. don't meet*/}
                    <div className="w-[80vw] min-h-[7vh] hidden md:flex justify-between items-center">
                        <div className="flex space-x-[1.5vw]">
                            <Link 
                                to="/" 
                                className={`text-black p-[1vw] ml-[3vw] hover:text-gray-300 hover:rounded-4xl hover:bg-gray-900 
                                ${location.pathname === "/" ? "bg-green-500 text-white rounded-4xl" : ""}`}      
                            >{/* ternary operator */}
                                HOME
                            </Link>  
                            <Link 
                                to="/add-meeting" 
                                className={`text-black p-[1vw] hover:text-gray-300 hover:rounded-4xl hover:bg-gray-900 
                                ${location.pathname === "/add-meeting" }`}
                            >
                                Add Meeting
                            </Link>
                        </div>
                        <div className='flex'>
                            <Link
                                to="/login"
                                className={`text-black p-[1vw] mr-[3vw] rounded-4xl hover:bg-gray-900 hover:text-gray-300
                                ${location.pathname === "/login"}`}
                            >
                                Logout                                
                            </Link>
  
                        </div>
                    </div>
                 </div>
                    {/*  Mobile View Menu */}
                    <div className='flex flex-wrap justify-center'>
                        <div className="w-[96vw]  md:hidden flex items-center">                 
                            <Link 
                                to="/" 
                                className={`text-black flex-1 p-2  hover:text-gray-300 hover:bg-gray-900 
                                ${location.pathname === "/" ? "bg-green-500 text-white" : ""}`}
                            >
                                Home
                            </Link>              
                            <button onClick={handleIsOpen} className="text-black p-2 hover:text-gray-300 hover:bg-gray-900 focus:outline-none">
                                ☰
                            </button>
                        </div>

                        {/*  Mobile Dropdown Menu */}
                        {isOpen && (
                            <div className="md:hidden  bg-gray-300">
                                <Link 
                                    to="/add-meeting" 
                                    className={`text-black flex w-[96vw] flex-wrap p-2 hover:text-gray-300 hover:bg-gray-900 
                                    ${location.pathname === "/add-meeting"}`}
                                >
                                    Add Meeting
                                </Link>
                                <button className="text-black p-2 flex w-[96vw] flex-wrap text-left hover:text-gray-300 hover:bg-gray-900">
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>
                    
                </nav>
                        

            {/* Meeting Table */}
            
            <div className=" bg-gray-200 p-1 md:p-4 md:mt-[1vh]">
                <h2 className="text-2xl text-center font-bold p-[1vh] md:p-[3vh] ">Meeting Schedule</h2>

                 {/* Day  */}
                <div className='flex space-x-10  md:mt-[0vh]'>
                    <p>Yesterday</p>
                    <p>Today</p>
                    <p>Tommorrow</p>
                    <p>+2</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-400">
                    <thead>
                        <tr className="bg-gray-200">
                        <th className="border w-[7vw] border-gray-400 px-4 py-2">Date</th>
                        <th className="border w-[20vw] border-gray-400 px-4 py-2">Meeting Type</th>
                        <th className="border w-[30vw] border-gray-400 px-4 py-2">Description</th>
                        <th className="border w-[20vw] border-gray-400 px-4 py-2">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meetings.map((meeting, index) => (
                        <tr key={index} className="text-center hover:bg-gray-100">
                            <td className="border border-gray-400 px-4 py-2">{meeting.date}</td>
                            <td className="border border-gray-400 px-4 py-2">{meeting.type}</td>
                            <td className="border border-gray-400 px-4 py-2">{meeting.description}</td>
                            <td className="border border-gray-400 px-4 py-2">{meeting.time}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
            
    
        </div>
    );
};

export default PA_panel;
