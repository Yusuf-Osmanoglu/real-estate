# 🏡 LuxeEstate — Open-Source Real Estate Platform

A full-stack, open-source real estate platform built with a **static HTML/CSS public website** and a **React + TypeScript admin dashboard**, both powered by **Firebase** as the backend.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Firebase](https://img.shields.io/badge/backend-Firebase-orange.svg)
![React](https://img.shields.io/badge/dashboard-React%2019-61dafb.svg)
![Tailwind CSS](https://img.shields.io/badge/style-Tailwind%20CSS%204-38bdf8.svg)

---

## 📸 Screenshots

| Public Website | Admin Dashboard |
|---|---|
| Property listings, search & filtering | Manage listings, calendar, analytics |

---

## ✨ Features

### 🌐 Public Website (`client/web/`)
- **Home page** — Featured & latest property listings pulled live from Firebase
- **Search & Filter** — Filter by sale/rent status, with real-time results
- **Property Detail** — Full gallery, features, pricing, contact sidebar
- **Tour Scheduling** — Visitors can request property tours (saved to Firestore + triggers admin notification)
- **Contact Modal** — WhatsApp & Email quick-contact options
- **About Page** — Team profiles, stats, and company info
- **Dark Mode** — Full dark/light theme toggle
- **Responsive Design** — Mobile-first layout across all pages

### 🖥️ Admin Dashboard (`client/dashboard/`)
- **Authentication** — Firebase Auth (email/password), protected routes
- **Properties** — Full CRUD: create, edit, delete listings with image upload (via ImgBB)
- **Image Upload** — Multi-image upload with live progress indicators, stored on ImgBB CDN
- **Calendar** — Schedule and manage property viewings & meetings, synced to Firestore
- **Analytics** — Property performance overview (views, inquiries, listing stats)
- **Notifications** — Real-time tour request notifications from the public site
- **Settings** — User & role management (Admin, Agent, Editor, Viewer), Firebase Auth integration
- **Dark Mode** — Consistent dark/light theme throughout

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Public Frontend** | HTML5, Tailwind CSS (CDN), Vanilla JavaScript |
| **Dashboard Frontend** | React 19, TypeScript, Vite, Tailwind CSS 4 |
| **Backend / Database** | Firebase Firestore (NoSQL) |
| **Authentication** | Firebase Auth |
| **Image Hosting** | ImgBB API |
| **Icons** | Lucide React, Google Material Symbols |
| **Date Utilities** | date-fns |
| **Routing** | React Router DOM v7 |

---

## 📁 Project Structure

```
├── client/
│   ├── web/                        # Public-facing website (static HTML)
│   │   ├── index.html              # Home page — listings & hero
│   │   ├── search_results.html     # Search & filter results
│   │   ├── details.html            # Property detail page
│   │   └── about.html              # About / team page
│   │
│   └── dashboard/                  # Admin dashboard (React + TypeScript)
│       ├── src/
│       │   ├── pages/
│       │   │   ├── Login.tsx       # Auth page
│       │   │   ├── Dashboard.tsx   # Overview + notifications
│       │   │   ├── Properties.tsx  # Listing CRUD + image upload
│       │   │   ├── Calendar.tsx    # Appointment scheduler
│       │   │   ├── Analytics.tsx   # Stats & performance
│       │   │   └── Settings.tsx    # Users & roles
│       │   ├── components/
│       │   │   ├── Sidebar.tsx     # Navigation sidebar
│       │   │   ├── Layout.tsx      # App shell layout
│       │   │   └── PrivateRoute.tsx # Auth guard
│       │   ├── contexts/
│       │   │   └── AuthContext.tsx  # Firebase auth context
│       │   └── firebase.ts         # Firebase config & initialization
│       ├── package.json
│       └── vite.config.ts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A [Firebase](https://firebase.google.com/) project
- An [ImgBB](https://imgbb.com/) account (free tier is sufficient)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Yusuf-Osmanoglu/real-estate.git
cd real-estate
```

---

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Firestore Database** (start in test mode for development).
3. Enable **Authentication** → Sign-in method → **Email/Password**.
4. Copy your Firebase config object.

**Firestore Collections used:**

| Collection | Description |
|---|---|
| `properties` | All property listings |
| `users` | Dashboard user accounts & roles |
| `events` | Calendar appointments |
| `notifications` | Tour requests from the public site |

---

### 3. Configure the Dashboard

Open `client/dashboard/src/firebase.ts` and replace with your Firebase config:

```ts
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

Also update the config inside `client/dashboard/src/pages/Settings.tsx` (used for secondary auth when creating users).

---

### 4. Configure the Public Website

In each HTML file (`index.html`, `search_results.html`, `details.html`), find the Firebase initialization script and replace with your config:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  // ...
};
```

---

### 5. Configure ImgBB

1. Register at [imgbb.com](https://imgbb.com/) and get your free API key.
2. In `client/dashboard/src/pages/Properties.tsx`, replace the API key:

```ts
const res = await fetch('https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY', {
```

---

### 6. Run the Dashboard

```bash
cd client/dashboard
npm install
npm run dev
```

The dashboard will be available at `http://localhost:5173`.

---

### 7. Run the Public Website

The web pages are plain HTML — just open them in a browser or serve them with any static server:

```bash
# Using Node.js (npx)
cd client/web
npx serve .

# Or simply open index.html directly in your browser
```

---

## 🔐 Creating the First Admin User

1. Start the dashboard and navigate to `/login`.
2. Use the **Firebase Console → Authentication** to manually create the first user.
3. Sign in to the dashboard — the system will automatically register you as an **Admin** in Firestore.
4. From **Settings → Users & Roles**, you can create additional users.

---

## 📦 Building for Production

```bash
cd client/dashboard
npm run build
```

Output will be in `client/dashboard/dist/`. Deploy to any static host (Vercel, Netlify, Firebase Hosting, etc.).

For the public website, simply upload the `client/web/` folder to your static host.

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please open an issue first for major changes to discuss what you'd like to change.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Firebase](https://firebase.google.com/) — Backend & Auth
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Lucide Icons](https://lucide.dev/) — Dashboard icons
- [Google Material Symbols](https://fonts.google.com/icons) — Web page icons
- [ImgBB](https://imgbb.com/) — Image hosting
- [date-fns](https://date-fns.org/) — Date utilities
