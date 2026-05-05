# Atlas - Archived Tracking of Lost and Searched Articles


![Version](https://img.shields.io/badge/version-1.0.0-blue)

A modern, full-stack web application for managing lost and found items on campus.

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Usage Guide](#-usage-guide)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🎯 About

**Atlas** is a comprehensive lost and found management system. It provides a centralized platform where students and staff can report lost items, browse found items, and claim their belongings through a secure verification process.

The platform is built using the **MERN stack** (MongoDB, Express.js, React, Node.js) and features JWT-based authentication, file uploads, and a user-friendly interface with a modern dark theme.

### Problem Statement
Campus communities often struggle with item recovery when belongings are lost. Without a centralized system, lost items remain scattered across various locations, and finders have no efficient way to connect with owners. Atlas solves this by creating a digital lost and found hub.

### Solution
Atlas provides:
- A unified database for all lost and found items
- Secure verification through custom questions
- Intuitive search and filtering
- Personal dashboard for item management
- Seamless claim verification process

---

## ✨ Features

### Authentication & Security
- ✅ User registration with institutional details (SAP ID, branch, year, division)
- ✅ Secure login with JWT tokens (30-day expiration)
- ✅ Password hashing with bcryptjs
- ✅ Protected routes with automatic redirects
- ✅ Session persistence with localStorage

### Item Management
- ✅ Report lost items with details, images, and timestamps
- ✅ Report found items with verification questions
- ✅ Support for multiple item categories (Electronics, Stationery, ID Cards, etc.)
- ✅ Image upload and storage
- ✅ Item status tracking (active/resolved)
- ✅ Edit and delete functionality

### Search & Discovery
- ✅ Real-time search across item titles and descriptions
- ✅ Filter by category
- ✅ Sort items by date (newest first)
- ✅ Browse all active items on campus
- ✅ Detailed item view with reporter contact info

### Claims & Verification
- ✅ Custom verification questions (0-5 per item)
- ✅ Claim submission with answer verification
- ✅ Prevent duplicate claims per user
- ✅ Claim status tracking (pending/approved/rejected)
- ✅ Item owner approval/rejection of claims

### User Dashboard
- ✅ Overview of reported items and received claims
- ✅ "My Items" tab for managing reported items
- ✅ "Received Claims" tab for claim management
- ✅ View claimer details and their answers
- ✅ Quick actions (approve, reject, delete)

### User Interface
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern dark theme with teal and lime accents
- ✅ Multi-step form wizard for reporting
- ✅ Loading states and error handling
- ✅ Smooth transitions and animations
- ✅ Accessibility considerations

---

## 🛠 Tech Stack

### Frontend
- **React** 19.2.5 - UI framework
- **React Router DOM** 7.14.2 - Client-side routing
- **Vite** 8.0.10 - Build tool & dev server
- **Three.js** 0.184.0 - 3D graphics
- **CSS3** - Styling with variables and modern layout

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** 5.2.1 - Web framework
- **MongoDB** 9.6.1 - NoSQL database
- **Mongoose** 9.6.1 - ODM (Object Document Mapper)
- **JWT** 9.0.3 - Authentication tokens
- **bcryptjs** 3.0.3 - Password hashing
- **Multer** 2.1.1 - File uploads
- **CORS** 2.8.6 - Cross-origin requests

### Development Tools
- **Nodemon** 3.1.14 - Auto-restart server on file changes
- **ESLint** 10.2.1 - Code quality
- **Dotenv** 17.4.2 - Environment variables

---

## 📁 Project Structure

```
Atlas/
├── client/                          # Frontend (React)
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── SearchSection.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── Stats.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── RecentItems.jsx
│   │   │   ├── CTASection.jsx
│   │   │   └── ReportCTA.jsx
│   │   ├── pages/                   # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── BrowseItemsPage.jsx
│   │   │   ├── ItemDetailPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── ReportItemPage.jsx
│   │   │   └── ReportFoundPage.jsx
│   │   ├── context/                 # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx                  # Main app with routing
│   │   ├── main.jsx                 # Entry point
│   │   ├── index.css                # Global styles
│   │   ├── App.css                  # App styles
│   │   └── extra.css                # Additional styles
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── server/                          # Backend (Node.js + Express)
│   ├── models/                      # Mongoose schemas
│   │   ├── User.js
│   │   ├── Item.js
│   │   └── Claim.js
│   ├── controllers/                 # Business logic
│   │   ├── authController.js
│   │   ├── itemController.js
│   │   └── claimController.js
│   ├── routes/                      # API routes
│   │   ├── authRoutes.js
│   │   ├── itemRoutes.js
│   │   └── claimRoutes.js
│   ├── middleware/                  # Middleware functions
│   │   └── authMiddleware.js
│   ├── server.js                    # Entry point
│   ├── package.json
│   └── .env                         # Environment variables (not in repo)
│
└── README.md                        # This file
```

---

## 🚀 Installation

### Prerequisites
Before you begin, ensure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (local or MongoDB Atlas) - [Get Started](https://www.mongodb.com/)
- **Git** - [Download](https://git-scm.com/)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/atlas.git
cd atlas
```

### Step 2: Set Up Backend

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your configuration (see Configuration section)

# Verify installation
npm list
```

### Step 3: Set Up Frontend

```bash
cd ../client

# Install dependencies
npm install

# Verify installation
npm list
```

---

## ⚙️ Configuration

### Backend Environment Variables (.env)

Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/atlas
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/atlas

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_random

# CORS Configuration (for frontend)
FRONTEND_URL=http://localhost:5173
```

### Frontend Configuration

Update the API base URL in your fetch calls if deploying to production:

In client files that make API calls, change:
```javascript
// Development
http://localhost:5000/api/...

// Production
https://your-api-domain.com/api/...
```

### Database Setup

**Option 1: Local MongoDB**
```bash
# Install MongoDB Community Edition
# For Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

# Start MongoDB service
mongod
```

**Option 2: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get connection string
5. Add your IP address to whitelist
6. Use connection string in `.env`

---

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Start Frontend Dev Server:**
```bash
cd client
npm run dev
# Frontend runs on http://localhost:5173
```

### Production Build

**Build Frontend:**
```bash
cd client
npm run build
# Creates optimized build in dist/
```

**Start Backend (Production):**
```bash
cd server
npm start
# Ensure NODE_ENV=production in .env
```

### Available Scripts

**Backend:**
```bash
npm run dev      # Start with nodemon (auto-restart)
npm start        # Start production server
npm test         # Run tests
```

**Frontend:**
```bash
npm run dev      # Start dev server
npm run build    # Create production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 📖 Usage Guide

### For End Users

#### 1. Registration
1. Click "Register" on the login page
2. Enter institutional details (SAP ID, email, year, branch, division)
3. Create a secure password
4. Click "Register"
5. Automatically redirected to home page

#### 2. Reporting a Lost Item
1. Click "Report Lost Item" (must be logged in)
2. Fill multi-step form:
   - **Step 1**: Title, description, category
   - **Step 2**: Location details, date/time lost
   - **Step 3**: Contact information
   - **Step 4**: Review and confirm
3. Upload item image
4. Click "Submit"
5. Item appears in Browse Database

#### 3. Reporting a Found Item
1. Click "Report Found Item" (must be logged in)
2. Similar multi-step form as lost items
3. **Additional fields**:
   - Add verification questions (0-5)
   - Select handover preference (meetup/drop point)
   - Provide handover location details
4. Submit and wait for claims

#### 4. Browsing Items
1. Click "Browse Database"
2. Search by keywords or filter by category
3. Click on an item to view details
4. If it's your item, click "Claim This Item"
5. Answer verification questions
6. Submit claim and wait for owner's response

#### 5. Managing Your Items (Dashboard)
1. Click "Dashboard" (must be logged in)
2. View your reported items
3. Check received claims
4. Approve or reject claims
5. Update item status
6. Delete items if needed

### For Administrators (Future Feature)

- Access admin dashboard
- View system statistics
- Moderate items and claims
- Manage user accounts
- Generate reports

---

## 🔌 API Documentation

### Base URL
```
Development: http://localhost:5000
Production: https://your-domain.com
```

### Authentication
All protected endpoints require a Bearer token:
```
Authorization: Bearer <jwt_token>
```

### Auth Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@college.edu",
  "password": "securePassword123",
  "year": "2nd Year",
  "branch": "Computer Science",
  "division": "A",
  "sapid": "SAP123456",
  "rollno": "12345"
}
```

**Response (201):**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@college.edu",
  "sapid": "SAP123456",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@college.edu",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@college.edu",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Item Endpoints

#### Get All Items
```http
GET /api/items
```

**Response (200):**
```json
[
  {
    "_id": "item_id",
    "title": "Blue Backpack",
    "description": "Navy blue backpack with laptop compartment",
    "category": "Bags",
    "type": "lost",
    "location": "Library",
    "status": "active",
    "image": "uploads/1620000000000-backpack.jpg",
    "contactInfo": "john@college.edu",
    "date": "2026-05-04T10:30:00Z"
  }
]
```

#### Get User's Items
```http
GET /api/items/me
Authorization: Bearer <token>
```

#### Create Item
```http
POST /api/items
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form data:
- title: "Blue Backpack"
- description: "Navy blue backpack..."
- category: "Bags"
- type: "lost"
- location: "Library"
- contactInfo: "john@college.edu"
- dateLost: "2026-05-04"
- timeLost: "10:30"
- image: <file>
```

#### Update Item
```http
PUT /api/items/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "resolved",
  "description": "Updated description"
}
```

#### Delete Item
```http
DELETE /api/items/:id
Authorization: Bearer <token>
```

### Claim Endpoints

#### Create Claim
```http
POST /api/claims
Authorization: Bearer <token>
Content-Type: application/json

{
  "itemId": "item_id",
  "answers": ["Navy blue", "Dell", "Has stickers"]
}
```

#### Get Received Claims
```http
GET /api/claims/received
Authorization: Bearer <token>
```

#### Update Claim Status
```http
PUT /api/claims/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "approved"
}
```

---

## 🗄️ Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  year: String,
  branch: String,
  division: String,
  sapid: String (unique),
  rollno: String,
  role: String (enum: ['user', 'admin']),
  createdAt: Date
}
```

