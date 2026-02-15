import { useState } from "react";

const FilterBar = ({ onFilter }) => {
  const [brand, setBrand] = useState("");
  const [sold, setSold] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");

  const brandOptions = {
    mountain: ["Trek", "Specialized", "Giant", "Cannondale", "Scott"],
    road: ["Canyon", "Bianchi", "Pinarello", "Colnago", "Wilier"],
    city: ["Orbea", "Cube", "Raleigh", "Gazelle"],
    electric: ["Haibike", "Riese & Müller", "Moustache", "VanMoof"],
    bmx: ["Haro", "GT", "Redline"],
    gravel: ["Canyon", "Specialized", "Giant", "Orbea"],
    kids: ["Woom", "Btwin", "Specialized"],
    other: ["Otra / No conocida"],
  };

const allBrands = [...new Set(Object.values(brandOptions).flat())];
  const brandsToShow = category ? brandOptions[category] : allBrands;

  const handleSubmit = (e) => {
    e.preventDefault();

    onFilter({
      category,
      brand,
      sold,
      minPrice,
      maxPrice,
    });
  };

  return (
    <form className="filter-bar" onSubmit={handleSubmit}>
      {/* CATEGORY */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="category-select"
      >
        <option value="">Todas las categorías</option>
        <option value="mountain">Montaña / Trail</option>
        <option value="road">Carretera / Velocidad</option>
        <option value="city">Ciudad / Urbano</option>
        <option value="electric">Eléctrica</option>
        <option value="bmx">BMX</option>
        <option value="gravel">Gravel</option>
        <option value="kids">Infantil</option>
      </select>

      {/* BRAND */}
      <select
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="brand-select"
      >
        <option value="">Todas las marcas</option>

        {brandsToShow.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}

        <option value="Other">Otra / No conocida</option>
      </select>

      <select value={sold} onChange={(e) => setSold(e.target.value)}>
        {" "}
        <option value="">Todas</option>{" "}
        <option value="false">Disponibles</option>{" "}
        <option value="true">Vendidas</option>{" "}
      </select>

      {/* PRICE RANGE */}
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

      <button type="submit" className="filter-btn-submit">
        Filtrar
      </button>
    </form>
  );
};

export default FilterBar;
