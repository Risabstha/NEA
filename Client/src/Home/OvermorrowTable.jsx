import React, { useState, useEffect } from "react";
import { ADToBS } from "bikram-sambat-js";

const OvermorrowTable = () => {
    const [meetings, setMeetings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showNoMeetings, setShowNoMeetings] = useState(false);
    const meetingsPerPage = 5;

    const getKathmanduDate = () => {
        const now = new Date();
        const offset = 5.75 * 60; // Kathmandu is UTC+5:45 (5.75 hours)
        const kathmanduTime = new Date(now.getTime() + offset * 60 * 1000);
        return kathmanduTime.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    };

    const formatTime = (timeStr) => {
        if (!timeStr) return "";
        const [hours, minutes] = timeStr.split(":");
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minutes} ${ampm}`;
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
    };

    const convertADDateToBS = (adDate) => {
        try {
            const bsDate = ADToBS(adDate); // Convert AD to BS
            return bsDate;
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

                if (!response.ok) throw new Error("Failed to fetch meetings");

                let data = await response.json();

                // Filter and convert dates
                data = data.filter((meeting) => meeting.date && meeting.time); // Remove invalid entries

                // Convert AD date to BS for filtering
                const todayAD = new Date(getKathmanduDate());       //here
                todayAD.setDate(todayAD.getDate() + 2); // Add 2 day
                const overmorrowAD = todayAD.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
                const overmorrowBS = convertADDateToBS(overmorrowAD); // Convert to BS

                // Convert meeting AD dates to BS and filter
                data.forEach((meeting) => {
                    // meeting.date = (meeting.date); // Convert each meeting date to BS
                    meeting.date = (meeting.date).split("T")[0];
                    // console.log(meeting.date)
                });


                data = data.filter((meeting) => {
                    const isMatch = meeting.date === overmorrowBS;
                    // console.log(`Meeting Date: ${meeting.date}, Today BS: ${todayBS}, Match: ${isMatch}`);
                    return isMatch;
                });

                data.sort((a, b) => {

                    // Convert time to minutes for sorting
                    const [hourA, minuteA] = a.time.split(":").map(Number);
                    const [hourB, minuteB] = b.time.split(":").map(Number);

                    return hourA * 60 + minuteA - (hourB * 60 + minuteB); // Sort by time (ascending)
                });
                setMeetings(data);
                // Set showNoMeetings based on whether there are meetings
                if (data.length === 0) {
                    setTimeout(() => setShowNoMeetings(true), 200); // Delay for smooth transition
                } else {
                    setShowNoMeetings(false);
                }
            } catch (error) {
                console.error("Error fetching meetings:", error);
                setMeetings([]); // Prevent blank page
            }
        };

        fetchMeetings();
        const interval = setInterval(fetchMeetings, 60000); // Fetch every 60s

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    //pagination logic
    const indexOfLastMeeting = currentPage * meetingsPerPage;
    const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
    const currentMeetings = meetings.slice(indexOfFirstMeeting, indexOfLastMeeting);

    const totalPages = Math.ceil(meetings.length / meetingsPerPage);
    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <>
            <div className="bg-gray-200 p-[1vw] md:pb-[0.5vh] md:p-[1vw] md:mt-[4vh] pt-[6vh]">
                <div className="overflow-x-auto">
                    {/* Show "No Meetings" when there are no meetings */}
                    {showNoMeetings ? (

                        <div className="text-center text-2xl font-semibold text-gray-600 p-4">
                            <img
                                src="/calender.png"
                                alt="No Meetings"
                                className="mx-auto mb-4"
                                style={{ width: "80px", height: "80px" }}
                            />
                            No Meetings Scheduled
                        </div>

                    ) : (
                        <div>
                            {meetings.length > 0 && (
                                <table className="w-full border-collapse border text-xl border-gray-400">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="border w-[4vw] border-gray-400 px-4 py-2">SN</th>
                                            <th className="border w-[13vw] border-gray-400 px-4 py-2">Date</th>
                                            <th className="border w-[11vw] border-gray-400 px-4 py-2">Time</th>
                                            <th className="border w-[20vw] border-gray-400 px-4 py-2">Meeting Type</th>
                                            <th className="border w-[20vw] border-gray-400 px-4 py-2">Location</th>
                                            <th className="border w-[35vw] border-gray-400 px-4 py-2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentMeetings.map((meeting, index) => {
                                            const isHighPriority = meeting.priority === "high";

                                            return (
                                                <tr
                                                    key={index}
                                                    className={`text-center ${isHighPriority
                                                        ? "bg-blue-300 text-black hover:bg-blue-400 odd:bg-blue-300 "
                                                        : "odd:bg-white hover:bg-gray-100"
                                                        }`}
                                                >
                                                    <td className="border w-[4vw] border-gray-400 px-4 py-2">
                                                        {(currentPage - 1) * meetingsPerPage + index + 1}
                                                    </td>
                                                    <td className="border w-[13vw] border-gray-400 px-4 py-2">
                                                        {formatDate(meeting.date)}
                                                    </td>
                                                    <td className="border w-[11vw] border-gray-400 px-4 py-2">
                                                        {formatTime(meeting.time)}
                                                    </td>
                                                    <td className="border w-[20vw] border-gray-400 px-4 py-2">{meeting.type}</td>
                                                    <td className="border w-[20vw] border-gray-400 px-4 py-2">{meeting.location}</td>
                                                    <td className="border w-[35vw] border-gray-400 px-4 py-2">{meeting.description}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
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
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default OvermorrowTable;
