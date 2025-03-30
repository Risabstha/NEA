import React from "react";
import GM_MeetingFilter from "../Home/GM/GM_MeetingFilter";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

const GM_Dashboard = () =>
{
    return(
        <>
            <GM_MeetingFilter/>
            <Outlet/>
            <div className="main-content">
            </div>
            <Footer/>
        </>
    );
}

export default GM_Dashboard