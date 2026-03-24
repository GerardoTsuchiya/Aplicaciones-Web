import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import Perfil from "../pages/Perfil";
import Config from "../pages/Config";
import Detalles from "../pages/Detalles";

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/perfil">
        <Route index element={<Perfil/>} /> {/* Ruta por defecto para /perfil */}
        <Route path="detalles/:id" element={<Detalles />} />
      </Route>
      <Route path="config" element={<Config />} />
    </Routes>
  );
}
