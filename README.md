# ⚖️ LawyerUp AI – Fullstack Legal Assistant Platform for Nepal

> 🧠 A civic-tech project built from scratch: web app, AI chatbot, real-time lawyer booking, and secure user roles — by a self-taught developer.

---

## 🧭 Overview

**LawyerUp AI** is a cross-platform legal assistant platform designed for Nepali citizens.  
It provides **legal awareness, lawyer consultations, and AI-powered support** via a clean, responsive web interface and real-time backend services.

---

## 🔥 Highlights

- 🧠 Built from scratch by a self-taught undergraduate
- ✅ Clean Architecture – Fully modular and scalable (React + Node + MongoDB)
- 💬 Real-time chat using **Socket.IO**
- 📚 AI chatbot trained on **Nepali legal data**
- 🔐 Role-based access: Free, Basic, Premium, and Lawyer
- 🎯 Designed for deployment and civic impact

---

## 🛠️ Tech Stack

| Layer        | Tools Used                                     |
|--------------|------------------------------------------------|
| Frontend     | React, React Router, Axios, CSS Modules        |
| Backend      | Node.js, Express, MongoDB                      |
| Auth         | JWT, Middleware-based protection               |
| Realtime     | Socket.IO + MongoDB persistence per booking    |
| AI           | SentenceTransformers, Google Gemma LLM         |
| Database     | MongoDB (Mongoose ODM)                         |
| Styling      | SweetAlert2, Toastify, custom components       |

---

## 🧠 Features

### 🔐 Authentication & Roles
- JWT auth
- User roles (Free, Basic, Premium, Lawyer)
- Profile update + plan upgrade

### 🤖 AI Chatbot
- Constitution + Civil/Criminal knowledge
- Limits by plan (Free: 500 words/day)

### 📅 Lawyer Booking System
- Browse lawyers by expertise
- Book appointments
- Real-time chat with lawyers (via Socket.IO)

### 📰 News & Reactions
- Legal news feed
- Like, Dislike, Comment on articles

### 📄 PDF Library *(RAG-ready)*
- Upload & store legal documents
- (Future) FAISS-powered PDF search

### 📦 Admin Tools
- Manage FAQs
- Manage reports
- Dashboard skeleton included

### 🧼 UX Additions
- Shimmer loaders, dark mode, sound feedback, toast system
- Profile completeness reminder

---

## 💬 Real-Time Chat Architecture

- `joinRoom(bookingId)` — Users and lawyers enter a private room
- `sendMessage()` — Stores message in MongoDB (`Booking.messages`)
- `receiveMessage()` — Sent to other participants live

**Tech used:** Socket.IO, Mongoose, Booking schema.

---

## 📂 Project Structure Snapshot

```
frontend/
├── features/
│   ├── auth/              # Signup/Login
│   ├── ai_chat/           # AI bot UI
│   ├── bookings/          # Appointments + messaging
│   ├── settings/          # Theme, plan, profile
│   ├── lawyerUp/          # Directory + profile
│   └── dashboard/         # Admin (WIP)
backend/
├── routes/                # API endpoints
├── controllers/           # Logic handlers
├── models/                # Mongoose schemas
├── socket.js              # Realtime event setup
├── middleware/            # Auth protection
├── uploads/               # PDF storage
```

---

## 🚀 Deployment-Ready

- `.env` for configs
- API base structure
- Netlify/Render/Vercel friendly
- RAG-ready PDF system

---

## 📜 License & Attribution

**© 2025 Sachin Khatri**  
Strictly for academic and civic purposes.  
Commercial reuse or redistribution is **prohibited without permission.**

---

## 🙏 Final Note

This fullstack platform was built solo — no degree, no bootcamp — just vision, consistency, and code.

🧠 *If this inspires you to build something for your community, do it.*  
I’ll help you if I can. ✊

---

**This is LawyerUp. Built from zero. Shipped with pride.**
