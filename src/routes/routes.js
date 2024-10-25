import { createBrowserRouter } from "react-router-dom";
import { Login } from "../components/Login";
import { Results } from "../components/Results";
import { Registro } from "../components/Registro";

export const router = createBrowserRouter([
  {
    path: '/',
  },
  {
    path: '/registro',
    Component: Registro
  },
  {
    path: '/login',
    Component: Login
  },
  {
    path: '/results',
    Component: Results
  }
])