import React from "react";
import RoleFilter from "./FilterUser/RoleFilter";

const AdminPanel = () => {
    return (
        <>
            <div className="mt-[5vh]">
                {/* <div className="space-x-5 mt-[4vh] flex justify-center">
                    <select id="role-select" className="border-b-2 outline-none p-1 " placeholder="Filter User Roles">
                        <option value="MD">Managing Director (MD)</option>
                        <option value="PA">Personal Assistant (PA)</option>
                        <option value="GM">General Manager (GM)</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div> */}
                <RoleFilter />
            </div>
        </>
    );
}

export default AdminPanel