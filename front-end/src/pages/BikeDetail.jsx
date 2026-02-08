import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBikeByIdRequest } from '../services/bike.service';

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
    <section>
      <h1>{bike.title}</h1>
      <img src={bike.image} alt={bike.title} />
      <p><strong>Marca:</strong> {bike.brand}</p>
      <p><strong>Modelo:</strong> {bike.model}</p>
      <p><strong>Precio:</strong> {bike.price} €</p>
      <p><strong>Estado:</strong> {bike.sold ? 'Vendida' : 'Disponible'}</p>
    </section>
  );
};

export default BikeDetail;
