import { createBrowserRouter } from "react-router-dom";
import { Login } from "../components/Login";
import { Results } from "../components/Results";
import { Registro } from "../components/Registro";

export const router = createBrowserRouter([
  {
    path: '/',
  },
  {
    path: '/Registro',
    Component: Registro
  },
  {
    path: '/Login',
    Component: Login
  },
  {
    path: '/Results',
    Component: Results
  }
])