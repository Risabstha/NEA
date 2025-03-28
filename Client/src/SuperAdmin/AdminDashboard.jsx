import React from "react";
import AdminHeader from "./AdminHeader";
import AdminPanel from "./AdminPanel";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

const AdminDashboard   = () =>
{
    return (
        <>
            <AdminHeader/>
            <AdminPanel/>
            <Outlet/>
            <div className='main-content'>
            </div>
            <Footer/>

        </>
    );
}

export default AdminDashboard
