import "./BikeCard.css";
import { Link } from "react-router-dom";

export default function BikeCard({ bike }) {
  return (
    <div className="bike-card">
      
      <div className="bike-image-wrapper">
        <img
          src={bike.images[0]}
          alt={bike.model}
          className="bike-image"
        />

        {/* BADGE MUST BE HERE */}
        <span className={`status-badge ${bike.sold ? "sold" : "available"}`}>
          {bike.sold ? "Vendida" : "Disponible"}
        </span>
      </div>

      <div className="bike-info">
        <h3 className="bike-title">{bike.brand} {bike.model}</h3>
        <p className="bike-price">€{bike.price}</p>

        <div className="bike-actions">
          <Link to={`/bikes/${bike._id}`} className="btn-view">
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
}
