const API_URL = import.meta.env.VITE_API_URL;

export const getBikesRequest = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();

  const response = await fetch(`${API_URL}/bikes?${params}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al obtener bicicletas');
  }

  return data;
};

export const getBikeByIdRequest = async (id) => {
  const response = await fetch(`${API_URL}/bikes/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al obtener la bicicleta');
  }

  return data;
};
