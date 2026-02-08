import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Bikes from "./pages/Bikes";
import BikeDetail from "./pages/BikeDetail";
import MyBikes from "./pages/MyBikes";
import NewBike from "./pages/NewBike";
import EditBike from "./pages/EditBike";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bikes" element={<Bikes />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
