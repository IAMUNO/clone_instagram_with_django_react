import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Login from "./Login";

function AccountsRoutes() {
    return (
        <>
            <Routes>
                <Route exact path=":profile" element={<Profile />} />
                <Route exact path=":login" element={<Login />} />
            </Routes>
        </>
    );
}

export default AccountsRoutes;
