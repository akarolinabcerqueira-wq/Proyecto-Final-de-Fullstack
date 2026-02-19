import { Link } from "react-router-dom";
import "./admin.css";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2 className="admin-title">Admin</h2>

        <nav className="admin-nav">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/users">Usuarios</Link>
          <Link to="/admin/bikes">Bicicletas</Link>
        </nav>
      </aside>

      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}
