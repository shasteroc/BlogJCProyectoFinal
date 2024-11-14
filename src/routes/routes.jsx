import { createHashRouter } from "react-router-dom";
import { Login } from "../components/Login";
import { Registro } from "../components/Registro";
import { LandingPage } from "../components/LandingPage";
import { Blog } from "../components/ListaDeBlogs";



export const router = createHashRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/Registro',
    element: <Registro />
  },
  {
    path: '/Login',
    element: <Login />
  },
  {
    path: '/Blog',
    element: <Blog />
  }
])