import { useState } from 'react';

const FilterBar = ({ onFilter }) => {
  const [brand, setBrand] = useState('');
  const [sold, setSold] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onFilter({
      brand,
      sold,
      minPrice,
      maxPrice
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Marca"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />

      <select value={sold} onChange={(e) => setSold(e.target.value)}>
        <option value="">Todas</option>
        <option value="false">Disponibles</option>
        <option value="true">Vendidas</option>
      </select>

      <input
        type="number"
        placeholder="Precio mínimo"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Precio máximo"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <button type="submit">Filtrar</button>
    </form>
  );
};

export default FilterBar;
