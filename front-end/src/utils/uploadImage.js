export async function uploadImage(file) {
  // Configuración de Cloudinary
  const CLOUD_NAME = "dtihd4qih";
  const UPLOAD_PRESET = "unsigned_bikes";

  console.log("Uploading with preset:", UPLOAD_PRESET);

  // FormData para enviar archivo + preset
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  // Petición al endpoint de Cloudinary
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  // Devolver URL segura de la imagen subida
  return data.secure_url;
}
