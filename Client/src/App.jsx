import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './SignIn/Login'
import AddMeeting from './Container/AddMeeting';
import Home from './Container/Home';
import Meeting_Table from './Home/Meeting_Table';
import Register from './SignIn/Register';
import Yesterdaytable from './Home/YesterdayTable';
import ProtectedRoute from './Protected_Route/ProtectedRoute';
import TommorrowTable from './Home/TommorrowTable';
import OvermorrowTable from './Home/OvermorrowTable';
import MdHome from './Container/MdHome';
import MdLogin from './SignIn/MdLogin';

function App() {
  return (
    <>
        {/* <Login/> */}
          {/* parents have absolute path "/home" */}
          {/* child routes have relative path "home" */}
        <BrowserRouter> 
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/mdlogin" element={<MdLogin/>} />  
            <Route path="/register" element={<Register/>}/>  
               {/* protected route  */}
            <Route element={<ProtectedRoute/>}>
                <Route path="/home" element={<Home/>}>   
                  <Route index element={<Meeting_Table />} />       
                  <Route path="yesterday" element={<Yesterdaytable />} />
                  <Route path="tomorrow" element={<TommorrowTable />} />
                  <Route path="overmorrow" element={<OvermorrowTable />} />
                </Route>
                <Route path="mdhome" element={<MdHome/>}>
                 <Route index element={<Meeting_Table />} />       
                  <Route path="yesterday" element={<Yesterdaytable />} />
                  <Route path="tomorrow" element={<TommorrowTable />} />
                  <Route path="overmorrow" element={<OvermorrowTable />} />
                </Route>
                <Route path="/add-meeting" element={<AddMeeting />} />
            </Route>              
          </Routes>
        </BrowserRouter> 

        
       
    </>
  );
}

export default App
