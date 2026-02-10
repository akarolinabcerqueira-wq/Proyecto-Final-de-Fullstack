import { Link } from 'react-router-dom';
import './BikeCard.css';

const BikeCard = ({ bike }) => {
  return (
    <article className="bike-card">
      {/* Mostrar la primera imagen del array, o un placeholder si no hay */}
      <img
        src={bike.images && bike.images.length > 0 ? bike.images[0] : '/placeholder.png'}
        alt={bike.title}
      />

      <h3>{bike.title}</h3>
      <p><strong>Marca:</strong> {bike.brand}</p>
      <p>{bike.description}</p>
      <p><strong>Precio:</strong> {bike.price} €</p>

      {bike.sold && <span className="badge">Vendida</span>}

      <Link to={`/bikes/${bike._id}`}>Ver detalle</Link>
    </article>
  );
};

export default BikeCard;
