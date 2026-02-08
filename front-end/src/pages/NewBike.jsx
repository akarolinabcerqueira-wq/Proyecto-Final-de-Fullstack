import { useNavigate } from 'react-router-dom';
import BikeForm from '../components/BikeForm';
import useAuth from '../hooks/useAuth';
import { createBikeRequest } from '../services/bike.service';

const NewBike = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleCreate = async (bikeData) => {
    try {
      await createBikeRequest(bikeData, token);
      navigate('/my-bikes');
    } catch (error) {
      alert(error.message);
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
