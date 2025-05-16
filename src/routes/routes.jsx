import {
  HOME_PATH,
  LOGIN_PATH,
  LOGOUT_PATH,
  MOVIE_PATH,
  ROOT_PATH,
} from "./paths";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Login from "../components/Login";
import Movie from "../components/Movie";
import Logout from "../components/LogOut";
import ProtectedRoute from "../components/ProtectedRoutes";
import MovieDetails from "../components/MovieDetails";
import Home from "../components/Home";

export const router = createBrowserRouter([
  {
    path: ROOT_PATH,
    element: <AppLayout />,
    children: [
      {
        path: LOGIN_PATH,
        element: <Login />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Movie />,
          },
          {
            path: MOVIE_PATH,
            children: [
              {
                index: true,
                element: <Movie />,
              },
              {
                path: ":id",
                element: <MovieDetails />,
              },
            ],
          },
          {
            path: HOME_PATH,
            element: <Home />,
          },
          {
            path: LOGOUT_PATH,
            element: <Logout />,
          },
          {
            path: "*",
            element: <Movie />,
          },
        ],
      },
    ],
  },
]);
