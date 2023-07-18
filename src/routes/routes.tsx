import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Books from "../pages/Books";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import BookDetails from "../components/BookDetails";
import BookUpdate from "../components/BookUpdate";
import AddNewBook from "../pages/AddNewBook";


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
        path: "/book-update/:id",
        element: <BookUpdate />,
      },
      {
        path: "/add-new-book",
        element: <AddNewBook />,
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
