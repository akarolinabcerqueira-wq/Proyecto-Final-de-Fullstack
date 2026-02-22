import { useState, useRef } from "react";
import "./BikeCard.css";
import { Link } from "react-router-dom";

/**
 * Componente que muestra una tarjeta de bicicleta.
 * Incluye carrusel de imágenes, estado (vendida/disponible),
 * y enlace a la página de detalles.
 */
export default function BikeCard({ bike }) {
  // Índice de la imagen actual del carrusel
  const [index, setIndex] = useState(0);

  // Referencia para detectar el inicio del gesto táctil (swipe)
  const startX = useRef(null);

  // Lista de imágenes de la bici (si no existen, array vacío)
  const images = bike.images || [];

  /**
   * Función para validar y asegurar que la imagen es válida.
   * Si la imagen viene como null, undefined o string vacía,
   * se usa una imagen placeholder.
   */
  const getSafeImage = (img) => {
    if (!img) return "/images/placeholder-bike.jpg";
    if (img === "undefined") return "/images/placeholder-bike.jpg";
    if (img === "null") return "/images/placeholder-bike.jpg";
    if (img.trim() === "") return "/images/placeholder-bike.jpg";
    return img;
  };

  /**
   * Avanza a la siguiente imagen del carrusel.
   * Si llega al final, vuelve al inicio.
   */
  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  /**
   * Retrocede a la imagen anterior del carrusel.
   * Si está en la primera, salta a la última.
   */
  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  /**
   * Guarda la posición inicial del toque (para swipe en móviles).
   */
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  /**
   * Detecta la dirección del swipe al soltar el dedo.
   * Si el movimiento supera 50px, cambia de imagen.
   */
  const handleTouchEnd = (e) => {
    if (!startX.current) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;

    if (diff > 50) nextImage();      // Swipe hacia la izquierda
    if (diff < -50) prevImage();     // Swipe hacia la derecha

    startX.current = null;
  };

  return (
    <div className="bike-card">
      {/* Contenedor de imagen con soporte para swipe en móviles */}
      <div
        className="bike-image-wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Imagen principal del carrusel */}
        <img
          src={getSafeImage(images[index])}
          alt={bike.model}
          className="bike-image"
        />

        {/* Badge de estado: Vendida / Disponible */}
        <span className={`status-badge ${bike.sold ? "sold" : "available"}`}>
          {bike.sold ? "Vendida" : "Disponible"}
        </span>

        {/* Flechas de navegación (solo si hay más de una imagen) */}
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

      {/* Información de la bicicleta */}
      <div className="bike-info">
        <h3 className="bike-title">
          {bike.brand} {bike.model}
        </h3>

        <p className="bike-price">€{bike.price}</p>

        {/* Botón para ver la página de detalles */}
        <div className="bike-actions">
          <Link to={`/bikes/${bike._id}`} className="btn-view">
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
}
