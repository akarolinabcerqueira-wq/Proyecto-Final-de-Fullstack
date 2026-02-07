import Bike from '../models/Bike.js';

/**
 * Crear una nueva bicicleta
 */
export const createBike = async (req, res) => {
  try {
    const bikeData = {
      ...req.body,
      owner: req.user._id
    };

    const bike = await Bike.create(bikeData);

    res.status(201).json({
      message: 'Bicicleta creada correctamente',
      bike
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear la bicicleta'
    });
  }
};

/**
 * Obtener todas las bicicletas
 */
export const getBikes = async (req, res) => {
  try {
    const bikes = await Bike.find()
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
        message: 'No tienes permisos para editar esta bicicleta'
      });
    }

    const updatedBike = await Bike.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: 'Bicicleta actualizada correctamente',
      bike: updatedBike
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar la bicicleta'
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
export const markAsSold = async (req, res) => {
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
        message: 'No tienes permisos para marcar esta bicicleta como vendida'
      });
    }

    bike.sold = true;
    await bike.save();

    res.status(200).json({
      message: 'Bicicleta marcada como vendida',
      bike
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al marcar la bicicleta como vendida'
    });
  }
};
