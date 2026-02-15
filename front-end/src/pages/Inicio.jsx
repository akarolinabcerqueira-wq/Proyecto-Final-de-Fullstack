import "./Inicio.css";
import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <div className="inicio-container">

      {/* HERO / BANNER SECTION */}
      <section className="hero-banner">
        <div className="hero-overlay">
          <h1 className="hero-title">
            Encuentra tu próxima <span>bicicleta</span>
          </h1>
          <p className="hero-subtitle">
            Compra, vende o intercambia bicicletas con estilo.
          </p>

          <div className="hero-buttons">
            <Link to="/bikes" className="btn-primary">Ver Bicicletas</Link>
            <Link to="/new-bike" className="btn-secondary">Publicar Bicicleta</Link>
          </div>
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className="featured">
        <h2 className="section-title">Destacadas</h2>

        <div className="featured-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bike-card">
              <div className="bike-img-placeholder"></div>
              <h3 className="bike-title">Bicicleta #{i}</h3>
              <p className="bike-price">€{i * 150}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
