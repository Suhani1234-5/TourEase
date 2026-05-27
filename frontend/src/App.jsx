import Loader from './components/common/Loader';
import React from "react";
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/common/PageTransition";

import { FavoritesProvider } from "./context/FavoritesContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Home2 from "./pages/Home2";
import About from "./pages/About";
import Features from "./pages/Features";
import Destinations from "./pages/Destinations";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Signup from "./pages/signup";
import Login from "./pages/Login";
import AddFavorite from "./pages/AddFavorite";
import ScrollToTopButton from "./components/common/ScrollToTop";
import LanguageSelector from "./components/LanguageSelector";
import ChatbotLauncher from "./components/chatbot/ChatbotLauncher";
import DestinationDetails from "./pages/DestinationDetails";
import PlanTrip from "./pages/PlanTrip";
import OAuthSuccess from "./pages/OAuthSuccess";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import HelpCenter from "./pages/HelpCenter";
import NotFound from "./components/NotFound";
import TripPlanner from './pages/TripPlanner';
import SmartTripPlanner from './pages/SmartTripPlanner';
import Footer from "./components/Footer";
import WatchDemoPage from './pages/DemoSection';
import ScrollToTopOnNavigate from "./components/common/ScrollToTopOnNavigate";
import DynamicPlannerPage from './pages/DynamicPlannerPage';
import { ScrollToTop } from "./components/common/ScrollToTop";
import SplitExpense from "./pages/SplitExpense";
import Contributors from "./pages/Contributors";

function ProtectedRoute({ children }) {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  if (!isAuthenticated) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function AppRoutes() {
  const location = useLocation();
  const hideNavigationPaths = ["/auth", "/signup", "/login"];
  const showNavigation = !hideNavigationPaths.includes(location.pathname);

  return (
    <>
      <ScrollToTopOnNavigate />
      {showNavigation && <Navigation />}
      <ScrollToTopButton />
      <LanguageSelector />
      <ChatbotLauncher />
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
          <Route path='/demo' element={<WatchDemoPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <AddFavorite />
              </ProtectedRoute>
            }
          />
          <Route path="/destinations/:id" element={<DestinationDetails />} />

          <Route path="/plan-trip" element={<PlanTrip />} />
          <Route path="/dynamic-planner" element={<DynamicPlannerPage />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/trip-planner" element={<TripPlanner />} />
          <Route path="/smart-trip-planner" element={<SmartTripPlanner />} />
        </Routes>
      </div>
      {showNavigation && <Footer />}
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ThemeProvider>
      <ToastProvider>
        <FavoritesProvider>
          <Router>
            <ScrollToTop />
            <AppRoutes />
          </Router>
        </FavoritesProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
