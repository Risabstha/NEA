import React, { useState, useEffect } from "react";
import axios from "axios";

const EditUserModal = ({ user, onClose, onSave }) => {
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phoneNumber") {
            const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
            if (numericValue.length > 10) return; // Prevent more than 10 digits

            setEditedUser({ ...editedUser, [name]: numericValue });
        } else {
            setEditedUser((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSave = () => {
        onSave(editedUser);
    };

    return (
        <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-[80vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600"
                >
                    X
                </button>
                <h2 className="text-2xl font-bold mb-4">Edit User</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={editedUser.username}
                    onChange={handleChange}
                    className="border p-2 w-full mb-2"
                />
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={editedUser.phoneNumber}
                    onChange={handleChange}
                    className="border p-2 w-full mb-2"
                />
                <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-green-600"
                >
                    Save Changes
                </button>
            </div>
        </div>

    );
};


const AdminRole = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [editUser, setEditUser] = useState(null);
    const usersPerPage = 5;

    useEffect(() => {
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
                if (!response.ok) {
                    if (response.status === 401) {
                        alert("Session expired. Please log in again.");
                        localStorage.removeItem("token"); // Clear token

                        // Redirect to login page
                        window.location.href = "/"; // Change the route as per your app's structure
                    }
                    throw new Error("Failed to fetch users");
                }

                const data = await response.json();
                setUsers(data.filter((user) => user.role === "MD"));

            } catch (error) {
                console.error("Error fetching users:", error);
                setUsers([]);
            }
        };

        fetchUsers();
        const interval = setInterval(fetchUsers, 1200000);
        return () => clearInterval(interval);
    }, []);

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete the user?");
        if (!isConfirmed) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5001/api/user/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleEdit = (user) => {
        setEditUser(user);
    };

    const handleSaveChanges = async (updatedUser) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:5001/api/user/${updatedUser._id}`, updatedUser, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === updatedUser._id ? updatedUser : user
                )
            );
            setEditUser(null);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const totalPages = Math.ceil(users.length / usersPerPage);
    const indexOfLastMeeting = currentPage * usersPerPage;
    const indexOfFirstMeeting = indexOfLastMeeting - usersPerPage;
    const currentUsers = users.slice(indexOfFirstMeeting, indexOfLastMeeting);

    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <div className="bg-gray-200 p-4 mt-4">
            {editUser && (
                <EditUserModal
                    user={editUser}
                    onClose={() => setEditUser(null)}
                    onSave={handleSaveChanges}
                />
            )}
            <div className="overflow-x-auto">
                {users.length === 0 ? (
                    <div className="text-center text-2xl font-semibold text-gray-600 p-2">
                        No Users Found
                    </div>
                ) : (
                    <table className="w-full border-collapse border border-gray-400">
                        <thead className="text-xl bg-gray-300">
                            <tr>
                                <th className="border border-gray-400 px-4 py-2">SN</th>
                                <th className="border border-gray-400 px-4 py-2">Name</th>
                                <th className="border border-gray-400 px-4 py-2">Phone Number</th>
                                <th className="border border-gray-400 px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xl">
                            {currentUsers.map((user, index) => (
                                <tr key={user._id} className="text-center odd:bg-white even:bg-gray-100">
                                    <td className="border border-gray-400 px-4 py-2">{indexOfFirstMeeting + index + 1}</td>
                                    <td className="border border-gray-400 px-4 py-2">{user.username}</td>
                                    <td className="border border-gray-400 px-4 py-2">{user.phoneNumber}</td>
                                    <td className="border border-gray-400 p-2">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="bg-yellow-500 text-white px-2 py-1 mr-1.5 rounded hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="bg-red-500 text-white px-2 py-1 ml-1.5 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {/* Pagination - Show only when meetings exist */}
                {users.length > usersPerPage && (
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
        </div>
    );
};

export default AdminRole;
