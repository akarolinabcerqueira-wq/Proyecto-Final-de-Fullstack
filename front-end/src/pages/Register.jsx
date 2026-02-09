import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerRequest } from '../services/auth.service';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await registerRequest(formData);
      navigate('/login');
    } catch (err) {
      console.error('REGISTER ERROR:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1>Crear cuenta</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Registrarse'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </section>
  );
};

export default Register;
