import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ExplorePage from "../pages/ExplorePage";
import DetailsPage from "../pages/DetailsPage";
import SearchPage from "../pages/SearchPage";
import ProtectedRoute from "../components/ProtectedRoute"; // Protect Routes
import ErrorPage from "../pages/ErrorPages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <ProtectedRoute />, // Protect Dashboard & Movie Pages
        children: [
          { path: "", element: <Dashboard /> },
          { path: ":explore", element: <ExplorePage /> },
          { path: ":explore/:id", element: <DetailsPage /> },
          { path: "search", element: <SearchPage /> },
        ],
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
