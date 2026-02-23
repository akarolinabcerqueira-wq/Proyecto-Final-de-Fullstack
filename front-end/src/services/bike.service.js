const API_URL = import.meta.env.VITE_API_URL;

/* ==================================================
   BICICLETAS PÚBLICAS (SIN AUTENTICACIÓN)
================================================== */

/* Obtener bicicletas con filtros opcionales */
export const getBikesRequest = async (filters = {}) => {
  // Eliminar filtros vacíos
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([_, v]) => v !== "" && v !== null && v !== undefined
    )
  );

  const params = new URLSearchParams(cleanFilters).toString();

  const response = await fetch(`${API_URL}/bikes?${params}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al obtener bicicletas");
  }

  return data;
};

/* Obtener una bicicleta por ID */
export const getBikeByIdRequest = async (id) => {
  const response = await fetch(`${API_URL}/bikes/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al obtener la bicicleta");
  }

  return data;
};

/* ==================================================
   BICICLETAS PRIVADAS (REQUIERE TOKEN)
================================================== */

/* Obtener bicicletas del usuario autenticado */
export const getMyBikesRequest = async (token) => {
  const response = await fetch(`${API_URL}/bikes/mine`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al obtener tus bicicletas");
  }

  return data;
};

/* Eliminar una bicicleta */
export const deleteBikeRequest = async (id, token) => {
  const response = await fetch(`${API_URL}/bikes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la bicicleta");
  }
};

/* Cambiar estado Vendida/Disponible */
export const toggleSoldRequest = async (id, token) => {
  const res = await fetch(`${API_URL}/bikes/${id}/toggle-sold`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

/* Crear una bicicleta nueva */
export const createBikeRequest = async (payload, token) => {
  const response = await fetch(`${API_URL}/bikes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al crear bicicleta");
  }

  return data;
};

/* Actualizar una bicicleta existente */
export const updateBikeRequest = async (id, payload, token) => {
  const response = await fetch(`${API_URL}/bikes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al actualizar bicicleta");
  }

  return data;
};

