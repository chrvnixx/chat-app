# Chat Application

A modern, full-stack real-time chat application built with Node.js, Express, React 19, and Socket.IO. This application enables users to communicate in real-time with secure JWT authentication, profile management, and instant message delivery.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Real-Time Features](#real-time-features)
- [Database Schema](#database-schema)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)

## ✨ Features

### Authentication & User Management

- **User Registration**: Create new accounts with email and password
- **Secure Login**: JWT-based authentication with HTTP-only cookies
- **Password Hashing**: Bcrypt encryption for secure password storage (10 salt rounds)
- **Profile Management**: Update profile pictures and user information
- **Session Management**: Automatic logout and token-based session handling
- **Auth Verification**: Check authentication status on app load

### Real-Time Messaging

- **Live Chat**: Real-time message delivery using Socket.IO WebSocket
- **Instant Message Broadcasting**: Messages delivered instantly to recipients
- **Online User Tracking**: Real-time online/offline status via Socket.IO events
- **User Activity**: See which users are currently active in the application
- **Message History**: View previous conversations with message persistence
- **Recipient-Specific Delivery**: Messages sent directly to recipient's socket connection

### User Experience

- **Responsive Design**: Mobile-friendly interface with Tailwind CSS v4
- **Modern UI**: Built with React 19 and DaisyUI components
- **Profile Pictures**: Upload and display custom profile pictures with Cloudinary
- **Toast Notifications**: User-friendly feedback for all actions (React Hot Toast)
- **Loading States**: Visual indicators for async operations with React Spinners
- **Client-Side Routing**: Fast navigation using React Router v7
- **Component-Based Architecture**: Modular, reusable React components

## 🛠 Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Database**: MongoDB with Mongoose ODM (v9.4.1)
- **Real-Time Communication**: Socket.IO (v4.8.3)
- **Authentication**: JWT (JSON Web Tokens) via jsonwebtoken (v9.0.3)
- **Image Storage**: Cloudinary
- **Password Security**: Bcrypt (v6.0.0)
- **Environment Management**: dotenv
- **HTTP Utilities**: Cookie-parser for JWT cookie handling
- **CORS**: Cross-Origin Resource Sharing with dynamic origin configuration

### Frontend

- **Framework**: React 19
- **Build Tool**: Vite (v8.0.1)
- **Styling**: Tailwind CSS (v4.2.2) with DaisyUI components
- **State Management**: Zustand (v5.0.12)
- **HTTP Client**: Axios (v1.14.0) with credential support
- **Real-Time Client**: Socket.IO Client (v4.8.3)
- **UI Components**: Lucide Icons (v1.7.0)
- **Notifications**: React Hot Toast (v2.6.0)
- **Loading Indicators**: React Spinners (v0.17.0)
- **Routing**: React Router (v7.14.0)

## 📁 Project Structure

```
chat-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                    # MongoDB connection configuration
│   │   │   └── cloudinary.js            # Cloudinary configuration for image uploads
│   │   ├── controllers/
│   │   │   ├── authControllers.js       # Auth logic (signup, login, logout, updateProfile, checkAuth)
│   │   │   └── messageControllers.js    # Message logic (sendMessage, getMessages, getUsers)
│   │   ├── middleware/
│   │   │   └── authMiddleware.js        # JWT verification and authentication
│   │   ├── models/
│   │   │   ├── User.js                  # User schema with password hashing
│   │   │   └── Message.js               # Message schema (senderId, receiverId, text, timestamps)
│   │   ├── route/
│   │   │   ├── authRoutes.js            # Auth endpoints (/signup, /login, /logout, /check-auth, /update-profile)
│   │   │   └── messageRoutes.js         # Message endpoints (/send, /get, /users)
│   │   ├── utils/
│   │   │   └── generateToken.js         # JWT token generation utility
│   │   └── server.js                    # Express app setup, Socket.IO configuration, and middleware
│   ├── package.json
│   ├── .env                             # Environment variables (create this - see Configuration)
│   └── .env.production                  # Production environment variables (Render deployment)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatContainer.jsx        # Main chat interface
│   │   │   ├── NoChatSelected.jsx       # Empty state when no chat selected
│   │   │   ├── ChatInput.jsx            # Message input component
│   │   │   ├── MessageSkeleton.jsx      # Loading skeleton for messages
│   │   │   ├── NavBar.jsx               # Navigation bar component
│   │   │   ├── SideBar.jsx              # Sidebar with user list
│   │   │   └── Skeletons/               # Various loading skeleton components
│   │   ├── pages/
│   │   │   ├── HomePage.jsx             # Main chat page
│   │   │   ├── LoginPage.jsx            # Login form page
│   │   │   ├── SignUpPage.jsx           # Registration form page
│   │   │   ├── ProfilePage.jsx          # User profile page
│   │   │   └── SettingsPage.jsx         # Settings page
│   │   ├── store/
│   │   │   ├── authStore.js             # Zustand store for authentication state and logic
│   │   │   ├── chatStore.js             # Zustand store for chat/messaging state and logic
│   │   │   └── themeStore.js            # Zustand store for theme preferences (optional)
│   │   ├── lib/
│   │   │   └── axios.js                 # Axios instance with environment-based configuration
│   │   ├── constants/                   # Application constants
│   │   ├── assets/                      # Images and static files
│   │   ├── App.jsx                      # Main app component with routing
│   │   ├── main.jsx                     # React entry point
│   │   ├── App.css                      # Global styles
│   │   └── index.css                    # Tailwind CSS imports
│   ├── public/                          # Static files served by the web server
│   ├── index.html                       # HTML template
│   ├── vite.config.js                   # Vite build configuration
│   ├── eslint.config.js                 # ESLint linting rules
│   ├── package.json
│   ├── _redirects                       # Routing configuration for SPA (all routes -> /index.html)
│   ├── vercel.json                      # Alternative routing config for SPA compatibility
│   ├── .env                             # Environment variables (create this - see Configuration)
│   └── .env.production                  # Production environment variables (Render deployment)
│
├── render.yaml                          # Render.com infrastructure as code configuration
├── .gitignore
├── README.md                            # This file
└── .git/                                # Git repository
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

Create a `.env` file in the `backend` directory for development:

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

### Backend Production Environment Variables (.env.production)

For Render.com deployment:

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/chat-app
JWT_SECRET=your_production_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=https://your-frontend-url.onrender.com
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory for development:

```env
VITE_API_URL=http://localhost:4000/api
VITE_SOCKET_URL=http://localhost:4000
```

### Frontend Production Environment Variables (.env.production)

For Render.com deployment:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
VITE_SOCKET_URL=https://your-backend-url.onrender.com
```

**Note**: The `VITE_` prefix makes these variables available at build time in Vite. They are embedded in the production build.

## 🏃 Running the Application

### Development Mode

#### Terminal 1 - Start Backend Server

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:4000` and Socket.IO will be available at the same URL.

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

The backend will listen on the port specified in `PORT` environment variable (default: 5000).

## 🚀 Deployment

### Deploying to Render.com

This project includes `render.yaml` for easy deployment on Render.com.

#### Prerequisites

- GitHub account with repository pushed
- Render.com account
- MongoDB Atlas database (MongoDB URI)
- Cloudinary account credentials

#### Step 1: Push to GitHub

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

#### Step 2: Connect to Render

1. Go to [render.com](https://render.com)
2. Click "New" → "Infrastructure" → "Infrastructure as Code"
3. Select your GitHub repository
4. Choose the branch (main)
5. Click "Create"

#### Step 3: Configure Environment Variables

Render will automatically detect `render.yaml` and create two services:

**Backend Service (Web Service)**
- Set environment variables in Render dashboard:
  - `MONGODB_URI`: Your MongoDB Atlas connection string
  - `JWT_SECRET`: A secure random string
  - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
  - `CLOUDINARY_API_KEY`: Your Cloudinary API key
  - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
  - `FRONTEND_URL`: Your frontend URL (e.g., `https://your-app-frontend.onrender.com`)

**Frontend Service (Static Site)**
- Set environment variables in Render dashboard (Build scope):
  - `VITE_API_URL`: Your backend URL (e.g., `https://your-app-backend.onrender.com/api`)
  - `VITE_SOCKET_URL`: Your backend URL (e.g., `https://your-app-backend.onrender.com`)

#### Step 4: Auto-Deployment

Any push to your main branch will automatically trigger a rebuild and deployment.

#### render.yaml Configuration

The `render.yaml` file defines:
- Backend web service with Node.js runtime
- Frontend static site with automatic SPA routing
- Environment variables for both services
- Build and start commands

```yaml
services:
  - type: web
    name: chat-app-backend
    runtime: node
    rootDir: backend
    buildCommand: npm install
    startCommand: node src/server.js
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000

  - type: static
    name: chat-app-frontend
    rootDir: frontend
    buildCommand: npm run build
    staticPublishPath: dist
    routes:
      - path: /*
        destination: /index.html
```

#### Important Notes

- **Root Directory**: Backend root is `backend/`, frontend root is `frontend/`
- **SPA Routing**: All frontend routes automatically serve `index.html` for client-side routing
- **Port**: Backend uses port 10000 on Render (not the default 5000)
- **CORS**: Backend CORS is dynamically configured using `FRONTEND_URL` env variable in production

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
- **Response**: Current user object (without password) or null
- **Status**: 200 OK

### Message Endpoints

#### Send Message

- **Endpoint**: `POST /api/messages/send/:id`
- **Description**: Send a message to a user
- **Authentication**: Required (JWT)
- **Parameters**: `id` - Recipient user ID
- **Request Body**:

```json
{
  "text": "Hello, how are you?"
}
```

- **Response**: Message object with senderId, receiverId, text, timestamps
- **Status**: 201 Created
- **Socket.IO Event**: Backend emits `newMessage` event to recipient's socket

#### Get Messages

- **Endpoint**: `GET /api/messages/:id`
- **Description**: Fetch conversation history with a user
- **Authentication**: Required (JWT)
- **Parameters**: `id` - User ID to fetch messages with
- **Response**: Array of message objects sorted by timestamp
- **Status**: 200 OK

#### Get Users

- **Endpoint**: `GET /api/messages/users`
- **Description**: Fetch list of all users for sidebar
- **Authentication**: Required (JWT)
- **Response**: Array of user objects (excluding current user and passwords)
- **Status**: 200 OK

## 🔌 Real-Time Features

### Socket.IO Integration

The application uses Socket.IO for real-time bidirectional communication between client and server.

#### Socket Events

**Server-Side Events (Backend emits)**

- **`getOnlineUsers`**: Broadcast list of all online user IDs to all connected clients
  - Emitted when: User connects or disconnects
  - Data: Array of online user IDs
  - Usage: Frontend updates online user list and UI indicators

- **`newMessage`**: Send message to specific recipient
  - Emitted when: New message is sent
  - Data: Message object with senderId, receiverId, text, timestamp
  - Usage: Recipient receives message instantly without polling

**Client-Side Events (Frontend emits)**

- **`userOnline`**: Notify server that user is online
  - Sent when: User logs in and Socket connects
  - Data: User ID
  - Usage: Backend tracks online users and maps userId to socket ID

#### Socket.IO Configuration

**Development**:
```javascript
const allowedOrigins = "http://localhost:5173";
const io = new Server(httpServer, {
  cors: { origin: allowedOrigins, credentials: true }
});
```

**Production**:
```javascript
const allowedOrigins = process.env.FRONTEND_URL;
const io = new Server(httpServer, {
  cors: { origin: allowedOrigins, credentials: true }
});
```

#### Frontend Socket Integration

Socket connection happens automatically in `authStore.js`:

```javascript
connectSocket: () => {
  const socket = io(import.meta.env.VITE_SOCKET_URL);
  socket.emit("userOnline", authUser._id);
  socket.on("getOnlineUsers", (onlineUsers) => {
    set({ onlineUsers });
  });
  set({ socket });
}
```

#### Real-Time Message Flow

1. User sends message → Frontend calls `sendMessage()` → Backend receives and saves to DB
2. Backend emits `newMessage` event to recipient's socket
3. Recipient's frontend listens to `newMessage` and updates chat UI instantly
4. No page refresh or polling needed

## 🗄️ Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  fullName: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed with bcrypt - 10 salt rounds),
  profilePic: String (optional, Cloudinary URL),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

### Message Model

```javascript
{
  _id: ObjectId,
  senderId: ObjectId (reference to User, required),
  receiverId: ObjectId (reference to User, required),
  text: String (required, message content),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

**Indexes**: Typically created on `senderId`, `receiverId` for faster queries on conversations

## 🔒 Security

### Authentication & Authorization

- **JWT Tokens**: Secure token-based authentication with configurable expiration
- **HTTP-Only Cookies**: Tokens stored as HTTP-only cookies (not accessible via JavaScript)
- **Password Hashing**: Bcrypt with 10 salt rounds for password security
- **Protected Routes**: Middleware (`authMiddleware.js`) validates JWT for all protected endpoints
- **Protected Socket Events**: Socket events verified through authentication check before user online tracking

### Data Protection

- **CORS Configuration**: Dynamically configured to only accept requests from frontend origin
  - Development: `http://localhost:5173`
  - Production: `process.env.FRONTEND_URL` from Render environment variables
- **Environment Variables**: Sensitive data (DB credentials, API keys) stored in `.env` files (not committed to git)
- **Cloudinary API Keys**: Securely configured server-side, never exposed to frontend
- **Password in Responses**: Never included in API responses (excluded via `.select("-password")`)
- **Error Messages**: Generic error messages prevent information leakage (e.g., "Invalid credentials" instead of "User not found")

### Best Practices

- Tokens stored securely in HTTP-only cookies set by backend
- Validation on both client and server
- Automatic session cleanup on logout (token cleared from cookies)
- Socket.IO CORS configured to prevent unauthorized connections
- Sensitive operations require JWT authentication middleware
- Database queries exclude password field from responses

## 🐛 Troubleshooting

### Development Issues

#### "Cannot read properties of undefined (reading 'data')"

**Problem**: Error response doesn't have data property
**Solution**: Backend server may not be running or CORS is misconfigured. Ensure:
- Backend is running on correct port (4000)
- CORS origin matches frontend URL in `.env`
- Check network tab in DevTools to see actual response

#### "PayloadTooLargeError: request entity too large"

**Problem**: Image upload fails due to size limit
**Solution**: Increase Express middleware limits in `backend/src/server.js`:

```javascript
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
```

Then restart the server.

#### "Cannot read properties of null (reading 'comparePassword')"

**Problem**: User not found during login
**Solution**: Ensure user exists in database. The backend should return "Invalid credentials" with 400 status.

#### "Invalid credentials" on login

**Problem**: Password comparison fails
**Solution**: Ensure password hashing middleware is correct in User model. The pre-save hook should hash passwords:

```javascript
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});
```

#### Cookies not being set

**Problem**: JWT token not appearing in browser cookies
**Solution**: Ensure frontend Axios is configured with `withCredentials: true`:

```javascript
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
```

### Production Issues (Render.com)

#### "404 Not Found" on endpoint calls

**Problem**: API endpoint returns 404 when deployed
**Possible Causes**:
1. Backend service hasn't started - Check Render logs
2. Wrong backend URL in frontend environment variables
3. CORS not allowing the request

**Solution**:
- Verify `VITE_API_URL` in Render frontend environment variables points to correct backend
- Check Render backend logs: Settings → Logs
- Ensure `FRONTEND_URL` is set correctly in backend environment variables

#### "404 on page reload" (SPA routing)

**Problem**: Reloading page on non-root routes returns 404
**Cause**: Static site doesn't know to serve `index.html` for all routes
**Solution**: Already configured in `render.yaml` and `_redirects`:
```
routes:
  - path: /*
    destination: /index.html
```

#### "Socket connection fails in production"

**Problem**: WebSocket connection doesn't establish after deployment
**Possible Causes**:
1. `VITE_SOCKET_URL` not set in frontend environment variables
2. CORS not allowing Socket.IO connections
3. Backend Socket.IO not listening on correct port

**Solution**:
- Set `VITE_SOCKET_URL` in Render frontend environment to your backend URL
- Verify backend `FRONTEND_URL` matches actual frontend URL
- Check Socket.IO logs in browser DevTools (Network → WS tab)

#### "Messages not showing in real-time"

**Problem**: Messages appear only after page refresh
**Cause**: Socket.IO connection not established or newMessage event not received
**Solution**:
1. Open browser DevTools → Console and check for Socket.IO errors
2. Verify backend is emitting to correct recipient socket
3. Ensure frontend Socket listener is subscribed: `socket.on("newMessage", ...)`
4. Check that `connectSocket()` is called after successful login

#### "CORS errors with production URLs"

**Problem**: API calls blocked by CORS policy
**Cause**: `FRONTEND_URL` in backend doesn't match actual frontend URL
**Solution**:
- Get your exact frontend URL from Render (e.g., `https://chat-app-ohrf.onrender.com`)
- Set `FRONTEND_URL=https://chat-app-ohrf.onrender.com` in backend environment variables
- Redeploy backend

#### "MongoDB connection timeout"

**Problem**: Backend can't connect to MongoDB
**Cause**: MongoDB URI incorrect or IP not whitelisted
**Solution**:
- Verify `MONGODB_URI` is correct in backend environment variables
- For MongoDB Atlas: Ensure your IP is whitelisted (Settings → Network Access)
- For local MongoDB: Not accessible from Render (use MongoDB Atlas instead)

#### "Cloudinary upload fails in production"

**Problem**: Profile picture upload returns error
**Solution**:
- Verify all Cloudinary credentials in backend environment variables:
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
- Check Cloudinary dashboard for any API key issues

### Debug Tips

1. **Check Network Tab**: Monitor API requests and responses in browser DevTools
2. **Server Logs**: Watch Render logs for error messages: Dashboard → Your Service → Logs
3. **MongoDB**: Use MongoDB Atlas UI to inspect database collections
4. **Cloudinary Logs**: Check Cloudinary dashboard for upload errors
5. **Environment Variables**: Double-check all `.env` and Render environment variables
6. **Socket.IO Debugging**: 
   - Browser Console: Check for connection messages
   - Network Tab → WS: Monitor WebSocket connections
   - Backend Logs: Socket.IO logs connection events

## 🚀 Future Enhancements

### Planned Features

**Real-Time Features**
- Typing indicators (show when user is typing)
- Message reactions (emoji reactions to messages)
- Read receipts (show when messages are read)
- Delivery status (message sent, delivered, read)

**Chat Features**
- Group chat functionality
- Message search and filtering
- Message history export
- Pin important messages
- Message replies/threading

**Media & Sharing**
- File sharing (documents, PDFs)
- Image gallery in chat
- Video message recording
- Voice message support

**Communication**
- Voice call integration (WebRTC)
- Video call integration (WebRTC)
- Screen sharing
- Calling notifications

**User Experience**
- Dark/Light theme toggle
- Custom notification sounds
- Message notifications while app is closed
- User typing status animation
- Message timestamps relative to current time

### Performance Optimizations

- Implement message pagination (load older messages on scroll)
- Add Redis caching layer for frequently accessed data
- Optimize image storage and lazy loading
- Implement rate limiting for API endpoints
- Add database indexing for faster queries
- Implement connection pooling for MongoDB
- Optimize Socket.IO memory usage with namespaces

### Security Enhancements

- Two-factor authentication (2FA)
- End-to-end encryption for messages
- Message encryption at rest in database
- Rate limiting to prevent brute force attacks
- API key rotation mechanism
- Automated security scanning in CI/CD

### Testing

- Unit tests for backend controllers
- Integration tests for API endpoints
- Frontend component tests with Jest
- E2E testing with Cypress
- Load testing for production readiness
- Security penetration testing

- Developer Experience

### Developer Experience

- API documentation with Swagger/OpenAPI
- Postman collection for API testing
- Docker configuration for containerization
- CI/CD pipeline with GitHub Actions
- Pre-commit hooks for code quality
- Comprehensive logging and monitoring
- Error tracking with Sentry

## 📄 License

ISC License

## 👨‍💻 Author

Created by Emmanuel Adekola

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Happy Chatting! 💬**
