import React from "react";
import Header from "./NavBar/Header";
import Add from "./Add_Meeting/Add";
// import Table from "./Add_Meeting/Table";
const AddMeeting = ()=>
{
    return (
        <>
            <Header/>
            <Add/>
            {/* <Table/> */}
        </>
    );
}

export default AddMeeting;