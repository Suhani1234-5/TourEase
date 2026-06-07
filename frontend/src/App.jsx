import React, { Suspense } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import ScrollToTopOnNavigate from "./components/common/ScrollToTopOnNavigate";
import ScrollToTopButton from "./components/common/ScrollToTop";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Loader from "./components/common/Loader";
import ChatbotLauncher from "./components/chatbot/ChatbotLauncher";
import LanguageSelector from "./components/LanguageSelector";

const Home               = React.lazy(() => import("./pages/Home"));
const Home2              = React.lazy(() => import("./pages/Home2"));
const About              = React.lazy(() => import("./pages/About"));
const Features           = React.lazy(() => import("./pages/Features"));
const Destinations       = React.lazy(() => import("./pages/Destinations"));
const Contact            = React.lazy(() => import("./pages/Contact"));
const Auth               = React.lazy(() => import("./pages/Auth"));
const AddFavorite        = React.lazy(() => import("./pages/AddFavorite"));
const DestinationDetails = React.lazy(() => import("./pages/DestinationDetails"));
const PlanTrip           = React.lazy(() => import("./pages/PlanTrip"));
const OAuthSuccess       = React.lazy(() => import("./pages/OAuthSuccess"));
const Privacy            = React.lazy(() => import("./pages/Privacy"));
const Terms              = React.lazy(() => import("./pages/Terms"));
const HelpCenter         = React.lazy(() => import("./pages/HelpCenter"));
const NotFound           = React.lazy(() => import("./components/NotFound"));
const TripPlanner        = React.lazy(() => import("./pages/TripPlanner"));
const SmartTripPlanner   = React.lazy(() => import("./pages/SmartTripPlanner"));
const WatchDemoPage      = React.lazy(() => import("./pages/DemoSection"));
const DynamicPlannerPage = React.lazy(() => import("./pages/DynamicPlannerPage"));
const SplitExpense       = React.lazy(() => import("./pages/SplitExpense"));
const TravelLocker       = React.lazy(() => import("./pages/TravelLocker"));
const CurrencyConverter  = React.lazy(() => import("./pages/CurrencyConverter"));
const Contributors       = React.lazy(() => import("./pages/Contributors"));
const MoodPlanner        = React.lazy(() => import("./pages/MoodPlanner"));

import { jwtDecode } from "jwt-decode";

function isTokenValid() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;
    const { exp } = jwtDecode(token);
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

function ProtectedRoute({ children }) {
  const isAuthenticated = isTokenValid();

  if (!isAuthenticated) {
    localStorage.removeItem("token");
    return <Navigate to="/auth?mode=login" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

const AUTH_PATHS = ["/auth", "/signup", "/login"];

function AppRoutes() {
  const location = useLocation();

  const showNavigation = !AUTH_PATHS.some((p) =>
    location.pathname.startsWith(p)
  );

  return (
    <>
      {/* FIX #4 — only ScrollToTopOnNavigate kept here; removed the duplicate
          <ScrollToTop /> that was also placed in App() outside this component,
          which caused a double-scroll trigger on every route change. */}
      <ScrollToTopOnNavigate />

      {showNavigation && <Navigation />}

      {/* FIX #9 — ChatbotLauncher, LanguageSelector, ScrollToTopButton now
          hidden on auth pages. Previously they rendered unconditionally,
          showing a chatbot and language picker on the login/signup screen. */}
      {showNavigation && <ScrollToTopButton />}
      {showNavigation && <LanguageSelector />}
      {showNavigation && <ChatbotLauncher />}

      <div className={showNavigation ? "pt-16" : ""}>
        {/* FIX #8 — Suspense wrapper required for React.lazy() routes.
            Falls back to <Loader /> while the page chunk is being fetched. */}
        <Suspense fallback={<Loader />}>
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

            <Route path="/demo" element={<WatchDemoPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:id" element={<DestinationDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/contributors" element={<Contributors />} />

            {/* FIX #10 — MoodPlanner was imported but had no route (dead import).
                Added route here. Remove if the page is not ready for production. */}
            <Route path="/mood-planner" element={<MoodPlanner />} />

            {/* Auth routes */}
            {/* FIX #6 — /signup and /login now redirect to /auth with the correct
                mode query param instead of rendering separate duplicate pages.
                Previously, visiting /login directly showed the nav bar because
                ProtectedRoute redirects to /auth?mode=login but nav-hiding only
                checked for exact path matches. Now both old URLs redirect cleanly. */}
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/signup"
              element={<Navigate to="/auth?mode=signup" replace />}
            />
            <Route
              path="/login"
              element={<Navigate to="/auth?mode=login" replace />}
            />

            <Route path="/oauth-success" element={<OAuthSuccess />} />

            {/* Protected routes */}
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <AddFavorite />
                </ProtectedRoute>
              }
            />

            {/* Trip planner routes — three overlapping planners exist.
                FIX #7 — each is kept for now but they should be consolidated.
                Consider: /plan-trip (basic), /trip-planner (AI), /smart-trip-planner (advanced).
                Document the difference in each page's heading so users understand which to use. */}
            <Route path="/plan-trip" element={<PlanTrip />} />
            <Route path="/trip-planner" element={<TripPlanner />} />
            <Route path="/smart-trip-planner" element={<SmartTripPlanner />} />
            <Route path="/dynamic-planner" element={<DynamicPlannerPage />} />

            {/* Tools */}
            <Route path="/split-expense" element={<SplitExpense />} />
            <Route path="/travel-locker" element={<TravelLocker />} />
            <Route path="/currency-converter" element={<CurrencyConverter />} />

            {/* 404 — must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>

      {showNavigation && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <FavoritesProvider>
          <Router>
            {}
            <AppRoutes />
          </Router>
        </FavoritesProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
