
# ⚖️ LawyerUp AI – Intelligent Legal Assistant for Nepal
> Web + AI platform for legal awareness, lawyer booking, and automated legal queries

## 📘 Overview

**LawyerUp AI** is a civic-tech platform that empowers Nepali citizens with access to legal information, AI-powered chatbot support, and lawyer consultation — all from a modern web interface. The app combines React, Node/Express, MongoDB, and NLP tools to create a legal assistant for students, citizens, and professionals alike.

## 🔑 Features

- Secure user authentication with JWT
- AI chatbot trained on Constitution, Civil & Criminal Code
- Lawyer directory with appointment booking
- Legal news and articles viewer
- Commenting and reaction system on news (like/dislike)
- Role-based access (Free, Basic, Premium, Lawyer)

## 🧰 Technologies Used

- **Frontend**: React, Axios, React Router
- **Backend**: Node.js, Express
- **Auth**: JWT
- **AI**: Gemma LLM, SentenceTransformers
- **Database**: MongoDB
- **Styling**: CSS Modules + Custom Components

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB instance running
- A `.env` file configured

### Steps

1. Clone the repo:
```bash
git clone https://github.com/your-username/lawyerup-web.git
cd lawyerup-web
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api/
```

4. Start the development server:
```bash
npm start
```

## 🗂️ Project Structure

```
lawyerup/
│── src/
│   ├── components/         # Reusable components like NewsCard, ChatView
│   ├── pages/              # LoginSignup, NewsPage, LawyerProfile, etc.
│   ├── utils/              # API, notify, loader
│   ├── css/                # CSS Modules
│   ├── App.js              # Main App
│   └── index.js            # Entry point
│── public/                 # Static files
│── .env                    # Environment config
│── package.json            # Scripts and dependencies
```

## 📌 Key Modules

- **Login & Auth** (`LoginSignup.jsx`)
- **Chatbot Interface** (`ChatView.jsx`)
- **News & Articles** (`NewsPage.jsx`, `NewsCard.jsx`)
- **Lawyer Booking** (`LawyerBrowse.jsx`, `AppointmentForm.jsx`)
- **Admin Dashboard** *(planned)*
- **PDF Document Viewer** *(planned)*

## 🔐 Auth Flow

JWT is used for user sessions:

- Token stored as `lawyerup_token`
- User profile stored as `lawyerup_user`
- Protected routes send `Authorization: Bearer <token>` header

## 📡 API Endpoints (Node.js)

- `POST /auth/login`
- `POST /auth/signup`
- `GET /news/`
- `POST /news/:id/like`
- `POST /news/:id/dislike`
- `POST /news/:id/comment`
- `GET /lawyers/`
- `POST /lawyer/:id/appointment`

## 🚢 Deployment

To deploy frontend (e.g., Netlify or Firebase):
```bash
npm run build
```

For backend:
- Host with Render, Railway, or VPS (Ubuntu/Nginx/Mongo)

## 🤝 Contribution

Feel free to fork this repository, suggest improvements, or open pull requests.

### TODO / Contributions Welcome:
- [ ] PDF search and vector-based doc retrieval
- [ ] In-app real-time lawyer chat
- [ ] Multi-language chatbot
- [ ] Dashboard for analytics

## 📜 License

**© 2025 Sachin Khatri — All rights reserved**  
This project was created for academic and civic engagement use only. No commercial use or redistribution allowed without permission.

## 🔗 References

- Nepal Law Commission
- OpenAI SentenceTransformers
- Gemma LLM (Google)
- FAISS (Facebook AI)
- MongoDB Docs
- React Docs
- Figma UI Prototypes
