import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginRequest } from '@/services/auth.service';
import useAuth from '@/hooks/useAuth';
import "./Login.css";

const Login = () => {
  // Campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Manejo de errores
  const [error, setError] = useState(null);

  // Función login del contexto
  const { login } = useAuth();

  // Navegación tras iniciar sesión
  const navigate = useNavigate();

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Petición al backend
      const data = await loginRequest({ email, password });

      // Guardar sesión en el contexto
      login(data.token, data.user);

      // Redirigir al panel del usuario
      navigate('/my-bikes');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="login-container">
      <div className="login-card">
        <h1 className="login-title">Iniciar sesión</h1>

        {/* Formulario de login */}
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn-primary login-btn">
            Entrar
          </button>

          {/* Error de autenticación */}
          {error && <p className="login-error">{error}</p>}
        </form>

        {/* Enlace a registro */}
        <p className="login-register">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="login-link">
            Crear cuenta
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
