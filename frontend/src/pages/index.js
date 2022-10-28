import React from 'react';
import { Route, Routes } from "react-router-dom";
import LoginRequiredRoute from "utils/LoginRequiredRoute";
import About from './About';
import Home from './Home';
import AccountsRoutes from "./accounts";
import PostNew from "./PostNew";


function Root() {
    return (
        <>
            <Routes>
                <Route element={<LoginRequiredRoute /> }>
                    <Route exact path='/' element={<Home />} />
                </Route>

                <Route exact path='/about' element={<About />} />

                <Route element={<LoginRequiredRoute /> }>
                    <Route exact path='/post/new' element={<PostNew />} />
                </Route>

                <Route path='/accounts/*' element={<AccountsRoutes />} />
            </Routes>
        </>
    );
}

export default Root;