import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BikeForm from "../components/BikeForm";
import useAuth from "../hooks/useAuth";
import {
  getBikeByIdRequest,
  updateBikeRequest,
  deleteBikeRequest
} from "../services/bike.service";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const EditBike = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [bike, setBike] = useState(null);

  useEffect(() => {
    const loadBike = async () => {
      const data = await getBikeByIdRequest(id);
      setBike(data);
    };

    loadBike();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await updateBikeRequest(id, formData, token);
      toast.success("Bicicleta actualizada");
      navigate("/my-bikes");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBikeRequest(id, token);
      toast.success("Bicicleta eliminada correctamente");
      navigate("/my-bikes");
    } catch (error) {
      toast.error("Error al eliminar la bicicleta");
    }
  };

  if (!bike) return <p>Cargando...</p>;

  return (
    <div>
      <section className="bike-form-container">
        <h1 className="bike-form-title">Editar bicicleta</h1>

        {/* HERE is where you pass onDelete */}
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
