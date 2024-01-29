import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  import Homepage from "../views/Homepage";
  import ViewHistory from "../views/ViewHistory"

const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage/>,
    },
    {
        path: "/history",
        element: <ViewHistory/>,
      },
  ]);

  function MainRouter() {
    return <RouterProvider router={router} />
  }

  export default MainRouter;