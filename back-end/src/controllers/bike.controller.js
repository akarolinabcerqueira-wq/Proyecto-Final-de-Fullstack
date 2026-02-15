import Bike from '../models/Bike.js';
import cloudinary from '../config/cloudinary.js';


/**
 * Crear una nueva bicicleta
 */
export const createBike = async (req, res) => {
  try {
    // 1️⃣ Subir imágenes a Cloudinary
    const uploadedImages = [];
    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        uploadedImages.push(result.secure_url);
      }
    }

    // Crear bicicleta con datos del form + imágenes + owner
    const bikeData = {
      ...req.body,
      owner: req.user._id,
      images: uploadedImages
    };

    const bike = await Bike.create(bikeData);

    res.status(201).json({
      message: 'Bicicleta creada correctamente',
      bike
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message
    });
  }
};
/**
 * Obtener todas las bicicletas con filtros
 */
export const getBikes = async (req, res) => {
  try {
    const { brand, sold, minPrice, maxPrice } = req.query;

    const filters = {};

    if (brand) {
      filters.brand = brand;
    }

 if (sold === 'true' || sold === 'false') { filters.sold = sold === 'true'; }

    if (minPrice || maxPrice) {
      filters.price = {};

      if (minPrice) {
        filters.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filters.price.$lte = Number(maxPrice);
      }
    }

    const bikes = await Bike.find(filters)
      .populate('owner', 'email')
      .sort({ createdAt: -1 });

    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener las bicicletas'
    });
  }
};

/**
 * Obtener una bicicleta por ID
 */
export const getBikeById = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id).populate(
      'owner',
      'email'
    );

    if (!bike) {
      return res.status(404).json({
        message: 'Bicicleta no encontrada'
      });
    }

    res.status(200).json(bike);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener la bicicleta'
    });
  }
};

/**
 * Actualizar bicicleta (solo owner o admin)
 */
export const updateBike = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Convert sold from string to boolean
    if (req.body.sold !== undefined) {
      updateData.sold = req.body.sold === "true";
    }

    // Handle new images
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => file.path);
    }

    const updatedBike = await Bike.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      message: "Bicicleta actualizada correctamente",
      bike: updatedBike
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la bicicleta"
    });
  }
};



/**
 * Eliminar bicicleta (solo owner o admin)
 */
export const deleteBike = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);

    if (!bike) {
      return res.status(404).json({
        message: 'Bicicleta no encontrada'
      });
    }

    // Comprobar permisos
    if (
      bike.owner.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        message: 'No tienes permisos para eliminar esta bicicleta'
      });
    }

    await bike.deleteOne();

    res.status(200).json({
      message: 'Bicicleta eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar la bicicleta'
    });
  }
};

/**
 * Marcar bicicleta como vendida
 */
export const toggleSold = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);

    if (!bike) {
      return res.status(404).json({
        message: 'Bicicleta no encontrada'
      });
    }

    // Solo owner o admin
    if (
      bike.owner.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        message: 'No tienes permisos'
      });
    }

    //TOGGLE
    bike.sold = !bike.sold;

    await bike.save();

    res.status(200).json({
      message: 'Estado actualizado correctamente',
      bike
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al actualizar el estado'
    });
  }
};


/**
 * Obtener bicicletas del usuario logueado
 */
export const getMyBikes = async (req, res) => {
  try {
    const bikes = await Bike.find({ owner: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener tus bicicletas'
    });
  }
};

