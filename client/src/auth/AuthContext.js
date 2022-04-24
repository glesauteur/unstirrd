import { createContext, useContext } from "react";

import { useState, useEffect } from "react";

export const AuthContext = createContext({ user: null });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("/api/current-user")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((user) => {
        setLoading(false);
        setUser(user);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
