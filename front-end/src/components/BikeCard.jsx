import { useState, useRef } from "react";
import "./BikeCard.css";
import { Link } from "react-router-dom";

export default function BikeCard({ bike }) {
  const [index, setIndex] = useState(0);
  const startX = useRef(null);

  const images = bike.images || [];

  // 🔥 Helper to sanitize image URLs
  const getSafeImage = (img) => {
    if (!img) return "/images/placeholder-bike.jpg";
    if (img === "undefined") return "/images/placeholder-bike.jpg";
    if (img === "null") return "/images/placeholder-bike.jpg";
    if (img.trim() === "") return "/images/placeholder-bike.jpg";
    return img;
  };

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
    <div className="bike-card">
      <div
        className="bike-image-wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={getSafeImage(images[index])}
          alt={bike.model}
          className="bike-image"
        />

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

      <div className="bike-info">
        <h3 className="bike-title">
          {bike.brand} {bike.model}
        </h3>
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
