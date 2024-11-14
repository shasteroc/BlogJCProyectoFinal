import { createBrowserRouter } from "react-router-dom";
import { Login } from "../components/Login";
import { Registro } from "../components/Registro";
import { LandingPage } from "../components/LandingPage";
import { Blog } from "../components/ListaDeBlogs";



export const router = createBrowserRouter([
  {
    path: '/BlogJCProyectoFinal/',
    Component: LandingPage
  },
  {
    path: '/BlogJCProyectoFinal/Registro',
    Component: Registro
  },
  {
    path: '/BlogJCProyectoFinal/Login',
    Component: Login
  },
  {
    path: '/BlogJCProyectoFinal/Blog',
    Component: Blog
  }
])