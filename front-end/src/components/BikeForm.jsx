import { useState } from "react";

const BikeForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    brand: initialData.brand || "",
    model: initialData.model || "",
    price: initialData.price || "",
    description: initialData.description || "",
    images: initialData.images || [], // Can be URLs or File objects
    sold: initialData.sold || false
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFilesChange = (e) => {
    const newFiles = Array.from(e.target.files);

    setFormData({
      ...formData,
      images: [...newFiles] // Replace old images with new ones
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("title", formData.title);
    fd.append("brand", formData.brand);
    fd.append("model", formData.model);
    fd.append("price", formData.price);
    fd.append("description", formData.description);
    fd.append("sold", formData.sold);

    // IMPORTANT:
    // Only append File objects, not URLs
    formData.images.forEach((img) => {
      if (img instanceof File) {
        fd.append("images", img);
      }
    });

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

      {/* Upload new images */}
      <input
        type="file"
        name="images"
        multiple
        onChange={handleFilesChange}
        accept="image/*"
      />

      {/* Preview */}
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {formData.images.map((img, idx) => {
          const isFile = img instanceof File;
          const src = isFile ? URL.createObjectURL(img) : img;

          return (
            <img
              key={idx}
              src={src}
              alt={`preview-${idx}`}
              width={100}
              height={100}
              style={{ objectFit: "cover", borderRadius: "5px" }}
            />
          );
        })}
      </div>

      {/* Sold checkbox */}
      <label style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px" }}>
        <input
          type="checkbox"
          name="sold"
          checked={formData.sold}
          onChange={(e) =>
            setFormData({ ...formData, sold: e.target.checked })
          }
        />
        Vendida
      </label>

      <button type="submit" style={{ marginTop: "15px" }}>
        Guardar
      </button>
    </form>
  );
};

export default BikeForm;
