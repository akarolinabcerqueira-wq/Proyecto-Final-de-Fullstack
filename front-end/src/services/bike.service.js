const API_URL = import.meta.env.VITE_API_URL;

/* =====================
   PUBLIC
===================== */

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

/* =====================
   PRIVATE (AUTH)
===================== */

export const getMyBikesRequest = async (token) => {
  const response = await fetch(`${API_URL}/bikes/my`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al obtener tus bicicletas');
  }

  return data;
};

export const deleteBikeRequest = async (id, token) => {
  const response = await fetch(`${API_URL}/bikes/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Error al eliminar la bicicleta');
  }
};

export const markBikeAsSoldRequest = async (id, token) => {
  const response = await fetch(`${API_URL}/bikes/${id}/sold`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Error al marcar como vendida');
  }
};
