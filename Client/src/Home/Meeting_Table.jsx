import React, { useState } from "react";

const Meeting_Table = () => {
  const [meetings] = useState([
    { id: 1, date: "2025-03-11", type: "Project Discussion", location: "Hayat Hotel", description: "Discuss project timeline and deliverables.", time: "10:00 AM" },
    { id: 2, date: "2025-03-10", type: "Client Meeting", location: "Soltie Hotel", description: "Meeting with the client to present progress.", time: "11:50 AM" },
    { id: 3, date: "2025-03-16", type: "Client Meeting", location: "Kalanki", description: "Meeting with the client to present progress.", time: "1:37 AM" },
    { id: 4, date: "2025-03-11", type: "Team Sync", location: "Office", description: "Weekly team sync-up meeting.", time: "3:00 PM" },
    { id: 5, date: "2025-03-12", type: "Budget Review", location: "Conference Room", description: "Reviewing the financial reports.", time: "9:00 AM" },
    { id: 6, date: "2025-03-13", type: "Planning Session", location: "Online", description: "Planning the next quarter goals.", time: "4:30 PM" },
    { id: 7, date: "2025-03-14", type: "Strategy Meeting", location: "Office", description: "Discussing company growth strategy.", time: "2:00 PM" },
    { id: 8, date: "2025-03-15", type: "Stakeholder Meeting", location: "Hotel Everest", description: "Quarterly meeting with stakeholders.", time: "11:00 AM" },
  ]);

  const convertToDateTime = (date, time) => new Date(`${date} ${time}`);

  // Find the closest upcoming meeting globally 
  const now = new Date();
  let closestMeetingId = null; 
  let minDiff = Infinity; 

  meetings.forEach((meeting) => { //new
    const meetingTime = convertToDateTime(meeting.date, meeting.time);
    const diff = meetingTime - now;

    if (diff > 0 && diff < minDiff) { 
      minDiff = diff;
      closestMeetingId = meeting.id;
    }
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const meetingsPerPage = 5; // Reduced to better see pagination //new

  // Calculate pagination range
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
              {currentMeetings.map((meeting, index) => (
                <tr
                  key={meeting.id} //new
                  className={`text-center hover:bg-gray-100 odd:bg-white ${meeting.id === closestMeetingId ? "border-red-500 border-3" : "border-gray-400"}`} //new
                >
                  <td className="border border-gray-400 px-4 py-2">{meeting.id}</td>
                  <td className="border border-gray-400 px-4 py-2">{meeting.date}</td>
                  <td className="border border-gray-400 px-4 py-2">{meeting.time}</td>
                  <td className="border border-gray-400 px-4 py-2">{meeting.type}</td>
                  <td className="border border-gray-400 px-4 py-2">{meeting.location}</td>
                  <td className="border border-gray-400 px-4 py-2">{meeting.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4 space-x-3">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`px-2 py-1 bg-blue-600 text-white rounded-4xl ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
          >
            Prev
          </button>
          <span className="text-md font-sans"> {currentPage} of {totalPages}</span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 bg-blue-600 text-white rounded-4xl ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Meeting_Table;
