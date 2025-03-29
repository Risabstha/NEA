import React, { useState } from 'react';
import Header from '../NavBar/Header';
import Meeting_Filter from '../Home/PA/Meeting_Filter';
import { Outlet } from "react-router-dom";
import Footer from '../Footer/Footer';

const Home = () => {
    return (
        <>
            <Header />

            <Meeting_Filter />

            <Outlet />  {/* Outlet is a placeholder that renders child routes inside a parent route. Here used to render Meeting  */}

            <div className='main-content'>
            </div>

            <Footer />


        </>
    );
}
export default Home;