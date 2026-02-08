const API_URL = import.meta.env.VITE_API_URL;

export const loginRequest = async (data) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Error en el login');
  }

  return result;
};
