import { useState } from "react";
import "./‌BikeForm.css";
import { uploadImage } from "../utils/uploadImage";
import { compressImage } from "../utils/compressImage";
import { CONFIRM_DELETE_MESSAGE } from "@/constants/messages";

/**
 * Opciones de marcas según categoría.
 * Se usa para filtrar dinámicamente las marcas disponibles.
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

// Lista completa de marcas (sin duplicados)
const allBrands = [...new Set(Object.values(brandOptions).flat())];

/**
 * Formulario reutilizable para crear o editar bicicletas.
 * Maneja inputs, subida de imágenes, vista previa, modal de eliminación
 * y validación básica.
 */
const BikeForm = ({
  initialData = {},
  onSubmit,
  onDelete,
  loading = false,
}) => {
  // Determina si estamos editando una bici existente
  const isEditing = Boolean(initialData && initialData._id);

  // Controla la visibilidad del modal de confirmación de eliminación
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Estado principal del formulario
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

  // Marcas filtradas según categoría seleccionada
  const brandsToShow = formData.category
    ? brandOptions[formData.category]
    : allBrands;

  /**
   * Maneja cambios en inputs de texto, select y textarea.
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Maneja la subida de imágenes:
   * 1. Muestra vista previa inmediata
   * 2. Comprime imágenes
   * 3. Sube a Cloudinary
   * 4. Guarda URLs finales en el estado
   */
  const handleFilesChange = async (e) => {
    const newFiles = Array.from(e.target.files);

    // Vista previa inmediata
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newFiles.map((f) => URL.createObjectURL(f))],
    }));

    // Subida real a Cloudinary
    const uploadedUrls = await Promise.all(
      newFiles.map(async (file) => {
        const compressed = await compressImage(file);
        return uploadImage(compressed);
      })
    );

    // Reemplaza las previews temporales por URLs reales
    setFormData((prev) => ({
      ...prev,
      images: [
        ...prev.images.filter((img) => typeof img === "string"),
        ...uploadedUrls,
      ],
    }));
  };

  /**
   * Elimina una imagen del array según su índice.
   */
  const handleDeleteImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  /**
   * Envía los datos del formulario al componente padre.
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
      images: formData.images,
    };

    onSubmit(payload);
  };

  return (
    <div className="bike-form-container">
      {/* FORMULARIO PRINCIPAL */}
      <form className="bike-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          required
        />

        {/* CATEGORÍA */}
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

        {/* MARCA */}
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

        {/* MODELO */}
        <input
          name="model"
          placeholder="Modelo"
          value={formData.model}
          onChange={handleChange}
          required
        />

        {/* PRECIO */}
        <input
          name="price"
          type="number"
          placeholder="Precio"
          value={formData.price}
          onChange={handleChange}
          required
        />

        {/* DESCRIPCIÓN */}
        <textarea
          name="description"
          placeholder="Descripción de la bicicleta"
          value={formData.description}
          onChange={handleChange}
          required
        />

        {/* SUBIDA DE IMÁGENES */}
        <input
          type="file"
          name="images"
          multiple
          onChange={handleFilesChange}
          accept="image/*"
        />

        {/* CHECKBOX "VENDIDA" (solo en edición) */}
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

        {/* BOTONES DEL FORMULARIO */}
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

      {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
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

      {/* GALERÍA DE IMÁGENES SUBIDAS */}
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
