import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerRequest } from "../services/auth.service";
import "./Register.css";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    whatsapp: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  setLoading(true);

  const whatsappRegex = /^\+?[0-9]{7,15}$/;

  if (!whatsappRegex.test(formData.whatsapp)) {
    setError("Número de WhatsApp inválido.");
    setLoading(false);
    return;
  }

  try {
    await registerRequest(formData);

    toast.success("Cuenta creada correctamente");

    navigate("/login");
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <section className="register-container">
      <div className="register-card">
        <h1 className="register-title">Crear cuenta</h1>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="register-input"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            className="register-input"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="whatsapp"
            className="register-input"
            placeholder="Número de WhatsApp"
            value={formData.whatsapp}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn-primary register-btn"
            disabled={loading}
          >
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>

          {error && <p className="register-error">{error}</p>}
        </form>

        <p className="register-login">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="register-link">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
