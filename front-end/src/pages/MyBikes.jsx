import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import {
  getMyBikesRequest,
  deleteBikeRequest,
  toggleSoldRequest,
} from "../services/bike.service";
import MyBikeCard from "../components/MyBikeCard";
import toast from "react-hot-toast";
import "./MyBikes.css";

const MyBikes = () => {
  const { token } = useAuth();
  const [bikes, setBikes] = useState([]);
  const [error, setError] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bikeToDelete, setBikeToDelete] = useState(null);

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

  const openDeleteModal = (id) => {
    setBikeToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteBikeRequest(bikeToDelete, token);
      toast.success("Bicicleta eliminada correctamente");
      setShowDeleteModal(false);
      loadBikes();
    } catch (err) {
      toast.error("Error al eliminar la bicicleta");
    }
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
      toast.error("Error al actualizar estado");
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
            onDelete={openDeleteModal}
            onToggleSold={handleToggleSold}
          />
        ))}
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>¿Eliminar bicicleta?</h3>
            <p>Esta acción no se puede deshacer.</p>

            <div className="modal-buttons">
              <button className="confirm-delete" onClick={confirmDelete}>
                Sí, eliminar
              </button>

              <button
                className="cancel-delete"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyBikes;
