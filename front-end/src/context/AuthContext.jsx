import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Usuario autenticado
  const [user, setUser] = useState(null);

  // Token JWT
  const [token, setToken] = useState(null);

  // Indica si estamos cargando datos del localStorage
  const [loading, setLoading] = useState(true);

  // Cargar sesión guardada al iniciar la app
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // Iniciar sesión: guardar token y usuario
  const login = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    setToken(token);
    setUser(user);
  };

  // Cerrar sesión: limpiar datos
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token, // true si hay token
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
