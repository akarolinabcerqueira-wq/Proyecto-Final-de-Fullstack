import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav>
      <div className="nav-left">
        <Link to="/">BikeMarket</Link>
      </div>

      <div className="nav-right">
        <Link to="/">Inicio</Link>

        {isAuthenticated ? (
          <>
            {/* Show admin link only if user.role === "admin" */}
            {user?.role === "admin" && (
              <Link to="/admin">Admin</Link>
            )}

            <Link to="/my-bikes">Mis bicis</Link>
            <Link to="/new-bike">Vender bici</Link>
            <button onClick={logout}>Salir</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
