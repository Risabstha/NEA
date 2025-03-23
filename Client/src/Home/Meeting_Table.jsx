import React, { useState, useEffect } from "react";
import { ADToBS } from "bikram-sambat-js";

const Meeting_Table = () => {
  const [meetings, setMeetings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextmeeting, setNextMeeting] = useState([]);
  const meetingsPerView = 5;

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

        //filter and date convert
        data = data.filter((meeting) => meeting.date && meeting.time); // Remove invalid entries
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

        // Convert AD date to BS for filtering
        const todayAD = new Date().toISOString().split("T")[0]; // Current AD date (YYYY-MM-DD)
        const todayBS = convertADDateToBS(todayAD); // Convert to BS

        // Convert meeting AD dates to BS and filter
        data.forEach((meeting) => {
          // meeting.date = (meeting.date); // Convert each meeting date to BS
          meeting.date = (meeting.date).split("T")[0];
          // console.log(meeting.date)
        });


        data = data.filter((meeting) => {
          const isMatch = meeting.date === todayBS;
          // console.log(`Meeting Date: ${meeting.date}, Today BS: ${todayBS}, Match: ${isMatch}`);
          return isMatch;
        });
        setMeetings(data);
      } catch (error) {
        console.error("Error fetching meetings:", error);
        setMeetings([]); // Prevent blank page
      }
    };

    fetchMeetings();
    const interval = setInterval(fetchMeetings, 60000);  // Fetch every 60s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + meetingsPerView) % meetings.length);
    }, 10000);     // table data switch

    return () => clearInterval(scrollInterval);
  }, [meetings]);

  //next meeting
  useEffect(() => {
    const getNextMeeting = () => {
      try {
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes(); // Convert current time to minutes

        // Function to convert 12-hour time (with AM/PM) to minutes
        const convertToMinutes = (timeStr) => {
          if (!timeStr) return null;

          let [time, modifier] = timeStr.split(" "); // Split time and AM/PM
          let [hours, minutes] = time.split(":").map(Number);

          if (modifier === "PM" && hours !== 12) hours += 12; // Convert PM hours
          if (modifier === "AM" && hours === 12) hours = 0;   // Convert 12 AM to 00

          return hours * 60 + minutes; // Return total minutes
        };

        // Find the next upcoming meetings
        const upcomingMeetings = meetings
          .map(meeting => ({
            ...meeting,
            meetingMinutes: convertToMinutes(meeting.time),
          }))
          .filter(meeting => meeting.meetingMinutes > currentMinutes) // Get future meetings only
          .sort((a, b) => a.meetingMinutes - b.meetingMinutes); // Sort by nearest time

        setNextMeeting(upcomingMeetings); // Store as an array
      } catch (error) {
        console.error("Error fetching meetings:", error);
        setNextMeeting([]); // Prevent errors
      }
    };

    getNextMeeting();
    const interval = setInterval(getNextMeeting, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [meetings]); // Depend on `meetings`



  return (
    <div className="bg-gray-200 p-4">
      <div className="overflow-x-auto">
        {meetings.length === 0 ? (
          <div className="text-center text-xl font-sans text-gray-600 p-4">No Meetings 📅</div>
        ) : (
          <div>
            <table className="w-full border-collapse border text-xl border-gray-400">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 w-[4vw] px-4 py-2">SN</th>
                  <th className="border border-gray-400 w-[14vw] px-4 py-2">Date</th>
                  <th className="border border-gray-400 w-[12vw] px-4 py-2">Time</th>
                  <th className="border border-gray-400 w-[23vw] px-4 py-2">Meeting Type</th>
                  <th className="border border-gray-400 w-[23vw] px-4 py-2">Location</th>
                  <th className="border border-gray-400 w-[30vw] px-4 py-2">Description</th>
                </tr>
              </thead>
              <tbody className="text-3xl font-extralight">
                {nextmeeting.slice(0, 2).map((meeting, index) => {
                  const isHighPriority = meeting.priority === "high";
                  return (
                    <tr key={index} className={`text-center ${isHighPriority
                      ? "bg-blue-300 text-black hover:bg-blue-400 odd:bg-blue-300 "
                      : "odd:bg-white hover:bg-gray-100"
                      }`}>
                      <td className="border border-gray-400 px-4 w-[4vw]  py-2">{index + 1}</td>
                      <td className="border border-gray-400 px-4 w-[14vw] py-2">{formatDate(meeting.date)}</td>
                      <td className="border border-gray-400 px-4 w-[12vw] py-2">{formatTime(meeting.time)}</td>
                      <td className="border border-gray-400 px-4 w-[23vw] py-2">{meeting.type}</td>
                      <td className="border border-gray-400 px-4 w-[23vw] py-2">{meeting.location}</td>
                      <td className="border border-gray-400 px-4 w-[30vw] py-2">{meeting.description}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            <table className="mt-[8vh] w-full border-collapse text-xl border border-gray-400">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 w-[4vw] px-4 py-2">SN</th>
                  <th className="border border-gray-400 w-[14vw] px-4 py-2">Date</th>
                  <th className="border border-gray-400 w-[12vw] px-4 py-2">Time</th>
                  <th className="border border-gray-400 w-[23vw] px-4 py-2">Meeting Type</th>
                  <th className="border border-gray-400 w-[23vw] px-4 py-2">Location</th>
                  <th className="border border-gray-400 w-[30vw] px-4 py-2">Description</th>
                </tr>
              </thead>
              <tbody >
                {meetings.slice(currentIndex, currentIndex + meetingsPerView).map((meeting, index) => {
                  const isHighPriority = meeting.priority === "high";

                  return (
                    <tr key={index} className={`text-center ${isHighPriority
                      ? "bg-blue-300 text-black hover:bg-blue-400 odd:bg-blue-300 "
                      : "odd:bg-white hover:bg-gray-100"
                      }`}>
                      <td className="border border-gray-400 px-4 w-[4vw] py-2">{currentIndex + index + 1}</td>
                      <td className="border border-gray-400 px-4 w-[14vw] py-2">{formatDate(meeting.date)}</td>
                      <td className="border border-gray-400 px-4 w-[12vw] py-2">{formatTime(meeting.time)}</td>
                      <td className="border border-gray-400 px-4 w-[23vw] py-2">{meeting.type}</td>
                      <td className="border border-gray-400 px-4 w-[23vw] py-2">{meeting.location}</td>
                      <td className="border border-gray-400 px-4 w-[30vw] py-2">{meeting.description}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

        )}
      </div>
    </div>
  );
};

export default Meeting_Table;
