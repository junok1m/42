import { HashRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import ModelProfilePage from './ModelProfilePage';
import RatesPage from './RatesPage';
import ContactPage from './ContactPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/models/:name" element={<ModelProfilePage />} />
        <Route path="/rates" element={<RatesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;