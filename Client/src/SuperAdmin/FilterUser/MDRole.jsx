import React, { useState, useEffect } from "react";

const AdminRole = () => {
    const [users, setUsers] = useState([]);
    const [showNoMeetings, setShowNoMeetings] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/user");
                if (!response.ok) throw new Error("Failed to fetch users");

                const data = await response.json();
                 const filteredUsers = data.filter((user) => {
                    const isMatching = user.role === "MD";
                    return isMatching;
                })

                setUsers(filteredUsers);

                // Set showNoMeetings based on whether there are users
                if (filteredUsers.length === 0) {
                    setTimeout(() => setShowNoMeetings(true), 200); // Smooth transition
                } else {
                    setShowNoMeetings(false);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
        const interval = setInterval(fetchUsers, 60000); // Fetch every 10 min

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    // Pagination Logic
    const totalPages = Math.ceil(users.length / usersPerPage);
    const indexOfLastMeeting = currentPage * usersPerPage;
    const indexOfFirstMeeting = indexOfLastMeeting - usersPerPage;
    const currentMeetings = users.slice(indexOfFirstMeeting, indexOfLastMeeting);

    const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    return (
        <div className="bg-gray-200 p-4 mt-4">
            <div className="overflow-x-auto">
                {showNoMeetings ? (
                    <div className="text-center text-2xl font-semibold text-gray-600 p-2">
                        No Users Found
                    </div>
                ) : (
                    <div>
                        {users.length > 0 && (
                            <table className="w-full border-collapse border border-gray-400">
                                <thead className="text-xl bg-gray-300">
                                    <tr>
                                        <th className="border border-gray-400 w-[10vw] px-4 py-2">SN</th>
                                        {/* <th className="border border-gray-400 w-[10vw] px-4 py-2">Role</th> */}
                                        <th className="border border-gray-400 w-[35vw] px-4 py-2">Name</th>
                                        <th className="border border-gray-400 w-[35vw] px-4 py-2">Phone Number</th>
                                        <th className="border border-gray-400 w-[20vw] px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-xl">
                                    {currentMeetings.map((user, index) => (
                                        <tr key={user._id} className="text-center odd:bg-white even:bg-gray-100">
                                            <td className="border border-gray-400 w-[10vw] px-4 py-2">{indexOfFirstMeeting + index + 1}</td>
                                            {/* <td className="border border-gray-400 w-[10vw] px-4 py-2">{user.role}</td> */}
                                            <td className="border border-gray-400 w-[35vw] px-4 py-2">{user.username}</td>
                                            <td className="border border-gray-400 w-[35vw] px-4 py-2">{user.phoneNumber}</td>
                                            <td className="border border-gray-400 w-[20vw] p-2">
                                                <button  className="bg-yellow-500 text-white px-2 py-1 mr-1.5 rounded hover:bg-yellow-600">
                                                    Edit
                                                </button>
                                                <button
                                                    // onClick={() => handleDelete(user._id)}
                                                    className="bg-red-500 text-white px-2 py-1 ml-1.5 rounded hover:bg-red-600">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {/* Pagination - Show only when totalPages > 1 */}
                        {totalPages > 1 && (
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminRole;
