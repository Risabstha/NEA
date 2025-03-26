import React, { useState } from 'react';
import MdMeeting_Filter from '../Home/MdMeeting_FIlter';
import { Outlet } from "react-router-dom";
import Footer from '../Footer/Footer';

const MdHome = () => {
    return (
        <>

            <MdMeeting_Filter />
            <div className="add-container">

            </div>
            <Outlet />  {/* Outlet is a placeholder that renders child routes inside a parent route. Here used to render Meeting  */}
            <div className='main-content'>
            </div>
            <Footer />
        </>
    );
}
export default MdHome;