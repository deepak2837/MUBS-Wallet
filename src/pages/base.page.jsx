import React from "react";
import NavBarComponent from "../components/navbar";
import { Outlet } from "react-router-dom";

const BaseLayout = () =>{
    return(
        <div style={{
                // backgroundColor: "#f9fafbff",
                backgroundColor: "#FCFDFF",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <NavBarComponent />
            <Outlet/>
        </div>
    )
}

export default BaseLayout;