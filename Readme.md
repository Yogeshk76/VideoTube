# VideoTube - YouTube Clone

A full-stack video sharing platform built with React, TypeScript, Node.js, and MongoDB. This project replicates core YouTube features including user authentication, video upload/playback, comments, likes, subscriptions, and more.

## 🚀 Features

### ✅ Completed
- **Authentication System**: Login/Signup with JWT tokens
- **User Management**: User profiles, avatars, cover images
- **Video Management**: Upload, view, and manage videos
- **Backend API**: Complete RESTful API with Express.js
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Cloudinary integration for media storage
- **State Management**: Redux Toolkit for frontend state
- **Routing**: React Router with protected routes
- **UI Components**: Reusable component library
- **Responsive Design**: Mobile-friendly interface

### 🚧 In Progress
- **Video Player**: Custom video player component
- **Comments System**: Add/view video comments
- **Like/Dislike**: Video interaction features
- **Subscriptions**: Follow channels
- **Playlists**: Create and manage video playlists
- **Search**: Video search functionality
- **Admin Panel**: Content moderation tools

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for build tooling
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **React Hook Form** for form handling
- **Axios** for API communication

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Multer** for file uploads
- **Cloudinary** for media storage
- **bcryptjs** for password hashing

## 📁 Project Structure

```
videotube/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── features/       # Redux slices
│   │   ├── layouts/        # Layout components
│   │   ├── pages/          # Page components
│   │   ├── routes/         # Routing configuration
│   │   ├── store/          # Redux store setup
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Express middlewares
│   │   └── utils/          # Utility functions
│   └── package.json
└── package.json           # Root package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for media storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd videotube
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Environment Setup**

   Create `.env` file in the server directory:
   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   CORS_ORIGIN=http://localhost:5173
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start both:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:8000

## 📱 Current Status

### ✅ What's Working
- **Authentication**: Complete login/signup system
- **Layout**: YouTube-like header and sidebar
- **Video Grid**: Home page with video cards
- **Video Detail**: Individual video pages
- **Routing**: All routes configured and working
- **Backend API**: All endpoints implemented

### 🚧 Next Steps (Priority Order)

1. **Connect Frontend to Backend**
   - Replace mock data with actual API calls
   - Implement video fetching from backend
   - Add real authentication flow

2. **Video Upload Feature**
   - Create upload form component
   - Implement file upload to Cloudinary
   - Add progress indicators

3. **Video Player**
   - Build custom video player component
   - Add playback controls
   - Implement video progress tracking

4. **Comments System**
   - Create comment components
   - Implement comment CRUD operations
   - Add real-time updates

5. **Like/Dislike System**
   - Add like/dislike buttons
   - Implement interaction tracking
   - Update video statistics

6. **Search Functionality**
   - Implement search API
   - Create search results page
   - Add filters and sorting

7. **Channel Pages**
   - Build channel profile pages
   - Add subscription functionality
   - Implement channel video lists

8. **Playlists**
   - Create playlist management
   - Add videos to playlists
   - Build playlist viewer

## 🎨 Design System

The project uses a YouTube-inspired design with:
- **Dark Theme**: Gray-900 background with white text
- **Red Accent**: VideoTube branding color (#ff0000)
- **Responsive Grid**: Adaptive video grid layout
- **Hover Effects**: Smooth transitions and interactions
- **Typography**: Clean, readable font hierarchy

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start both client and server
npm run dev:client       # Start only frontend
npm run dev:server       # Start only backend

# Build
npm run build           # Build frontend for production

# Installation
npm run install:all     # Install all dependencies
```

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Tailwind**: Utility-first CSS framework

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- YouTube for design inspiration
- React and Node.js communities
- Tailwind CSS for styling utilities
- MongoDB for database solution

---

**Note**: This is a learning project. Some features may be simplified versions of the real YouTube platform.
