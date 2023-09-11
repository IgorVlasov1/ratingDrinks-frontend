import React from "react";
import { useEffect } from "react";
import { auth } from "../http/userApi";
import { Route, Routes, Navigate } from "react-router-dom";
import {
  adminRoutes,
  publicUserRoutes,
  authRoutes,
  authorizedUserRoutes,
} from "../routes";
import { DRINKS_ROUTE, PRIVATE_ROLE, USER_ROLE } from "../utils/consts";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
const AppRouter = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(auth());
    }
  }, []);
  return (
    <Routes>
      {!isAuth &&
        publicUserRoutes.map(({ path, Component }) => (
          <>
            <Route key={uuidv4()} path={path} element={Component} />
          </>
        ))}
      {isAuth &&
        authorizedUserRoutes.map(({ path, Component }) => (
          <>
            <Route key={uuidv4()} path={path} element={Component} />
          </>
        ))}
      {currentUser.role == PRIVATE_ROLE &&
        adminRoutes.map(({ path, Component }) => (
          <>
            <Route key={uuidv4()} path={path} element={Component} />
          </>
        ))}
      <Route path="*" element={<Navigate to={DRINKS_ROUTE} replace />} /> :
    </Routes>
  );
};

export default AppRouter;
