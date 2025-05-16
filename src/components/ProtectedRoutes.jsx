import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { LOGIN_PATH } from "../routes/paths";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? <Outlet /> : <Navigate to={LOGIN_PATH} replace />;
};

export default ProtectedRoute;
