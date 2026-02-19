import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Inicio";
import Login from "./pages/Login";
import BikeDetail from "./pages/BikeDetail";
import MyBikes from "./pages/MyBikes";
import NewBike from "./pages/NewBike";
import EditBike from "./pages/EditBike";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBikes from "./pages/admin/AdminBikes";
import useAuth from "./hooks/useAuth";

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
      {/* Toast system */}
      <Toaster
        position="top-center"
        containerStyle={{
          top: "120px",
        }}
        toastOptions={{
          style: {
            background: "#0d0a2b",
            color: "white",
            border: "2px solid #ff6600",
            fontWeight: "600",
          },
          iconTheme: {
            primary: "#ff6600",
            secondary: "#fff",
          },
        }}
      />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bikes/:id" element={<BikeDetail />} />

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
    </BrowserRouter>
  );
}

export default App;
