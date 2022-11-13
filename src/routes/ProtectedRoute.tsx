import React from "react";

import { Navigate } from "react-router-dom";
import { useAccount } from "wagmi";

import { useUserData } from "../context/UserContextProvider";

interface ProtectedRouteProps {
  children: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }: ProtectedRouteProps) => {
  const { isConnected } = useAccount();
  const { setIsConnectModalOpen, setIsSubmissionModalOpen } = useUserData();

  if (!isConnected) {
    setIsSubmissionModalOpen(true);
    setIsConnectModalOpen(true);
    return <Navigate to="/project-list" replace />;
  }

  return children;
};

export default ProtectedRoute;
