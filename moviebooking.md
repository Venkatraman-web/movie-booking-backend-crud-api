# 🎬 Movie Booking Backend

A RESTful backend API for a movie ticket booking platform built with **Node.js, Express.js, and MongoDB**.

The application provides APIs for managing users, movies, theatres, shows, bookings, and payments. It also implements authentication, authorization, validation, pagination, and role-based access control.

## 🚀 Features

- 🔐 JWT-based authentication
- 👥 Role-based authorization
- 🎬 Movie CRUD operations
- 🎭 Theatre CRUD operations
- 🎥 Show management
- 🎟️ Movie ticket booking
- 💳 Payment management
- 🔄 Booking status management
- 📄 Pagination and filtering
- ✅ Request validation
- 🔒 Password hashing with bcrypt
- 🗄️ MongoDB with Mongoose
- ⚡ RESTful API architecture

## 🛠️ Tech Stack

- **Node.js** — Backend runtime
- **Express.js** — REST API framework
- **MongoDB** — Database
- **Mongoose** — MongoDB ODM
- **JWT** — Authentication
- **bcrypt** — Password hashing
- **dotenv** — Environment variables
- **Nodemon** — Development

## 📁 Project Structure

```text
Movie Booking Backend
│
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
├── index.js
├── package.json
└── .env
```

The project follows a layered structure:

```text
Request
  ↓
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Model
  ↓
MongoDB
```

## 🔐 Authentication

The application uses JWT authentication.

After signing in, the client receives a token which is sent with protected requests using:

```http
x-access-token: <JWT_TOKEN>
```

Protected routes verify the token before allowing access.

## 👤 User Roles

### Customer

Customers can:

- Sign up and sign in
- Browse movies
- Browse theatres
- View shows
- Create bookings
- Make payments
- Manage their bookings

### Admin

Admins have additional privileges such as:

- Managing movies
- Managing theatres
- Managing shows
- Managing users
- Updating user roles/status
- Viewing all bookings

## 🎬 Movie APIs

### Create Movie

```http
POST /mba/api/v1/movie
```

### Get Movies

```http
GET /mba/api/v1/movie
```

Supports filtering and pagination.

### Get Movie By ID

```http
GET /mba/api/v1/movie/:id
```

### Update Movie

```http
PATCH /mba/api/v1/movie/:id
```

### Delete Movie

```http
DELETE /mba/api/v1/movie/:id
```

## 🎭 Theatre APIs

### Create Theatre

```http
POST /mba/api/v1/theatre
```

### Get Theatres

```http
GET /mba/api/v1/theatre
```

Theatre listing supports filters such as:

- City
- Pincode
- Name
- Movie

### Get Theatre By ID

```http
GET /mba/api/v1/theatre/:id
```

### Update Theatre

```http
PATCH /mba/api/v1/theatre/:id
```

### Delete Theatre

```http
DELETE /mba/api/v1/theatre/:id
```

## 🎥 Shows

A show connects a movie with a theatre and contains:

- Timing
- Available seats
- Ticket price
- Format

Example:

```json
{
  "theatreId": "THEATRE_ID",
  "movieId": "MOVIE_ID",
  "timing": "09:00 PM",
  "noOfSeats": 120,
  "price": 250,
  "format": "2D"
}
```

## 🎟️ Booking APIs

### Create Booking

```http
POST /mba/api/v1/booking
```

Example request:

```json
{
  "theatreId": "THEATRE_ID",
  "movieId": "MOVIE_ID",
  "timing": "09:00 PM",
  "noOfSeats": 2
}
```

The backend retrieves the corresponding show and calculates:

```text
totalCost = show.price × noOfSeats
```

For example:

```text
₹250 × 2 = ₹500
```

### Get User Bookings

```http
GET /mba/api/v1/booking
```

### Get Booking By ID

```http
GET /mba/api/v1/booking/:id
```

### Get All Bookings

```http
GET /mba/api/v1/booking/all
```

Admin access is required.

### Update Booking

```http
PATCH /mba/api/v1/booking/:id
```

## 💳 Payment APIs

Payments are associated with bookings.

Payment statuses:

```text
PENDING
SUCCESS
FAILED
```

Example:

```json
{
  "bookingId": "BOOKING_ID",
  "amount": 500,
  "status": "PENDING"
}
```

The payment workflow updates the associated booking based on the payment result.

## 🗄️ Database Relationships

```text
User
 │
 │ userId
 ▼
Booking
 │
 ├──────────────► Movie
 │
 ├──────────────► Theatre
 │
 └──────────────► Payment
```

Shows connect movies and theatres:

```text
Movie
  │
  │ movieId
  ▼
Show
  │
  │ theatreId
  ▼
Theatre
```

## 📄 Pagination

The application supports pagination for large collections using parameters such as:

```text
limit
skip
```

Example:

```http
GET /mba/api/v1/theatre?limit=3&skip=1
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

### 2. Navigate to the project

```bash
cd Movie-Booking-Backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create `.env`

```env
PORT=3000
DB_URL=mongodb://localhost:27017/movie-booking
AUTH_KEY=your_jwt_secret
```

### 5. Start the server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

The API will be available at:

```text
http://localhost:3000
```

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port on which the server runs |
| `DB_URL` | MongoDB connection string |
| `AUTH_KEY` | Secret key used for JWT |

Do not commit `.env` to GitHub.

Add the following to `.gitignore`:

```gitignore
.env
node_modules/
```

## 🧪 API Testing

The APIs can be tested using:

- Postman
- Thunder Client
- Insomnia
- cURL

Typical authentication flow:

```text
Sign Up
   ↓
Sign In
   ↓
Receive JWT
   ↓
Send JWT using x-access-token
   ↓
Access protected APIs
```

## 🔄 Booking Flow

```text
User
 │
 ▼
Select Movie
 │
 ▼
Select Theatre
 │
 ▼
Select Show
 │
 ▼
Select Number of Seats
 │
 ▼
Create Booking
 │
 ▼
Calculate Total Cost
 │
 ▼
Payment
 │
 ├── SUCCESS ──► Booking SUCCESSFUL
 │
 └── FAILED ───► Booking CANCELLED
```

## 🧠 Backend Concepts Demonstrated

This project demonstrates practical backend concepts including:

- REST API design
- MVC/layered architecture
- Middleware
- JWT authentication
- Role-based authorization
- Mongoose schemas and models
- MongoDB references
- CRUD operations
- Request validation
- Error handling
- Pagination
- Password hashing
- Booking workflows
- Payment workflows

## 🚧 Future Improvements

Potential improvements include:

- Real payment gateway integration
- Seat-level locking
- MongoDB transactions for booking/payment operations
- Redis caching
- Rate limiting
- Swagger/OpenAPI documentation
- Automated testing
- Dockerization
- CI/CD pipeline

## 👨‍💻 Author

**Venkatraman Balachandran**

B.Tech Computer Science & Engineering
