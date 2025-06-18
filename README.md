# 🚛 FleetLink - Logistics Vehicle Booking System

FleetLink is a full-stack web application built for Knovator Technologies to manage vehicle logistics bookings. It allows logistics companies or customers to add vehicles, search for available vehicles based on pincode and capacity, and make/cancel bookings.

---

## ⚙️ Tech Stack

### 🖥️ Frontend

- React + Vite
- TypeScript
- Tailwind CSS
- ShadCN/UI
- React Router
- React Hook Form + Zod
- Axios
- TanStack Query (React Query)

### 🧠 Backend

- Node.js
- Express.js
- MongoDB + Mongoose

---

## 🚀 Features

### 👤 User Features

- Add a new vehicle (with name, capacity, tyres).
- Search for available vehicles using:
  - From & To pincodes
  - Start time
  - Capacity required
- Book a vehicle.
- View all bookings by customer.
- Cancel bookings.

### 🧩 Architecture

- **Modular component structure**
- **API integration** using Axios + React Query
- **Custom Hooks** for cleaner data fetching
- **Zod** for robust frontend validation
- **MongoDB schema validation** via Mongoose
- **Proper folder separation** (API, components, types, utils)

---

## 🛠️ Setup Instructions

### 📦 Prerequisites

- Node.js >= 18
- MongoDB local or Atlas connection

### 🔧 Backend

```bash
cd backend
npm install
npm run dev

Environment Variables backend
Create a .env file inside the backend/ folder:
PORT=3001
MONGODB_URI=your_mongodb_connection_string
NODE_ENV="production"
CORS_ORIGINS=""

Environment Variables frontend
Create a .env file inside the frontend/ folder:
VITE_API_BASE_URL=""

## 📈 Future Improvements

🧑‍💻 User Experience
Add loading skeletons using shadcn/ui Skeleton
Add booking status: Upcoming, Completed, Cancelled
Booking history page & re-booking past trips
Push/email notifications on booking status

🔐 Authentication & Access Control
Implement login/signup with JWT
Role-based access: Admins vs Customers or Two seperate software for admin and user
Protect routes (React & Backend middleware)

🛠️ Admin Features
View all customers and their bookings
Manage vehicles: edit, delete

⚙️ Architecture & DevOps
Dockerize frontend & backend
Add CI/CD using GitHub Actions
Use .env for config management

🧠 State & Data Management
Use React Context or Zustand for global user state





















```
