# ☁️ Drive Backend

## 📌 Overview
A **cloud storage backend** inspired by Google Drive.  
It allows users to register, authenticate, upload files, and securely access/download their content using **Firebase Storage** and **MongoDB** for metadata.

---

## 🏗️ Project Architecture

```
drive/
├── app.js                     # Entry point
├── config/
│   ├── db.js                  # MongoDB connection
│   ├── firebase-admin.js      # Firebase storage setup
│   └── multer.config.js       # Multer file upload config
│
├── middleware/
│   └── auth.js                # JWT auth middleware
│
├── models/
│   ├── user.model.js          # User schema
│   └── files.model.js         # File schema (filename, path, user ref)
│
├── routes/
│   ├── user.routes.js         # Auth (register, login, logout)
│   └── index.routes.js        # File upload, list, download
│
├── views/                     # EJS templates (register, login, home, etc.)
├── package.json
└── .env                       # Secrets & config
```

---

## ⚙️ Tech Stack
- **Node.js + Express.js** – Backend framework  
- **MongoDB + Mongoose** – Database for users & files metadata  
- **JWT + Cookies** – Authentication  
- **Multer** – File uploads  
- **Firebase Admin SDK** – Cloud file storage & signed download URLs  
- **EJS** – Template engine for views  

---

## 🔄 Flow of Execution

1. **User Registration**
   - User registers → password hashed with bcrypt → saved in MongoDB.

2. **User Login**
   - User logs in → validated → JWT created → stored in cookie.

3. **File Upload**
   - Authenticated user uploads file → Multer handles storage path → metadata saved in MongoDB → file uploaded to Firebase.

4. **File Download**
   - User requests file → server generates **signed URL** from Firebase → user downloads securely.

5. **Logout**
   - JWT cookie cleared → session ended.

---

## 🚀 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd drive
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Setup `.env`
Create `.env` in root folder:
```env
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
FIREBASE_PROJECT_ID=xxxx
FIREBASE_CLIENT_EMAIL=xxxx
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nxxxx\n-----END PRIVATE KEY-----\n"
```

⚠️ Also keep your Firebase service account JSON (`drive-xxxxx-firebase-adminsdk.json`) safe & **never commit it**.

### 4️⃣ Run the server
```bash
node app.js
```
Server runs at 👉 `http://localhost:3000`

---

## 📡 API Endpoints

### User Routes
| Method | Endpoint         | Description |
|--------|-----------------|-------------|
| GET    | `/user/register` | Render register page |
| POST   | `/user/register` | Register user |
| GET    | `/user/login`    | Render login page |
| POST   | `/user/login`    | Login user, set JWT cookie |
| POST   | `/logout`        | Logout user (clear cookie) |

### File Routes
| Method | Endpoint           | Auth | Description |
|--------|-------------------|------|-------------|
| GET    | `/home`           | JWT  | List user files |
| POST   | `/upload`         | JWT  | Upload file (multer + firebase) |
| GET    | `/download/:path` | JWT  | Download file via signed Firebase URL |

---

## 🛡️ Security Features
- Passwords hashed with bcrypt  
- JWT authentication stored in cookies  
- Firebase signed URLs for secure file downloads  
- `.env` for sensitive configs  

---

## 📌 Future Enhancements
- 📑 File sharing with permissions  
- 🔍 Search & filter files  
- 📊 Storage usage dashboard  
- 🗑️ Trash/Restore functionality  

---


> Last updated: 2025-09-26
