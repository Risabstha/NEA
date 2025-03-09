import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";

const Add_Meeting = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); //  Get the current route
    const handleIsOpen = () => setIsOpen(!isOpen);

    // Add/ Edit/ Delete
    const [meetings, setMeetings] = useState([]);
    const [newMeeting, setNewMeeting] = useState({ date: "", type: "", description: "", time: "" });
    const [editingIndex, setEditingIndex] = useState(null);

    const handleChange = (e) => {
        setNewMeeting({ ...newMeeting, [e.target.name]: e.target.value });
    };

    const handleAddOrEditMeeting = () => {
        if (editingIndex !== null) {
        const updatedMeetings = [...meetings];
        updatedMeetings[editingIndex] = newMeeting;
        setMeetings(updatedMeetings);
        setEditingIndex(null);
        } else {
        setMeetings([...meetings, newMeeting]);
        }
        setNewMeeting({ date: "", type: "", description: "", time: "" });
    };

    const handleEdit = (index) => {
        setNewMeeting(meetings[index]);
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        setMeetings(meetings.filter((_, i) => i !== index));
    };

    return (
        <div className='relative'>
            <div className='bg-gray-300'>
                {/* LOGO section */}
                <div className='flex justify-center h-[12vh] p-[1.5vh] md:pt-[3vh] md:w-[100vw] md:h-[20vh] md:pb-[7vh]'>
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
                                ${location.pathname === "/" }`}      
                            >{/* ternary operator */}
                                HOME
                            </Link>  
                            <Link 
                                to="/add-meeting" 
                                className={`text-black p-[1vw] hover:text-gray-300 hover:rounded-4xl hover:bg-gray-900 
                                ${location.pathname === "/add-meeting" ? "bg-green-500 text-white rounded-4xl" : ""}`}
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
                                ${location.pathname === "/" }`}
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
                                    ${location.pathname === "/add-meeting" ? "bg-green-500 text-white " : ""}`}
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

                {/* Add/ Edit/ Delete */}
                <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-4">Manage Meetings</h2>
        
        <input
            type="date"
            name="date"
            value={newMeeting.date}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
        />
        <input
            type="text"
            name="type"
            placeholder="Meeting Type"
            value={newMeeting.type}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
        />
        <input
            type="text"
            name="description"
            placeholder="Description"
            value={newMeeting.description}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
        />
        <input
            type="time"
            name="time"
            value={newMeeting.time}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
        />

        <button onClick={handleAddOrEditMeeting} className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
            {editingIndex !== null ? "Update Meeting" : "Add Meeting"}
        </button>

        <table className="w-full mt-4 border">
            <thead>
            <tr className="bg-gray-200">
                <th className="border p-2">Date</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Time</th>
                <th className="border p-2">Actions</th>
            </tr>
            </thead>
            <tbody>
            {meetings.map((meeting, index) => (
                <tr key={index} className="text-center">
                <td className="border p-2">{meeting.date}</td>
                <td className="border p-2">{meeting.type}</td>
                <td className="border p-2">{meeting.description}</td>
                <td className="border p-2">{meeting.time}</td>
                <td className="border p-2">
                    <button onClick={() => handleEdit(index)} className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded">Edit</button>
                    <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
            </div>
            
        
    );
}
export default Add_Meeting
