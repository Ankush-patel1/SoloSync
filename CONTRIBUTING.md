# Contributing to SoloSync

Thank you for your interest in SoloSync! This guide covers everything you need to get started.

---

## Development Setup

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 18+ |
| Python | 3.11+ |
| PostgreSQL | 14+ |

### 1 — Clone & install

```bash
git clone https://github.com/YOUR_USERNAME/SoloSync.git
cd SoloSync
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

### 3 — Frontend

```bash
cd frontend
npm install
cp .env.example .env   # then fill in your values
npm run dev
```

---

## Project Structure

```
SoloSync/
├── backend/         # FastAPI + PostgreSQL
│   ├── app/
│   │   ├── main.py        # App entry point & middleware
│   │   ├── config.py      # Pydantic settings (env vars)
│   │   ├── database.py    # psycopg2 connection
│   │   ├── auth.py        # JWT & bcrypt helpers
│   │   ├── schemas.py     # Pydantic request/response models
│   │   └── routers/       # Route handlers (users, trips, bookings)
│   ├── requirements.txt
│   └── .env.example
├── frontend/        # React 18 + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route-level page components
│   │   ├── context/       # AuthContext, ThemeContext
│   │   ├── services/      # Axios API client
│   │   └── hooks/         # Custom React hooks
│   └── .env.example
└── database/
    └── schema.sql   # PostgreSQL schema (run once to initialise)
```

---

## Code Style

- **Python**: Follow [PEP 8](https://peps.python.org/pep-0008/). 4-space indentation.
- **JavaScript/JSX**: 2-space indentation, single quotes. Run `npm run lint` before committing.
- **Commits**: Use [Conventional Commits](https://www.conventionalcommits.org/) style:
  - `feat: add trip search filter`
  - `fix: correct booking duplicate check`
  - `docs: update README setup steps`

---

## Environment Variables

Never commit `.env` files. Use `.env.example` as the template.

| File | Purpose |
|------|---------|
| `backend/.env.example` | Backend secrets & DB URL |
| `frontend/.env.example` | Frontend API URL |

---

## Pull Request Guidelines

1. **Branch from `main`**: `git checkout -b feat/my-feature`
2. **Keep PRs focused** — one feature or fix per PR
3. **Test your changes** locally before opening a PR
4. **Describe what changed** in the PR description

---

## Reporting Bugs

Open a [GitHub Issue](https://github.com/YOUR_USERNAME/SoloSync/issues) with:
- Steps to reproduce
- Expected vs actual behaviour
- Browser / OS / Python version (if relevant)
