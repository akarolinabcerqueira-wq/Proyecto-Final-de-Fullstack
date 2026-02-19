const API_URL = import.meta.env.VITE_API_URL;

export const getAllUsersRequest = async (token) => {
  const res = await fetch(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const deleteUserRequest = async (id, token) => {
  await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};
