import React, { useState, useEffect } from "react";
import { ADToBS } from "bikram-sambat-js";

const Meeting_Table = () => {
  const [meetings, setMeetings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showNoMeetings, setShowNoMeetings] = useState(false); // New state for "No Meetings"
  const meetingsPerPage = 10;

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
    return d.toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }).split(',')[0];
  };

  const convertADDateToBS = (adDate) => {
    try {
      return ADToBS(adDate);
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

        const todayAD = new Date().toISOString().split("T")[0];
        const todayBS = convertADDateToBS(todayAD);

        data.forEach((meeting) => {
          meeting.date = meeting.date.split("T")[0];
        });

        data = data.filter((meeting) => meeting.date === todayBS);

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
    const interval = setInterval(fetchMeetings, 60000);

    return () => clearInterval(interval);
  }, []);

  // Pagination
  const indexOfLastMeeting = currentPage * meetingsPerPage;
  const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
  const currentMeetings = meetings.slice(indexOfFirstMeeting, indexOfLastMeeting);
  const totalPages = Math.ceil(meetings.length / meetingsPerPage);

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

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
      <div className="bg-gray-200 p-[1vw] md:pb-[0.5vh] md:p-[1vw] md:mt-[4vh] pt-[6vh]">
        <div className="overflow-x-auto">
          {showNoMeetings ? (
            <div className="text-center text-2xl font-semibold text-gray-600 p-4">
              <img
                src="/nocalender.png"
                alt="No Meetings"
                className="mx-auto mb-4"
                style={{ width: "80px", height: "80px" }}
              />
              No Meetings Scheduled
            </div>
          ) : (
            <>
              <table className="w-full border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-400 px-4 py-2">SN</th>
                    <th className="border border-gray-400 px-4 py-2">Date</th>
                    <th className="border border-gray-400 px-4 py-2">Time</th>
                    <th className="border border-gray-400 px-4 py-2">Meeting Type</th>
                    <th className="border border-gray-400 px-4 py-2">Location</th>
                    <th className="border border-gray-400 px-4 py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {currentMeetings.map((meeting, index) => {
                    const isHighPriority = meeting.priority === "high";
                    const isNextMeeting = index === nextMeetingIndex;

                    return (
                      <tr
                        key={index}
                        className={`text-center 
                          ${
                            isHighPriority
                              ? "bg-blue-300 text-black hover:bg-blue-400 odd:bg-blue-300"
                              : "odd:bg-white hover:bg-gray-100"
                          }
                          ${isNextMeeting ? "border-4 border-red-500" : "border border-gray-400"}
                        `}
                        style={isNextMeeting ? { fontSize: '1.25rem', fontWeight: 'bold' } : {}}
                      >
                        <td className="border border-gray-400 px-4 py-2">
                          {(currentPage - 1) * meetingsPerPage + index + 1}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {formatDate(meeting.date)}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {formatTime(meeting.time)}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">{meeting.type}</td>
                        <td className="border border-gray-400 px-4 py-2">{meeting.location}</td>
                        <td className="border border-gray-400 px-4 py-2">{meeting.description}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

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
          )}
        </div>
      </div>
    </>
  );
};

export default Meeting_Table;