import "./Inicio.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBikesRequest } from "@/services/bike.service";
import BikeCard from "@/components/BikeCard";
import FilterBar from "@/components/FilterBar";
import Footer from "@/components/Footer";

export default function Inicio() {
  // Lista de bicicletas filtradas
  const [bikes, setBikes] = useState([]);

  // Filtros aplicados desde la barra de filtros
  const [filters, setFilters] = useState({});

  // Manejo de errores
  const [error, setError] = useState(null);

  // Scroll suave hacia la sección de bicis
  const scrollToBikes = () => {
    const section = document.getElementById("bikes-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Cargar bicicletas cada vez que cambian los filtros
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const data = await getBikesRequest(filters);
        setBikes(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBikes();
  }, [filters]);

  return (
    <div className="inicio-container">
      {/* HERO PRINCIPAL */}
      <section className="hero-banner">
        <div className="hero-overlay">
          <h1 className="hero-title">
            Encuentra tu próxima <span>bicicleta</span>
          </h1>

          <p className="hero-subtitle">
            Compra, vende o intercambia bicicletas con estilo.
          </p>

          <div className="hero-buttons">
            <button onClick={scrollToBikes} className="btn-primary">
              Ver Todas
            </button>

            <Link to="/new-bike" className="btn-secondary">
              Publicar Bicicleta
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE BICICLETAS */}
      <section id="bikes-section" className="featured">
        <h2 className="section-title">Bicicletas Disponibles</h2>

        {/* Barra de filtros */}
        <div className="filter-bar-wrapper">
          <FilterBar onFilter={setFilters} />
        </div>

        {/* Mensaje de error */}
        {error && <p className="error-text">{error}</p>}

        {/* Grid de bicicletas */}
        <div className="bike-grid">
          {bikes.map((bike) => (
            <BikeCard key={bike._id} bike={bike} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
