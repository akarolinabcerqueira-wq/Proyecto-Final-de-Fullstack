import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import useAuth from "../../hooks/useAuth";
import {
  getBikesRequest,
  deleteBikeRequest,
} from "../../services/bike.service";
import toast from "react-hot-toast";
import "./admin.css";
import { CONFIRM_DELETE_MESSAGE } from "@/constants/messages";

export default function AdminBikes() {
  const { token } = useAuth();

  // Lista de bicicletas
  const [bikes, setBikes] = useState([]);

  // Estado del modal de eliminación
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bikeToDelete, setBikeToDelete] = useState(null);

  // Imagen segura para evitar URLs vacías o inválidas
  const getSafeImage = (img) => {
    if (!img) return "/images/placeholder-bike.jpg";
    if (img === "undefined") return "/images/placeholder-bike.jpg";
    if (img === "null") return "/images/placeholder-bike.jpg";
    if (img.trim() === "") return "/images/placeholder-bike.jpg";
    return img;
  };

  // Cargar bicicletas al entrar en la página
  useEffect(() => {
    getBikesRequest().then(setBikes);
  }, []);

  // Confirmar eliminación
  const confirmDelete = async () => {
    try {
      await deleteBikeRequest(bikeToDelete, token);
      setBikes(bikes.filter((b) => b._id !== bikeToDelete));
      toast.success("Bicicleta eliminada correctamente");
    } catch (err) {
      toast.error("Error al eliminar la bicicleta");
    } finally {
      setShowDeleteModal(false);
      setBikeToDelete(null);
    }
  };

  return (
    <AdminLayout>
      <h1>Bicicletas</h1>

      {/* Tabla de bicicletas */}
      <table className="admin-table admin-table-bikes">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Título</th>
            <th>Marca</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {bikes.map((b) => (
            <tr key={b._id}>
              <td data-label="Foto">
                <img
                  src={getSafeImage(b.images?.[0])}
                  alt={b.title}
                  className="admin-thumb"
                />
              </td>

              <td data-label="Título">{b.title}</td>
              <td data-label="Marca">{b.brand}</td>
              <td data-label="Precio">{b.price} €</td>

              <td data-label="Acciones">
                <Link to={`/edit-bike/${b._id}`} className="edit-btn">
                  Editar
                </Link>

                <button
                  onClick={() => {
                    setBikeToDelete(b._id);
                    setShowDeleteModal(true);
                  }}
                  className="danger-btn"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de confirmación */}
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
    </AdminLayout>
  );
}
