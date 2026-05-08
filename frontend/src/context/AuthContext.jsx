import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

function readStored() {
  try {
    const token = localStorage.getItem('ss_token');
    const user  = JSON.parse(localStorage.getItem('ss_user') || 'null');
    return { token, user };
  } catch {
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(readStored);

  const login = useCallback((tokenStr, userData) => {
    localStorage.setItem('ss_token', tokenStr);
    localStorage.setItem('ss_user', JSON.stringify(userData));
    setAuthState({ token: tokenStr, user: userData });
  }, []);

  const updateUser = useCallback((userData) => {
    localStorage.setItem('ss_user', JSON.stringify(userData));
    setAuthState(prev => ({ ...prev, user: userData }));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('ss_token');
    localStorage.removeItem('ss_user');
    setAuthState({ token: null, user: null });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token:      authState.token,
        user:       authState.user,
        isLoggedIn: !!authState.token,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
