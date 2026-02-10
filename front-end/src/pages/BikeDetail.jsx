import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBikeByIdRequest } from '../services/bike.service';

const BikeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchBike = async () => {
      try {
        setLoading(true);
        const data = await getBikeByIdRequest(id);
        setBike(data);
      } catch (err) {
        setError('Error al cargar la bicicleta');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBike();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-[#2B2B29]">Cargando bicicleta...</div>
      </div>
    );
  }

  if (error || !bike) {
    return (
      <div className="min-h-screen bg-F4F1EA py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-[#2B2B29] mb-4">Bicicleta no encontrada</h2>
          <p className="text-[#C5AA91] mb-6">{error}</p>
          <Link
            to="/"
            className="inline-block bg-[#2B2B29] text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition"
          >
            Volver a bicicletas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-F4F1EA min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex text-sm text-[#C5AA91]">
            <Link to="/" className="hover:text-[#2B2B29]">Inicio</Link>
            <span className="mx-2">/</span>
            <Link to="/bikes" className="hover:text-[#2B2B29]">Bicicletas</Link>
            <span className="mx-2">/</span>
            <span className="text-[#2B2B29] font-medium">{bike.title}</span>
          </nav>
        </div>

        {/* Contenido principal */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8">
            {/* Columna izquierda - Imagen */}
            <div className="space-y-4">
              <div className="aspect-square bg-[#E7E7E7] rounded-lg overflow-hidden">
                {bike.images && bike.images.length > 0 ? (
                  <img
                    src={bike.images[selectedImage]}
                    alt={bike.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/600x600?text=Imagen+no+disponible';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[#C5AA91] text-xl">Sin imagen</span>
                  </div>
                )}
              </div>

              {/* Miniaturas */}
              {bike.images && bike.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {bike.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                        selectedImage === index
                          ? 'border-[#2B2B29]'
                          : 'border-[#E7E7E7] hover:border-[#C5AA91]'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${bike.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/150x150?text=Imagen';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Columna derecha - Información */}
            <div className="space-y-6">
              {/* Título y marca */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#2B2B29] mb-2">
                  {bike.title}
                </h1>
                <p className="text-sm text-[#C5AA91] mb-1">
                  <strong>Marca:</strong> {bike.brand}
                </p>
                <p className="text-sm text-[#C5AA91] mb-1">
                  <strong>Modelo:</strong> {bike.model}
                </p>
              </div>

              {/* Precio y estado */}
              <div className="bg-F4F1EA p-6 rounded-lg">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-4xl font-bold text-[#2B2B29]">
                    {bike.price} €
                  </span>
                  {bike.sold ? (
                    <span className="text-sm text-[#C5AA91] font-medium">
                      ✗ Vendida
                    </span>
                  ) : (
                    <span className="text-sm text-[#2B2B29] font-medium">
                      ✓ Disponible
                    </span>
                  )}
                </div>

                {!bike.sold && (
                  <button className="w-full bg-[#2B2B29] text-white py-3 rounded-lg hover:bg-[#464641] transition font-semibold text-lg">
                    Contactar al vendedor
                  </button>
                )}
              </div>

              {/* Descripción */}
              {bike.description && (
                <div>
                  <h2 className="text-xl font-bold text-[#2B2B29] mb-3">Descripción</h2>
                  <p className="text-[#2B2B29] leading-relaxed">{bike.description}</p>
                </div>
              )}

              {/* Botón volver */}
              <div className="pt-6 border-t border-[#E7E7E7]">
                <button
                  onClick={() => navigate(-1)}
                  className="text-[#2B2B29] hover:text-[#464641] font-medium flex items-center gap-2"
                >
                  ← Volver atrás
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeDetail;
