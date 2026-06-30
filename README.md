# Maju Sukses Teknik

Company website with a customer reviews feature: a Go API backend, a Postgres database, and a React/Vite frontend.

## Prerequisites

- Go 1.26+
- Node.js 18+
- A Postgres database (e.g. [Supabase](https://supabase.com))

## Backend setup

```bash
cd backend
cp .env.example .env
# edit .env: set DATABASE_URL and JWT_SECRET to your own values
```

Apply the migration to your database (run the SQL in `backend/migrations/000001_create_reviews.up.sql` via `psql`, the Supabase SQL editor, or your client of choice — there's no migration runner wired in yet).

```bash
go run .
```

The API starts on `:8080` (override with `PORT` in `.env`).

## Frontend setup

```bash
cd frontend
npm install
cp .env.example .env   # only needed if your backend isn't on http://localhost:8080
npm run dev
```

The dev server starts on `http://localhost:5173`.

## Environment variables

**`backend/.env`**

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | yes | Postgres connection string |
| `JWT_SECRET` | yes | Secret used to sign JWTs |
| `PORT` | no (default `8080`) | Port the API listens on |
| `APP_ENV` | no (default `development`) | Environment name |
| `FRONTEND_URL` | no (default `http://localhost:5173`) | Allowed CORS origin(s); comma-separate for multiple |

**`frontend/.env`**

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | no (default `http://localhost:8080`) | Base URL of the backend API |
