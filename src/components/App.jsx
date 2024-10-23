import { RouterProvider } from "react-router-dom"
import { router } from "../routes/routes"

export const app = () => {
    return <RouterProvider router={router} />
}