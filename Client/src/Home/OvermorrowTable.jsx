import React, { useState, useEffect } from "react";
import { ADToBS } from "bikram-sambat-js";

const Meeting_Table = () => {
  const [meetings, setMeetings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showNoMeetings, setShowNoMeetings] = useState(false);
  const meetingsPerPage = 10;

  const getKathmanduDate = (daysAhead = 0) => {
    const now = new Date();
    now.setDate(now.getDate() + daysAhead); // Adjust date by daysAhead
    return now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
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

        const overmorrowAD = getKathmanduDate(2); // AD date for the day after tomorrow
        const overmorrowBS = convertADDateToBS(overmorrowAD);

        console.log("Overmorrow's AD Date (Kathmandu):", overmorrowAD);
        console.log("Overmorrow's BS Date:", overmorrowBS);

        data.forEach((meeting) => {
          meeting.date = meeting.date.split("T")[0];
        });

        data = data.filter((meeting) => meeting.date === overmorrowBS);

        console.log("Filtered Meetings for Overmorrow:", data);

        setMeetings(data);

        if (data.length === 0) {
          setTimeout(() => setShowNoMeetings(true), 200);
        } else {
          setShowNoMeetings(false);
        }
      } catch (error) {
        console.error("Error fetching meetings:", error);
        setMeetings([]);
      }
    };

    fetchMeetings();
    const interval = setInterval(fetchMeetings, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-200 p-4">
      {showNoMeetings ? (
        <div className="text-center text-2xl font-semibold text-gray-600 p-4">
          <img src="\nocalender.png" alt="No Meetings" className="mx-auto mb-4" style={{ width: "80px", height: "80px" }} />
          No Meetings Scheduled
        </div>
      ) : (
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
            {meetings.map((meeting, index) => {
              const isHighPriority = meeting.priority === "high";
              const isNextUpcoming = meetings.length > 0 && meeting === meetings[0];
              return (
                <tr
                  key={index}
                  className={`text-center ${
                   
                       isHighPriority
                      ? "bg-blue-300 text-black hover:bg-blue-400 odd:bg-blue-300"
                      : "odd:bg-white hover:bg-gray-100"
                  }`}
                >
                  <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-400 px-4 py-2">{meeting.date}</td>
                  <td className="border border-gray-400 px-4 py-2">{meeting.time}</td>
                  <td className="border border-gray-400 px-4 py-2">{meeting.type}</td>
                  <td className="border border-gray-400 px-4 py-2">{meeting.location}</td>
                  <td className="border border-gray-400 px-4 py-2">{meeting.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Meeting_Table;

