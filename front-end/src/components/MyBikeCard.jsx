import { useState, useRef } from "react";
import { Link } from "react-router-dom";

/**
 * Tarjeta utilizada en la sección "Mis Bicis".
 * Muestra las imágenes de la bicicleta, permite navegar entre ellas,
 * editar, eliminar y cambiar el estado (vendida/disponible).
 */
export default function MyBikeCard({ bike, onDelete, onToggleSold }) {
  // Índice de la imagen actual del carrusel
  const [index, setIndex] = useState(0);

  // Referencia para detectar el inicio del gesto táctil (swipe)
  const startX = useRef(null);

  // Lista de imágenes de la bicicleta
  const images = bike.images || [];

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
    <div className="my-bike-card">
      {/* CONTENEDOR DE IMAGEN CON SOPORTE PARA SWIPE */}
      <div
        className="my-bike-image-wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Imagen principal o placeholder si no hay imágenes */}
        {images.length > 0 ? (
          <img
            src={images[index]}
            alt={bike.title}
            className="my-bike-image"
          />
        ) : (
          <div className="no-image">Sin imagen</div>
        )}

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

      {/* INFORMACIÓN DE LA BICICLETA */}
      <div className="my-bike-info">
        <h3 className="my-bike-title">{bike.title}</h3>
        <p className="my-bike-price">{bike.price} €</p>

        {/* ACCIONES: Editar, Eliminar, Cambiar estado */}
        <div className="my-bike-actions">
          <div className="row">
            {/* Enlace para editar la bicicleta */}
            <Link className="btn-orange" to={`/edit-bike/${bike._id}`}>
              Editar
            </Link>

            {/* Botón para eliminar la bicicleta */}
            <button
              className="btn-danger"
              onClick={() => onDelete(bike._id)}
            >
              Eliminar
            </button>
          </div>

          {/* Botón para marcar como vendida o disponible */}
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
