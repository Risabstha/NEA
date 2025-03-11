import React, { useState } from 'react';
import Header from './NavBar/Header';
import Meeting_Filter from './Home/Meeting_Filter';
import {Outlet } from "react-router-dom";

const Home = ()=>
{
    return(
        <>
            <Header/>
            <Meeting_Filter/>
             <Outlet/>  {/* Outlet is a placeholder that renders child routes inside a parent route. Here used to render Meeting  */}
            
            
            
        </>
    );
}
export default Home;