import { RouterProvider } from "react-router-dom"
import { Router } from "../routes/routes"

export const App = () => {
    return <RouterProvider Router={Router} />
}