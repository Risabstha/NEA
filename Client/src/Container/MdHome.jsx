import React, { useState } from 'react';
import MdMeeting_Filter from '../Home/MdMeeting_FIlter';
import { Outlet } from "react-router-dom";

const MdHome = () => {
    return (
        <>
            
            <MdMeeting_Filter />
            <Outlet />  {/* Outlet is a placeholder that renders child routes inside a parent route. Here used to render Meeting  */}

        </>
    );
}
export default MdHome;