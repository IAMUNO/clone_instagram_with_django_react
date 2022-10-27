import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginRequiredRoute from "utils/LoginRequiredRoute";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";

function AccountsRoutes() {
    return (
        <Routes>
            <Route element={<LoginRequiredRoute /> }>
                <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
        </Routes>
    );
}

export default AccountsRoutes;
