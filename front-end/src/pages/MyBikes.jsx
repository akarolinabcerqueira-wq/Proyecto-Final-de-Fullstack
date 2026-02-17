import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import {
  getMyBikesRequest,
  deleteBikeRequest,
  toggleSoldRequest,
} from "../services/bike.service";
import MyBikeCard from "../components/MyBikeCard";
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
        bike._id === id ? { ...bike, sold: !bike.sold } : bike
      )
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
          <MyBikeCard
            key={bike._id}
            bike={bike}
            onDelete={handleDelete}
            onToggleSold={handleToggleSold}
          />
        ))}
      </div>
    </section>
  );
};

export default MyBikes;
