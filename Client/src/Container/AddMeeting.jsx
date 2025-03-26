import React from "react";
import Header from "../NavBar/Header";
import Add from "../Add_Meeting/Add";
import Footer from "../Footer/Footer";

const AddMeeting = () => {
    return (
        <>
            
            <div className="add-container">
                <Header />
                <Add />
            </div>
            
        </>
    );
}

export default AddMeeting;