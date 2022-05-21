import { useContext } from "react";

import { Navigate } from "react-router";

import { AuthContext } from "./AuthContext";

export function AuthenticatedRoute({ children }) {
  const { user } = useContext(AuthContext);

  // Validate if the user is connected and autenticated
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
