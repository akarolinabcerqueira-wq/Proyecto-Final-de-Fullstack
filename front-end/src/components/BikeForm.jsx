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
      images: Array.from(e.target.files) // Convertir FileList a array
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 Crear FormData REAL para enviar archivos
    const fd = new FormData();

    // Campos de texto
    fd.append("title", formData.title);
    fd.append("brand", formData.brand);
    fd.append("model", formData.model);
    fd.append("price", formData.price);
    fd.append("description", formData.description);

    // Archivos (muy importante)
    formData.images.forEach((file) => {
      fd.append("images", file);
    });

    // Enviar al componente padre
    onSubmit(fd);
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

      {/* Subida de múltiples imágenes */}
      <input
        type="file"
        name="images"
        multiple
        onChange={handleFilesChange}
        accept="image/*"
      />

      {/* Previsualización */}
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
