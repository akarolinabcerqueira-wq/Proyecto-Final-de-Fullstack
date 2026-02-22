import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/* --------------------------------------------------
   ESQUEMA DE USUARIO
   Representa cuentas registradas en la plataforma
-------------------------------------------------- */
const userSchema = new mongoose.Schema(
  {
    // Email único del usuario
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Contraseña encriptada
    password: {
      type: String,
      required: true,
    },

    // Rol del usuario (normal o admin)
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // Número de WhatsApp para contacto
    whatsapp: { type: String, required: true },
  },
  {
    // createdAt y updatedAt automáticos
    timestamps: true,
  }
);

/* --------------------------------------------------
   MIDDLEWARE: HASH DE CONTRASEÑA
   Se ejecuta antes de guardar el usuario
-------------------------------------------------- */
userSchema.pre("save", async function () {
  // Si la contraseña no cambió, no volver a hashear
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/* --------------------------------------------------
   MÉTODO: Comparar contraseñas
   Se usa en login para validar credenciales
-------------------------------------------------- */
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

/* --------------------------------------------------
   MODELO
-------------------------------------------------- */
const User = mongoose.model("User", userSchema);

export default User;
