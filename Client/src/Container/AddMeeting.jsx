import React from "react";
import Header from "../NavBar/Header";
import Add from "../Add_Meeting/Add";

const AddMeeting = () => {
    return (
        <>
            
            <div className="add-container">
                <Header />
                <Add />
                <p className="text-center p-[2vh] mt-[10vh]"> Powered by Nepal Electricity Authority &copy; {new Date().getFullYear()}</p>
            </div>
            
        </>
    );
}

export default AddMeeting;