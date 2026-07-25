<div align="center">

# 🎓 Skill Grid

### *Learn. Teach. Grow.*

**A full-stack Learning Management System connecting students & educators**

![MERN](https://img.shields.io/badge/Stack-MERN-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Status](https://img.shields.io/badge/Status-In%20Development-yellow?style=for-the-badge)

</div>

---

Skill Grid is a full-stack Learning Management System (LMS) that connects **🧑‍🎓 students** and **🧑‍🏫 educators**. Educators can create and sell courses, students can discover and purchase them, and everyone gets a modern, responsive learning experience — with an 🤖 AI-powered course search and (in progress) a 📝 notes feature.

---

## ✨ Features

| | Feature | Description |
|---|---|---|
| 🔐 | **Authentication** | Sign up / login for both students and educators (JWT-based, with Google auth support via Firebase) |
| 🛒 | **Course Marketplace** | Educators create, edit, and publish courses made up of lectures; students browse, search, and purchase them |
| 💳 | **Payments** | Secure checkout flow for course purchases |
| 🎥 | **Lectures & Video Content** | Upload and stream lecture videos (Cloudinary-powered media storage) |
| ⭐ | **Reviews & Ratings** | Students can review purchased courses; ratings are shown on course cards |
| 🤖 | **AI-Powered Search** | Ask natural-language questions to find the right course (`SearchWithAi`), backed by an AI controller/route on the backend |
| 📊 | **Creator Dashboard** | Educators manage their own courses, lectures, and view enrollment/sales data |
| 👤 | **Profile Management** | Edit profile, view enrolled courses, track progress |
| 📝 | **Notes** *(in progress)* | Students will be able to take and manage notes while watching lectures |

---

## 🧱 Tech Stack

**🎨 Frontend**
- ⚛️ React (Vite)
- 🗃️ Redux Toolkit (state management)
- 🔥 Firebase (Google Sign-In / client utilities)
- 🪝 Custom hooks for data fetching

**⚙️ Backend**
- 🟢 Node.js + Express
- 🍃 MongoDB (via a dedicated `db.js` config)
- ☁️ Cloudinary (image/video storage)
- 📦 Multer (file upload handling)
- 🔑 JWT-based authentication (`token.js`, `isAuth` middleware)
- ✉️ Nodemailer / mail service (`Mail.js`) for emails (e.g. password reset)

---

## 📂 Project Structure

```
skill-grod/
├── backend/
│   ├── configs/
│   │   ├── Mail.js            # Email/Nodemailer configuration
│   │   ├── cloudinary.js      # Cloudinary media storage config
│   │   ├── db.js              # MongoDB connection
│   │   └── token.js           # JWT token generation/verification
│   ├── controllers/
│   │   ├── aiController.js    # AI-powered search/assistant logic
│   │   ├── authController.js  # Signup, login, forgot/reset password
│   │   ├── courseController.js
│   │   ├── orderController.js # Purchases / payments
│   │   ├── reviewController.js
│   │   └── userController.js
│   ├── middlewares/
│   │   ├── isAuth.js          # Route protection
│   │   └── multer.js          # File upload middleware
│   ├── models/
│   │   ├── courseModel.js
│   │   ├── lectureModel.js
│   │   ├── reviewModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── aiRoute.js
│   │   ├── authRoute.js
│   │   ├── courseRoute.js
│   │   ├── paymentRoute.js
│   │   ├── reviewRoute.js
│   │   └── userRoute.js
│   ├── index.js                # App entry point
│   ├── test.js
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   │   └── logo.jpg
│   ├── src/
│   │   ├── assets/             # Images, icons, media
│   │   ├── components/         # Reusable UI components (Nav, Footer, Cards, etc.)
│   │   ├── customHooks/        # Data-fetching hooks (courses, reviews, user)
│   │   ├── pages/
│   │   │   ├── admin/          # Educator/creator dashboard pages
│   │   │   └── ...             # Student-facing pages (Home, Login, SignUp, etc.)
│   │   ├── redux/              # Redux slices & store
│   │   ├── app.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── utils/
│   │   └── Firebase.js
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── jsconfig.json
│   ├── package.json
│   └── .gitignore
│
└── README.md
```

---

## 🚀 Getting Started

### ✅ Prerequisites
- 🟢 Node.js (v18+ recommended)
- 🍃 MongoDB instance (local or Atlas)
- ☁️ Cloudinary account (for media uploads)
- 🔥 Firebase project (for Google auth)

### 1️⃣ Clone the repository
```bash
git clone <repository-url>
cd skill-grod
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with variables such as:
```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MAIL_USER=your_email
MAIL_PASS=your_email_app_password
```

Run the backend:
```bash
npm start
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/` with variables such as:
```env
VITE_BACKEND_URL=http://localhost:8000
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```

Run the frontend:
```bash
npm run dev
```

🎉 The app should now be running locally — frontend on Vite's dev server and backend on the configured port.

---


## 📄 License

This project is currently private/unlicensed.

---

<div align="center">

Made with ❤️ by the Skill Grid team

</div>
