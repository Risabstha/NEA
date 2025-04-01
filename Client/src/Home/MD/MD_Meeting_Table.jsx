import React, { useState, useEffect } from "react";
import NepaliDate from 'nepali-date-converter'
import { jwtDecode } from 'jwt-decode';  // Changed from default import to named import
import internal from '../../assets/internal.png'
import external from '../../assets/external.png'

const MD_Meeting_Table = () => {
  const [meetings, setMeetings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showNoMeetings, setShowNoMeetings] = useState(false);
  const [showSessionAlert, setShowSessionAlert] = useState(false);

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
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit format
    const day = String(d.getDate()).padStart(2, "0"); // Ensure 2-digit format
    return `${year}-${month}-${day}`;
  };


  const convertADDateToBS = (adDate) => {
    try {
      // Convert AD to BS
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

        data = data.filter((meeting) => meeting.date && meeting.time);

        const todayAD = new Date(getKathmanduDate());
        const todayBS = convertADDateToBS(todayAD);

        data.forEach((meeting) => {
          meeting.date = meeting.date.split("T")[0];
        });

        data = data.filter((meeting) => meeting.date === todayBS);

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
        setMeetings([]);
        setShowNoMeetings(true); // Show "No Meetings" on error
      }
    };

    fetchMeetings();
    const interval = setInterval(fetchMeetings, 1200000);

    return () => clearInterval(interval);
  }, []);


  // Find the next nearest meeting index
  const findNextMeetingIndex = () => {
    const now = new Date();
    return meetings.findIndex((meeting) => {
      const [hour, minute] = meeting.time.split(":").map(Number);
      const meetingTime = new Date(now);
      meetingTime.setHours(hour, minute, 0, 0);
      return meetingTime > now;
    });
  };

  const nextMeetingIndex = findNextMeetingIndex();

  return (
    <>
      <div className="bg-gray-200 p-[1vw] md:pb-[0.5vh] md:p-[1vw] md:mt-[4vh] pt-[3vh]">
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
                <table className="w-full border-collapse border  border-gray-400">
                  <thead className=" text-xl md:text-2xl ">
                    <tr className="bg-gray-200">
                      <th className="border w-[4vw] border-gray-400 px-4 py-2">SN</th>
                      <th className="border w-[13vw] border-gray-400 px-4 py-2">Date</th>
                      <th className="border w-[11vw] border-gray-400 px-4 py-2">Time</th>
                      <th className="border w-[20vw] border-gray-400 px-4 py-2">Meeting Type</th>
                      <th className="border w-[20vw] border-gray-400 px-4 py-2">Location</th>
                      <th className="border w-[35vw] border-gray-400 px-4 py-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-xl md:text-3xl">
                    {meetings.map((meeting, index) => {
                      const isHighPriority = meeting.priority === "high";
                      const isNextMeeting = index === nextMeetingIndex;
                      return (
                        <tr
                          key={index}
                          className={`text-center 
                          ${isHighPriority
                              ? "bg-blue-300 text-black hover:bg-blue-400 odd:bg-blue-300"
                              : "odd:bg-white hover:bg-gray-100"
                            }
                          ${isNextMeeting ? "border-5 border-red-500 font-semibold text-xl md:text-3xl" : "border border-gray-400"}
                        `}

                        >
                          <td className="border w-[4vw] border-gray-400 px-4 py-2">
                            {(currentPage - 1) + index + 1}
                          </td>
                          <td className="border w-[15vw] border-gray-400 px-4 py-2">
                            {formatDate(meeting.date)}
                          </td>
                          <td className="border w-[13vw] border-gray-400 px-4 py-2">
                            {formatTime(meeting.time)}
                          </td>
                          <td className="border w-[20vw] border-gray-400 px-4 py-2  text-center">
                            <div className="flex items-center justify-center gap-2">        {/* flex and border shouldn't be on same div/element */}
                              {meeting.meeting_type === "internal" && (
                                <img className="w-[32px] h-[32px]" src={internal} alt="Internal" />
                              )}
                              {meeting.meeting_type === "external" && (
                                <img className="w-[26px] h-[26px]" src={external} alt="External" />
                              )}
                              <span>{meeting.type}</span>
                            </div>
                          </td>
                          <td className="border w-[18vw] border-gray-400 px-4 py-2">{meeting.location}</td>
                          <td className="border w-[35vw] border-gray-400 px-4 py-2">{meeting.description}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}

            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MD_Meeting_Table;