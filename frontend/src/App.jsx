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
import TravelLocker from "./pages/TravelLocker";
import CurrencyConverter from "./pages/CurrencyConverter";
import Contributors from "./pages/Contributors";
import Community from "./pages/Community";

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
      {showNavigation && <ChatbotLauncher />}
      <div className={showNavigation ? "pt-16" : ""} style={{ minHeight: "100vh", backgroundColor: "var(--page-bg, #ffffff)" }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route
              path="/home2"
              element={
                <ProtectedRoute>
                  <PageTransition><Home2 /></PageTransition>
                </ProtectedRoute>
              }
            />
            <Route path='/demo' element={<PageTransition><WatchDemoPage /></PageTransition>} />
            <Route path="/contributors" element={<PageTransition><Contributors /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/features" element={<PageTransition><Features /></PageTransition>} />
            <Route path="/destinations" element={<PageTransition><Destinations /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
            <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
            <Route path="/help" element={<PageTransition><HelpCenter /></PageTransition>} />
            <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
            <Route path="/signup" element={<Navigate to="/auth?mode=signup" replace />} />
            <Route path="/login" element={<Navigate to="/auth?mode=login" replace />} />
            <Route path="/favorites" element={<ProtectedRoute><PageTransition><AddFavorite /></PageTransition></ProtectedRoute>} />
            <Route path="/destinations/:id" element={<PageTransition><DestinationDetails /></PageTransition>} />
            <Route path="/plan-trip" element={<PageTransition><PlanTrip /></PageTransition>} />
            <Route path="/dynamic-planner" element={<PageTransition><DynamicPlannerPage /></PageTransition>} />
            <Route path="/oauth-success" element={<PageTransition><OAuthSuccess /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            <Route path="/trip-planner" element={<PageTransition><TripPlanner /></PageTransition>} />
            <Route path="/smart-trip-planner" element={<PageTransition><SmartTripPlanner /></PageTransition>} />
            <Route
              path="/split-expense"
              element={
                <ProtectedRoute>
                  <PageTransition><SplitExpense /></PageTransition>
                </ProtectedRoute>
              }
            />
            <Route path="/community" element={<PageTransition><Community /></PageTransition>} />
            <Route
              path="/travel-locker"
              element={
                <ProtectedRoute>
                  <PageTransition><TravelLocker /></PageTransition>
                </ProtectedRoute>
              }
              path="/currency-converter"
              element={<PageTransition><CurrencyConverter /></PageTransition>}
            />
          </Routes>
        </AnimatePresence>
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
