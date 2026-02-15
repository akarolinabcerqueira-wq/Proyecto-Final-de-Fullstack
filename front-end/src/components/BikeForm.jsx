import { useState } from "react";
import "./‌BikeForm.css";


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

const BikeForm = ({ initialData = {}, onSubmit }) => {
  const isEditing = Boolean(initialData && initialData._id);

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

  const handleFilesChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: [...newFiles],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("title", formData.title);
    fd.append("category", formData.category);
    fd.append("brand", formData.brand);
    fd.append("model", formData.model);
    fd.append("price", formData.price);
    fd.append("description", formData.description);
    fd.append("sold", formData.sold);

    formData.images.forEach((img) => {
      if (img instanceof File) {
        fd.append("images", img);
      }
    });

    onSubmit(fd);
  };

  return (
    <div className="bike-form-wrapper">
      <div className="bike-form-left">
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

        <button type="submit" style={{ marginTop: "15px" }}>
          Guardar
        </button>
      </form>
</div>
<div className="bike-form-right">
      <img
        className="bike-form-image"
        src="/images/form.jpg"
        alt="Bike illustration"
      /></div>
      <div className="bike-form-preview">
      <div className="preview-grid">
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
        </div>
    </div>
  );
};

export default BikeForm;
