import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Bookings from "../pages/Bookings/Bookings";
import BookService from "../pages/BookService/BookService";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/signup",
        element: <Signup></Signup>
      },
      {
        path: "book/:id",
        element: <PrivateRoutes><BookService></BookService></PrivateRoutes>,
        loader: ({params}) => fetch(`https://car-doctor-server-gray-chi.vercel.app/services/${params.id}`)
      },
      {
        path: "bookings",
        element: <PrivateRoutes><Bookings></Bookings></PrivateRoutes>
      }
    ]
  },
]);


export default router;