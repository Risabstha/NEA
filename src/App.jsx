import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './SignIn/Login'
import AddMeeting from './Container/AddMeeting';
import Home from './Container/Home';
import Meeting_Table from './Home/Meeting_Table';
import Register from './SignIn/Register';

function App() {
  return (
    <>
        {/* <Login/> */}
        <BrowserRouter> 
          <Routes>
            <Route path="/" element={<Home />}>
                <Route index element={<Meeting_Table />} />       {/* child routes */}
                <Route path="yesterday" element={<Meeting_Table />} />
                <Route path="tomorrow" element={<Meeting_Table />} />
                <Route path="overmorrow" element={<Meeting_Table />} />
            </Route>
            <Route path="/add-meeting" element={<AddMeeting />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>}/>     
            
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App
