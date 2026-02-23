import { useState } from "react";

/**
 * Barra de filtros para la página de bicicletas.
 * Permite filtrar por categoría, marca, estado (vendida/disponible)
 * y rango de precios. Envía los filtros al componente padre mediante onFilter().
 */
const FilterBar = ({ onFilter }) => {
  // Estados individuales para cada filtro
  const [brand, setBrand] = useState("");
  const [sold, setSold] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");

  /**
   * Opciones de marcas agrupadas por categoría.
   * Se usan para mostrar solo las marcas relevantes según el filtro.
   */
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

  // Lista completa de marcas sin duplicados
  const allBrands = [...new Set(Object.values(brandOptions).flat())];

  // Marcas que se muestran según la categoría seleccionada
  const brandsToShow = category ? brandOptions[category] : allBrands;

  /**
   * Envía los filtros seleccionados al componente padre.
   * Se ejecuta al enviar el formulario.
   */
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
      {/* FILTRO: CATEGORÍA */}
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

      {/* FILTRO: MARCA (dinámico según categoría) */}
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

      </select>

      {/* FILTRO: ESTADO (vendida / disponible) */}
      <select value={sold} onChange={(e) => setSold(e.target.value)}>
        <option value="">Todas</option>
        <option value="false">Disponibles</option>
        <option value="true">Vendidas</option>
      </select>

      {/* FILTRO: PRECIO MÍNIMO */}
      <input
        type="number"
        placeholder="Precio mínimo"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      {/* FILTRO: PRECIO MÁXIMO */}
      <input
        type="number"
        placeholder="Precio máximo"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      {/* BOTÓN DE FILTRAR */}
      <button type="submit" className="filter-btn-submit">
        Filtrar
      </button>
    </form>
  );
};

export default FilterBar;
