import React from "react";

import { Navigate } from "react-router-dom";

import useStateManager from "../hooks/useStateManager";

interface ProtectedRouteProps {
  children: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }: ProtectedRouteProps) => {
  const globalState = useStateManager();
  const isAuth = globalState.isAuth.get();
  if (!isAuth) {
    globalState.openConnectModal.set(true);
    return <Navigate to="/project-list" replace />;
  }

  return children;
};

export default ProtectedRoute;
