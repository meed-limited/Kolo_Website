import React from "react";

import { Navigate } from "react-router-dom";
import { useAccount } from "wagmi";

import useStateManager from "../hooks/useStateManager";

interface ProtectedRouteProps {
  children: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }: ProtectedRouteProps) => {
  const { isConnected } = useAccount();

  const globalState = useStateManager();
  const isAuth = globalState.isAuth.get();
  console.log(isAuth);
  if (!isConnected) {
    globalState.openConnectModal.set(true);
    return <Navigate to="/project-list" replace />;
  }

  return children;
};

export default ProtectedRoute;
