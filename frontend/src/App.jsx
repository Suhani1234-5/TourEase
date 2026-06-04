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
import ScrollToTopButton from "./components/common/ScrollToTop";
import ChatbotLauncher from "./components/chatbot/ChatbotLauncher";
import Footer from "./components/Footer";
import WatchDemoPage from './pages/DemoSection';
import MoodPlanner from "./pages/MoodPlanner";
import ScrollToTopOnNavigate from "./components/common/ScrollToTopOnNavigate";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { Suspense, lazy } from "react";
const Home = lazy(() => import("./pages/Home"));
const Home2 = lazy(() => import("./pages/Home2"));
const About = lazy(() => import("./pages/About"));
const Features = lazy(() => import("./pages/Features"));
const Destinations = lazy(() => import("./pages/Destinations"));
const Contact = lazy(() => import("./pages/Contact"));
const Auth = lazy(() => import("./pages/Auth"));
const Signup = lazy(() => import("./pages/signup"));
const Login = lazy(() => import("./pages/Login"));
const AddFavorite = lazy(() => import("./pages/AddFavorite"));
const DestinationDetails = lazy(() => import("./pages/DestinationDetails"));
const PlanTrip = lazy(() => import("./pages/PlanTrip"));
const OAuthSuccess = lazy(() => import("./pages/OAuthSuccess"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const NotFound = lazy(() => import("./components/NotFound"));
const TripPlanner = lazy(() => import("./pages/TripPlanner"));
const SmartTripPlanner = lazy(() => import("./pages/SmartTripPlanner"));
const WatchDemoPage = lazy(() => import("./pages/DemoSection"));
const DynamicPlannerPage = lazy(() => import("./pages/DynamicPlannerPage"));
const SplitExpense = lazy(() => import("./pages/SplitExpense"));
const TravelLocker = lazy(() => import("./pages/TravelLocker"));
const CurrencyConverter = lazy(() => import("./pages/CurrencyConverter"));
const Contributors = lazy(() => import("./pages/Contributors"));

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
        <Suspense fallback={<Loader />}>
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
              <Route
                path="/travel-locker"
                element={
                  <ProtectedRoute>
                    <PageTransition><TravelLocker /></PageTransition>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/currency-converter"
                element={<PageTransition><CurrencyConverter /></PageTransition>}
              />
            </Routes>
          </AnimatePresence>
        </Suspense>
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
            <Route path="/smart-trip-planner" element={<PageTransition><SmartTripPlanner /></PageTransition>} /> feat/travel-locker
            <Route path="/mood-planner" element={<PageTransition><MoodPlanner /></PageTransition>} />
            main
            <Route
              path="/split-expense"
              element={
                <ProtectedRoute>
                  <PageTransition><SplitExpense /></PageTransition>
                </ProtectedRoute>
              }
            />
            <Route
              path="/travel-locker"
              element={
                <ProtectedRoute>
                  <PageTransition><TravelLocker /></PageTransition>
                </ProtectedRoute>
              }
            />
            <Route
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
