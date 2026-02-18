import { useState } from "react";
import "./‌BikeForm.css";
import { uploadImage } from "../utils/uploadImage";
import { compressImage } from "../utils/compressImage";

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

const BikeForm = ({
  initialData = {},
  onSubmit,
  onDelete,
  loading = false,
}) => {
  const isEditing = Boolean(initialData && initialData._id);

  // ✅ MUST BE INSIDE THE COMPONENT
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData.title || "",
    category: initialData.category || "",
    brand: initialData.brand || "",
    model: initialData.model || "",
    price: initialData.price || "",
    description: initialData.description || "",
    images: initialData.images || [],
    sold: initialData.sold ?? false,
  });

  const brandsToShow = formData.category
    ? brandOptions[formData.category]
    : allBrands;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilesChange = async (e) => {
  const newFiles = Array.from(e.target.files);

  // Show previews immediately
  setFormData((prev) => ({
    ...prev,
    images: [...prev.images, ...newFiles.map((f) => URL.createObjectURL(f))],
  }));

 const uploadedUrls = await Promise.all( newFiles.map(async (file) => { const compressed = await compressImage(file); return uploadImage(compressed); }) );


  setFormData((prev) => ({
    ...prev,
    images: [
      ...prev.images.filter((img) => typeof img === "string"),
      ...uploadedUrls,
    ],
  }));
};
  const handleDeleteImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

const payload = {
  title: formData.title,
  category: formData.category,
  brand: formData.brand,
  model: formData.model,
  price: formData.price,
  description: formData.description,
  sold: formData.sold,
  images: formData.images, 
};

onSubmit(payload);
  }

  return (
    <div className="bike-form-container">
      <form className="bike-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona categoría</option>
          <option value="mountain">Montaña / Trail</option>
          <option value="road">Carretera / Velocidad</option>
          <option value="city">Ciudad / Urbano</option>
          <option value="electric">Eléctrica</option>
          <option value="bmx">BMX</option>
          <option value="gravel">Gravel</option>
          <option value="kids">Infantil</option>
          <option value="other">Otra</option>
        </select>

        <select
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona marca</option>
          {brandsToShow.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

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

        <input
          type="file"
          name="images"
          multiple
          onChange={handleFilesChange}
          accept="image/*"
        />

        {isEditing && (
          <label className="checkbox-row">
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
        )}

        {/* BUTTONS */}
        <div className="form-buttons">
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? "Subiendo..." : "Guardar"}
          </button>

          {isEditing && (
            <button
              type="button"
              className="delete-btn"
              onClick={() => setShowDeleteModal(true)}
            >
              Eliminar
            </button>
          )}
        </div>
      </form>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>¿Eliminar bicicleta?</h3>
            <p>Esta acción no se puede deshacer.</p>

            <div className="modal-buttons">
              <button className="confirm-delete" onClick={() => onDelete()}>
                Sí, eliminar
              </button>

              <button
                className="cancel-delete"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IMAGE GALLERY */}
      <div className="image-gallery">
        {formData.images.map((img, idx) => {
          const isFile = img instanceof File;
          const src = isFile ? URL.createObjectURL(img) : img;
          return (
            <div className="gallery-item" key={idx}>
              <img src={src} alt={`preview-${idx}`} />
              <button
                type="button"
                className="delete-image-btn"
                onClick={() => handleDeleteImage(idx)}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BikeForm;
