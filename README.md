# Booking API

This is a complete RESTful API backend for a service booking platform. It supports user/provider registration, login with mock OTP, service management, bookings, and Razorpay payment integration.

---

## 🔧 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Razorpay (Sandbox)
- Postman Collection for testing

---

## 📁 Project Structure

```
booking-api/
│
├── config/            # DB configuration
├── middleware/        # JWT, rate limiting
├── models/            # MongoDB schemas
├── routes/            # API routes
├── utils/             # Utility functions (e.g., OTP)
├── .env               # Environment variables
├── server.js          # Main entry point
├── package.json       # Dependencies
├── Booking_API.postman_collection.json # Postman collection
```

---

## 🚀 Setup Instructions

1. **Clone the repository**
   ```
   git clone https://github.com/your-username/booking-api.git
   cd booking-api
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root with the following:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY=your_razorpay_key
   RAZORPAY_SECRET=your_razorpay_secret
   ```

4. **Run the server**
   ```
   npm start
   ```

---

## 📬 API Endpoints

### Auth

- `POST /api/auth/register` – Register (User/Provider)
- `POST /api/auth/login` – Login with mock OTP

### Bookings

- `POST /api/bookings` – Create a booking
- `GET /api/bookings` – View all bookings
- `PUT /api/bookings/:id` – Update a booking

### Admin

- `POST /api/admin/services` – Create a new service
- `PUT /api/admin/services/:id` – Update a service

### Payments

- `POST /api/payment/order` – Create a Razorpay order

---

## 🔐 Authorization

- Use JWT in the `Authorization` header for protected routes:
  ```
  Authorization: Bearer <your_token>
  ```

---

## 📫 Postman Collection

Import `Booking_API.postman_collection.json` in Postman to test all routes.

---

## 🧑‍💻 Author

Generated and structured for production-ready deployment. Customize and expand as needed.
