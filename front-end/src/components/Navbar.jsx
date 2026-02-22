import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useWindowWidth from "@/hooks/useWindowWidth";
import "./Navbar.css";

/**
 * Barra de navegación principal de la aplicación.
 * Muestra enlaces dinámicos según el estado de autenticación del usuario
 * y adapta su diseño para móviles mediante un menú hamburguesa.
 */
const Navbar = () => {
  // Datos del usuario y funciones de autenticación
  const { isAuthenticated, user, logout } = useAuth();

  // Controla si el menú móvil está abierto o cerrado
  const [menuOpen, setMenuOpen] = useState(false);

  // Hook personalizado para obtener el ancho de la ventana
  const width = useWindowWidth();

  // Cierra el menú (útil al navegar entre páginas)
  const closeMenu = () => setMenuOpen(false);

  /**
   * Cierra automáticamente el menú hamburguesa cuando la pantalla
   * vuelve a ser grande (>600px). Evita que el menú quede abierto
   * al cambiar el tamaño de la ventana.
   */
  useEffect(() => {
    if (width > 600 && menuOpen) {
      setMenuOpen(false);
    }
  }, [width]);

  return (
    <nav>
      {/* LOGO / ENLACE PRINCIPAL */}
      <div className="nav-left">
        <Link to="/" onClick={closeMenu}>
          BikeMarket
        </Link>
      </div>

      {/* BOTÓN HAMBURGUESA (solo visible en móvil) */}
      <button
        className="nav-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`hamburger-icon ${menuOpen ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {/* MENÚ DE NAVEGACIÓN */}
      <div className={`nav-right ${menuOpen ? "nav-open" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Inicio
        </Link>

        {/* Si el usuario está autenticado, mostrar opciones adicionales */}
        {isAuthenticated ? (
          <>
            {/* Enlace exclusivo para administradores */}
            {user?.role === "admin" && (
              <Link to="/admin" onClick={closeMenu}>
                Admin
              </Link>
            )}

            {/* Enlaces para usuarios logueados */}
            <Link to="/my-bikes" onClick={closeMenu}>
              Mis bicis
            </Link>

            <Link to="/new-bike" onClick={closeMenu}>
              Vender bici
            </Link>

            {/* Botón de cerrar sesión */}
            <button
              onClick={() => {
                logout();
                closeMenu();
              }}
            >
              Salir
            </button>
          </>
        ) : (
          // Si NO está autenticado, mostrar solo Login
          <Link to="/login" onClick={closeMenu}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
