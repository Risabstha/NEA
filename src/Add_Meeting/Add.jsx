import React,{useState} from "react";

const Add = ()=>
{   
        
        // Function to convert 24-hour time to 12-hour AM/PM format
        const formatTime = (timeStr) => {
          if (!timeStr) return ""; // Handle empty input
          const [hours, minutes] = timeStr.split(":");
          const hour = parseInt(hours, 10);
          const ampm = hour >= 12 ? "PM" : "AM";
          const formattedHour = hour % 12 || 12; // Convert 0 to 12 for AM
          return `${formattedHour}:${minutes} ${ampm}`;
        };
    
        // Add/ Edit/ Delete
        const [meetings, setMeetings] = useState([]);
        const [newMeeting, setNewMeeting] = useState({ date: "", type: "",location :"", description: "", time: "" });
        const [editingIndex, setEditingIndex] = useState(null);
    
        const handleChange = (e) => {
            setNewMeeting({ ...newMeeting, [e.target.name]: e.target.value });
        };
    
        const handleAddOrEditMeeting = () => {
            if (editingIndex !== null) {
            const updatedMeetings = [...meetings];
            updatedMeetings[editingIndex] = newMeeting;
            setMeetings(updatedMeetings);
            setEditingIndex(null);
            } else {
            setMeetings([...meetings, newMeeting]);
            }
            setNewMeeting({ date: "", type: "", location :"", description: "", time: "" });
        };
    
        const handleEdit = (index) => {
            setNewMeeting(meetings[index]);
            setEditingIndex(index);
        };
    
        const handleDelete = (index) => {
            setMeetings(meetings.filter((_, i) => i !== index));
        };
    return(
        <>
         {/* Add/ Edit/ Delete */}
         <div className=" absolute left-[9vw] md:left-[24vw] lg:left-[29vw]  xl:left-[34vw]
                          right-[9vw]  md:right-[24vw] lg:right-[29vw] xl:right-[34vw]
                          p-[1vw] md:p-[1vw]
                          mt-[2vh] md:mt-[6vh] 
                          w-[80vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw]
                         bg-white shadow-2xl rounded-2xl">
                <h2 className="text-xl p-4 flex justify-center font-semibold mb-4">Manage Meetings</h2>
                
                <input
                    type="date"
                    name="date"
                    value={newMeeting.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]} // Disables past dates
                    className="border p-2 w-full mb-2"
                />
                <input
                    type="text"
                    name="type"
                    placeholder="Meeting Type"
                    value={newMeeting.type}
                    onChange={handleChange}
                    className="border p-2 w-full mb-2"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={newMeeting.location}
                    onChange={handleChange}
                    className="border p-2 w-full mb-2" 
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
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

 
                <button
                    onClick={handleAddOrEditMeeting}
                    disabled={!newMeeting.date || !newMeeting.type || !newMeeting.location || !newMeeting.description || !newMeeting.time}
                    className={`px-4 py-2 rounded-md w-full ${
                        !newMeeting.date || !newMeeting.type || !newMeeting.location || !newMeeting.description || !newMeeting.time
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 text-white"
                    }`}
                    >
                    {editingIndex !== null ? "Update Meeting" : "Add Meeting"}
                </button>

            </div>
            {/* Added meeting table */}
                        <div className="overflow-x-auto p-1 md:p-4 mt-[1vh] md:mt-[1vh]">
                            <table className="mt-[55vh] md:mt-[60vh] w-full border-collapse border border-gray-400">
                                    <thead>
                                    <tr className="bg-gray-200">
                                        <th className='border w-[3vw] p-2'>SN</th>
                                        <th className="border w-[11vw] p-2">Date</th>
                                        <th className="border w-[9vw] p-2">Time</th>
                                        <th className="border w-[21vw] p-2">Meeting Type</th>
                                        <th className="border w-[22vw] p-2">Location</th>
                                        <th className="border w-[24vw] p-2">Description</th>
                                        <th className="border w-[10vw] p-2">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {meetings.map((meeting, index) => (
                                        <tr key={index} className="text-center  hover:bg-gray-100 odd:bg-white">
                                        <td className='border w-[] p-2'>{meeting.id}</td>
                                        <td className="border w-[] p-2">{meeting.date}</td>
                                        <td className="border w-[] p-2">{formatTime(meeting.time)}</td>
                                        <td className="border w-[] p-2">{meeting.type}</td>
                                        <td className="border w-[] p-2">{meeting.location}</td>
                                        <td className="border w-[] p-2">{meeting.description}</td>
                                        
                                        <td className="border w-[] p-2">
                                            <button onClick={() => handleEdit(index)} className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded">Edit</button>
                                            <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                                        </td>
                                        </tr>
                                    ))}
                                    </tbody>
                            </table>
                            </div>
            </>
    );
}

export default Add;