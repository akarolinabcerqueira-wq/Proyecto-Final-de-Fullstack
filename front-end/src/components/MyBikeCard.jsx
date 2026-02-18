import { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function MyBikeCard({ bike, onDelete, onToggleSold }) {
  const [index, setIndex] = useState(0);
  const startX = useRef(null);

  const images = bike.images || [];

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!startX.current) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;

    if (diff > 50) nextImage();
    if (diff < -50) prevImage();

    startX.current = null;
  };

  return (
    <div className="my-bike-card">
      <div
        className="my-bike-image-wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.length > 0 ? (
          <img src={images[index]} alt={bike.title} className="my-bike-image" />
        ) : (
          <div className="no-image">Sin imagen</div>
        )}

        <span className={`status-badge ${bike.sold ? "sold" : "available"}`}>
          {bike.sold ? "Vendida" : "Disponible"}
        </span>

        {images.length > 1 && (
          <>
            <button className="arrow left" onClick={prevImage}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="white" d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button className="arrow right" onClick={nextImage}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="white" d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      <div className="my-bike-info">
        <h3 className="my-bike-title">{bike.title}</h3>
        <p className="my-bike-price">{bike.price} €</p>

        <div className="my-bike-actions">
          <div className="row">
            <Link className="btn-orange" to={`/edit-bike/${bike._id}`}>
              Editar
            </Link>

            {/* ✔ Correct delete button */}
            <button
              className="btn-danger"
              onClick={() => onDelete(bike._id)}
            >
              Eliminar
            </button>
          </div>

          <button
            className="btn-dark full"
            onClick={() => onToggleSold(bike._id)}
          >
            {bike.sold ? "Marcar disponible" : "Marcar vendida"}
          </button>
        </div>
      </div>
    </div>
  );
}
