# Contributing to SoloSync

Thanks for wanting to contribute! Here is a quick guide on how to get started.

## Setup

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 14+

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/SoloSync.git
cd SoloSync
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### 4. Docker Setup (Alternative)
```bash
docker-compose up --build
```
This starts the database, backend, and frontend automatically.

## Project Structure
- `backend/`: FastAPI + PostgreSQL logic.
- `frontend/`: React + Vite UI.
- `database/`: SQL schema files.

## Style Guide
- **Python**: PEP 8 (4-space indent).
- **JavaScript**: 2-space indent, single quotes.
- **Commits**: Clear, descriptive messages.

## Pull Requests
1. Create a new branch for your feature.
2. Keep your changes focused.
3. Test your code locally.
4. Submit a PR with a brief description of your work.

## Issues
If you find a bug, please open an issue with steps to reproduce it.
