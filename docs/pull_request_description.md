# 🚀 Pull Request: Register Missing Routes and Correct Mismatched Footer Paths

## 📝 Description
This PR addresses several critical frontend routing and navigation issues where clicking links or getting redirected led users to the application's "404 Not Found" page.

---

## 🛠️ Changes Implemented

### 1. Route Registrations ([App.jsx](file:///c:/Desktop/GSSOC/2nd_PR/TourEase/frontend/src/App.jsx))
- **Added `/auth` Route**: Map `/auth` to `<Auth />` so authentication redirects from Route Guards (like `/favorites` redirection) and user review login CTAs render the unified auth panel instead of triggering a 404.
- **Added `/contributors` Route**: Map `/contributors` to `<Contributors />` so the footer link can successfully display the contributors page.

### 2. Navigation Fixes ([Footer.jsx](file:///c:/Desktop/GSSOC/2nd_PR/TourEase/frontend/src/components/Footer.jsx))
- **Corrected "Smart Planner" Path**: Updated the link target from `/smart-planner` to `/smart-trip-planner` to match the registered route in `App.jsx`.
- **Corrected "Favourites" Path**: Updated the link target from `/favourites` to `/favorites` to match the spelling registered in the routing system.

---

## 📋 Fixes Checklist
- [x] Registered missing `/auth` route mapping.
- [x] Registered missing `/contributors` route mapping.
- [x] Corrected "Smart Planner" footer navigation path to `/smart-trip-planner`.
- [x] Corrected "Favourites" footer navigation path to `/favorites`.

---

## 🧪 Testing and Verification

### Compilation
- Verified that the Vite server recompiles cleanly with no dependency scan errors, syntax complaints, or warnings.

### Browser Testing
- **Auth Flow**: Verified direct navigation to `/auth?mode=login` renders the custom Three.js login page component.
- **Contributors**: Verified navigation to `/contributors` retrieves and displays the GitHub project contributors.
- **Footer Navigation**: Checked that clicking "Smart Planner" and "Favourites" successfully redirects to their target views instead of a 404.
