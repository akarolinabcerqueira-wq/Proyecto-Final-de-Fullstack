import { Link } from 'react-router-dom';
import './BikeCard.css';

const BikeCard = ({ bike }) => {
    return (
    <article className="bike-card">
      <img src={bike.image} alt={bike.title} />
      <h3>{bike.title}</h3>
      <p>{bike.price} €</p>

      {bike.sold && <span className="badge">Vendida</span>}

      <Link to={`/bikes/${bike._id}`}>Ver detalle</Link>
    </article>
  );
};

export default BikeCard;
