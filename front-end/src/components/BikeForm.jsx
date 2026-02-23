import { useState } from "react";
import "./‌BikeForm.css";
import { uploadImage } from "../utils/uploadImage";
import { compressImage } from "../utils/compressImage";
import { CONFIRM_DELETE_MESSAGE } from "@/constants/messages";

/**
 * Brand options by category
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

// Flatten all brands into one list
const allBrands = [...new Set(Object.values(brandOptions).flat())];

const BikeForm = ({
  initialData = {},
  onSubmit,
  onDelete,
  loading = false,
}) => {
  const isEditing = Boolean(initialData && initialData._id);

  // Controls delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  /**
   * IMPORTANT:
   * formData.images contains ONLY Cloudinary URLs (strings)
   * This keeps backend happy and avoids 500 errors.
   */
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    category: initialData.category || "",
    brand: initialData.brand || "",
    model: initialData.model || "",
    price: initialData.price || "",
    description: initialData.description || "",
    images: initialData.images || [], // backend expects array of strings
    sold: initialData.sold ?? false,
  });

  /**
   * previewImages contains ONLY local blob URLs
   * These are NOT sent to backend.
   */
  const [previewImages, setPreviewImages] = useState([]);

  // Filter brands based on selected category
  const brandsToShow = formData.category
    ? brandOptions[formData.category]
    : allBrands;

  /**
   * Handle text/select/textarea changes
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Handle image uploads:
   * 1. Show previews immediately
   * 2. Compress images
   * 3. Upload to Cloudinary
   * 4. Save ONLY Cloudinary URLs in formData.images
   */
  const handleFilesChange = async (e) => {
    const newFiles = Array.from(e.target.files);

    // 1️⃣ Show previews immediately
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);

    // 2️⃣ Upload to Cloudinary
    const uploadedUrls = await Promise.all(
      newFiles.map(async (file) => {
        const compressed = await compressImage(file);
        return uploadImage(compressed); // must return a URL string
      })
    );

    // 3️⃣ Save ONLY Cloudinary URLs in formData.images
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedUrls],
    }));

    // 4️⃣ Optional: clear previews after upload
    // setPreviewImages([]);
  };

  /**
   * Remove image by index (both preview + final)
   */
  const handleDeleteImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));

    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * Submit form to parent component
   */
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
      images: formData.images, // array of Cloudinary URLs
    };

    onSubmit(payload);
  };

  return (
    <div className="bike-form-container">
      <form className="bike-form" onSubmit={handleSubmit}>
        {/* TITLE */}
        <input
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          required
        />

        {/* CATEGORY */}
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

        {/* BRAND */}
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

        {/* MODEL */}
        <input
          name="model"
          placeholder="Modelo"
          value={formData.model}
          onChange={handleChange}
          required
        />

        {/* PRICE */}
        <input
          name="price"
          type="number"
          placeholder="Precio"
          value={formData.price}
          onChange={handleChange}
          required
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Descripción de la bicicleta"
          value={formData.description}
          onChange={handleChange}
          required
        />

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          name="images"
          multiple
          onChange={handleFilesChange}
          accept="image/*"
        />

        {/* SOLD CHECKBOX (only in edit mode) */}
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

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{CONFIRM_DELETE_MESSAGE}</h3>
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
        {/* Final Cloudinary URLs */}
        {formData.images.map((url, idx) => (
          <div className="gallery-item" key={`final-${idx}`}>
            <img src={url} alt={`img-${idx}`} />
            <button
              type="button"
              className="delete-image-btn"
              onClick={() => handleDeleteImage(idx)}
            >
              ✕
            </button>
          </div>
        ))}

        {/* Previews (only shown if no final URLs yet) */}
        {formData.images.length === 0 &&
          previewImages.map((url, idx) => (
            <div className="gallery-item" key={`preview-${idx}`}>
              <img src={url} alt={`preview-${idx}`} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BikeForm;
