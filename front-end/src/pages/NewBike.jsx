import { useNavigate } from "react-router-dom";
import BikeForm from "../components/BikeForm";
import useAuth from "../hooks/useAuth";
import { createBikeRequest } from "../services/bike.service";

const NewBike = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      await createBikeRequest(formData, token);
      navigate("/my-bikes");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section>
      <h1>Vender bicicleta</h1>
      <BikeForm onSubmit={handleCreate} />
    </section>
  );
};

export default NewBike;
