import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import Perfil from "../pages/Perfil";
import Config from "../pages/Config";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/config" element={<Config />} />
    </Routes>
  );
}
