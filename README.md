<div align="center">

# 🔐 Secure RTC

**A fully-featured real-time communication platform with WebRTC video/voice calling, group chats, and admin-controlled group management.**

[![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.19-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.8-010101?logo=socket.io)](https://socket.io/)
[![WebRTC](https://img.shields.io/badge/WebRTC-Enabled-FF6B6B)](https://webrtc.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

### 👨‍💻 Built by

<table>
<tr>
<td align="center">
<a href="https://github.com/VPbanna123">
<img src="https://github.com/VPbanna123.png" width="80px;" alt="Vijaypal Singh Rathore"/><br />
<b>Vijaypal Singh Rathore</b>
</a><br />
<a href="https://github.com/VPbanna123">GitHub</a> • 
<a href="https://www.linkedin.com/in/vijaypal-singh-rathore-331106268">LinkedIn</a>
</td>
</table>

*🎓 DSAI Students @ IIIT Dharwad*
</div>

---

## ✨ Features

- 🎥 **WebRTC Video Calls:** High-quality peer-to-peer video calling with end-to-end encryption  
- 🎤 **Voice Calling:** Crystal-clear audio communication using secure SRTP protocols  
- 💬 **Real-Time Messaging:** Instant one-to-one and group chat powered by Socket.io  
- 👥 **Group Management:** Create groups with admin privileges for member control  
- 🔐 **Secure Authentication:** JWT-based auth with bcrypt password hashing  
- 👑 **Admin Controls:** Group admins can remove members and manage permissions  
- 📱 **Fully Responsive:** Works seamlessly across desktop, tablet, and mobile devices  
- 🔒 **End-to-End Security:** DTLS/SRTP encryption for all media streams  
- 🌐 **Modern UI:** Built with React 19 and Tailwind CSS 4  

---

## 🏗️ Architecture Overview

```
Frontend (React) ←→ Socket.io ←→ Backend (Express) ←→ MongoDB
                     ↓
               WebRTC Signaling
                     ↓
         Peer-to-Peer Connection (SRTP/DTLS)
```

**Tech Stack Flow:**  
`Auth → JWT → Socket.io Rooms → WebRTC Signaling → P2P Media → MongoDB`

---

## 📋 Prerequisites

- Node.js 18+
- MongoDB 6+
- npm 9+
- Modern Browser (Chrome 90+, Firefox 88+, Safari 14+)

---

## 🚀 Quick Start

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/secure-rtc.git
cd secure-rtc
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```
PORT=8000
MONGODB_URI=mongodb://localhost:27017/secure-rtc
JWT_SECRET=your_super_secure_jwt_secret_here_min_32_chars
JWT_EXPIRE=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

Run backend:

```bash
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🎯 Usage Guide

### Authentication

- Sign up → account created  
- Login → JWT token stored in HTTP-only cookies  
- Auto-login enabled  

### One-to-One Chat

- Search users  
- Send text messages  
- Start voice/video calls  
- Toggle audio/video inside call  

### Group Chats

- Create group  
- Admins can remove members  
- Add new participants  
- Group calls (coming soon)  

### Security

- DTLS-SRTP media encryption  
- Secure signaling via WSS  
- JWT-protected APIs  
- ICE/STUN for NAT traversal  

---

## 📁 Project Structure

```
secure-rtc/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── socket/
│   │   ├── utils/
│   │   └── server.js
│   ├── .env
│   └── package.json
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🌐 API Endpoints

### Authentication

| Method | Route | Description |
|--------|--------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login |
| POST | /api/auth/logout | Logout |
| GET | /api/auth/me | Current user info |

### Users

| Method | Route | Description |
|--------|--------|-------------|
| GET | /api/users/search?q= | Search users |
| GET | /api/users/:id | User profile |

### Groups

| Method | Route | Description |
|--------|--------|-------------|
| POST | /api/groups | Create group |
| GET | /api/groups | Get groups |
| PUT | /api/groups/:id | Update (Admin only) |
| DELETE | /api/groups/:id/members/:userid | Remove member (Admin only) |

### Messages

| Method | Route | Description |
|--------|--------|-------------|
| GET | /api/messages/:conversationId | Get messages |
| POST | /api/messages | Send message (Socket.io) |

---

## 🔌 Socket.io Events

### Client → Server

```javascript
socket.emit("join-room", { roomId })
socket.emit("send-message", { roomId, message })
socket.emit("webrtc-offer", { to, offer })
socket.emit("webrtc-answer", { to, answer })
socket.emit("ice-candidate", { to, candidate })
```

### Server → Client

```javascript
socket.on("new-message", ...)
socket.on("user-joined", ...)
socket.on("user-left", ...)
socket.on("webrtc-offer", ...)
socket.on("webrtc-answer", ...)
socket.on("ice-candidate", ...)
```

---

## 🔧 Troubleshooting

### MongoDB Not Running

```bash
mongosh
brew services start mongodb-community
sudo systemctl start mongod
```

### CORS Errors

Update backend `.env`:

```
CORS_ORIGIN=http://localhost:5173
```

### WebRTC Issues

- Allow camera/mic permissions  
- Use TURN server for restricted networks  

---

## 🔒 Security Best Practices

- HTTPS + WSS everywhere  
- DTLS-SRTP encryption  
- JWT short-lived tokens  
- Bcrypt password hashing  
- Rate limiting  
- Safe ICE servers  

---

## 🧑‍💻 Development Commands

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

### Lint

```bash
npm run lint
```

### Build Frontend

```bash
npm run build
```

---

## 🚀 Deployment

### Frontend (Vercel / Netlify)

```bash
npm run build
```

Deploy `dist/`.

### Backend (Render / Railway)

`package.json`:

```
"start": "node src/server.js",
"dev": "node src/server.js"
```

Set environment variables in hosting dashboard.

---

## 🗺️ Roadmap

- [x] One-to-one chat  
- [x] Voice/video calling  
- [x] Group chat  
- [x] Admin role  
- [ ] Group video calls  
- [ ] Screen share  
- [ ] File sharing  
- [ ] Message reactions  
- [ ] Push notifications  
- [ ] End-to-end encryption  

---

## 🤝 Contributing

```bash
git checkout -b feature/new-feature
git commit -m "Add new feature"
git push origin feature/new-feature
```

---






  

<div align="center">

⭐ **Star this repo if it helped you!**  
Made with ❤️ by Vijaypal Singh Rathore

</div>
