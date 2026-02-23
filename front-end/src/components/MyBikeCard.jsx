import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./BikeCard.css"; // shared styles

/**
 * Tarjeta utilizada en la sección "Mis Bicis".
 * Usa el mismo sistema de diseño que BikeCard (prefijo bc-).
 */
export default function MyBikeCard({ bike, onDelete, onToggleSold }) {
  const [index, setIndex] = useState(0);
  const startX = useRef(null);
  const images = bike.images || [];

  const next = () => setIndex((p) => (p + 1) % images.length);
  const prev = () => setIndex((p) => (p - 1 + images.length) % images.length);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!startX.current) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
    startX.current = null;
  };

  return (
    <div className="bc-card">
      {/* IMAGE CAROUSEL */}
      <div
        className="bc-image-wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.length > 0 ? (
          <img
            src={images[index]}
            alt={bike.model || bike.title}
            className="bc-image"
          />
        ) : (
          <div className="bc-no-image">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M5 12A7 7 0 1 0 12 5" /><circle cx="12" cy="12" r="3" />
              <path d="M12 5v-2M19 12h2M12 19v2M5 12H3" />
            </svg>
            <span>Sin imagen</span>
          </div>
        )}

        {/* Status badge */}
        <span className={`bc-badge ${bike.sold ? "sold" : "available"}`}>
          {bike.sold ? "Vendida" : "Disponible"}
        </span>

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="bc-dots">
            {images.map((_, i) => (
              <span key={i} className={`bc-dot ${i === index ? "active" : ""}`} />
            ))}
          </div>
        )}

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button className="bc-arrow left" onClick={(e) => { e.preventDefault(); prev(); }}>
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="white" d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="bc-arrow right" onClick={(e) => { e.preventDefault(); next(); }}>
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="white" d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* BIKE INFO */}
      <div className="bc-info">
        {/* Brand + Year */}
        <div className="bc-meta">
          <span className="bc-brand">{bike.brand}</span>
          <span className="bc-year">{bike.year}</span>
        </div>

        {/* Model — main headline */}
        <h3 className="bc-model">{bike.model}</h3>

        {/* Title — optional descriptive subtitle */}
        {bike.title && <p className="bc-title">{bike.title}</p>}

        {/* Price */}
        <div className="bc-footer">
          <span className="bc-price">€{bike.price?.toLocaleString("es-ES")}</span>
        </div>

        {/* Owner actions */}
        <div className="bc-actions">
          <div className="bc-actions-row">
            <Link className="bc-btn-edit" to={`/edit-bike/${bike._id}`}>
               Editar
            </Link>
            <button className="bc-btn-danger" onClick={() => onDelete(bike._id)}>
             Eliminar
            </button>
          </div>
          <button className="bc-btn-toggle" onClick={() => onToggleSold(bike._id)}>
            {bike.sold ? " Marcar disponible" : "Marcar vendida"}
          </button>
        </div>
      </div>
    </div>
  );
}