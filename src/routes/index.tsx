import { Navigate, RouteObject } from "react-router-dom";
import { lazy } from "react";
import Chat from "../pages/Home/Chat";
import Address from "../pages/Home/Address";
import { getCookie } from '../utils/cookie';

const Login = lazy(() => import('../pages/Login'))
const Home = lazy(() => import('../pages/Home'))

export const routes: RouteObject[] = [
    {
        path: "/",
        element: getCookie('connect.sid') ? <Navigate to="home" /> : <Navigate to="login" />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/home",
        element: <Home />,
        children: [
            {
                path: "chat",
                element: <Chat />,
            }, {
                path: "address",
                element: <Address />,
            },
        ]
    },
]  