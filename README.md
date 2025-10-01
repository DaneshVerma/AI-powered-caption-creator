# 📸 CaptionAir AI

A modern **full-stack web application** that generates AI-powered captions for uploaded images.  
Built with **React, Express, MongoDB, and Gemini AI**, it provides authentication, secure image uploads, and flexible caption options.

---

## 🚀 Tech Stack

| Layer     | Tooling/Stack | Notable Aspects |
|-----------|---------------|-----------------|
| **Frontend** | React 19, Vite, Tailwind 4, React Router v7 | SPA, cookie-based auth, protected routes |
| **Backend** | Node.js, Express, MongoDB, Multer, Gemini API | Secure auth, AI integration, in-memory file handling |
| **Auth** | JWT (httpOnly cookie), bcrypt | Secure login/register, no plain-text passwords |
| **Upload** | Multer (memory), FormData | No disk storage, buffer forwarded to AI |
| **AI** | Gemini (Google GenAI SDK) | Multi-language, mood/tone options |
| **Styling** | TailwindCSS | Responsive, minimal custom CSS |

---

## ✨ Features

- 🔐 **Authentication** (Register/Login with JWT cookies)
- 🖼️ **Image Upload & Captioning** (AI-powered captions)
- 🌍 **Language, Mood, Tone Options** (customizable captions)
- 📋 **Copy-to-Clipboard** for generated captions
- 🚫 **Protected Routes** (only logged-in users can access captioning area)
- 📱 **Responsive UI** with TailwindCSS

---

## 🗂️ Directory Structure

### **Frontend (React + Vite)**

- `src/App.jsx` — Main component, sets up routes (`/` for auth, `/use` for captioning).  
- `src/index.css` — TailwindCSS import.  
- `src/main.jsx` — Entry point, wraps `App` in `BrowserRouter`.  
- `src/pages/AuthPage.jsx` — Register/Login form, sets cookies on login.  
- `src/pages/UsePage.jsx` — Caption interface: upload image, select options, submit, view result.  
- `src/components/Protected.jsx` — Auth guard for protected routes.  
- `src/components/Navbar.jsx` — Shows **Login/Logout** depending on auth state.  
- `src/components/UploadCard.jsx` — Handles image upload + form options.  
- `src/components/ResultCard.jsx` — Displays generated caption + copy button.  
- `src/config/api.js` — Axios instance with `withCredentials: true`.  
- `index.html` — Minimal shell, loads React app.  

### **Backend (Express + MongoDB)**

- `index.js` — Entrypoint, loads `.env`, connects DB, starts server.  
- `src/app.js` — Express config (parsers, routes, static serving, SPA fallback).  
- `src/db/db.js` — MongoDB connection setup.  
- `src/models/user.model.js` — Mongoose schema + bcrypt hashing.  
- `src/controllers/auth.controller.js` — Handles register/login, issues JWT.  
- `src/routes/auth.routes.js` — `/auth/login`, `/auth/register`.  
- `src/controllers/caption.controller.js` — Authenticated `/api` route, AI captioning.  
- `src/routes/caption.routes.js` — Caption API route with multer (in-memory).  
- `src/services/ai.service.js` — Gemini AI SDK integration.  
- `src/middlewares/auth.middleware.js` — JWT auth check.  

---

## 🔑 How It Works

### 1. **Authentication Flow**
- Sign up / Login at `/`  
- Backend stores user in MongoDB (hashed password).  
- Issues JWT in **httpOnly cookie**.  
- Frontend uses cookie for protected requests.  

### 2. **Captioning Flow** (Protected `/use`)
- Upload image (`UploadCard`).  
- Choose options (language, mood, tone, emojis, hashtags).  
- Submit → frontend sends multipart form to backend.  
- Backend:  
  - ✅ Verifies JWT (middleware)  
  - ✅ Uses multer (memory storage) for file buffer  
  - ✅ Sends data to Gemini API → returns caption + base64 image  
- Frontend displays result (`ResultCard`) with copy option.  

### 3. **UI & Styling**
- Clean, responsive TailwindCSS UI.  
- Loading/error states for better UX.  
- Navbar reflects auth state in real-time.  

---

## 🛠️ Development & Setup

### Prerequisites
- Node.js (>=18)  
- MongoDB (local or Atlas)  
- Gemini API Key  

### Install & Run

```bash
# Clone repo
git clone https://github.com/your-username/captionair-ai.git
cd captionair-ai

# Install frontend
cd frontend
npm install

# Install backend
cd ../backend
npm install
```
