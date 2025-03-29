import React, { useState, useEffect } from "react";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import { ADToBS, BSToAD } from "bikram-sambat-js";
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

    const [sortOrder, setSortOrder] = useState("asc"); // State for sorting order

    // Function to handle sorting by date
    const handleSortByDate = () => {
        const newOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newOrder);

        const sortedMeetings = [...meetings].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            if (newOrder === "desc") {
                return dateA - dateB; // Ascending order

            } else {
                return dateB - dateA; // Descending order
            }
        });
        setMeetings(sortedMeetings);
    };


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

    const convertADDateToBS = (adDate) => {
        try {
            return ADToBS(adDate); // Convert AD to BS
        } catch (error) {
            console.error("Error converting AD to BS:", error);
            return null;
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
//  if (!response.ok) throw new Error("Failed to fetch meetings");
                if (!response.ok) {
                    if (response.status === 401) {
                        alert("Session expired. Please log in again.");
                        localStorage.removeItem("token"); // Clear token
                
                        // Redirect to login page
                        window.location.href = "/"; // Change the route as per your app's structure
                    }
                    throw new Error("Failed to fetch users");
                }
 
                let data = await response.json();

                // Ensure valid meetings are sorted properly
                data = data.filter(meeting => meeting.date && meeting.time); // Remove invalid entries

                // Get today's date and last week's date in AD
                const todayAD = new Date();
                const monthAD = new Date();
                monthAD.setDate(todayAD.getDate() - 30); // Get the date 30 days ago

                // Convert both to BS
                const monthBS = convertADDateToBS(monthAD.toISOString().split("T")[0]); // Convert AD -> BS

                // Filter meetings that fall within the last 7 days in BS
                data = data.filter(meeting => {
                    return meeting.date >= monthBS; // Keep meetings within range
                });

                // Sort meetings by date (descending) and time (ascending)
                data.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);

                    if (dateB - dateA !== 0) {
                        return dateB - dateA; // Sort by date (descending)
                    }

                    // Convert time to minutes for sorting
                    const [hourA, minuteA] = a.time.split(":").map(Number);
                    const [hourB, minuteB] = b.time.split(":").map(Number);

                    return hourA * 60 + minuteA - (hourB * 60 + minuteB); // Sort by time (ascending)
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

                setMeetings((prevMeetings) =>
                    prevMeetings.map((meeting) =>
                        meeting._id === editingId ? response.data : meeting
                    )
                );

                setEditingId(null);
            } else {
                // Create new meeting
                response = await axios.post("http://localhost:5001/api/meetings", payload, config);
                setMeetings((prevMeetings) => [response.data, ...prevMeetings]); // New meeting on top


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



    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this meeting?");
        if (!isConfirmed) return; // Stop execution if user cancels

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Token is missing or invalid. Please log in again.");
                return;
            }

            await axios.delete(`http://localhost:5001/api/meetings/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMeetings((prevMeetings) => prevMeetings.filter((meeting) => meeting._id !== id));
            console.log("Meeting deleted successfully");
        } catch (error) {
            console.error("Error deleting meeting:", error.response?.data || error.message);
        }
    };

    // Pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    const meetingsPerPage = 5;
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
                    <textarea
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
                                <th className="border w-[11vw] p-2 cursor-pointer" onClick={handleSortByDate}>
                                    Date (BS) {sortOrder === "asc" ? "↑" : "↓"}
                                </th>
                                <th className="border w-[9vw] p-2">Time</th>
                                <th className="border w-[21vw] p-2">Meeting Type</th>
                                <th className="border w-[22vw] p-2">Location</th>
                                <th className="border w-[24vw] p-2">Description</th>
                                <th className="border w-[5vw] p-2">Priority</th>
                                <th className="border w-[10vw] p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMeetings.map((meeting, index) => {
                                return(
                                <tr key={index} 
                                className={`text-center hover:bg-gray-100 odd:bg-white `}
                                >
                                    <td className="border p-2 w-[3vw]">{(currentPage - 1) * meetingsPerPage + index + 1}</td>
                                    <td className="border p-2 w-[11vw]">{formatDate(meeting.date)}</td>
                                    <td className="border p-2 w-[9vw] ">{formatTime(meeting.time)}</td>
                                    <td className="border p-2 w-[16vw]" >{meeting.type}</td>
                                    <td className="border p-2 w-[16vw]" >{meeting.location}</td>
                                    <td className="border p-2 w-[28vw]" >{meeting.description}</td>
                                    <td className="border p-2 w-[5vw]" >{meeting.priority}</td>
                                    <td className="border p-2 w-[12vw]" >
                                        <button
                                            onClick={() => handleEdit(meeting)}
                                            className="bg-yellow-500 text-white px-2 py-1 mr-1.5 rounded hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(meeting._id)}
                                            className="bg-red-500 text-white px-2 py-1 ml-1.5 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                );
                            })}
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
                        className={`px-2 py-1 bg-blue-600 text-white rounded-4xl ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
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
                        className={`px-2 py-1 bg-blue-600 text-white rounded-4xl ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
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
