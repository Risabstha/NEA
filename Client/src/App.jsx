import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './SignIn/Login'
import AddMeeting from './Container/AddMeeting';
import Home from './Container/Home';
import Meeting_Table from './Home/PA/Meeting_Table';
import Register from './SignIn/Register';
import Yesterdaytable from './Home/PA/YesterdayTable';
import ProtectedRoute from './Protected_Route/ProtectedRoute';
import TommorrowTable from './Home/PA/TommorrowTable';
import OvermorrowTable from './Home/PA/OvermorrowTable';
import MdHome from './Container/MdHome';
import AdminRegister from './SuperAdmin/AdminRegister';
import AdminDashboard from './SuperAdmin/AdminDashboard';
import AdminRole from './SuperAdmin/FilterUser/AdminRole';
import GMRole from './SuperAdmin/FilterUser/GMRole';
import PARole from './SuperAdmin/FilterUser/PARole';
import MDRole from './SuperAdmin/FilterUser/MDrole';
import GM_Dashboard from './Container/GM_Dashboard';
import GM_YesterdayTable from './Home/GM/GM_YesterdayTable';
import GM_TomorrowTable from './Home/GM/GM_TomorrowTable';
import GM_OvermorrowTable from './Home/GM/GM_OvermorrowTable';
import GM_TodayTable from './Home/GM/GM_TodayTable';
import MD_Meeting_Table from './Home/MD/MD_Meeting_Table';
import MD_TommorrowTable from './Home/MD/MD_TommorrowTable';
import MD_Yesterdaytable from './Home/MD/MD_YesterdayTable';
import MD_OvermorrowTable from './Home/MD/MD_OvermorrowTable';
import Message_Todaytable from './Message/Message_Today';
import Message_Tomorrowtable from './Message/Message_tomorrow';
import Message_Overmorrowtable from './Message/Overmorrow_table';
import Message from './Message/Message';
import MessageFilter from './Message/MessageFilter';

function App() {
  return (
    <>
      {/* <Login/> */}
      {/* parents have absolute path "/home" */}
      {/* child routes have relative path "home" */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<ProtectedRoute />}>

            <Route path="/home" element={<Home />}>
              <Route index element={<Meeting_Table />} />
              <Route path="yesterday" element={<Yesterdaytable />} />
              <Route path="tomorrow" element={<TommorrowTable />} />
              <Route path="overmorrow" element={<OvermorrowTable />} />
            </Route>

            <Route path="/smsMeeting" element={<Message />}>
              <Route index element={<Message_Todaytable />} />
              <Route path="smsTomorrow" element={<Message_Tomorrowtable />} />
              <Route path="smsOvermorrow" element={<Message_Overmorrowtable />} />
            </Route>

            <Route path="/mdhome" element={<MdHome />}>
              <Route index element={<MD_Meeting_Table />} />
              <Route path="yesterday" element={<MD_Yesterdaytable />} />
              <Route path="tomorrow" element={<MD_OvermorrowTable />} />
              <Route path="overmorrow" element={<MD_TommorrowTable />} />
            </Route>

            <Route path="/add-meeting" element={<AddMeeting />} />

            <Route path="/adminregister" element={<AdminRegister />} />

            <Route path="/admin_dashboard" element={<AdminDashboard />}>
              <Route index element={<MDRole />} />
              <Route path="gm" element={<GMRole />} />
              <Route path="admin" element={<AdminRole />} />
              <Route path="pa" element={<PARole />} />
            </Route>

            <Route path="/gm_dashboard" element={<GM_Dashboard />}>
              <Route index element={<GM_TodayTable />} />
              <Route path="gmyesterday" element={<GM_YesterdayTable />} />
              <Route path="gmtomorrow" element={<GM_TomorrowTable />} />
              <Route path="gmovermorrow" element={<GM_OvermorrowTable />} />
            </Route>

            <Route path="/register" element={<Register />} />


          </Route>
        </Routes>
      </BrowserRouter>



    </>
  );
}

export default App
