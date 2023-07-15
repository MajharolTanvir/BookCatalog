import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Books from "../pages/Books";
import BookDetails from "../components/BookDetails";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/book-details/:id",
        element: <BookDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      //   {
      //     path: "/checkout",
      //     element: (
      //       <PrivateRoute>
      //         <Checkout />
      //       </PrivateRoute>
      //     ),
      //   },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
