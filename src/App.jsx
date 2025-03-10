import React,{ useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './Login'
import AddMeeting from './AddMeeting';
import Home from './Home';

function App() {
  return (
    <>
        {/* <Login/> */}
        <BrowserRouter> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-meeting" element={<AddMeeting />} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </BrowserRouter>
      
        {/* <BrowserRouter> 
          <Routes>
            <Route path="/" element={<PA_panel />} />
            <Route path="/add-meeting" element={<Add_Meeting />} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </BrowserRouter> */}
    </>
  );
}

export default App
