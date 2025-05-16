import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROOT_PATH } from "../routes/paths";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("userData");
    localStorage.removeItem("isAuthenticated");
    dispatch(logout());
    navigate(ROOT_PATH);
  }, [dispatch, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
