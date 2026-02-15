const API_URL = import.meta.env.VITE_API_URL;

/* =====================
   PUBLIC
===================== */

export const getBikesRequest = async (filters = {}) => {
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([_, v]) => v !== "" && v !== null && v !== undefined,
    ),
  );
  const params = new URLSearchParams(cleanFilters).toString();

  const response = await fetch(`${API_URL}/bikes?${params}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al obtener bicicletas");
  }

  return data;
};

export const getBikeByIdRequest = async (id) => {
  const response = await fetch(`${API_URL}/bikes/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al obtener la bicicleta");
  }

  return data;
};

/* =====================
   PRIVATE (AUTH)
===================== */

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

export const createBikeRequest = async (formData, token) => {
  const response = await fetch(`${API_URL}/bikes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al crear bicicleta");
  }

  return data;
};

export const updateBikeRequest = async (id, formData, token) => {
  const response = await fetch(`${API_URL}/bikes/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al actualizar bicicleta");
  }

  return data;
};
