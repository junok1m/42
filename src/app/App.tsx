import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ModelProfilePage from "../pages/ModelProfilePage";
import RatesPage from "../pages/RatesPage";
import ContactPage from "../pages/ContactPage";
import ScrollManager from "../hooks/ScrollManager";

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:slug" element={<ModelProfilePage />} />
        <Route path="/rates" element={<RatesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;