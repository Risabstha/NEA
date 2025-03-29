import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5001/api/auth' });

// export const handleSessionExpiration = () => {
//     localStorage.removeItem("token");
//     alert("Session expired. Please log in again.");
//     window.location.href = "/";
//     return;
//   };

export const loginUser = async (data) => {
    try {
      const response = await api.post('/login', data);
      return response;
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  };
  
export const signupUser = (data) => api.post('/register', data);

// Assuming meeting routes are within the /meetings route, 
// but you might need to adjust the baseURL or the routes accordingly if it's different.
export const createMeeting = (data) => axios.post('http://localhost:5001/api/meetings', data); // Correct route if meetings are handled separately.
export const updateMeeting = (id, data) => axios.put(`http://localhost:5001/api/meetings/${id}`, data); // Assuming meeting id needs to be passed
export const deleteMeeting = (id) => axios.delete(`http://localhost:5001/api/meetings/${id}`); // Assuming meeting id needs to be passed
