import Loader from './components/common/Loader';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { FavoritesProvider } from "./context/FavoritesContext";
import Navigation from "./components/Navigation";
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
import NotFound from "./components/NotFound";
import TripPlanner from './pages/TripPlanner';

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
  const showNavigation = !hideNavigationPaths.includes(location.pathname);

  return (
    <>
      {showNavigation && <Navigation />}
      <ScrollToTopButton />
      <div className={showNavigation ? "pt-16" : ""}>
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
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<AddFavorite />} />
          <Route path="/destinations/:id" element={<DestinationDetails />} />

          <Route path="/plan-trip" element={<PlanTrip />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/trip-planner" element={<TripPlanner />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // This simulates the app "loading" data for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <FavoritesProvider>
      <Router>
        <AppRoutes />
      </Router>
    </FavoritesProvider>
  );
}
