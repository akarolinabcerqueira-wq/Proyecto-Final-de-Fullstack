import mongoose from 'mongoose';

/* --------------------------------------------------
   ESQUEMA DE BICICLETAS
   Representa una bici publicada por un usuario
-------------------------------------------------- */
const bikeSchema = new mongoose.Schema(
  {
    // Título del anuncio
    title: {
      type: String,
      required: true,
      trim: true
    },

    // Categoría opcional (montaña, ruta, urbana, etc.)
    category: { type: String, required: false },

    // Marca de la bicicleta
    brand: {
      type: String,
      required: true,
      trim: true
    },

    // Modelo específico
    model: {
      type: String,
      required: true,
      trim: true
    },

    // Precio de venta
    price: {
      type: Number,
      required: true,
      min: 0
    },

    // Descripción del anuncio
    description: {
      type: String,
      required: true
    },

    // Estado de venta
    sold: { type: Boolean, default: false },

    // Lista de imágenes (URLs)
    images: [{ type: String, required: true }],

    // Usuario propietario del anuncio
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    // Timestamps automáticos: createdAt y updatedAt
    timestamps: true
  }
);

/* --------------------------------------------------
   MODELO
-------------------------------------------------- */
const Bike = mongoose.model('Bike', bikeSchema);

export default Bike;
