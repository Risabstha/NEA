import React from "react";
import Register from "../SignIn/Register";
import AdminHeader from "./AdminHeader";
import Footer from "../Footer/Footer";

const AdminRegister = () =>
{
    return (
        <>
                <AdminHeader/>
                <Register/>
                <div className='main-content'>
                </div>
                <Footer/>
        </>
    );
}

export default AdminRegister