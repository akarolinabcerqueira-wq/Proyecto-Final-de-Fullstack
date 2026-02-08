import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BikeForm from '../components/BikeForm';
import useAuth from '../hooks/useAuth';
import {
  getBikeByIdRequest,
  updateBikeRequest
} from '../services/bike.service';

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

  const handleUpdate = async (bikeData) => {
    try {
      await updateBikeRequest(id, bikeData, token);
      navigate('/my-bikes');
    } catch (error) {
      alert(error.message);
    }
  };

  if (!bike) return <p>Cargando...</p>;

  return (
    <section>
      <h1>Editar bicicleta</h1>
      <BikeForm initialData={bike} onSubmit={handleUpdate} />
    </section>
  );
};

export default EditBike;
