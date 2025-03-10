import React, { useState, useEffect } from "react";

const Meeting_Table = () => {
  const [meetings, setMeeting] = useState([
    { id: 1, date: "2025-03-11", type: "Project Discussion", location: "Hayat Hotel", description: "Discuss project timeline and deliverables.", time: "10:00 AM" },
    { id: 2, date: "2025-03-10", type: "Client Meeting", location: "Soltie Hotel", description: "Meeting with the client to present progress.", time: "11:50 AM" },
    { id: 3, date: "2025-03-16", type: "Client Meeting", location: "Kalanki", description: "Meeting with the client to present progress.", time: "1:37 AM" },
  ]);

  // Function to convert time to a comparable format
  const convertToDateTime = (date, time) => {
    return new Date(`${date} ${time}`);
  };

  // Find the closest upcoming meeting
  const closestMeetingIndex = (() => {
    const now = new Date();
    let closestIndex = -1;
    let minDiff = Infinity;

    meetings.forEach((meeting, index) => {
      const meetingTime = convertToDateTime(meeting.date, meeting.time);
      const diff = meetingTime - now; // Difference in milliseconds

      if (diff > 0 && diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });

    return closestIndex;
  })();

  return (
    <>
      <div className="bg-gray-200 p-1 md:pb-[0.5vh] md:p-[1vw] md:pt-[1vh]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-200">
                <th className="border w-[3vw] border-gray-400 px-4 py-2">SN</th>
                <th className="border w-[13vw] border-gray-400 px-4 py-2">Date</th>
                <th className="border w-[10vw] border-gray-400 px-4 py-2">Time</th>
                <th className="border w-[22vw] border-gray-400 px-4 py-2">Meeting Type</th>
                <th className="border w-[22vw] border-gray-400 px-4 py-2">Location</th>
                <th className="border w-[30vw] border-gray-400 px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting, index) => (
                <tr key={index} className={`text-center hover:bg-gray-100 odd:bg-white ${index === closestMeetingIndex ? "border-red-500 border-3" : "border-gray-400"}`}>
                  <td className="border border-gray-400 px-4 py-2">{meeting.id}</td>
                  <td className="border border-gray-400 px-4 py-2">{meeting.date}</td>
                  <td className="border  border-gray-400 px-4 py-2 ">{meeting.time}</td>
                  <td className="border border-gray-400 px-4 py-2">{meeting.type}</td>
                  <td className="border border-gray-400 px-4 py-2">{meeting.location}</td>
                  <td className="border border-gray-400 px-4 py-2">{meeting.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Meeting_Table;
