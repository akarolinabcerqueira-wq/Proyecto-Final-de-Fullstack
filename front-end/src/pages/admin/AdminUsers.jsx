import AdminLayout from "./AdminLayout";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { getAllUsersRequest, deleteUserRequest } from "../../services/admin.service";


export default function AdminUsers() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsersRequest(token).then(setUsers);
  }, [token]);

  return (
    <AdminLayout>
      <h1>Usuarios</h1>

      <table className="admin-table">
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
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button className="danger-btn" onClick={() => deleteUserRequest(u._id, token)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
