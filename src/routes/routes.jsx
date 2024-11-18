import { createHashRouter } from "react-router-dom";
import { Login } from "../components/Login";
import { Registro } from "../components/Registro";
import { LandingPage } from "../components/LandingPage";
import { Blog } from "../components/ListaDeBlogs";
import { Perfil } from "../components/Perfil";
import { NuevoBlog } from "../components/NuevoBlog";



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
    path: '/Perfil',
    element: <Perfil />
  },
  {
    path: '/NuevoBlog',
    element: <NuevoBlog />
  },
  {
    path: '/Blog',
    element: <Blog />
  }
])