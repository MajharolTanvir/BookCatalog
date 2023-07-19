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
import PrivateRoute from "./privateRoutes";
import Wishlists from "../pages/Wishlists";
import ReadListData from "../pages/ReadListData";


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
        path: "/wishlists",
        element: <Wishlists />,
      },
      {
        path: "/readlists",
        element: <ReadListData />,
      },
      {
        path: "/book-details/:id",
        element: (
          // <PrivateRoute>
          <BookDetails />
          // </PrivateRoute>
        ),
      },
      {
        path: "/book-update/:id",
        element: (
          <PrivateRoute>
            <BookUpdate />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-new-book",
        element: (
          <PrivateRoute>
            <AddNewBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
