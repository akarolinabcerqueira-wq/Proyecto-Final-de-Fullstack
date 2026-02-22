import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuth from "./hooks/useAuth";
import Loading from "./components/Loading";

/* Lazy loading de páginas para optimizar rendimiento */
const Home = lazy(() => import("./pages/Inicio"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const BikeDetail = lazy(() => import("./pages/BikeDetail"));
const MyBikes = lazy(() => import("./pages/MyBikes"));
const NewBike = lazy(() => import("./pages/NewBike"));
const EditBike = lazy(() => import("./pages/EditBike"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminBikes = lazy(() => import("./pages/admin/AdminBikes"));

/* Ruta protegida solo para administradores */
function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "admin") {
    return <h2>Acceso denegado</h2>;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      {/* Sistema de notificaciones */}
      <Toaster
        position="top-center"
        containerStyle={{ top: "120px" }}
        toastOptions={{
          style: {
            background: "#0d0a2b",
            color: "white",
            border: "2px solid #A60842",
            fontWeight: "600",
          },
          iconTheme: {
            primary: "#A60842",
            secondary: "#fff",
          },
        }}
      />

      <Navbar />

      {/* Suspense para cargar páginas con fallback */}
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Páginas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bikes/:id" element={<BikeDetail />} />

          {/* Rutas protegidas para usuarios autenticados */}
          <Route
            path="/edit-bike/:id"
            element={
              <ProtectedRoute>
                <EditBike />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-bikes"
            element={
              <ProtectedRoute>
                <MyBikes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/new-bike"
            element={
              <ProtectedRoute>
                <NewBike />
              </ProtectedRoute>
            }
          />

          {/* Rutas exclusivas para administradores */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/bikes"
            element={
              <AdminRoute>
                <AdminBikes />
              </AdminRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
