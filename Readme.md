[Model link](https://app.eraser.io/workspace/0I1I0s8NSywyYpejjPyb?origin=share)

# VideoTube – Professional Backend API

**VideoTube** is a scalable and feature-rich backend for a video-sharing platform, inspired by services like YouTube. It provides a complete RESTful API for video uploads, user management, subscriptions, social interactions, and comprehensive media handling through cloud integration.

Built with **industry-standard practices**, this backend employs a modular MVC architecture designed for maintainability, scalability, and production-readiness.

---

## 🏗️ Architecture Overview

VideoTube follows a **layered architecture** pattern with clear separation of concerns:

### **📁 Project Structure**

```
src/
├── controllers/     # Business logic & request handling
├── models/         # MongoDB schemas & data models
├── routes/         # API endpoint definitions
├── middlewares/    # Authentication & request processing
├── utils/          # Helper functions & utilities
├── db/             # Database connection configuration
├── app.js          # Express application setup
└── index.js        # Application entry point
```

### **🔄 Request Flow**

1. **Routes** → Define API endpoints and HTTP methods
2. **Middlewares** → Handle authentication, file uploads, and validation
3. **Controllers** → Process business logic and interact with models
4. **Models** → Manage data operations with MongoDB
5. **Utils** → Provide helper functions for responses and error handling

---

## ✅ Key Highlights

- 🛠 **Modular MVC Architecture**: Clear separation of routes, controllers, models, and middlewares
- 🔒 **JWT Authentication**: Secure token-based auth with HTTP-only cookies
- 🌩 **Cloud Media Storage**: Seamless video/image uploads via Cloudinary
- � **Advanced Aggregation**: MongoDB pipelines with custom pagination
- 🛡️ **Security First**: CORS, input validation, and encrypted passwords
- 📁 **Environment Configuration**: Centralized config management via `.env`
- ✨ **Code Formatting**: Consistent styling with Prettier
- 🚀 **Modern JavaScript**: ES6+ modules with async/await patterns

---

## 🚀 Tech Stack

### **Core Technologies**

- **Node.js** (v18+) – JavaScript runtime environment
- **Express.js** (v5+) – Fast, minimalist web framework
- **MongoDB** – NoSQL document database
- **Mongoose** (v8+) – Object Document Mapper (ODM)

### **Authentication & Security**

- **JSON Web Tokens (JWT)** – Stateless authentication
- **bcryptjs** – Password hashing and encryption
- **cookie-parser** – HTTP cookie parsing middleware
- **CORS** – Cross-Origin Resource Sharing configuration

### **File Handling & Storage**

- **Multer** – Multipart form data and file uploads
- **Cloudinary** – Cloud-based media management and optimization

### **Development & Utilities**

- **dotenv** – Environment variable management
- **nodemon** – Development server with auto-restart
- **Prettier** – Code formatting and style consistency
- **mongoose-aggregate-paginate-v2** – Advanced pagination for aggregation queries

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

### **🔧 Technical Features**

- RESTful API design with consistent responses
- Advanced MongoDB aggregation pipelines
- Efficient pagination for large datasets
- Comprehensive error handling and logging
- API versioning and backward compatibility
