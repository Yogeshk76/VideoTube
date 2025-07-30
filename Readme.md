[Model link](https://app.eraser.io/workspace/0I1I0s8NSywyYpejjPyb?origin=share)

# VideoTube – Full-Stack Video Sharing Platform

**VideoTube** is a scalable and feature-rich full-stack application for video sharing, inspired by platforms like YouTube. It consists of a robust **Node.js backend API** and a modern **React frontend**, providing complete video upload, user management, subscriptions, and social interaction features with cloud media integration.

Built with **industry-standard practices**, this platform employs modular architecture patterns designed for maintainability, scalability, and production-readiness.

---

## 🏗️ Architecture Overview

VideoTube follows a **full-stack layered architecture** with clear separation between frontend and backend:

### **📁 Project Structure**

```
videotube/
├── backend/                    # Node.js API Server
│   ├── src/
│   │   ├── controllers/       # Business logic & request handling
│   │   ├── models/           # MongoDB schemas & data models
│   │   ├── routes/           # API endpoint definitions
│   │   ├── middlewares/      # Authentication & request processing
│   │   ├── utils/            # Helper functions & utilities
│   │   ├── db/               # Database connection configuration
│   │   ├── app.js            # Express application setup
│   │   └── index.js          # Application entry point
│   └── package.json
└── client/                     # React Frontend Application
    ├── src/
    │   ├── components/        # Reusable UI components
    │   ├── pages/             # Page-level components
    │   ├── layouts/           # Layout wrapper components
    │   ├── features/          # Feature-based modules
    │   ├── store/             # Redux state management
    │   ├── api/               # API integration layer
    │   ├── routes/            # Frontend routing configuration
    │   ├── types/             # TypeScript type definitions
    │   ├── utils/             # Frontend utility functions
    │   └── assets/            # Static assets (images, icons)
    └── package.json
```

### **🔄 Request Flow**

**Backend (API Layer):**

1. **Routes** → Define API endpoints and HTTP methods
2. **Middlewares** → Handle authentication, file uploads, and validation
3. **Controllers** → Process business logic and interact with models
4. **Models** → Manage data operations with MongoDB
5. **Utils** → Provide helper functions for responses and error handling

**Frontend (Client Layer):**

1. **Pages** → User interface components and layouts
2. **API Layer** → HTTP requests to backend services
3. **Store** → Global state management with Redux
4. **Components** → Reusable UI elements and features
5. **Utils** → Client-side helper functions and utilities

---

## ✅ Key Highlights

### **🖥️ Backend Features**

- 🛠 **Modular MVC Architecture**: Clear separation of routes, controllers, models, and middlewares
- 🔒 **JWT Authentication**: Secure token-based auth with HTTP-only cookies
- 🌩 **Cloud Media Storage**: Seamless video/image uploads via Cloudinary
- 📊 **Advanced Aggregation**: MongoDB pipelines with custom pagination
- 🛡️ **Security First**: CORS, input validation, and encrypted passwords
- 📁 **Environment Configuration**: Centralized config management via `.env`
- 🚀 **Modern JavaScript**: ES6+ modules with async/await patterns

### **⚛️ Frontend Features**

- 🎨 **Modern React**: React 19+ with functional components and hooks
- 📱 **Responsive Design**: TailwindCSS for mobile-first responsive layouts
- 🔄 **State Management**: Redux Toolkit for predictable state updates
- 🛣️ **Client-side Routing**: React Router DOM for SPA navigation
- � **Form Handling**: React Hook Form with Zod validation
- 🎯 **TypeScript**: Type-safe development with full TypeScript support
- ⚡ **Fast Build Tools**: Vite for lightning-fast development and builds
- ✨ **Code Quality**: ESLint and Prettier for consistent code formatting

---

## 🚀 Tech Stack

### **🖥️ Backend Technologies**

**Core Technologies**

- **Node.js** (v18+) – JavaScript runtime environment
- **Express.js** (v5+) – Fast, minimalist web framework
- **MongoDB** – NoSQL document database
- **Mongoose** (v8+) – Object Document Mapper (ODM)

**Authentication & Security**

- **JSON Web Tokens (JWT)** – Stateless authentication
- **bcryptjs** – Password hashing and encryption
- **cookie-parser** – HTTP cookie parsing middleware
- **CORS** – Cross-Origin Resource Sharing configuration

**File Handling & Storage**

- **Multer** – Multipart form data and file uploads
- **Cloudinary** – Cloud-based media management and optimization

**Development & Utilities**

- **dotenv** – Environment variable management
- **nodemon** – Development server with auto-restart
- **Prettier** – Code formatting and style consistency
- **mongoose-aggregate-paginate-v2** – Advanced pagination for aggregation queries

### **⚛️ Frontend Technologies**

**Core Technologies**

- **React** (v19+) – Modern UI library with hooks
- **TypeScript** (v5.8+) – Type-safe JavaScript development
- **Vite** (v6+) – Next-generation frontend build tool
- **React DOM** (v19+) – React rendering for web browsers

**State Management & Routing**

- **Redux Toolkit** (v2.8+) – Predictable state container
- **React Redux** (v9.2+) – Official React bindings for Redux
- **React Router DOM** (v7.7+) – Declarative routing for React

**Styling & UI**

- **TailwindCSS** (v4.1+) – Utility-first CSS framework
- **@tailwindcss/vite** – Vite integration for TailwindCSS

**Form Handling & Validation**

- **React Hook Form** (v7.60+) – Performant forms with easy validation
- **@hookform/resolvers** (v5.1+) – Validation resolvers for React Hook Form
- **Zod** (v4.0+) – TypeScript-first schema validation

**HTTP & API Integration**

- **Axios** (v1.10+) – Promise-based HTTP client

**Development Tools**

- **ESLint** (v9.25+) – Linting and code quality
- **TypeScript ESLint** (v8.30+) – TypeScript-specific linting rules
- **@vitejs/plugin-react** (v4.4+) – React support for Vite

---

## 🧩 Core Features

### **👤 User Management**

- User registration with email verification
- Secure login/logout with JWT tokens
- Password hashing using bcrypt
- Profile management with avatar uploads
- Account settings and preferences

### **🎥 Video Operations**

- Video upload with metadata extraction
- Thumbnail generation and management
- Video streaming and quality optimization
- View counting and analytics
- Video search and filtering

### **💬 Social Features**

- Comment system with nested replies
- Like/dislike functionality for videos and comments
- User subscriptions and notifications
- Tweet-like posts and social interactions
- Playlist creation and management

### **� Analytics & Dashboard**

- Channel statistics and metrics
- Video performance analytics
- User engagement tracking
- Admin dashboard for system management
- Real-time data visualization

### **�🔧 Technical Features**

- RESTful API design with consistent responses
- Advanced MongoDB aggregation pipelines
- Efficient pagination for large datasets
- Comprehensive error handling and logging
- API versioning and backward compatibility

---

## 🎨 Frontend Pages & Components

### **🔐 Authentication Pages**

- **Login Page** - User authentication with form validation
- **Register Page** - New user registration with email verification

### **📺 Video Management**

- **All Videos Page** - Browse and search platform videos
- **Video Detail Page** - Individual video player with comments and interactions
- **My Videos Page** - Personal video management and upload

### **👤 Channel Management**

- **Channel Layout** - Public channel page wrapper
- **Channel Videos** - Display channel's video collection
- **Channel Playlists** - Show channel's public playlists
- **Channel Subscribers** - Channel subscriber management
- **Channel Tweets** - Social posts and updates

### **🎯 Personal Dashboard**

- **My Channel Layout** - Personal channel management interface
- **My Playlists** - Create and manage personal playlists
- **My Tweets** - Social media-style posts management

### **📋 Playlist Features**

- **Playlist Details Page** - Individual playlist management
- **Playlist Video Page** - Video player within playlist context

### **⚙️ Settings & Configuration**

- **Change Password** - Secure password update form
- **Edit Personal Info** - Profile information editor
- **Edit Channel Info** - Channel details and branding

### **👑 Admin Features**

- **Admin Dashboard** - System-wide administrative controls
- **Admin Modals** - Administrative action dialogs

### **📄 Legal & Policy**

- **Privacy Policy** - Platform privacy documentation
- **Terms & Conditions** - User agreement and platform rules

---

## 📊 Project Statistics

### **🖥️ Backend**

- **Total Files:** 41 project files
- **JavaScript Files:** 32 files
- **Controllers:** 9 files
- **Models:** 7 files
- **Routes:** 9 files
- **Middlewares:** 2 files
- **Utilities:** 4 files

### **⚛️ Frontend**

- **Total Files:** 65+ TypeScript/React files
- **Pages:** 23+ page components
- **Feature Directories:** 11 main sections
- **Reusable Components:** Multiple UI components
- **Type Definitions:** Full TypeScript coverage
- **Build Tool:** Vite with optimized bundling

---

## 🚀 Getting Started

### **Prerequisites**

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for media storage)

