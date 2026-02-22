import { Link, useLocation } from "react-router-dom";
import "./admin.css";

export default function AdminLayout({ children }) {
  // Ruta actual para marcar la pestaña activa
  const { pathname } = useLocation();

  return (
    <div className="admin-container">
      {/* Navegación superior del panel admin */}
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

      {/* Contenido dinámico según la sección */}
      <div className="admin-content">
        {children}
      </div>
    </div>
  );
}
