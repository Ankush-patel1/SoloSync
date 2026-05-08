# SoloSync

A platform for solo travelers to find trips, meet co-travelers, and host their own adventures.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![GCP](https://img.shields.io/badge/Google%20Cloud-Ready-4285F4?logo=google-cloud&logoColor=white)](https://cloud.google.com/)

<div>
</div>

---

## Features

- **Discover**: Browse upcoming trips posted by other travelers.
- **Co-travel Requests**: Send and receive requests to join a trip together.
- **Explore India**: Curated destination cards with live imagery.
- **Host a Trip**: Create and manage your own listings.
- **Trip History**: View all past and upcoming bookings.
- **Secure Auth**: JWT + bcrypt with protected routes on both ends.
- **Dark / Light Mode**: Full theme toggle persisted to `localStorage`.

---

## Tech Stack

- **Frontend**: React 18, Vite, Vanilla CSS
- **Backend**: FastAPI 0.111, psycopg2
- **Database**: PostgreSQL 14+
- **Auth**: JWT (python-jose) + bcrypt (passlib)
- **Deployment**: Google Cloud Run (Docker)

---

## Development

### Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL 14+

### Database Setup

```bash
psql -U postgres -f database/schema.sql
```

### Backend

```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env   # add your credentials
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Docker (Recommended)

If you have Docker installed, you can spin up the entire stack (Database, Backend, Frontend) with a single command:

```bash
docker-compose up --build
```

The services will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000
- **Database**: localhost:5432

---

## Project Structure

```
SoloSync/
├── backend/         # FastAPI backend
├── frontend/        # React frontend
├── database/        # SQL schema
├── docs/            # Documentation assets
└── README.md
```

---

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

---

<div align="center">

Built for Solo Explorers

</div>

## 📄 License

Distributed under the [MIT License](./LICENSE). Use it, fork it, learn from it.

---

<div align="center">

Built with ❤️ for solo explorers · Made in India 🇮🇳

</div>
