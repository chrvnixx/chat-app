# Chat Application

A modern, full-stack real-time chat application built with Node.js, React, and WebSocket technology. This application enables users to communicate in real-time with secure authentication and profile management features.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)

## ✨ Features

### Authentication & User Management

- **User Registration**: Create new accounts with email and password
- **Secure Login**: JWT-based authentication with HTTP-only cookies
- **Password Hashing**: Bcrypt encryption for secure password storage
- **Profile Management**: Update profile pictures and user information
- **Session Management**: Automatic logout and token-based session handling

### Real-Time Messaging

- **Live Chat**: Real-time message delivery using WebSocket (Socket.IO)
- **Instant Notifications**: Users receive messages as they arrive
- **Online Status**: See which users are currently online
- **Message History**: View previous conversations

### User Experience

- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Modern UI**: Built with React and DaisyUI components
- **Profile Pictures**: Upload and display custom profile pictures with Cloudinary
- **Toast Notifications**: User-friendly feedback for all actions
- **Loading States**: Visual indicators for async operations

## 🛠 Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Real-Time Communication**: Socket.IO
- **Image Storage**: Cloudinary
- **Password Hashing**: Bcrypt
- **Environment Management**: dotenv
- **CORS**: Cross-Origin Resource Sharing support

### Frontend

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with DaisyUI
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Real-Time Client**: Socket.IO Client
- **UI Components**: Lucide Icons
- **Notifications**: React Hot Toast
- **Routing**: React Router

## 📁 Project Structure

```
chat-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                 # MongoDB connection configuration
│   │   │   └── cloudinary.js         # Cloudinary configuration
│   │   ├── controllers/
│   │   │   └── authControllers.js    # Authentication logic (signup, login, updateProfile)
│   │   ├── middleware/
│   │   │   └── authMiddleware.js     # JWT verification middleware
│   │   ├── models/
│   │   │   └── User.js               # User schema with password hashing
│   │   ├── route/
│   │   │   ├── authRoutes.js         # Auth endpoints
│   │   │   └── messageRoutes.js      # Messaging endpoints
│   │   ├── utils/
│   │   │   └── generateToken.js      # JWT token generation
│   │   └── server.js                 # Express app setup and middleware
│   ├── package.json
│   └── .env                          # Environment variables (create this)
│
├── frontend/
│   ├── src/
│   │   ├── components/               # Reusable React components
│   │   ├── pages/                    # Page components (ProfilePage, SettingsPage, etc.)
│   │   ├── store/
│   │   │   └── authStore.js          # Zustand auth state management
│   │   ├── lib/
│   │   │   └── axios.js              # Axios instance with credentials
│   │   ├── constants/                # App constants
│   │   ├── assets/                   # Images and static files
│   │   ├── App.jsx                   # Main app component
│   │   ├── main.jsx                  # React entry point
│   │   ├── App.css                   # Global styles
│   │   └── index.css                 # Tailwind imports
│   ├── public/                       # Static files
│   ├── index.html                    # HTML template
│   ├── vite.config.js                # Vite configuration
│   ├── eslint.config.js              # ESLint configuration
│   ├── package.json
│   └── .env                          # Environment variables (create this)
│
└── README.md                         # This file
```

## 📦 Prerequisites