### **Backend Setup**

```bash
# Install backend dependencies
npm install

# Create environment file
cp .env.example .env

# Configure your environment variables in .env
# MONGO_URI=mongodb://localhost:27017/videotube
# JWT_SECRET=your_jwt_secret
# CLOUDINARY_CLOUD_NAME=your_cloudinary_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret

# Start development server
npm run dev
```

### **Frontend Setup**

```bash
# Navigate to client directory
cd client

# Install frontend dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### **Full-Stack Development**

1. Start the backend server (default: `http://localhost:8000`)
2. Start the frontend development server (default: `http://localhost:5173`)
3. The frontend will proxy API requests to the backend automatically

---

## 🛠️ Development Scripts

### **Backend Scripts**

- `npm run dev` - Start development server with nodemon
- `npm run start` - Start production server

### **Frontend Scripts**

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run build:prod` - Build with production optimizations
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

---

## 🏗️ Architecture Patterns

### **Backend Architecture**

- **MVC Pattern** - Model-View-Controller separation
- **Middleware Pipeline** - Request processing chain
- **Repository Pattern** - Data access abstraction
- **Error Handling** - Centralized error management

### **Frontend Architecture**

- **Component-Based** - Reusable React components
- **Feature-Based Structure** - Organized by functionality
- **Container-Presenter** - Separation of logic and presentation
- **State Management** - Redux for global state
- **Type Safety** - Full TypeScript implementation
