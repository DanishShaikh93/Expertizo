import {
    createBrowserRouter,
    RouterProvider,
    useNavigate
  } from "react-router-dom";
import Homepage from "../views/Homepage";
import AboutUs from "../views/AboutUs";

  const router = createBrowserRouter([
    {
      path: "/about-us",
      element: <AboutUs/>,
    },
    {
        path: "/",
        element: <Homepage/>,
      }
  ]);

  function Router() {
    return <RouterProvider router={router} />
  }

  export default Router;