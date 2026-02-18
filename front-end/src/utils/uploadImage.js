export async function uploadImage(file) {
  const CLOUD_NAME = "dtihd4qih";
  const UPLOAD_PRESET = "unsigned_bikes";
console.log("Uploading with preset:", UPLOAD_PRESET);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url;
}
