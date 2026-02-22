import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BikeForm from "@/components/BikeForm";
import useAuth from "@/hooks/useAuth";
import { createBikeRequest } from "@/services/bike.service";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";

const NewBike = () => {
  // Token del usuario autenticado
  const { token } = useAuth();

  // Navegación tras crear la bici
  const navigate = useNavigate();

  // Estado de carga del formulario
  const [loading, setLoading] = useState(false);

  // Crear nueva bicicleta
  const handleCreate = async (formData) => {
    try {
      setLoading(true);

      await createBikeRequest(formData, token);

      toast.success("Bicicleta creada correctamente");

      // Redirigir a mis bicicletas
      navigate("/my-bikes");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bike-form-container">
        <h1 className="bike-form-title">Vender bicicleta</h1>

        {/* Formulario reutilizable para crear una bici */}
        <BikeForm onSubmit={handleCreate} loading={loading} />
      </section>

      <Footer />
    </div>
  );
};

export default NewBike;
