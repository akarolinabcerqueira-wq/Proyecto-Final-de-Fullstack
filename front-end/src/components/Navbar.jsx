import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useWindowWidth from "@/hooks/useWindowWidth";
import "./Navbar.css";
const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const width = useWindowWidth();
  const closeMenu = () => setMenuOpen(false);
  useEffect(() => {
    if (width > 600 && menuOpen) {
      setMenuOpen(false);
    }
  }, [width]);

  return (
    <nav>
      <div className="nav-left">
        <Link to="/" onClick={closeMenu}>
          BikeMarket
        </Link>
      </div>

      {/* Hamburger button */}
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

      {/* Links */}
      <div className={`nav-right ${menuOpen ? "nav-open" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Inicio
        </Link>
        {isAuthenticated ? (
          <>
            {user?.role === "admin" && (
              <Link to="/admin" onClick={closeMenu}>
                Admin
              </Link>
            )}
            <Link to="/my-bikes" onClick={closeMenu}>
              Mis bicis
            </Link>
            <Link to="/new-bike" onClick={closeMenu}>
              Vender bici
            </Link>
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
          <Link to="/login" onClick={closeMenu}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
