import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BikeForm from "../components/BikeForm";
import useAuth from "../hooks/useAuth";
import {
  getBikeByIdRequest,
  updateBikeRequest,
} from "../services/bike.service";
import Footer from "../components/Footer";

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
      navigate("/my-bikes");
    } catch (error) {
      alert(error.message);
    }
  };

  if (!bike) return <p>Cargando...</p>;

  return (
    <div>
      <section className="bike-form-container">
    <h1 className="bike-form-title">Editar bicicleta</h1>
            <BikeForm initialData={bike} onSubmit={handleUpdate} />{" "}
      </section>
      <Footer />
    </div>
  );
};

export default EditBike;
