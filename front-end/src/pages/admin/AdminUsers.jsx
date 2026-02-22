import AdminLayout from "./AdminLayout";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import {
  getAllUsersRequest,
  deleteUserRequest,
} from "../../services/admin.service";
import { CONFIRM_USER_DELETE_MESSAGE } from "@/constants/messages";

export default function AdminUsers() {
  const { token } = useAuth();

  // Lista de usuarios
  const [users, setUsers] = useState([]);

  // Estado del modal de confirmación
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Eliminar usuario y actualizar lista
  const handleDelete = async (id) => {
    await deleteUserRequest(id, token);
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  // Cargar usuarios al entrar en la página
  useEffect(() => {
    if (!token) return;

    getAllUsersRequest(token)
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("Unexpected response:", data);
          return;
        }
        setUsers(data);
      })
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <AdminLayout>
      <h1>Usuarios</h1>

      {/* Tabla de usuarios */}
      <table className="admin-table admin-table-users">
        <thead>
          <tr>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td data-label="Email">{u.email}</td>
              <td data-label="Rol">{u.role}</td>

              <td data-label="Acciones">
                <button
                  className="danger-btn"
                  onClick={() => {
                    setUserToDelete(u._id);
                    setShowDeleteModal(true);
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de confirmación */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{CONFIRM_USER_DELETE_MESSAGE}</h3>
            <p>Esta acción no se puede deshacer.</p>

            <div className="modal-buttons">
              <button
                className="confirm-delete"
                onClick={async () => {
                  await deleteUserRequest(userToDelete, token);
                  setUsers((prev) =>
                    prev.filter((u) => u._id !== userToDelete)
                  );
                  setShowDeleteModal(false);
                }}
              >
                Confirmar
              </button>

              <button
                className="cancel-delete"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
