import { useState } from 'react';

const BikeForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    brand: initialData.brand || '',
    model: initialData.model || '',
    price: initialData.price || '',
    description: initialData.description || '',
    images: initialData.images || [] 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFilesChange = (e) => {
    setFormData({
      ...formData,
      images: Array.from(e.target.files) // convert FileList to array
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = { ...formData };

    onSubmit(dataToSubmit);
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

      <textarea
        name="description"
        placeholder="Descripción de la bicicleta"
        value={formData.description}
        onChange={handleChange}
        required
      />

      {/* Multiple file upload */}
      <input
        type="file"
        name="images"
        multiple
        onChange={handleFilesChange}
        accept="image/*"
      />

      {/* Preview selected images */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        {formData.images.map((file, idx) => (
          <img
            key={idx}
            src={URL.createObjectURL(file)}
            alt={`preview-${idx}`}
            width={100}
            height={100}
            style={{ objectFit: 'cover', borderRadius: '5px' }}
          />
        ))}
      </div>

      <button type="submit" style={{ marginTop: '15px' }}>Guardar</button>
    </form>
  );
};

export default BikeForm;
