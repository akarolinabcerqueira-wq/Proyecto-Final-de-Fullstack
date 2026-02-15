import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import {
  getMyBikesRequest,
  deleteBikeRequest,
  toggleSoldRequest,
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

  const handleToggleSold = async (id) => {
    setBikes((prev) =>
      prev.map((bike) =>
        bike._id === id ? { ...bike, sold: !bike.sold } : bike,
      ),
    );

    try {
      await toggleSoldRequest(id, token);
    } catch (err) {
      alert(err.message);
      loadBikes();
    }
  };

  return (
    <section className="my-bikes-container">
      <h1>Mis bicicletas</h1>

      {error && <p>{error}</p>}
      {bikes.length === 0 && <p>No tienes bicicletas publicadas</p>}

      <div className="my-bikes-grid">
        {bikes.map((bike) => (
          <div key={bike._id} className="my-bike-card">
            <div className="my-bike-image-wrapper">
              {bike.images?.length > 0 ? (
                <img
                  src={bike.images[0]}
                  alt={bike.title}
                  className="my-bike-image"
                />
              ) : (
                <div className="no-image">Sin imagen</div>
              )}

              <span
                className={`status-badge ${bike.sold ? "sold" : "available"}`}
              >
                {bike.sold ? "Vendida" : "Disponible"}
              </span>
            </div>

            <div className="my-bike-info">
              <h3 className="my-bike-title">{bike.title}</h3>
              <p className="my-bike-price">{bike.price} €</p>

              <div className="my-bike-actions">
                {" "}
                <div className="row">
                  {" "}
                  <Link className="btn-orange" to={`/edit-bike/${bike._id}`}>
                    Editar
                  </Link>{" "}
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(bike._id)}
                  >
                    Eliminar
                  </button>{" "}
                </div>{" "}
                <button
                  className="btn-dark full"
                  onClick={() => handleToggleSold(bike._id)}
                >
                  {" "}
                  {bike.sold ? "Marcar disponible" : "Marcar vendida"}{" "}
                </button>{" "}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyBikes;
