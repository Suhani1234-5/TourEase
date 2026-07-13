# 📝 Issue Explanation: Broken Routing & Navigation Paths

## 🔍 Context
**TourEase** is a full-stack, AI-powered travel assistant application built on a **React + Vite** frontend architecture utilizing **React Router** for page routing. To provide a seamless user experience, navigation bars and footer elements link directly to specific views, while authentication gates (like route guards) redirect users as required.

---

## ❌ The Existing Problems

During manual testing and analysis of the client routing system, **four critical routing bugs** were found that caused users to land on a "404 Not Found" page:

### 1. Missing `/auth` Route mapping
- **Problem**: When a user attempts to access a protected dashboard (such as `AddFavorite` at `/favorites`) or clicks the call-to-action to write a review under destination details, the app redirects them to `/auth?mode=login`.
- **Root Cause**: The `/auth` path was never registered as a valid route inside `App.jsx`, meaning any attempt to access the unified login/signup card resulted in a 404 page.

### 2. Missing `/contributors` Route mapping
- **Problem**: The footer contains a navigation link labeled **"Contributors"** that points to `/contributors`.
- **Root Cause**: While the `Contributors.jsx` page component existed and was imported, there was no route definition for `/contributors` in `App.jsx`, leading to a 404 error when clicked.

### 3. Mismatched "Smart Planner" Path in Footer
- **Problem**: Clicking on the **"Smart Planner"** link in the footer resulted in a 404 error.
- **Root Cause**: The footer link pointed to `/smart-planner`, but the actual router configuration in `App.jsx` mapped the page to `/smart-trip-planner`.

### 4. Mismatched "Favourites" Path in Footer
- **Problem**: Clicking on the **"Favourites"** link in the footer resulted in a 404 error.
- **Root Cause**: The footer link pointed to `/favourites` (British/Commonwealth spelling), but the actual route registered in the system is `/favorites` (American spelling).

---

## 💡 Solution Overview

The solution involves aligning all navigation targets with the application's actual routes and registering the missing views:

1. **Register the Missing Routes**: Map both `/auth` and `/contributors` to their respective components (`Auth.jsx` and `Contributors.jsx`) inside the routing layout in `App.jsx`.
2. **Correct the Footer Links**: Synchronize the footer destination targets in `Footer.jsx` to direct to the correct, existing paths (`/smart-trip-planner` and `/favorites`).
3. **Validation**: Run Vite locally to verify that all hot-reloads compile cleanly and verify that all four links resolve to their active components without errors.
