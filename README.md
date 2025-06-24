# Patient Portal - Lab Test Booking System

A full-stack web application for managing medical lab test bookings. This system allows patients to register, view available tests, schedule appointments, download reports, and manage their bookings — all in one place.

---

## Features

### Frontend (React.js)

* User Authentication: Register and login pages
* Test Browsing: View available lab tests
* Booking Management: Book, view, cancel lab test appointments
* Report Downloads: Download dummy lab test reports
* Protected Routes: Access control for authenticated users
* Context API: Auth state handling
* Responsive UI: Styled using Tailwind CSS

### Backend (Node.js + Express)

* RESTful API: Auth, Tests, and Booking routes
* JWT Auth: Secure token-based authentication
* MongoDB Integration: Mongoose models and relations
* Password Hashing: bcryptjs
* CORS Enabled: For frontend-backend interaction

---

## Project Structure

```
SKVAP-assignment/
├── client/                    # Frontend (React.js)
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── context/           # Auth context for global state
│   │   ├── pages/             # App pages (Login, Register, Bookings, etc.)
│   │   ├── services/          # Axios service for API calls
│   │   ├── App.js
│   │   ├── index.js
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
├── API_testing/               # API testing collection (optional)
├── config/                    # DB connection
│   └── database.js
├── middleware/                # Middleware for auth
│   └── auth.js
├── models/                    # Mongoose models
│   ├── Booking.js
│   ├── LabTest.js
│   └── Patient.js
├── routes/                    # Express route handlers
│   ├── auth.js
│   ├── bookings.js
│   └── tests.js
├── .env                       # Environment variables
├── server.js                  # Entry point for backend
└── package.json               # Backend dependencies
```

---

## API Endpoints

### Auth (`/api/auth`)

* `POST /register` — Register a new patient
* `POST /login` — Login and get JWT

### Lab Tests (`/api/tests`)

* `GET /` — Get all active lab tests
* `GET /:id` — Get a test by ID
* `POST /seed` — Seed database with sample tests (dev only)

### Bookings (`/api/bookings`)

All booking routes require the `Authorization: Bearer <token>` header.

* `POST /book` — Book a lab test
* `GET /my-bookings` — View user's bookings
* `GET /report/:bookingId` — Get dummy report
* `PATCH /cancel/:bookingId` — Cancel a booking

---

## Authentication Flow

1. Register or Login to receive a JWT token
2. Store token in `localStorage`
3. Send token in `Authorization` header for protected routes
4. Middleware (`auth.js`) validates the token and sets `req.patient`

---

## Frontend Flow

1. **RegisterPage.jsx / LoginPage.jsx** — Forms to authenticate user
2. **AuthContext.jsx** — Stores and provides auth state across app
3. **ProtectedRoute.jsx** — Guards authenticated routes
4. **TestPage.jsx** — Fetches all tests using `testService`
5. **BookingPage.jsx** — Books tests, views bookings, downloads reports
6. **Services Folder** — Uses Axios to call backend APIs

---

## Backend Flow

### 1. Auth (auth.js)

* Validates input
* Hashes password using bcrypt
* Generates JWT token

### 2. Test Routes (tests.js)

* Uses `LabTest` model to get/add tests
* Seeds sample tests

### 3. Booking Routes (bookings.js)

* Books a lab test (checks testId, validates date)
* Fetches user's bookings
* Cancels bookings
* Generates dummy report

---

## Database Schemas

### Patient

```js
{
  name: String,
  email: String,
  password: String,
  phone: String,
  dateOfBirth: Date,
  gender: String
}
```

### LabTest

```js
{
  name: String,
  description: String,
  price: Number,
  duration: String,
  preparation: [String],
  category: String,
  isActive: Boolean
}
```

### Booking

```js
{
  patient: ObjectId,
  labTest: ObjectId,
  bookingDate: Date,
  preferredTime: String,
  status: String,
  notes: String,
  reportReady: Boolean,
  reportData: String
}
```

---

## Environment Variables

Create a `.env` file in the root:

```
MONGODB_URI=mongodb://localhost:27017/patient-portal
JWT_SECRET=your-super-secret-jwt-key-here
PORT=8000
```

---

## Testing & Development

### Seed Sample Data:

```bash
curl -X POST http://localhost:8000/api/tests/seed
```

### Run Backend:

```bash
npm install
npm run dev
```

### Run Frontend:

```bash
cd client
npm install
npm run dev
```

---

## Status Codes

| Code | Meaning             |
| ---- | ------------------- |
| 200  | Success             |
| 201  | Created             |
| 400  | Bad request         |
| 401  | Unauthorized        |
| 404  | Not found           |
| 500  | Internal Server Err |

---

## Final Note

You're now running a full-stack medical booking system with:

* Auth
* Test listings
* Bookings
* Reports

This project is a great base for real-world health tech systems. Add role-based access, real PDF reports, email notifications, or even payment integration to level it up.
