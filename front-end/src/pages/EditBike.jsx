import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BikeForm from "@/components/BikeForm";
import useAuth from "@/hooks/useAuth";
import {
  getBikeByIdRequest,
  updateBikeRequest,
  deleteBikeRequest
} from "@/services/bike.service";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";

const EditBike = () => {
  // ID de la bici desde la URL
  const { id } = useParams();

  // Token del usuario autenticado
  const { token } = useAuth();

  // Navegación programática
  const navigate = useNavigate();

  // Datos de la bici a editar
  const [bike, setBike] = useState(null);

  // Cargar datos de la bici al montar el componente
  useEffect(() => {
    const loadBike = async () => {
      const data = await getBikeByIdRequest(id);
      setBike(data);
    };

    loadBike();
  }, [id]);

  // Actualizar bici
  const handleUpdate = async (formData) => {
    try {
      await updateBikeRequest(id, formData, token);
      toast.success("Bicicleta actualizada");
      navigate("/my-bikes");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Eliminar bici
  const handleDelete = async () => {
    try {
      await deleteBikeRequest(id, token);
      toast.success("Bicicleta eliminada correctamente");
      navigate("/my-bikes");
    } catch (error) {
      toast.error("Error al eliminar la bicicleta");
    }
  };

  // Estado de carga
  if (!bike) return <p>Cargando...</p>;

  return (
    <div>
      <section className="bike-form-container">
        <h1 className="bike-form-title">Editar bicicleta</h1>

        {/* Formulario reutilizable con acciones de actualizar y eliminar */}
        <BikeForm
          initialData={bike}
          onSubmit={handleUpdate}
          onDelete={handleDelete}
        />
      </section>

      <Footer />
    </div>
  );
};

export default EditBike;
