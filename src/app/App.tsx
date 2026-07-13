import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  type Location,
} from "react-router-dom";

import HomePage from "../pages/HomePage";
import ModelProfilePage from "../pages/ModelProfilePage";
import ModelProfileModal from "../components/profile/ModelProfileModal";
import RatesPage from "../pages/RatesPage";
import ContactPage from "../pages/ContactPage";
import ScrollManager from "../hooks/ScrollManager";
import { Toaster } from "sonner";

interface RouteState {
  backgroundLocation?: Location;
  workingTime?: string;
  fromTab?: "today" | "tomorrow";
}

function AppRoutes() {
  const location = useLocation();
  const state = location.state as RouteState | null;
  const backgroundLocation = state?.backgroundLocation;

  return (
    <>
      <ScrollManager />

      <Routes location={backgroundLocation ?? location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:slug" element={<ModelProfilePage />} />
        <Route path="/rates" element={<RatesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path="/profile/:slug"
            element={<ModelProfileModal />}
          />
        </Routes>
      )}

      {/* 반드시 모달 다음에 */}
      <Toaster
        position="top-center"
        duration={1200}
        style={{ zIndex: 9999 }}
        toastOptions={{
          style: {
            background: "#14120f",
            color: "#e8d6a8",
            border: "none",
          },
        }}
      />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
