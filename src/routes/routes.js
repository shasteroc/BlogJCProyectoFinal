import { createBrowserRouter } from "react-router-dom";
import { Login } from "../components/Login";
import { Results } from "../components/Results";
import { Registro } from "../components/Registro";
import { LandingPage } from "../components/LandingPage";
import { Blog } from "../components/ListaDeBlogs";



export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingPage
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
    path: '/Blog',
    Component: Blog
  },
  {
    path: '/Results',
    Component: Results
  }
])