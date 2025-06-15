# ⚖️ LawyerUp AI – Intelligent Legal Assistant for Nepal
> Full-stack cross-platform solution for legal access, AI chatbot support, and lawyer consultation.

## 📘 Overview

**LawyerUp AI** is a civic-tech platform designed to empower Nepali citizens with reliable legal information, automated legal assistance, and direct lawyer consultation. It combines a modern **React** frontend, a robust **Node.js/Express** backend, and powerful **LLM-driven AI** for real-time legal query support.

---

## 🔑 Key Features

- 🔐 Secure user authentication with JWT
- 🤖 AI chatbot trained on Nepal’s Constitution, Civil & Criminal Codes
- 🧑‍⚖️ Lawyer directory with appointment system
- 📰 Legal news viewer with comments and reactions
- 🗂️ PDF document upload & search *(coming soon)*
- 🧑‍💻 Role-based access control (Free, Basic, Premium, Lawyer)
- 📊 Admin dashboard *(in progress)*

---

## 🧰 Tech Stack

| Layer       | Technology                             |
|-------------|-----------------------------------------|
| Frontend    | React, React Router, Axios              |
| Backend     | Node.js, Express                        |
| Auth        | JWT                                     |
| AI Engine   | Gemma LLM, SentenceTransformers, FAISS |
| Database    | MongoDB                                 |
| Styling     | CSS Modules + Custom Components         |

---

## 🚀 Getting Started

### 🛠 Prerequisites

- Node.js v16+
- MongoDB (local or Atlas)
- `.env` file configured with API base URL

### 📦 Installation Steps

```bash
git clone https://github.com/your-username/lawyerup-web.git
cd lawyerup-web
npm install
```

Create `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api/
```

Start the dev server:

```bash
npm start
```

---

## 📂 Project Structure

```
lawyerup/
├── public/                  # Static assets
├── src/
│   ├── auth/                # Login, signup, token handling
│   ├── ai_chat/             # Chat interface with legal AI
│   ├── bookings/            # Appointment logic & forms
│   ├── dashboard/           # Admin views & analytics
│   ├── faq_page/            # FAQs with collapsibles
│   ├── landing_page/        # Home, pricing, and CTA pages
│   ├── lawyerUp/            # Core business logic
│   ├── modals/, news/, report/, routes/...
│   ├── settings/            # Profile + preferences
│   ├── utils/               # API hooks, helpers, toasts
│   ├── App.tsx              # Main React app
│   └── index.tsx            # Entry point
```

---

## 🔐 Authentication Flow

- Token is stored in `localStorage` as `lawyerup_token`
- User object is cached as `lawyerup_user`
- Auth-protected routes require `Authorization: Bearer <token>`

---

## 📡 REST API Endpoints

| Method | Endpoint                      | Description                 |
|--------|-------------------------------|-----------------------------|
| POST   | `/auth/signup`                | Register new user           |
| POST   | `/auth/login`                 | Login and get token         |
| PATCH  | `/auth/update-profile`        | Update user data            |
| GET    | `/news/`                      | Fetch news articles         |
| POST   | `/news/:id/like`              | Like a news item            |
| POST   | `/news/:id/comment`           | Comment on news             |
| GET    | `/lawyers/`                   | List all lawyers            |
| POST   | `/lawyer/:id/appointment`     | Book a consultation         |

---

## ⚙️ Deployment

### Frontend (e.g., Vercel/Netlify)
```bash
npm run build
```

### Backend (e.g., Railway/Render/VPS)
- Ensure `.env` is set with DB_URI and CORS
- Setup a `Procfile` or PM2 for VPS
- Enable HTTPS if needed (Nginx recommended)

---

## ✨ Planned Features

- [ ] PDF Search & RAG-based chatbot knowledge
- [ ] In-app lawyer chat (web socket or polling)
- [ ] Multi-language support (Nepali & English)
- [ ] Admin dashboard with user/plan metrics
- [ ] Mobile app (Flutter) with identical features

---

## 🤝 Contributing

Pull requests are welcome!  
Open an issue for bugs, suggestions, or enhancements.

```bash
git checkout -b your-feature
git commit -m "Add awesome feature"
git push origin your-feature
```

---

## 📜 License

**© 2025 Sachin Khatri**  
Academic / Civic engagement only. Redistribution or commercial use prohibited without permission.

---

## 🔗 References & Tools

- Nepal Law Commission
- Google Gemma LLM
- OpenAI SentenceTransformers
- MongoDB Atlas
- Facebook FAISS
- React, Vite, Tailwind (planned)
- Figma Design System

---

🧠 *Crafted with late nights, brain cells, and lots of console.logs.*
