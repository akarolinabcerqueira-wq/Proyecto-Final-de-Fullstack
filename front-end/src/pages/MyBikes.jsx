import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import {
  getMyBikesRequest,
  deleteBikeRequest,
  toggleSoldRequest,
} from "@/services/bike.service";
import MyBikeCard from "@/components/MyBikeCard";
import toast from "react-hot-toast";
import "./MyBikes.css";
import { CONFIRM_DELETE_MESSAGE } from "@/constants/messages";

const MyBikes = () => {
  // Token del usuario autenticado
  const { token } = useAuth();

  // Lista de bicicletas del usuario
  const [bikes, setBikes] = useState([]);

  // Manejo de errores
  const [error, setError] = useState(null);

  // Estado del modal de eliminación
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bikeToDelete, setBikeToDelete] = useState(null);

  // Cargar bicicletas del usuario
  const loadBikes = async () => {
    try {
      const data = await getMyBikesRequest(token);
      setBikes(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Cargar al montar el componente
  useEffect(() => {
    loadBikes();
  }, []);

  // Abrir modal de confirmación
  const openDeleteModal = (id) => {
    setBikeToDelete(id);
    setShowDeleteModal(true);
  };

  // Confirmar eliminación
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

  // Cambiar estado Vendida/Disponible
  const handleToggleSold = async (id) => {
    // Optimistic UI
    setBikes((prev) =>
      prev.map((bike) =>
        bike._id === id ? { ...bike, sold: !bike.sold } : bike
      )
    );

    try {
      await toggleSoldRequest(id, token);
    } catch (err) {
      toast.error("Error al actualizar estado");
      loadBikes(); // Revertir si falla
    }
  };

  return (
    <section className="my-bikes-container">
      <h1>Mis bicicletas</h1>

      {/* Mensajes de estado */}
      {error && <p>{error}</p>}
      {bikes.length === 0 && <p>No tienes bicicletas publicadas</p>}

      {/* Grid de tarjetas */}
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

      {/* MODAL DE ELIMINACIÓN */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{CONFIRM_DELETE_MESSAGE}</h3>
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
