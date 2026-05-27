<div align="center">

# 🌍 TourEase

**Your Smart, Safe & Personalized Travel Assistant — Powered by AI**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![GSSoC'26](https://img.shields.io/badge/GSSoC-2026-orange.svg)](https://gssoc.girlscript.tech/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933.svg?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react&logoColor=white)](https://react.dev/)

<br/>

*Part of **[GirlScript Summer of Code 2026](https://gssoc.girlscript.tech/)** — open to contributors of all skill levels.*

</div>

---

## ⚡ Quick Navigation

| [📖 About](#-about-tourease) | [✨ Features](#-features) | [🛠️ Tech Stack](#️-tech-stack) | [🗂️ Structure](#️-project-structure) | [🏛️ Architecture](#️-architecture-flow) | [🗺️ Routes](#️-application-routes) | [🚀 Quick Start](#-quick-start) | [🤝 Contributing](CONTRIBUTING.md) |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|

---

## 📖 About TourEase

TourEase is an open-source, AI-powered travel assistant that helps tourists plan trips, explore destinations, and travel safely — all in one place. It combines intelligent itinerary generation, real-time weather & event monitoring, and community-driven insights into a seamless full-stack web app.

---

## ✨ Features

<details>
<summary><b> Dynamic Itinerary Adjustment</b></summary>
<br>

- **Real-Time Event Detection** — Discovers festivals, concerts, and cultural events during your trip.
- **Weather Monitoring** — 5-day forecasts with suggestions for bad-weather days.
- **Disruption Alerts** — Proactive notifications for closures, strikes, or travel disruptions.
- **AI-Powered Suggestions** — Intelligent recommendations to enhance your itinerary on the fly.
- **Full User Control** — Accept, reject, or modify any suggestion with clear reasoning shown.

</details>

<details>
<summary><b> AI & Smart Planning</b></summary>
<br>

- **AI Trip Planner** — Custom itineraries based on budget, duration, and interests.
- **AI Voice Assistant** — Real-time translation and voice-activated destination queries.
- **Seasonal Mapping** — Best-time-to-visit recommendations powered by AI.
- **Event-Aware Planning** — Integration with global event APIs for festivals and sports.

</details>

<details>
<summary><b> Safety & Emergency Support</b></summary>
<br>

- **Local Safety Map** — Nearest hospitals, police stations, and embassies in real time.
- **Emergency System** — One-tap contact to local authorities with live safety alerts.
- **Issue Reporting** — Report fraud, lost items, or unsafe areas directly in the app.

</details>

<details>
<summary><b> Travel Tools & Community</b></summary>
<br>

- **Smart Finder** — Map integration for hotels, hostels, and hidden local gems.
- **Travel Locker** — Secure digital record of documents and belongings.
- **Split & Expense** — Group bill management with PDF/CSV export.
- **Community Feed** — An Instagram-style feed for travel reviews and shared moments.

</details>

---

## 📸 UI Preview

![TourEase Home Page](screenshots/home.png)

> 🚀 **Try the live app →** **[tour-ease-joh5.vercel.app](https://tour-ease-joh5.vercel.app/)**

---


## 🛠️ Tech Stack

**Frontend**
![React](https://img.shields.io/badge/React_19-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_4-%2338B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=flat-square&logo=react-router&logoColor=white)

**Backend**
![Node.js](https://img.shields.io/badge/Node.js_18+-6DA55F?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=flat-square&logo=JSON%20web%20tokens)
![Passport](https://img.shields.io/badge/Passport.js-34E27A?style=flat-square&logo=passport&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI_SDK-412991?style=flat-square&logo=openai&logoColor=white)

---
📁 FOLDER STRUCTURE-
TourEase/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── services/
│   │   ├── utils/
│   │   └── config/
│   ├── tests/
│   │   ├── unit/
│   │   └── integration/
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── styles/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── hooks/
│   │   └── config/
│   ├── tests/
│   │   ├── unit/
│   │   └── integration/
│   ├── .env.example
│   └── package.json
│
├── docs/
│   └── architecture.md
│
├── .gitignore
├── README.md
└── LICENSE


---

## 🗂️ Project Structure

```
TourEase/
├── frontend/                        # React + Vite client (port 5173)
│   └── src/
│       ├── assets/                  # Images, icons, static media
│       ├── components/              # Reusable UI components
│       │   ├── chatbot/             # AI chatbot widget
│       │   ├── common/              # Loader, ScrollToTop, etc.
│       │   ├── features/            # Feature-specific sub-components
│       │   ├── layout/              # Page layout wrappers
│       │   ├── Navigation.jsx
│       │   ├── Footer.jsx
│       │   ├── EventCard.jsx
│       │   ├── WeatherWidget.jsx
│       │   ├── ItineraryDisplay.jsx
│       │   └── SuggestionCard.jsx
│       ├── context/                 # Global state (Context API)
│       │   ├── FavoritesContext.jsx
│       │   └── ThemeContext.jsx
│       ├── hooks/                   # Custom React hooks
│       ├── pages/                   # One file per route
│       ├── services/                # HTTP service layer (Axios)
│       ├── utils/                   # Helper functions
│       ├── config/                  # SDK & env config
│       ├── App.jsx                  # Router + ProtectedRoute guard
│       └── main.jsx                 # Vite entry point
│
├── backend/                         # Node.js + Express REST API (port 5000)
│   ├── config/
│   │   ├── db.js                    # MongoDB connection (Mongoose)
│   │   ├── passport.js              # Google OAuth 2.0 strategy
│   │   └── mailTransporter.js       # Nodemailer config
│   ├── controllers/                 # Business logic per domain
│   ├── models/                      # Mongoose schemas
│   ├── routes/                      # Express routers
│   ├── services/                    # External integrations & heavy logic
│   └── server.js                    # App bootstrap & middleware
│
├── screenshots/                     # UI previews
├── .env.example                     # Environment variable template
├── CONTRIBUTING.md
├── INSTALLATION.md
└── README.md
```

---

## 🏛️ Architecture Flow

```
┌──────────────────────────────────────┐
│     Browser  (React + Vite :5173)    │
│                                      │
│  Route → Page → Service → HTTP req   │
└──────────────────┬───────────────────┘
                   │  JSON / REST
                   ▼
┌──────────────────────────────────────┐
│   Express Server  (Node.js :5000)    │
│                                      │
│  CORS → Router → Controller          │
│       → Service (AI / Weather / …)   │
│       → Mongoose Model               │
└────────────┬─────────────────────────┘
             │
     ┌───────┴────────┐
     ▼                ▼
 MongoDB Atlas    External APIs
                  (OpenAI · OpenWeather
                   · Events · Google OAuth)
```

**State management at a glance:**

| Layer | Mechanism |
|---|---|
| Auth token | `localStorage` → `ProtectedRoute` in `App.jsx` |
| Favourites | `FavoritesContext` (React Context API) |
| Dark / light theme | `ThemeContext` (React Context API) |
| Server data | Local `useState` + service call |

---

## 🗺️ Application Routes

### Frontend

| Path | Component | Access |
|---|---|:---:|
| `/` | `Home.jsx` | 🌐 Public |
| `/about` | `About.jsx` | 🌐 Public |
| `/features` | `Features.jsx` | 🌐 Public |
| `/destinations` | `Destinations.jsx` | 🌐 Public |
| `/destinations/:id` | `DestinationDetails.jsx` | 🌐 Public |
| `/contact` | `Contact.jsx` | 🌐 Public |
| `/privacy` | `Privacy.jsx` | 🌐 Public |
| `/terms` | `Terms.jsx` | 🌐 Public |
| `/help` | `HelpCenter.jsx` | 🌐 Public |
| `/demo` | `DemoSection.jsx` | 🌐 Public |
| `/signup` | `signup.jsx` | 🌐 Public |
| `/login` | `Login.jsx` | 🌐 Public |
| `/favorites` | `AddFavorite.jsx` | 🌐 Public |
| `/plan-trip` | `PlanTrip.jsx` | 🌐 Public |
| `/trip-planner` | `TripPlanner.jsx` | 🌐 Public |
| `/home2` | `Home2.jsx` | 🔒 Protected |

> 🔒 Protected routes redirect to `/login` if no valid JWT is found in `localStorage`.

### Backend API

| Endpoint prefix | Responsibility |
|---|---|
| `POST /api/auth` | Register, login, Google OAuth |
| `POST /api/contact` | Contact form & email dispatch |
| `* /api/trip` | Save & retrieve trip data |
| `* /api/itinerary` | AI itinerary generation & adjustment |
| `* /api/events` | Fetch & cache local events |
| `* /api/weather` | Weather forecasts & disruption alerts |
| `GET /api/health` | Server health check |

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB Atlas cluster (free tier works)

### Steps

```bash
# 1. Clone
git clone https://github.com/Suhani1234-5/TourEase.git

# 2. Configure environment
cp .env.example backend/.env
# Fill in MONGODB_URI, JWT_SECRET, FRONTEND_URL in backend/.env

# 3. Start backend  (Terminal 1)
cd backend && npm install && npm start

# 4. Start frontend  (Terminal 2)
cd frontend && npm install && npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** — you're in. 🎉

> [!NOTE]
> For Google OAuth, OpenAI, and email keys, see the **[Full Installation Guide](INSTALLATION.md)**.

---

## 🤝 Contributing

TourEase is part of **GirlScript Summer of Code 2026**. We welcome contributions of all sizes!

1. **Fork** the repo and create a branch: `git checkout -b feat/your-feature`
2. **Commit** your changes with a clear, descriptive message.
3. **Push** and open a **Pull Request** against `main`.

Read the **[Contributing Guidelines](CONTRIBUTING.md)** before opening a PR.  
Check the [Issues](https://github.com/Suhani1234-5/TourEase/issues) tab — labels like `good first issue` and `easy` are great starting points.

---

## 🔐 Security

Please **do not** open a public issue for vulnerabilities. See our **[Security Policy](SECURITY.md)** for responsible disclosure guidelines.

---

## 📄 License

Distributed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

## 👩‍💻 Maintainer

**Suhani** — [@Suhani1234-5](https://github.com/Suhani1234-5)
&nbsp;·&nbsp; [LinkedIn](https://www.linkedin.com/in/suhani-garg-88a736318/)
&nbsp;·&nbsp; [GitHub Discussions](https://github.com/Suhani1234-5/TourEase/discussions)

---

## 👥 Contributors

Thanks to everyone who has helped build TourEase! 💜

<a href="https://github.com/Suhani1234-5/TourEase/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Suhani1234-5/TourEase" alt="TourEase contributors" />
</a>

---

<div align="center">

**Made with ❤️ by travelers, for travelers**

[⬆ Back to top](#-tourease)

</div>
