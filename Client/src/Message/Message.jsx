import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../NavBar/Header";
import MessageFilter from "./MessageFilter";
import Footer from "../Footer/Footer"
const Message = ()=>
{
    return(
        <>
            <Header/>
            <MessageFilter/>
            <Outlet/>
            <div className="main-content"></div>
            <Footer/>
        </>
    );
}
export default Message;