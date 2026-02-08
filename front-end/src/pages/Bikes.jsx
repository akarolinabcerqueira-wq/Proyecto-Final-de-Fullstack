import { useEffect, useState } from 'react';
import { getBikesRequest } from '../services/bike.service';
import BikeCard from '../components/BikeCard';
import FilterBar from '../components/FilterBar';

const Bikes = () => {
  const [bikes, setBikes] = useState([]);
  const [filters, setFilters] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const data = await getBikesRequest(filters);
        setBikes(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBikes();
  }, [filters]);

  return (
    <section>
      <h1>Bicicletas disponibles</h1>

      <FilterBar onFilter={setFilters} />

      {error && <p>{error}</p>}

      <div>
        {bikes.map((bike) => (
          <BikeCard key={bike._id} bike={bike} />
        ))}
      </div>
    </section>
  );
};

export default Bikes;
