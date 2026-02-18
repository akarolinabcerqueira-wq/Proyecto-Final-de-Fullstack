import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBikeByIdRequest } from "../services/bike.service";
import "./BikeDetail.css";

const BikeDetail = () => {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const data = await getBikeByIdRequest(id);
        setBike(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchBike();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!bike) return <p>Cargando...</p>;

  return (
    <section className="detail-container">
      <div className="detail-card">

        {/* IMAGE GALLERY */}
        <div className="detail-gallery">
          {bike.images?.length > 0 ? (
            bike.images.map((img, i) => (
              <img key={i} src={img} alt={bike.title} className="detail-image" />
            ))
          ) : (
            <div className="no-image">Sin imágenes</div>
          )}
        </div>

        {/* INFO */}
        <div className="detail-info">
          <h1 className="detail-title">{bike.title}</h1>

          <span className={`detail-status ${bike.sold ? "sold" : "available"}`}>
            {bike.sold ? "Vendida" : "Disponible"}
          </span>

          <p className="detail-price">{bike.price} €</p>

          <div className="detail-specs">
            <p><strong>Marca:</strong> {bike.brand}</p>
            <p><strong>Modelo:</strong> {bike.model}</p>
            <p><strong>Categoría:</strong> {bike.category}</p>
          </div>

          <div className="detail-description">
            <h3>Descripción</h3>
            <p>{bike.description}</p>
          </div>
{/* CONTACT SECTION */}
{bike.owner?.whatsapp && (
  <div className="detail-contact">
    <h3>¿Te interesa esta bici?</h3>
    <a
      href={`https://wa.me/${bike.owner.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
    >
      Contactar por WhatsApp
    </a>
  </div>
)}

        </div>
      </div>
    </section>
  );
};

export default BikeDetail;
