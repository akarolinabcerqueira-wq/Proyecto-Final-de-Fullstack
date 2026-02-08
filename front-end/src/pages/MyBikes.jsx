import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import {
  getMyBikesRequest,
  deleteBikeRequest,
  markBikeAsSoldRequest
} from '../services/bike.service';

const MyBikes = () => {
  const { token } = useAuth();
  const [bikes, setBikes] = useState([]);
  const [error, setError] = useState(null);

  const loadBikes = async () => {
    try {
      const data = await getMyBikesRequest(token);
      setBikes(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadBikes();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta bici?')) return;

    await deleteBikeRequest(id, token);
    loadBikes();
  };

  const handleSold = async (id) => {
    await markBikeAsSoldRequest(id, token);
    loadBikes();
  };

  return (
    <section>
      <h1>Mis bicicletas</h1>

      {error && <p>{error}</p>}

      {bikes.length === 0 && <p>No tienes bicicletas publicadas</p>}

      {bikes.map((bike) => (
        <article key={bike._id}>
          <h3>{bike.title}</h3>
          <p>{bike.price} €</p>
          <p>Estado: {bike.sold ? 'Vendida' : 'Disponible'}</p>

          {!bike.sold && (
            <button onClick={() => handleSold(bike._id)}>
              Marcar como vendida
            </button>
          )}

          <button onClick={() => handleDelete(bike._id)}>
            Eliminar
          </button>
        </article>
      ))}
    </section>
  );
};

export default MyBikes;