Before running this application, ensure you have:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **MongoDB** - Either locally installed or a MongoDB Atlas account
- **Cloudinary Account** - For image storage ([Sign up](https://cloudinary.com/))
- **Git** - For version control

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Chat-app
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
npm install
```

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/chat-app
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/chat-app

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:4000/api
```

## 🏃 Running the Application

### Development Mode

#### Terminal 1 - Start Backend Server

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:4000`

#### Terminal 2 - Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### Production Build

#### Frontend Build

```bash
cd frontend
npm run build
```

This generates an optimized production build in the `dist` folder.

#### Backend Start

```bash
cd backend
npm start
```

## 📡 API Documentation

### Authentication Endpoints

#### Signup

- **Endpoint**: `POST /api/auth/signup`
- **Description**: Create a new user account
- **Request Body**:

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

- **Response**: User object with auth token in cookie
- **Status**: 201 Created

#### Login

- **Endpoint**: `POST /api/auth/login`
- **Description**: Authenticate user and create session
- **Request Body**:

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

- **Response**: User object with auth token in cookie
- **Status**: 200 OK

#### Logout

- **Endpoint**: `POST /api/auth/logout`
- **Description**: End user session
- **Authentication**: Required (JWT)
- **Response**: Success message
- **Status**: 200 OK

#### Update Profile

- **Endpoint**: `PUT /api/auth/update-profile`
- **Description**: Update user profile picture
- **Authentication**: Required (JWT)
- **Request Body**:

```json
{
  "profilePic": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

- **Response**: Updated user object
- **Status**: 200 OK

#### Check Auth

- **Endpoint**: `GET /api/auth/check-auth`
- **Description**: Verify current user authentication status
- **Authentication**: Required (JWT)
- **Response**: Current user object or null
- **Status**: 200 OK

### Message Endpoints

#### Send Message

- **Endpoint**: `POST /api/message/send/:id`
- **Description**: Send a message to a user
- **Authentication**: Required (JWT)
- **Parameters**: `id` - Recipient user ID
- **Request Body**:

```json
{
  "text": "Hello, how are you?"
}
```

- **Response**: Message object
- **Status**: 201 Created

#### Get Messages

- **Endpoint**: `GET /api/message/:id`
- **Description**: Fetch conversation history with a user
- **Authentication**: Required (JWT)
- **Parameters**: `id` - User ID
- **Response**: Array of message objects
- **Status**: 200 OK

#### Get Users

- **Endpoint**: `GET /api/message/users`
- **Description**: Fetch list of all users for sidebar
- **Authentication**: Required (JWT)
- **Response**: Array of user objects (excluding current user)
- **Status**: 200 OK

## 🗄️ Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  fullName: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed with bcrypt),
  profilePic: String (default: ""),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Message Model (Optional - if implemented)

```javascript
{
  _id: ObjectId,
  senderId: ObjectId (reference to User),
  receiverId: ObjectId (reference to User),
  text: String (required),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🔒 Security

### Authentication & Authorization

- **JWT Tokens**: Implemented with 7-day expiration
- **HTTP-Only Cookies**: Tokens stored securely (not accessible via JavaScript)
- **Password Hashing**: Bcrypt with 10 salt rounds
- **Protected Routes**: Middleware validates JWT for protected endpoints

### Data Protection

- **CORS**: Configured to only accept requests from frontend origin
- **Environment Variables**: Sensitive data stored in `.env` file
- **Cloudinary API Keys**: Securely configured server-side

### Best Practices

- Passwords never returned in API responses
- Validation on both client and server
- Error messages don't leak sensitive information
- Automatic session cleanup on logout

## 🐛 Troubleshooting

### Common Issues

#### "Cannot read properties of undefined (reading 'data')"

**Problem**: Error response doesn't have data property
**Solution**: Backend server may not be running or CORS is misconfigured. Ensure:

- Backend is running on correct port (4000)
- CORS origin matches frontend URL
- Check network tab in DevTools

#### "PayloadTooLargeError: request entity too large"

**Problem**: Image upload fails due to size limit
**Solution**: Increase Express middleware limits in `server.js`:

```javascript
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
```

Then restart the server.

#### "Cannot read properties of null (reading 'comparePassword')"

**Problem**: User not found during login
**Solution**: Ensure user exists in database. Add null check:

```javascript
if (!user) {
  return res.status(400).json({ message: "Invalid credentials" });
}
```

#### "Invalid credentials" on login

**Problem**: Password comparison fails
**Solution**: Ensure password hashing middleware is correct in User model. The pre-save hook should hash passwords on creation:

```javascript
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});
```

#### Cookies not being set

**Problem**: JWT token not appearing in browser cookies
**Solution**: Ensure frontend uses `axiosInstance` with `withCredentials: true`:

```javascript
export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/",
  withCredentials: true,
});
```

### Debug Tips

1. **Check Network Tab**: Monitor API requests and responses in browser DevTools
2. **Server Logs**: Watch backend terminal for error messages
3. **MongoDB**: Use MongoDB Compass to inspect database collections
4. **Cloudinary Logs**: Check Cloudinary dashboard for upload errors
5. **Environment Variables**: Verify all `.env` files are correctly configured

## 🚀 Future Enhancements

### Planned Features

- **Group Chat**: Create and manage group conversations
- **Message Search**: Search through message history
- **Typing Indicators**: Show when users are typing
- **Message Reactions**: Add emoji reactions to messages
- **File Sharing**: Share documents, images, and media
- **Video Calls**: Integrate WebRTC for voice/video calls
- **User Blocking**: Block and unblock users
- **Message Encryption**: End-to-end encryption for privacy
- **Push Notifications**: Browser notifications for new messages
- **Dark Mode**: Theme toggle for user preference

### Performance Optimizations

- Implement message pagination
- Add caching layer (Redis)
- Optimize image storage and delivery
- Implement rate limiting
- Add database indexing

### Testing

- Unit tests for backend controllers
- Integration tests for API endpoints
- Frontend component tests
- E2E testing with Cypress

## 📄 License

ISC License

## 👨‍💻 Author

Created by Emmanuel Adekola

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Happy Chatting! 💬**
