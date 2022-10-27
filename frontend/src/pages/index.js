import React from 'react';
import AppLayout from 'components/AppLayout';
import { Route, Routes } from "react-router-dom";
import LoginRequiredRoute from "utils/LoginRequiredRoute";
import About from './About';
import Home from './Home';
import AccountsRoutes from "./accounts";


function Root() {
    return (
        <AppLayout>
            <Routes>
                <Route element={<LoginRequiredRoute /> }>
                    <Route exact path='/' element={<Home />} />
                </Route>
                <Route exact path='/about' element={<About />} />
                <Route path='/accounts/*' element={<AccountsRoutes />} />
            </Routes>
        </AppLayout>
    );
}

export default Root;