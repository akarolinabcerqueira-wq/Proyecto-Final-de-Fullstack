import "./Inicio.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBikesRequest } from "../services/bike.service";
import BikeCard from "../components/BikeCard";
import FilterBar from "../components/FilterBar";
import Footer from "../components/Footer";

export default function Inicio() {
  const [bikes, setBikes] = useState([]);
  const [filters, setFilters] = useState({});
  const [error, setError] = useState(null);
const scrollToBikes = () => {
  const section = document.getElementById("bikes-section");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

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
      {/* HERO BANNER */}
      <section className="hero-banner">
        <div className="hero-overlay">
          <h1 className="hero-title">
            Encuentra tu próxima <span>bicicleta</span>
          </h1>
          <p className="hero-subtitle">
            Compra, vende o intercambia bicicletas con estilo.
          </p>

          <div className="hero-buttons">
<button onClick={scrollToBikes} className="btn-primary"> Ver Todas </button>            <Link to="/new-bike" className="btn-secondary">
              Publicar Bicicleta
            </Link>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section id="bikes-section" className="featured">
        {" "}
        <h2 className="section-title">Bicicletas Disponibles</h2>{" "}
        <div className="filter-bar-wrapper">
          {" "}
          <FilterBar onFilter={setFilters} />{" "}
        </div>{" "}
        {error && <p className="error-text">{error}</p>}{" "}
        <div className="bike-grid">
          {" "}
          {bikes.map((bike) => (
            <BikeCard key={bike._id} bike={bike} />
          ))}{" "}
        </div>{" "}
       
      </section>
         <Footer /> 
    </div>
  );
}
