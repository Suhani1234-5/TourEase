# 🛠️ Installation & Setup Guide

This guide will walk you through the process of getting **TourEase** up and running on your local machine.

---

## 📋 Prerequisites
Before you begin, ensure you have the following installed:
* **Node.js** (v16.0.0 or higher)
* **MongoDB** (Local instance or Atlas Cloud)
* **npm** (comes with Node) or **yarn**

---

## 🚀 Step-by-Step Setup

### 1. Clone the Repository
```
git clone [https://github.com/Suhani1234-5/TourEase.git](https://github.com/Suhani1234-5/TourEase.git)
cd TourEase
```

### 2. Install Dependencies
TourEase has separate dependencies for the backend and the frontend.
* **For Backend:**
```
npm install
```
* **For Frontend:**
```
cd frontend
npm install
cd ..
```

### 3. Global Tools (Optional but Recommended)
For a smoother development experience, install these globally:
```
npm install -g nodemon vite
```

### 4. Environment Variables
Create a `.env` file in your `backend/` folder and add your credentials:
```Code snippet
MONGODB_URI=your_mongodb_connection_string
MONGODB_URL=your_mongodb_connection_string
PORT=5050
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_here

# Google OAuth Configuration (Optional - to enable Google Sign-In)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5050/api/auth/google/callback
```

> **Note: Never commit your `.env` file to GitHub. It is already included in `.gitignore`.**
> 
> **Important:** The code supports both `MONGODB_URI` and `MONGODB_URL` for compatibility. Use either one.

#### 🔑 Google OAuth Credentials Setup
To make Google Sign-In work, follow these steps to configure your credentials on the Google Cloud Console:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. **OAuth Consent Screen**:
   * Navigate to **APIs & Services** > **OAuth consent screen**.
   * Choose **External** and complete the basic application registration details (app name, support email).
3. **Generate Credentials**:
   * Navigate to **APIs & Services** > **Credentials**.
   * Click **Create Credentials** > **OAuth client ID**.
   * Select **Web application** as the application type.
4. **Authorized URIs Configuration**:
   * Under **Authorized JavaScript origins**, add: `http://localhost:5173`.
   * Under **Authorized redirect URIs**, add: `http://localhost:5050/api/auth/google/callback` (or your production callback URL).
5. Copy your **Client ID** and **Client Secret** into your backend `.env` variables above!

### 5. Running the Project
You will need two terminals open:
* **Terminal 1: Backend**
```
# From the root directory
npm start
# OR use nodemon for auto-restart
nodemon app.js
```
* **Terminal 2: Frontend**
```
cd frontend
npm run dev
```
The application should now be accessible at: `http://localhost:5173` (Vite default) or `http://localhost:3000`.

## 🛠️ Troubleshooting (Common Errors)
| Error | Solution |
| :--- | :--- |
| **MongoDB Connection Error** | Check your `MONGODB_URI` string and ensure your database is active/whitelisted. |
| **Port Already in Use** | Change the `PORT` in your `.env` file or kill the process currently using that port. |
| **Command Not Found: nodemon** | Run `npm install -g nodemon` to install it globally, or use `node app.js` to start the server. |
| **Missing Dependencies** | Delete the `node_modules` folder, run `npm cache clean --force`, and then run `npm install` again. |
