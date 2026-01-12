import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import ModelProfilePage from "./ModelProfilePage";
import RatesPage from "./RatesPage";
import ContactPage from "./ContactPage";
import ScrollManager from "./ScrollManager";

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/profile/:slug" element={<ModelProfilePage />} />
        <Route path="/rates" element={<RatesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
