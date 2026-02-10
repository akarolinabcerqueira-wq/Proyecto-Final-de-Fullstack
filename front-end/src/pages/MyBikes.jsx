import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import {
  getMyBikesRequest,
  deleteBikeRequest,
  markBikeAsSoldRequest,
} from "../services/bike.service";
import { Link } from "react-router-dom";
import "./MyBikes.css";

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
    if (!confirm("¿Eliminar esta bici?")) return;

    await deleteBikeRequest(id, token);
    loadBikes();
  };

  const handleSold = async (id) => {
    try {
      await markBikeAsSoldRequest(id, token);
      loadBikes();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section>
      <h1>Mis bicicletas</h1>

      {error && <p>{error}</p>}

      {bikes.length === 0 && <p>No tienes bicicletas publicadas</p>}

      {bikes.map((bike) => (
        <article key={bike._id} className="bike-item">
          <h3>{bike.title}</h3>
          <p>{bike.price} €</p>

          <p className={bike.sold ? "sold" : ""}>
            Estado: {bike.sold ? "Vendida" : "Disponible"}
          </p>

          <div className="bike-actions">
            {!bike.sold && (
              <button onClick={() => handleSold(bike._id)}>
                Marcar como vendida
              </button>
            )}

            <Link to={`/edit-bike/${bike._id}`}>Editar</Link>

            <button onClick={() => handleDelete(bike._id)}>
              Eliminar
            </button>
          </div>
        </article>
      ))}
    </section>
  );
};

export default MyBikes;
