<div align="center">

# ✈️ SoloSync

**The platform for solo travellers — find trips, meet co-travellers, and host your own adventures.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![GCP](https://img.shields.io/badge/Google%20Cloud-Ready-4285F4?logo=google-cloud&logoColor=white)](https://cloud.google.com/)
</div>



---

## 🌟 Features

| Feature | Description |
|---|---|
| 🔍 **Discover** | Browse upcoming trips posted by other solo travellers |
| 🤝 **Co-travel Requests** | Send and receive requests to join a trip together |
| 🗺️ **Explore India** | Curated destination cards with live imagery |
| 🏠 **Host a Trip** | Create and manage your own listings |
| 📋 **Trip History** | View all past and upcoming bookings |
| 🔐 **Secure Auth** | JWT + bcrypt with protected routes on both ends |
| 🌓 **Dark / Light Mode** | Full theme toggle persisted to `localStorage` |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Vanilla CSS (CSS variables) |
| **Backend** | FastAPI 0.111, psycopg2 |
| **Database** | PostgreSQL 14+ |
| **Auth** | JWT (`python-jose`) + bcrypt (`passlib`) |
| **Deployment** | Google Cloud Run (Docker) |

---

## 🚀 Local Development

### Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL 14+ running locally

### 1 — Database

```bash
psql -U postgres -f database/schema.sql
```

### 2 — Backend

```bash
cd backend

python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt

cp .env.example .env   # then fill in your values

uvicorn app.main:app --reload --port 8000
```

Interactive API docs: **http://localhost:8000/docs**  
Health check: **http://localhost:8000/health**

### 3 — Frontend

```bash
cd frontend

npm install
cp .env.example .env   # then fill in your values
npm run dev
```

App: **http://localhost:5173**

---

## 🔑 Environment Variables

### Backend — `backend/.env`

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `SECRET_KEY` | Random JWT signing secret (**keep private!**) |
| `ALGORITHM` | JWT algorithm — `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token lifetime (default `43200` = 30 days) |
| `CORS_ORIGINS` | Comma-separated allowed frontend origins |

### Frontend — `frontend/.env`

| Variable | Description |
|---|---|
| `VITE_API_URL` | Production backend URL (empty = Vite proxy in dev) |

---

## 📡 API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | ❌ | Register a new user |
| `POST` | `/auth/login` | ❌ | Login and receive JWT |
| `GET` | `/auth/me` | ✅ | Get current user profile |
| `PUT` | `/auth/password` | ✅ | Change password (current required) |
| `GET` | `/trips` | ❌ | List all available trips |
| `POST` | `/trips` | ✅ | Create a new trip |
| `GET` | `/trips/{id}` | ❌ | Get a single trip |
| `POST` | `/bookings` | ✅ | Book / request to join a trip |
| `GET` | `/bookings/my` | ✅ | Get current user's bookings |
| `GET` | `/health` | ❌ | Deployment health check |

Full interactive docs at `/docs` (Swagger UI) and `/redoc`.

---

## 🗂️ Project Structure

```
SoloSync/
├── backend/
│   ├── app/                 # FastAPI code
│   ├── Dockerfile           # Optimized for Cloud Run
│   └── requirements.txt     # Dependencies
├── frontend/
│   ├── src/                 # React code
│   ├── Dockerfile           # Nginx-based build
│   └── package.json         # Dependencies
├── database/
│   └── schema.sql           # Database structure
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

---

## ☁️ Deployment

### Google Cloud Run (Recommended)

Both the frontend and backend are containerized and ready for Google Cloud Run.

**1. Backend**
```bash
cd backend
gcloud run deploy solosync-api --source . --env-vars-file .env.yaml
```

**2. Frontend**
```bash
cd frontend
gcloud run deploy solosync-ui --source . --set-build-vars VITE_API_URL=[YOUR_BACKEND_URL]
```

---

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup instructions, code style, and PR guidelines.

---

## 📄 License

Distributed under the [MIT License](./LICENSE). Use it, fork it, learn from it.

---

<div align="center">

Built with ❤️ for solo explorers · Made in India 🇮🇳

</div>
