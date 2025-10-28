import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import ModelProfilePage from './ModelProfilePage';
import AboutPage from './AboutPage';
import RatesPage from './RatesPage';
import ContactPage from './ContactPage';

function App() {
  return (
    <BrowserRouter basename="/spitroast">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/models/:name" element={<ModelProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/rates" element={<RatesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;