import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BikeForm from "../components/BikeForm";
import useAuth from "../hooks/useAuth";
import { createBikeRequest } from "../services/bike.service";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const NewBike = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData) => {
    try {
      setLoading(true);

      await createBikeRequest(formData, token);

      toast.success("Bicicleta creada correctamente");

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
        <BikeForm onSubmit={handleCreate} loading={loading} />
      </section>

      <Footer />
    </div>
  );
};

export default NewBike;
