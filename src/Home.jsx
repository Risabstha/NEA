import React, { useState } from 'react';
import Header from './NavBar/Header';
import Meeting_Filter from './Home/Meeting_Filter';
import Meeting_Table from './Home/Meeting_Table';

const Home = ()=>
{
    return(
        <>
            <Header/>
            <Meeting_Filter/>
            <Meeting_Table/>
        </>
    );
}
export default Home;