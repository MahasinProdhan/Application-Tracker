# Job Application Tracker

A production-ready MERN job application tracker with cookie-based JWT authentication, analytics, kanban view, dark mode, and a modular React + Express architecture.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router DOM, Axios, Context API
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT stored in HTTP-only cookies

## Project Structure

```text
client/
server/
```

## Setup

1. Install dependencies from the project root:

```bash
npm install
```

2. Create environment files:

- Copy `.env.example` to `.env`
- Copy `server/.env.example` to `server/.env` if you prefer a local server env file
- Copy `client/.env.example` to `client/.env`

3. Update these values:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/job-tracker
JWT_SECRET=replace_with_a_strong_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
VITE_API_URL=http://localhost:5000/api
```

4. Start the app:

```bash
npm run dev
```

## Backend API

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### Applications

- `GET /api/applications`
- `GET /api/applications/:id`
- `POST /api/applications`
- `PUT /api/applications/:id`
- `DELETE /api/applications/:id`

### Dashboard and profile

- `GET /api/dashboard`
- `GET /api/profile`
- `PUT /api/profile`

## Features

- Signup, login, logout, persistent auth session
- Protected routes and auth middleware
- Create, update, delete, search, filter, and sort applications
- Dashboard summary cards, recent applications, pie and bar charts
- Kanban pipeline view
- Profile settings page
- Responsive sidebar layout
- Dark mode toggle
- Toast notifications, loading states, and empty states

## Notes

- JWT is stored in an HTTP-only cookie for better client-side security.
- CORS is configured for credentialed frontend requests.
- Validation is handled on the backend with `express-validator`.
