const API_URL = import.meta.env.VITE_API_URL;

/* --------------------------------------------------
   REGISTRO DE USUARIO
-------------------------------------------------- */
export const registerRequest = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });

  const data = await res.json();

  // Si el backend responde con error, lanzar excepción
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

/* --------------------------------------------------
   LOGIN DE USUARIO
-------------------------------------------------- */
export const loginRequest = async (credentials) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });

  const data = await res.json();

  // Manejo de errores del backend
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};
