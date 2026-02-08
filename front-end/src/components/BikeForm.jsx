import { useState } from 'react';

const BikeForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    brand: initialData.brand || '',
    model: initialData.model || '',
    price: initialData.price || '',
    image: initialData.image || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Título"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        name="brand"
        placeholder="Marca"
        value={formData.brand}
        onChange={handleChange}
        required
      />

      <input
        name="model"
        placeholder="Modelo"
        value={formData.model}
        onChange={handleChange}
        required
      />

      <input
        name="price"
        type="number"
        placeholder="Precio"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <input
        name="image"
        placeholder="URL de la imagen"
        value={formData.image}
        onChange={handleChange}
      />

      <button type="submit">Guardar</button>
    </form>
  );
};

export default BikeForm;
