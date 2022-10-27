import React from 'react';
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAppContext } from "store";


export default function LoginRequiredRoute({ component: Component,...kwargs }) {
    const { store: { isAuthenticated } } = useAppContext();
    let location = useLocation();

    console.log(isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/accounts/login" state={{ from:location }} />
    }
    return <Outlet />
    }


//export default function LoginRequiredRoute(props) {
//    const location = useLocation();
//
//    // TODO: useAppContext 활용하여 로그인 여부 확인
//    const isAuthenticated = false;
//
//    if ( isAuthenticated )
//        return <Outlet { ...props } />;
//
//    return <Navigate to="/accounts/login" state={{from: location }} />
//
