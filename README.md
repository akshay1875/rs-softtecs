# RS Softtecs - IT Training & Placement Institute

A fully dynamic website with Admin Panel for RS Softtecs Pvt Ltd, Pune's #1 IT Training & Placement Institute.

![RS Softtecs](https://img.shields.io/badge/RS%20Softtecs-IT%20Training-purple)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB running locally or MongoDB Atlas account

### 1. Start MongoDB (if local)
```bash
mongod --dbpath /tmp/mongodb-data --fork --logpath /tmp/mongodb.log
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
npm run seed    # Add sample data
npm run dev     # Starts on port 5001
```

### 3. Setup Frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev     # Starts on port 3000
```

### 4. Access Application
| Application | URL |
|-------------|-----|
| Website | http://localhost:3000 |
| Admin Panel | http://localhost:3000/admin/login |
| API | http://localhost:5001/api |

### Default Admin Login
- **Email**: admin@rssofttecs.com
- **Password**: admin123

---

## 📋 Features

### Public Website
- ✅ Homepage with hero, stats, courses, testimonials, reviews
- ✅ Courses listing with filters and detail pages
- ✅ About Us, Services, Team pages
- ✅ Google Reviews display
- ✅ Student Success Stories
- ✅ Contact form with enquiry submission
- ✅ Download Syllabus with lead capture popup
- ✅ Auto popup enquiry form (every 1 minute)

### Admin Panel
- ✅ Secure authentication (JWT)
- ✅ Dashboard with statistics
- ✅ **Courses Management** - Add/Edit/Delete courses
- ✅ **Reviews Management** - Add/Edit/Delete with photo upload
- ✅ **Testimonials Management** - Add/Edit/Delete with photo upload
- ✅ **Enquiries Management** - View, search, mark contacted
- ✅ **Team Management** - Add/Edit/Delete team members
- ✅ Search functionality for reviews and testimonials

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React 18, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Auth | JWT (JSON Web Tokens) |
| Styling | Tailwind CSS |
| Icons | React Icons |

---

## 📁 Project Structure

```
RS Softtecs/
├── backend/           # Express.js API
│   ├── controllers/   # Route handlers
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API routes
│   ├── middleware/    # Auth, error handling
│   └── server.js      # Entry point
│
├── frontend/          # Next.js App
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page routes
│   │   ├── context/     # Auth context
│   │   └── utils/       # API utilities
│   └── public/          # Static files
│
├── README.md          # This file
└── DOCUMENTATION.md   # Detailed documentation
```

---

## 🔌 API Endpoints

### Public Endpoints
```
GET  /api/courses          # All courses
GET  /api/courses/:id      # Single course
GET  /api/reviews          # All reviews
GET  /api/testimonials     # All testimonials
GET  /api/team             # All team members
POST /api/enquiries        # Submit enquiry
```

### Admin Endpoints (Protected)
```
POST /api/auth/login       # Admin login
POST /api/courses          # Create course
PUT  /api/courses/:id      # Update course
DELETE /api/courses/:id    # Delete course
# ... similar for reviews, testimonials, team
```

---

## 🌍 Deployment

### Recommended Stack (All Free Tiers)
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

See `DOCUMENTATION.md` for detailed deployment instructions.

---

## 📝 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/rs-softtecs
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
PORT=5001
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

---

## 🎨 Brand Colors

- **Primary**: Purple (#7c3aed)
- **Accent**: Yellow/Gold (#eab308)
- **Background**: White, Gray shades

---

## 📄 Adding Syllabus PDF

Place your syllabus PDF at:
```
frontend/public/downloads/RS-Softtecs-Syllabus.pdf
```

---

## 📞 Key Flows

### Lead Capture Flow
1. User clicks "Download Syllabus"
2. Popup opens with Name & Phone fields
3. User submits form
4. Enquiry saved to database
5. PDF downloads automatically
6. Admin can view in Enquiries section

### Auto Popup Flow
1. User visits website
2. After 1 minute, popup appears
3. User can submit or dismiss
4. Won't show again for 1 hour if dismissed
5. Won't show again after successful submission

---

## 📚 Full Documentation

For complete documentation including:
- Database schemas
- All API endpoints
- Authentication flow
- Deployment guide

See **[DOCUMENTATION.md](./DOCUMENTATION.md)**

---

## 🔒 Security Notes

- Passwords are hashed using bcryptjs
- JWT tokens expire in 7 days
- Protected routes require valid token
- CORS configured for frontend domain only

---

**Developed for RS Softtecs Pvt Ltd, Pune**

*Established 2011 | 5000+ Students Placed | 200+ Hiring Partners*
