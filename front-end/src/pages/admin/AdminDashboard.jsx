import AdminLayout from "./AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1>Panel de Administración</h1>

      <div className="admin-cards">
        <div className="admin-card">
          <h3>Usuarios</h3>
          <p>Gestiona todos los usuarios registrados.</p>
        </div>

        <div className="admin-card">
          <h3>Bicicletas</h3>
          <p>Modera y administra todas las bicicletas.</p>
        </div>
      </div>
    </AdminLayout>
  );
}
