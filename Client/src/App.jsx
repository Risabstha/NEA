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
import AdminRegister from './SuperAdmin/AdminRegister';
import AdminDashboard from './SuperAdmin/AdminDashboard';
import AdminRole from './SuperAdmin/FilterUser/AdminRole';
import GMRole from './SuperAdmin/FilterUser/GMRole';
import PARole from './SuperAdmin/FilterUser/PARole';
import MDRole from './SuperAdmin/FilterUser/MDrole';

function App() {
  return (
    <>
        {/* <Login/> */}
          {/* parents have absolute path "/home" */}
          {/* child routes have relative path "home" */}
        <BrowserRouter> 
          <Routes>
            <Route path="/" element={<Login/>} />

            <Route element={<ProtectedRoute/>}>

                  <Route path="/home" element={<Home/>}>   
                      <Route index element={<Meeting_Table />} />       
                      <Route path="yesterday" element={<Yesterdaytable />} />
                      <Route path="tomorrow" element={<TommorrowTable />} />
                      <Route path="overmorrow" element={<OvermorrowTable />} />
                  </Route>

                  <Route path="/mdhome" element={<MdHome/>}>
                      <Route index element={<Meeting_Table />} />       
                      <Route path="yesterday" element={<Yesterdaytable />} />
                      <Route path="tomorrow" element={<TommorrowTable />} />
                      <Route path="overmorrow" element={<OvermorrowTable />} />
                  </Route>

                  <Route path="/add-meeting" element={<AddMeeting />} />

                  <Route path="/adminregister" element={<AdminRegister/>}/>  

                  <Route path="/admin_dashboard" element={<AdminDashboard/>}>
                      <Route index element={<MDRole />} />       
                      <Route path="gm" element={<GMRole />} />
                      <Route path="admin" element={<AdminRole />} />
                      <Route path="pa" element={<PARole />} />
                  </Route>

                  <Route path="/register" element={<Register/>}/>  
                  
                 
            </Route>              
          </Routes>
        </BrowserRouter> 

        
       
    </>
  );
}

export default App
