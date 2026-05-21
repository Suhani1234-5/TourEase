import Loader from "./components/common/Loader";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { FavoritesProvider } from "./context/FavoritesContext";
import { ThemeProvider } from "./context/ThemeContext";

import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Home2 from "./pages/Home2";
import About from "./pages/About";
import Features from "./pages/Features";
import Destinations from "./pages/Destinations";
import Contact from "./pages/Contact";
import Signup from "./pages/signup";
import Login from "./pages/Login";
import AddFavorite from "./pages/AddFavorite";
import ScrollToTopButton from "./components/common/ScrollToTop";
import DestinationDetails from "./pages/DestinationDetails";
import PlanTrip from "./pages/PlanTrip";
import OAuthSuccess from "./pages/OAuthSuccess";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import HelpCenter from "./pages/HelpCenter";
import NotFound from "./components/NotFound";
import TripPlanner from "./pages/TripPlanner";
import Footer from "./components/Footer";
import WatchDemoPage from "./pages/DemoSection";

function ProtectedRoute({ children }) {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppRoutes() {
  const location = useLocation();

  const hideNavigationPaths = ["/signup", "/login"];

  const showNavigation =
    !hideNavigationPaths.includes(location.pathname);

  return (
    <>
      {showNavigation && <Sidebar />}

      <ScrollToTopButton />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/home2"
            element={
              <ProtectedRoute>
                <Home2 />
              </ProtectedRoute>
            }
          />

          <Route
            path="/demo"
            element={<WatchDemoPage />}
          />

          <Route path="/about" element={<About />} />

          <Route
            path="/features"
            element={<Features />}
          />

          <Route
            path="/destinations"
            element={<Destinations />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/privacy"
            element={<Privacy />}
          />

          <Route
            path="/terms"
            element={<Terms />}
          />

          <Route
            path="/help"
            element={<HelpCenter />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/favorites"
            element={<AddFavorite />}
          />

          <Route
            path="/destinations/:id"
            element={<DestinationDetails />}
          />

          <Route
            path="/plan-trip"
            element={<PlanTrip />}
          />

          <Route
            path="/oauth-success"
            element={<OAuthSuccess />}
          />

          <Route
            path="/trip-planner"
            element={<TripPlanner />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>

        {showNavigation && <Footer />}
      </div>
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] =
    React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Router>
          <AppRoutes />
        </Router>
      </FavoritesProvider>
    </ThemeProvider>
  );
}