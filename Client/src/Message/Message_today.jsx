import React, { useState, useEffect } from "react";
import NepaliDate from 'nepali-date-converter'
import { jwtDecode } from 'jwt-decode';  // Changed from default import to named import
import { MdSend } from "react-icons/md";
import SMSModal from "./SMSModal";


const Message_Todaytable = () => {
    const [meetings, setMeetings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showNoMeetings, setShowNoMeetings] = useState(false);
    const meetingsPerPage = 6;
    const [showSessionAlert, setShowSessionAlert] = useState(false);
    const [selectedMeetingDetails, setSelectedMeetingDetails] = useState(null); //  Track selected meetings

    // 22 to 84 sms model 
    // const [smsMessage, setSmsMessage] = useState(""); // For SMS text content
    const [isSending, setIsSending] = useState(false); // SMS sending loading state
    const [sendStatus, setSendStatus] = useState(null); // SMS status messages
    const [showSMSModal, setShowSMSModal] = useState(false);
    const [recipients, setRecipients] = useState([]);
    const [selectedRecipients, setSelectedRecipients] = useState(new Set());
    const [users, setUsers] = useState([1]);             // for fetched GM data 

    const handleSendSMSButtonClick = (meeting) => {
        setSelectedMeetingDetails(meeting); // Store the clicked meeting's details
        setRecipients(users); // Load recipients
        setShowSMSModal(true); // Show modal
        // console.log(meeting.date, meeting.time, meeting.description, meeting.location, meeting.type);   // check purpose
        
    };
    // console.log("setSelectedMeeting:",selectedMeetingDetails)


    const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:5001/api/user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error("Failed to fetch users");
                    
                let user = await response.json();
                    
                user = user.filter((users) => {
                    const isGM = (users.role) === ("GM");
                    return isGM;
                });
                // console.log(user); // Debugging
                return user;
            } catch (error) {
                console.error("Error fetching users:", error);
                return [];
            }
        };

        useEffect(() => {
            fetchUsers().then(setUsers);
            
        }, []);
        // console.log(users)   
