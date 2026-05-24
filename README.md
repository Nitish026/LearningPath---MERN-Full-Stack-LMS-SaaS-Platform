LMS Project
Overview

A Learning Management System (LMS) project designed to streamline online learning, course management, and student engagement.

## Live Demo

Frontend: https://learning-path-mern-full-stack-lms-s.vercel.app/
Backend API: https://learningpath-mern-full-stack-lms-saas.onrender.com
Demo Video: https://www.loom.com/share/32bfba765ff4449caa94d61f0b4fae6a

## Core Features

### User Authentication
- User signup and login
- Secure password hashing
- JWT-based session authentication
- Protected routes

### Course Management
- Create courses
- View all available courses
- Course details page
- Update course information
- Delete courses

### User Dashboard
- Personalized dashboard
- Course management interface
- Authenticated user experience

### Backend Engineering
- RESTful API architecture
- Middleware-based request handling
- Error handling
- Modular controller-route-model structure

### UI / Frontend
- Responsive design
- Reusable React components
- Clean navigation flow
- Loading/error states

---

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Jwt
- Context API / State Management

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT (JSON Web Tokens)
- bcrypt.js

### Other Tools
- Cloudinary (media storage if used)
- Multer (file uploads)
- Postman (API testing)
- Git & GitHub

---

## Project Architecture

The application follows a client-server architecture:

```bash```
Frontend (React)
    ↓
REST API (Express.js)
    ↓
Authentication Middleware (JWT)
    ↓
Business Logic Layer
    ↓
MongoDB Database

lms-project/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.js
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md

Installation

Clone Repository
git https://github.com/Nitish026/LearningPath---MERN-Full-Stack-LMS-SaaS-Platform
cd lms-project

Install Frontend Dependencies
cd ../client
npm install

Install Backend Dependencies
cd ../server
npm install

Environment Variables
Create a .env file in the backend folder:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
Razorpay = test_key

API Endpoints
Authentication:
POST /api/auth/register
POST /api/auth/login
GET /api/auth/profile

Courses:
GET /api/courses
GET /api/courses/:id
POST /api/courses
PUT /api/courses/:id
DELETE /api/courses/:id

Enrollment:
POST /api/enroll
GET /api/enrolled-courses

Assignments:
POST /api/assignments
GET /api/assignments
POST /api/submit-assignment

What This Project Demonstrates

This project showcases practical backend + frontend engineering skills:

Authentication systems
CRUD operations
REST API design
Database schema design
Frontend-backend integration
Protected routing
Payment Integration
Clean code organization

Contributing
Pull requests are welcome.

Author
Nitish Narang