### Item Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String,
  type: String (enum: ['lost', 'found']),
  location: String,
  image: String,
  status: String (enum: ['active', 'resolved']),
  contactInfo: String,
  questions: [String],
  handoverPreference: String,
  handoverDetails: String,
  dateLost: String,
  timeLost: String,
  reportedBy: ObjectId (ref: User),
  date: Date
}
```

### Claim Model
```javascript
{
  _id: ObjectId,
  item: ObjectId (ref: Item),
  claimer: ObjectId (ref: User),
  answers: [String],
  status: String (enum: ['pending', 'approved', 'rejected']),
  date: Date
}
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### 1. Fork the Repository
```bash
git clone https://github.com/yourusername/atlas.git
```

### 2. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes
- Follow the existing code style
- Add comments for complex logic
- Update documentation if needed

### 4. Commit Your Changes
```bash
git commit -m "Add description of your changes"
```

### 5. Push to Branch
```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request
- Provide a clear description of changes
- Link any related issues
- Request review from maintainers

### Code Style Guidelines
- Use consistent indentation (2 spaces)
- Use meaningful variable names
- Write comments for complex functions
- Follow React/Node.js best practices

## 💬 Support


### Troubleshooting

**Problem: Server won't start**
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000  # Windows
lsof -i :5000                  # macOS/Linux

# Kill the process or change PORT in .env
```

**Problem: MongoDB connection error**
```bash
# Verify MongoDB is running
# Check connection string in .env
# Ensure IP is whitelisted (for MongoDB Atlas)
```

**Problem: Frontend can't connect to backend**
```bash
# Ensure backend is running on http://localhost:5000
# Check CORS configuration
# Verify API URLs in frontend code
```

**Problem: Images not uploading**
```bash
# Ensure /uploads directory exists
# Check file permissions
# Verify Multer configuration in routes
```


---





<div align="center">

**Made with ❤️ for the amazing community**


</div>