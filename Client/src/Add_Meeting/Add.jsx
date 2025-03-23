import React, { useState, useEffect } from "react";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import { ADToBS } from "bikram-sambat-js";
import axios from "axios";

const Add = () => {
    // Function to convert 24-hour time to 12-hour AM/PM format
    const formatTime = (timeStr) => {
        if (!timeStr) return "";
        const [hours, minutes] = timeStr.split(":");
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minutes} ${ampm}`;
    };

    // State for meetings
    const [meetings, setMeetings] = useState([]);
    const [newMeeting, setNewMeeting] = useState({ date: "", type: "", location: "", description: "", time: "", priority: "normal" });
    const [editingId, setEditingId] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(true);

    const handleChange = (e) => {
        setNewMeeting({ ...newMeeting, [e.target.name]: e.target.value });
    };

    // nepali date picker functionality
    useEffect(() => {
        // Ensure default date is set on component mount
        setNewMeeting((prev) => ({ ...prev, date: todayBS }));
    }, []); // Runs only once on mount


    const todayBS = ADToBS(new Date()); // Convert AD to BS
    const handleDateChange = (date) => {
        if (date < todayBS) {
            alert("Past Date cannot be selected!!");
            setNewMeeting((prev) => ({ ...prev, date: "" })); // Reset date to empty
        } else {
            setNewMeeting({ ...newMeeting, date });
        }
    };

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:5001/api/meetings", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch meetings");

                let data = await response.json();

                // Ensure valid meetings are sorted properly
                data = data.filter(meeting => meeting.date && meeting.time); // Remove invalid entries

                data.sort((a, b) => {
                    const dateA = new Date(a.date); // Convert date to Date object
                    const dateB = new Date(b.date);

                    if (dateA - dateB !== 0) {
                        return dateA - dateB; // First, sort by date
                    }

                    // Convert time to proper 24-hour format
                    const [hourA, minuteA] = a.time.split(":").map(Number);
                    const [hourB, minuteB] = b.time.split(":").map(Number);

                    return hourA * 60 + minuteA - (hourB * 60 + minuteB); // Then sort by time
                });

                setMeetings(data);
            } catch (error) {
                console.error("Error fetching meetings:", error);
                setMeetings([]); // Prevent blank page
            }
        };

        fetchMeetings();
    }, []);



    const handleEdit = (meeting) => {
        setNewMeeting({
            ...meeting,
            date: meeting.date.includes("T") ? meeting.date.split("T")[0] : meeting.date,  // Ensure a valid date is set
        });
        setEditingId(meeting._id);
        setIsFormVisible(true);
    };

    const handleAddOrEditMeeting = async () => {
        console.log(newMeeting);
        if (!newMeeting.date || !newMeeting.type || !newMeeting.location || !newMeeting.description || !newMeeting.time) {
            alert("Please fill in all required fields.");
            return;
        }
    
        const payload = {
            date: newMeeting.date.toString(),
            type: newMeeting.type.trim(),
            location: newMeeting.location.trim(),
            description: newMeeting.description.trim(),
            time: newMeeting.time.toString(),
            priority: newMeeting.priority || "normal",
        };
    
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Token is missing or invalid. Please log in again.");
            return;
        }
    
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
    
        try {
            let response;
            if (editingId) {
                // Update existing meeting
                response = await axios.put(`http://localhost:5001/api/meetings/${editingId}`, payload, config);
                setMeetings((prevMeetings) => {
                    const updatedMeetings = prevMeetings.map((meeting) =>
                        meeting._id === editingId ? response.data : meeting
                    );
                    return sortMeetings(updatedMeetings); // Sort after update
                });
                setEditingId(null);
            } else {
                // Create new meeting
                response = await axios.post("http://localhost:5001/api/meetings", payload, config);
                setMeetings((prevMeetings) => sortMeetings([...prevMeetings, response.data])); // Sort after adding
            }
    
            setNewMeeting({
                date: todayBS,
                type: "",
                location: "",
                description: "",
                time: "",
                priority: "normal",
            });
            setIsFormVisible(false);
        } catch (error) {
            console.error("Error saving meeting:", error.response?.data || error.message);
        }
    };
    const sortMeetings = (meetingsList) => {
        return [...meetingsList].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
    
            if (dateA - dateB !== 0) {
                return dateA - dateB; // Sort by date first
            }
    
            const [hourA, minuteA] = a.time.split(":").map(Number);
            const [hourB, minuteB] = b.time.split(":").map(Number);
    
            return hourA * 60 + minuteA - (hourB * 60 + minuteB); // Then sort by time
        });
    };
    

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Token is missing or invalid. Please log in again.");
                return;
            }

            await axios.delete(`http://localhost:5001/api/meetings/${id}`, {
                headers: { Authorization: `Bearer ${token} ` },
            });

            setMeetings((prevMeetings) => prevMeetings.filter((meeting) => meeting._id !== id));
            console.log("Meeting deleted successfully");
        } catch (error) {
            console.error("Error deleting meeting:", error.response?.data || error.message);
        }
    };
    // Pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    const meetingsPerPage = 10;
    const indexOfLastMeeting = currentPage * meetingsPerPage;
    const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
    const currentMeetings = meetings.slice(indexOfFirstMeeting, indexOfLastMeeting);

    const totalPages = Math.ceil(meetings.length / meetingsPerPage);
    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
    };

    return (
        <>
            {isFormVisible && (
                <div className="left-[9vw] md:left-[24vw] lg:left-[29vw] xl:left-[34vw]
                                right-[9vw] md:right-[24vw] lg:right-[29vw] xl:right-[34vw]
                                p-[1vw] md:p-[1vw]
                                mt-[2vh] md:mt-[6vh]
                                w-[80vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw]
                                bg-gray-150 shadow-2xl rounded-2xl relative">
                    <button
                        onClick={() => setIsFormVisible(false)}
                        className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                        X
                    </button>
                    <h2 className="text-xl p-4 flex justify-center font-sans text-blue-700  mb-4">Manage Meetings</h2>

                    <NepaliDatePicker
                        value={newMeeting.date}
                        onChange={handleDateChange}
                        inputClassName="border p-2 w-full mb-2"
                        placeholder="Select Nepali Date"
                        options={{ calenderLocale: "ne", valueLocale: "en", }} // Ensures localization
                    />

                    <input
                        type="text"
                        name="type"
                        placeholder="Meeting Type"
                        value={newMeeting.type}
                        onChange={handleChange}
                        autoComplete="off"
                        className="border p-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={newMeeting.location}
                        onChange={handleChange}
                        autoComplete="off"
                        className="border p-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        autoComplete="off"
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

                    <div className="mb-2">
                        <label className="mr-4">Priority:</label>
                        <label className="mr-2">
                            <input
                                type="radio"
                                name="priority"
                                value="normal"
                                checked={newMeeting.priority === "normal"}
                                onChange={handleChange}
                                className="mr-1"
                            />
                            Normal
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="priority"
                                value="high"
                                checked={newMeeting.priority === "high"}
                                onChange={handleChange}
                                className="mr-1"
                            />
                            High
                        </label>
                    </div>

                    <button
                        onClick={handleAddOrEditMeeting}
                        disabled={!newMeeting.date || !newMeeting.type || !newMeeting.location || !newMeeting.description || !newMeeting.time}
                        className={`px-4 py-2 rounded-md w-full ${!newMeeting.date || !newMeeting.type || !newMeeting.location || !newMeeting.description || !newMeeting.time
                            ? "bg-gray-400 cursor-not-allowed"
                            : editingId !== null
                                ? "bg-yellow-500" // Update Meeting (Yellow)
                                : "bg-green-500" // Add Meeting (Green)
                            }`}
                    >
                        {editingId !== null ? "Update Meeting" : "Add Meeting"}
                    </button>
                </div>
            )}

            {/* Add button */}
            {!isFormVisible && (
                <div className="flex justify-center p-4 mt-[20px]">
                    <button
                        onClick={() => setIsFormVisible(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                    >
                        Add New
                    </button>
                </div>
            )}

            {/* Show "No Meetings" when there are no meetings */}
          {meetings.length === 0 ? (
            <div className="text-center text-lg font-semibold text-gray-600 p-4">
              No Meetings 
            </div>
          ) : (
           
            <div className={`overflow-x-auto p-1 md:p-4 ${isFormVisible ? 'mt-[1vh] md:mt-[1vh]' : 'mt-[2vh] md:mt-[2vh]'}`}>
                <table className="w-full border-collapse border border-gray-400">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border w-[3vw] p-2">SN</th>
                            <th className="border w-[11vw] p-2">Date (BS)</th>
                            <th className="border w-[9vw] p-2">Time</th>
                            <th className="border w-[21vw] p-2">Meeting Type</th>
                            <th className="border w-[20vw] p-2">Location</th>
                            <th className="border w-[20vw] p-2">Description</th>
                            <th className="border w-[6vw] p-2">Priority</th>
                            <th className="border w-[10vw] p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentMeetings.map((meeting, index) => (
                            <tr key={index} className="text-center hover:bg-gray-100 odd:bg-white">
                                <td className="border p-2">{(currentPage - 1) * meetingsPerPage + index + 1}</td>
                                <td className="border p-2">{formatDate(meeting.date)}</td>
                                <td className="border p-2">{formatTime(meeting.time)}</td>
                                <td className="border p-2">{meeting.type}</td>
                                <td className="border p-2">{meeting.location}</td>
                                <td className="border p-2">{meeting.description}</td>
                                <td className="border p-2">{meeting.priority}</td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => handleEdit(meeting)}
                                        className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(meeting._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          )}
            {/* Pagination - Show only when meetings exist */}
            {meetings.length > meetingsPerPage && (
                <div className="flex justify-center mt-4 space-x-3">
                  <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className={`px-2 py-1 bg-blue-600 text-white rounded-4xl ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                    }`}
                  >
                    Prev
                  </button>
                  <span className="text-md font-sans">
                    {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-2 py-1 bg-blue-600 text-white rounded-4xl ${
                      currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            
        </>
    );
};

export default Add;
