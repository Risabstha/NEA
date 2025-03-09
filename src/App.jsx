import React,{ useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './Login'
import PA_panel from './PA_panel'
import Add_Meeting from './Add_Meeting';

function App() {
  return (
    <>
        {/* <Login/> */}

        <BrowserRouter> 
          <Routes>
            <Route path="/" element={<PA_panel />} />
            <Route path="/add-meeting" element={<Add_Meeting />} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App