// console.log(selectedRecipients)
    const handleRecipientSelect = (recipientId) => {
        setSelectedRecipients(prev => {
            const newSelected = new Set(prev);
            if (newSelected.has(recipientId)) {
                newSelected.delete(recipientId);
            } else {
                newSelected.add(recipientId);
                // console.log(newSelected)     // ✔
            }
            return newSelected;
        });
    };

    const handleSendMessages = async () => {
        setIsSending(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSendStatus("Messages sent successfully!");
            setTimeout(() => {
                setShowSMSModal(false);
                setSendStatus(null); // Reset status when closing
            }, 2000);
        } catch (error) {
            setSendStatus("Error sending messages");
        } finally {
            setIsSending(false);
        }
    };
    // Session expiration check
    useEffect(() => {
        const checkTokenExpiration = () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    handleSessionExpiration();
                }
            } catch (error) {
                console.error("Token decoding error:", error);
            }
        };

        // Initial check
        checkTokenExpiration();

        // Check every 60 seconds
        const interval = setInterval(checkTokenExpiration, 60000);

        return () => clearInterval(interval);
    }, []);

    const handleSessionExpiration = () => {
        localStorage.removeItem("token");
        setShowSessionAlert(true);
    };
 
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
            const bsDate = new NepaliDate(new Date(adDate)); // Requires a JS Date object
            return bsDate.format('YYYY-MM-DD'); // Format as BS date string
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
                const todayAD = new Date(getKathmanduDate());
                const todayBS = convertADDateToBS(todayAD);

                // Convert meeting AD dates to BS and filter
                data.forEach((meeting) => {
                    meeting.date = meeting.date.split("T")[0];
                });

                data = data.filter((meeting) => {
                    const isMatch = (meeting.date) === (todayBS);
                    // console.log(`Meeting Date: ${meeting.date}, Today BS: ${todayBS}, Match: ${isMatch}`);
                    return isMatch;
                });

                data = data.filter((meeting) => {
                    const isInternal = (meeting.meeting_type) === ("internal");
                    return isInternal;
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
        const interval = setInterval(fetchMeetings, 1200000); // Fetch every 20min

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    //pagination logic
    const indexOfLastMeeting = currentPage * meetingsPerPage;
    const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
    const currentMeetings = meetings.slice(indexOfFirstMeeting, indexOfLastMeeting);

    const totalPages = Math.ceil(meetings.length / meetingsPerPage);
    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));


    // Add this state at the top of your component
    const [selectAll, setSelectAll] = useState(false);

    // Add this handler function
    const handleSelectAll = () => {
        const newSelected = new Set(selectedMeetings);

        currentMeetings.forEach((_, index) => {
            const meetingId = (currentPage - 1) * meetingsPerPage + index + 1;
            if (selectAll) {
                newSelected.delete(meetingId);
            } else {
                newSelected.add(meetingId);
            }
        });

        setSelectedMeetings(newSelected);
        setSelectAll(!selectAll);
    };



    return (
        <>

            {/* sms from 225 t0 250 */}

            <div className="bg-gray-200 p-[1vw] md:pb-[0.5vh] md:px-[1vw] md:mt-[0] pt-[2vh] md:pt-[0]">

                {/* Add the SMS Modal : passing props*/}
                {showSMSModal && <SMSModal
                    isOpen={showSMSModal}
                    onClose={() => setShowSMSModal(false)}
                    // smsMessage={smsMessage}
                    // setSmsMessage={setSmsMessage}
                    recipients={recipients}
                    selectedRecipients={selectedRecipients}
                    handleRecipientSelect={handleRecipientSelect}
                    handleSendMessages={handleSendMessages}
                    isSending={isSending}
                    sendStatus={sendStatus}
                    selectedMeetingDetails={selectedMeetingDetails}
                />}





                {/* Session Expiration Modal */}
                {showSessionAlert && (
                    <div className="fixed inset-0 bg-gray-500/50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
                            <div className="text-center">
                                <h3 className="text-lg font-medium mb-4">⏳ Session Expired</h3>
                                <p className="mb-4">Your session has expired. Please log in again.</p>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        window.location.href = "/";
                                    }}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    Go to Login
                                </button>
                            </div>
                        </div>
                    </div>
                )}
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
                        <>
                            {meetings.length > 0 && (
                                <table className="w-full border-collapse border text-xl border-gray-400">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            {/* <th className="border w-[4vw] border-gray-400 px-4 py-2">
                                                <button onClick={selectAll}>
                                                    ✔
                                                </button>
                                            </th> */}
                                            {/* <th className="border w-[4vw] border-gray-400 px-4 py-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectAll}
                                                    onChange={handleSelectAll}
                                                    className="w-4 h-4 cursor-pointer "
                                                    title="Select all on this page"
                                                />
                                            </th> */}
                                            <th className="border w-[4vw] border-gray-400 px-4 py-2">SN</th>
                                            <th className="border w-[13vw] text-left border-gray-400 px-4 py-2">Date</th>
                                            <th className="border w-[11vw] text-left border-gray-400 px-4 py-2">Time</th>
                                            <th className="border w-[20vw] text-left border-gray-400 px-4 py-2">Meeting Type</th>
                                            <th className="border w-[20vw] text-left border-gray-400 px-4 py-2">Location</th>
                                            <th className="border w-[30vw] text-left border-gray-400 px-4 py-2">Description</th>
                                            <th className="border w-[3vw] text-center border-gray-400 px-4 py-2">SMS</th>
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
                                                    {/* <td className="border w-[4vw] border-gray-400 px-4 py-2">
                                                        <input type="checkbox"
                                                            name="select"
                                                            value="select"
                                                            checked={isSelected((currentPage - 1) * meetingsPerPage + index + 1)} //  Maintain selection state
                                                            onChange={() => handleCheckboxChange((currentPage - 1) * meetingsPerPage + index + 1)} //  Toggle selection
                                                            className="w-5 h-5 cursor-pointer" />
                                                    </td> */}
                                                    <td className="border w-[4vw] border-gray-400 px-4 py-2">
                                                        {(currentPage - 1) * meetingsPerPage + index + 1}
                                                    </td>
                                                    <td className="border w-[13vw] text-left border-gray-400 px-4 py-2">
                                                        {formatDate(meeting.date)}
                                                    </td>
                                                    <td className="border w-[11vw] text-left border-gray-400 px-4 py-2">
                                                        {formatTime(meeting.time)}
                                                    </td>
                                                    <td className="border w-[20vw] text-left border-gray-400 px-4 py-2">{meeting.type}</td>
                                                    <td className="border w-[20vw] text-left border-gray-400 px-4 py-2">{meeting.location}</td>
                                                    <td className="border w-[30vw] text-left border-gray-400 px-4 py-2">{meeting.description}</td>
                                                    <td className="border w-[3vw] text-center border-gray-400 px-4 py-2">
                                                        <button
                                                            onClick={() => handleSendSMSButtonClick(meeting)}
                                                            className="flex space-x-2 justify-center items-center border-none px-4 py-1 rounded-lg
                                                                                        bg-blue-600 text-white
                                                                                        hover:bg-green-400 cursor-pointer hover:text-black
                                                                                        ">
                                                            <MdSend className="text-2xl" />
                                                        </button>
                                                    </td>
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
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Message_Todaytable;