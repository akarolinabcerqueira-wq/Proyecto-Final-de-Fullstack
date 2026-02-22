import { Link, useLocation } from "react-router-dom";
import "./admin.css";

export default function AdminLayout({ children }) {
  const { pathname } = useLocation();

  return (
    <div className="admin-container">
      {/* TOP TABS */}
      <nav className="admin-tabs">
        <Link
          to="/admin/users"
          className={pathname.includes("/admin/users") ? "tab active" : "tab"}
        >
          Usuarios
        </Link>

        <Link
          to="/admin/bikes"
          className={pathname.includes("/admin/bikes") ? "tab active" : "tab"}
        >
          Bicicletas
        </Link>
      </nav>

      <div className="admin-content">
        {children}
      </div>
    </div>
  );
}
