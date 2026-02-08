import { Link } from 'react-router-dom';

const BikeCard = ({ bike }) => {
  return (
    <article>
      <img src={bike.image} alt={bike.title} />
      <h3>{bike.title}</h3>
      <p>{bike.brand} - {bike.model}</p>
      <p>{bike.price} €</p>

      {bike.sold && <span>Vendida</span>}

      <Link to={`/bikes/${bike._id}`}>Ver detalle</Link>
    </article>
  );
};

export default BikeCard;
