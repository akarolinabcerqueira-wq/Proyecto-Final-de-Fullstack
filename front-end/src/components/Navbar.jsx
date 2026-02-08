import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/bikes">Bicicletas</Link>

      {isAuthenticated ? (
        <>
          <Link to="/my-bikes">Mis bicis</Link>
          <Link to="/new-bike">Vender bici</Link>
          <button onClick={logout}>Salir</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
