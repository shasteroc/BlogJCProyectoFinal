import { createBrowserRouter } from "react-router-dom";
import { login } from "../components/Login";
import { results } from "../components/Results";

export const router = createBrowserRouter ([
    {
        path: '/',
        Component: login
    },
    {
        path: '/results',
        Component: results
    }
])