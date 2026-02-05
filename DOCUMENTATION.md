# RS Softtecs - Complete Project Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [Frontend Pages](#frontend-pages)
7. [Admin Panel](#admin-panel)
8. [Authentication Flow](#authentication-flow)
9. [Key Features](#key-features)
10. [Installation & Setup](#installation--setup)
11. [Deployment Guide](#deployment-guide)
12. [Environment Variables](#environment-variables)

---

## 🎯 Project Overview

**RS Softtecs Pvt Ltd** is a fully dynamic website with an Admin Panel for an IT Training & Placement Institute located in Pune, India.

### Key Highlights:
- Established in 2011
- #1 IT Training & Placement Institute in Pune
- 5000+ Students Placed
- 200+ Hiring Partners
- 25+ Courses Offered

### Project Goals:
- Dynamic content management through Admin Panel
- Real-time updates on website from admin changes
- Lead capture through enquiry forms and download popups
- Showcase courses, reviews, testimonials, and team members

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database (NoSQL) |
| Mongoose | ODM for MongoDB |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| express-validator | Input validation |
| cors | Cross-origin resource sharing |
| dotenv | Environment variables |
| nodemon | Development server |

### Frontend
| Technology | Purpose |
|------------|---------|
| Next.js 14 | React framework |
| React 18 | UI library |
| Tailwind CSS | Styling |
| Axios | HTTP client |
| js-cookie | Cookie management |
| react-hot-toast | Notifications |
| react-icons | Icon library |
| Framer Motion | Animations |

### Database
| Service | Purpose |
|---------|---------|
| MongoDB | Primary database |
| MongoDB Atlas | Cloud hosting (production) |

---

## 📁 Project Structure

```
RS Softtecs/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── courseController.js   # Courses CRUD
│   │   ├── reviewController.js   # Reviews CRUD
│   │   ├── testimonialController.js  # Testimonials CRUD
│   │   ├── enquiryController.js  # Enquiries management
│   │   ├── teamController.js     # Team members CRUD
│   │   └── settingsController.js # Site settings
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   ├── errorHandler.js      # Global error handling
│   │   └── upload.js            # File upload config
│   ├── models/
│   │   ├── User.js              # Admin users
│   │   ├── Course.js            # Courses
│   │   ├── GoogleReview.js      # Google reviews
│   │   ├── Testimonial.js       # Student testimonials
│   │   ├── Enquiry.js           # Contact enquiries
│   │   ├── TeamMember.js        # Team members
│   │   └── SiteSettings.js      # Global settings
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   ├── courses.js           # Course routes
│   │   ├── reviews.js           # Review routes
│   │   ├── testimonials.js      # Testimonial routes
│   │   ├── enquiries.js         # Enquiry routes
│   │   ├── team.js              # Team routes
│   │   └── settings.js          # Settings routes
│   ├── utils/
│   │   └── seed.js              # Database seeder
│   ├── .env                     # Environment variables
│   ├── package.json
│   └── server.js                # Entry point
│
├── frontend/
│   ├── public/
│   │   └── downloads/           # Downloadable files (PDFs)
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   └── AdminLayout.js    # Admin panel layout
│   │   │   ├── layout/
│   │   │   │   ├── Layout.js         # Public site layout
│   │   │   │   ├── Navbar.js         # Navigation bar
│   │   │   │   └── Footer.js         # Footer
│   │   │   └── ui/
│   │   │       ├── CourseCard.js     # Course display card
│   │   │       ├── ReviewCard.js     # Review display card
│   │   │       ├── TestimonialCard.js # Testimonial card
│   │   │       ├── TeamCard.js       # Team member card
│   │   │       ├── LoadingSpinner.js # Loading states
│   │   │       └── EnquiryPopup.js   # Popup form
│   │   ├── context/
│   │   │   └── AuthContext.js        # Authentication state
│   │   ├── pages/
│   │   │   ├── admin/               # Admin panel pages
│   │   │   │   ├── index.js         # Dashboard
│   │   │   │   ├── login.js         # Admin login
│   │   │   │   ├── courses/
│   │   │   │   │   ├── index.js     # List courses
│   │   │   │   │   └── new.js       # Add course
│   │   │   │   ├── reviews/
│   │   │   │   │   ├── index.js     # List reviews
│   │   │   │   │   ├── new.js       # Add review
│   │   │   │   │   └── [id].js      # Edit review
│   │   │   │   ├── testimonials/
│   │   │   │   │   ├── index.js     # List testimonials
│   │   │   │   │   ├── new.js       # Add testimonial
│   │   │   │   │   └── [id].js      # Edit testimonial
│   │   │   │   ├── enquiries/
│   │   │   │   │   └── index.js     # View enquiries
│   │   │   │   └── team/
│   │   │   │       └── index.js     # Manage team
│   │   │   ├── courses/
│   │   │   │   ├── index.js         # All courses
│   │   │   │   └── [slug].js        # Course details
│   │   │   ├── index.js             # Homepage
│   │   │   ├── about.js             # About us
│   │   │   ├── services.js          # Services
│   │   │   ├── team.js              # Team page
│   │   │   ├── reviews.js           # Google reviews
│   │   │   ├── testimonials.js      # Success stories
│   │   │   ├── contact.js           # Contact form
│   │   │   ├── _app.js              # App wrapper
│   │   │   └── _document.js         # Document wrapper
│   │   ├── styles/
│   │   │   └── globals.css          # Global styles
│   │   └── utils/
│   │       └── api.js               # API configuration
│   ├── .env.local                   # Environment variables
│   ├── jsconfig.json               # Path aliases
│   ├── next.config.js              # Next.js config
│   ├── tailwind.config.js          # Tailwind config
│   └── package.json
│
├── README.md
└── DOCUMENTATION.md                 # This file
```

---

## 🗄 Database Schema

### 1. User (Admin)
```javascript
{
  name: String,           // Required
  email: String,          // Required, Unique
  password: String,       // Required, Hashed
  role: String,           // 'admin' | 'super-admin'
  isActive: Boolean,      // Default: true
  createdAt: Date
}
```

### 2. Course
```javascript
{
  name: String,           // Required
  slug: String,           // Auto-generated
  duration: String,       // e.g., "3 months"
  description: String,    // Rich text
  shortDescription: String,
  syllabus: [{
    title: String,
    topics: [String]
  }],
  image: String,
  icon: String,
  category: String,       // 'programming' | 'web' | 'database' | 'cloud' | 'testing' | 'other'
  level: String,          // 'beginner' | 'intermediate' | 'advanced'
  price: Number,
  discountPrice: Number,
  features: [String],
  prerequisites: [String],
  status: String,         // 'active' | 'inactive'
  isFeatured: Boolean,
  studentsEnrolled: Number,
  rating: Number,
  createdAt: Date
}
```

### 3. GoogleReview
```javascript
{
  reviewerName: String,   // Required
  rating: Number,         // 1-5
  reviewMessage: String,  // Required
  reviewerPhoto: String,  // Base64 image
  reviewDate: Date,
  isVerified: Boolean,
  status: String,         // 'active' | 'inactive'
  displayOrder: Number,
  createdAt: Date
}
```

### 4. Testimonial
```javascript
{
  studentName: String,    // Required
  studentPhoto: String,   // Base64 image
  testimonialText: String, // Required
  courseTaken: String,
  companyPlaced: String,
  designation: String,
  package: String,        // e.g., "5 LPA"
  batchYear: String,
  linkedinUrl: String,
  rating: Number,         // 1-5
  status: String,         // 'active' | 'inactive'
  isFeatured: Boolean,
  displayOrder: Number,
  createdAt: Date
}
```

### 5. Enquiry
```javascript
{
  name: String,           // Required
  email: String,          // Required
  phone: String,          // Required
  courseInterested: String,
  message: String,
  source: String,         // 'website' | 'popup' | 'syllabus_download'
  status: String,         // 'new' | 'contacted' | 'converted' | 'closed'
  notes: String,
  contactedBy: ObjectId,  // Reference to User
  contactedAt: Date,
  createdAt: Date
}
```

### 6. TeamMember
```javascript
{
  name: String,           // Required
  designation: String,    // Required
  role: String,           // 'founder' | 'management' | 'trainer' | 'staff'
  photo: String,
  bio: String,
  expertise: [String],
  experience: String,
  qualifications: [String],
  socialLinks: {
    linkedin: String,
    twitter: String,
    email: String
  },
  status: String,         // 'active' | 'inactive'
  displayOrder: Number,
  createdAt: Date
}
```

### 7. SiteSettings
```javascript
{
  companyName: String,
  tagline: String,
  logo: String,
  contact: {
    phone: [String],
    email: [String],
    address: String,
    mapUrl: String
  },
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String,
    youtube: String
  },
  stats: {
    studentsPlaced: Number,
    yearsExperience: Number,
    coursesOffered: Number,
    hiringPartners: Number
  },
  aboutUs: {
    shortDescription: String,
    fullDescription: String,
    mission: String,
    vision: String,
    founderMessage: String
  },
  workingHours: {
    weekdays: String,
    saturday: String,
    sunday: String
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  }
}
```

---

## 🔌 API Endpoints

### Base URL
- **Development**: `http://localhost:5001/api`
- **Production**: `https://your-api-domain.com/api`

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/auth/login` | Admin login | Public |
| GET | `/auth/me` | Get current user | Private |
| PUT | `/auth/updateprofile` | Update profile | Private |
| PUT | `/auth/updatepassword` | Update password | Private |
| GET | `/auth/logout` | Logout | Private |

### Courses
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/courses` | Get all courses | Public |
| GET | `/courses/:id` | Get single course | Public |
| POST | `/courses` | Create course | Admin |
| PUT | `/courses/:id` | Update course | Admin |
| DELETE | `/courses/:id` | Delete course | Admin |
| PUT | `/courses/:id/status` | Toggle status | Admin |

### Reviews
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/reviews` | Get all reviews | Public |
| GET | `/reviews/:id` | Get single review | Public |
| POST | `/reviews` | Create review | Admin |
| PUT | `/reviews/:id` | Update review | Admin |
| DELETE | `/reviews/:id` | Delete review | Admin |
| PUT | `/reviews/:id/status` | Toggle status | Admin |

### Testimonials
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/testimonials` | Get all testimonials | Public |
| GET | `/testimonials/:id` | Get single testimonial | Public |
| POST | `/testimonials` | Create testimonial | Admin |
| PUT | `/testimonials/:id` | Update testimonial | Admin |
| DELETE | `/testimonials/:id` | Delete testimonial | Admin |
| PUT | `/testimonials/:id/status` | Toggle status | Admin |
| PUT | `/testimonials/:id/featured` | Toggle featured | Admin |

### Enquiries
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/enquiries` | Get all enquiries | Admin |
| GET | `/enquiries/:id` | Get single enquiry | Admin |
| POST | `/enquiries` | Create enquiry | Public |
| PUT | `/enquiries/:id` | Update enquiry | Admin |
| DELETE | `/enquiries/:id` | Delete enquiry | Admin |
| PUT | `/enquiries/:id/contacted` | Mark contacted | Admin |
| GET | `/enquiries/stats` | Get statistics | Admin |

### Team
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/team` | Get all members | Public |
| GET | `/team/:id` | Get single member | Public |
| POST | `/team` | Create member | Admin |
| PUT | `/team/:id` | Update member | Admin |
| DELETE | `/team/:id` | Delete member | Admin |
| PUT | `/team/:id/status` | Toggle status | Admin |

### Settings
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/settings` | Get site settings | Public |
| PUT | `/settings` | Update settings | Admin |

---

## 🌐 Frontend Pages

### Public Website

| Page | URL | Description |
|------|-----|-------------|
| Homepage | `/` | Hero, courses, testimonials, reviews, CTA |
| Courses | `/courses` | All courses with filters |
| Course Detail | `/courses/[slug]` | Single course details |
| About Us | `/about` | Company story, mission, vision |
| Services | `/services` | Training services offered |
| Team | `/team` | Team members |
| Reviews | `/reviews` | All Google reviews |
| Testimonials | `/testimonials` | All success stories |
| Contact | `/contact` | Contact form, map |

### Admin Panel

| Page | URL | Description |
|------|-----|-------------|
| Login | `/admin/login` | Admin authentication |
| Dashboard | `/admin` | Overview statistics |
| Courses | `/admin/courses` | Manage courses |
| Add Course | `/admin/courses/new` | Create new course |
| Reviews | `/admin/reviews` | Manage reviews |
| Add Review | `/admin/reviews/new` | Create new review |
| Edit Review | `/admin/reviews/[id]` | Edit existing review |
| Testimonials | `/admin/testimonials` | Manage testimonials |
| Add Testimonial | `/admin/testimonials/new` | Create new testimonial |
| Edit Testimonial | `/admin/testimonials/[id]` | Edit testimonial |
| Enquiries | `/admin/enquiries` | View/manage enquiries |
| Team | `/admin/team` | Manage team members |

---

## 🔐 Authentication Flow

```
┌──────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION FLOW                       │
└──────────────────────────────────────────────────────────────┘

1. LOGIN
   ┌─────────┐    POST /auth/login     ┌─────────┐
   │  Admin  │ ───────────────────────▶│ Backend │
   │  Panel  │  {email, password}      │   API   │
   └─────────┘                         └────┬────┘
                                            │
                                            ▼
                                    ┌───────────────┐
                                    │   Validate    │
                                    │  Credentials  │
                                    └───────┬───────┘
                                            │
                              ┌─────────────┴─────────────┐
                              │                           │
                              ▼                           ▼
                        ┌──────────┐               ┌──────────┐
                        │  Valid   │               │ Invalid  │
                        └────┬─────┘               └────┬─────┘
                             │                          │
                             ▼                          ▼
                     Generate JWT Token          Return Error
                             │
                             ▼
   ┌─────────┐    {token, user}        ┌─────────┐
   │  Admin  │ ◀───────────────────────│ Backend │
   │  Panel  │                         │   API   │
   └─────────┘                         └─────────┘
        │
        ▼
   Store token in Cookie

2. PROTECTED ROUTES
   ┌─────────┐    GET /api/...         ┌─────────┐
   │  Admin  │ ───────────────────────▶│ Backend │
   │  Panel  │  Authorization: Bearer  │   API   │
   └─────────┘      <token>            └────┬────┘
                                            │
                                            ▼
                                    ┌───────────────┐
                                    │ Verify Token  │
                                    │  (Middleware) │
                                    └───────┬───────┘
                                            │
                              ┌─────────────┴─────────────┐
                              │                           │
                              ▼                           ▼
                        ┌──────────┐               ┌──────────┐
                        │  Valid   │               │ Invalid  │
                        └────┬─────┘               └────┬─────┘
                             │                          │
                             ▼                          ▼
                      Process Request            401 Unauthorized
                             │                   Redirect to Login
                             ▼
                      Return Response
```

---

## ⭐ Key Features

### 1. Download Syllabus with Lead Capture
```
User clicks "Download Syllabus"
           │
           ▼
    ┌─────────────┐
    │   Popup     │
    │   Opens     │
    └──────┬──────┘
           │
           ▼
    Fill Name & Phone (required)
           │
           ▼
    Submit Enquiry
           │
           ▼
    ┌─────────────┐
    │  Enquiry    │
    │  Saved to   │
    │  Database   │
    └──────┬──────┘
           │
           ▼
    PDF Downloads Automatically
```

### 2. Auto Popup Enquiry Form
- Popup appears every **1 minute** for new visitors
- Won't show again for **1 hour** after dismissal
- Won't show again after successful submission
- Captures leads for follow-up

### 3. Photo Upload
- Reviews and Testimonials support photo uploads
- Images stored as Base64 in database
- Max file size: 2MB
- Supported formats: JPG, PNG

### 4. Search Functionality
- Admin can search reviews by name/message
- Admin can search testimonials by name/company/course

### 5. Dynamic Content
All content is managed through Admin Panel:
- Courses (Add/Edit/Delete)
- Reviews (Add/Edit/Delete with photos)
- Testimonials (Add/Edit/Delete with photos)
- Enquiries (View/Mark Contacted)
- Team Members (Add/Edit/Delete)

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone/Navigate to Project
```bash
cd "/Users/akshay/RS Softtecs"
```

### Step 2: Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your values
# MONGODB_URI=mongodb://localhost:27017/rs-softtecs
# JWT_SECRET=your-secret-key
# JWT_EXPIRE=7d
# PORT=5001
# FRONTEND_URL=http://localhost:3000

# Seed database with sample data
npm run seed

# Start backend server
npm run dev
```

### Step 3: Frontend Setup
```bash
# Navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local

# Edit .env.local
# NEXT_PUBLIC_API_URL=http://localhost:5001/api

# Start frontend server
npm run dev
```

### Step 4: Access Application
- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login
- **API**: http://localhost:5001/api

### Default Admin Credentials
- **Email**: admin@rssofttecs.com
- **Password**: admin123

---

## 🌍 Deployment Guide

### Architecture
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   Frontend      │────▶│   Backend       │────▶│   MongoDB       │
│   (Vercel)      │     │   (Render)      │     │   (Atlas)       │
│                 │     │                 │     │                 │
│ Next.js App     │     │ Express API     │     │ Cloud Database  │
│ Free Hosting    │     │ Free Hosting    │     │ Free 512MB      │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Step 1: MongoDB Atlas Setup
1. Go to https://www.mongodb.com/atlas
2. Create free account
3. Create new cluster (free tier)
4. Create database user
5. Whitelist IP (0.0.0.0/0 for all)
6. Get connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/rs-softtecs
   ```

### Step 2: Deploy Backend (Render)
1. Push code to GitHub
2. Go to https://render.com
3. Create new Web Service
4. Connect GitHub repository
5. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your-production-secret
   JWT_EXPIRE=7d
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

### Step 3: Deploy Frontend (Vercel)
1. Go to https://vercel.com
2. Import GitHub repository
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework**: Next.js
4. Add Environment Variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
   ```

### Step 4: Add Syllabus PDF
Upload your syllabus PDF to:
```
frontend/public/downloads/RS-Softtecs-Syllabus.pdf
```

---

## ⚙️ Environment Variables

### Backend (.env)
```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/rs-softtecs

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Server Configuration
PORT=5001
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
# API URL
NEXT_PUBLIC_API_URL=http://localhost:5001/api

# Site URL (for SEO)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🎨 Brand Colors

```css
/* Primary - Purple */
--primary-50: #f5f3ff
--primary-500: #8b5cf6
--primary-600: #7c3aed
--primary-700: #6d28d9
--primary-800: #5b21b6
--primary-900: #4c1d95

/* Accent - Yellow/Gold */
--accent-400: #facc15
--accent-500: #eab308
--accent-600: #ca8a04

/* Neutral */
--white: #ffffff
--gray-50 to --gray-900
```

---

## 📞 Support

For any issues or questions regarding this project:

1. Check this documentation
2. Review the code comments
3. Check browser console for errors
4. Check backend terminal for API errors

---

## 📝 License

This project is proprietary software developed for RS Softtecs Pvt Ltd.

---

**Last Updated**: February 2026
**Version**: 1.0.0
