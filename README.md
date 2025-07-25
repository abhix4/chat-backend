# 🐾 Pet Appointment & Chat Backend

A backend system that handles appointment bookings, chat room creation, staff-hospital-pet owner workflows, and media uploads — all secured with token-based authentication and real-time WebSocket communication.

---

## 📦 Features

- 🔐 Token-based login/signup simulation
- 🐶 Book and complete pet appointments
- 💬 Real-time chat with room-based access
- 📂 Media uploads stored locally
- 🕒 Cron job to auto-close chats 48 hours after appointment completion

---

## 🧪 Getting Started

### 📁 Clone & Install

```bash
git clone https://github.com/your-username/pet-chat-api.git
cd pet-chat-api
npm install
```

---

## 🐳 Start MongoDB

### With Docker Compose

```bash
docker-compose up -d
```

MongoDB will be available at `mongodb://admin:secret@localhost:27017`.

---

## 🚀 Start Server

```bash
npm run dev
```

---

## 🔐 Auth - Get Token

Simulates login/signup and returns a JWT token to use in requests.

```http
POST /get-token

```

---

## 🗓️ Appointment Routes

### 📌 Book an Appointment + Chat Room

```http
POST /appointments/book

```
---

### ✅ Complete Appointment

```http
POST /appointments/complete

```

- Marks the appointment as completed
- Closes associated chat room after 48h via cron

---

## 🛠️ Admin Routes

### 🔍 View All Active Chats

```http
POST /admin/active-chats
```

---

### 🧑‍⚕️ Assign Chat to Staff

```http
POST /admin/assign

```

---

## 👨‍⚕️ Staff Routes

### 📋 View Assigned Chats

```http
POST /staff/assigned
```

---

## 💬 Chat Room Routes

### 🆕 Create a Chat Room (manual)

```http
POST /chat/create
```

---

### 📜 Get Chat History

```http
POST /chat/history
```

---

## 📁 Media Upload

### 📤 Upload a File (stored locally)

```http
POST /media/upload

```

Returns uploaded file path.

---

## 🔌 WebSocket

### Connect to a Chat Room

```bash
ws://localhost:3000/?token=YOUR_JWT
```

- Room-based: Each WebSocket connection is scoped to a chat room
- Only **assigned** users (staff or petOwner) can access that room
- Messages are sent and received in real-time

---

## ⏱️ Cron Job

A background cron job runs **every hour** to auto-close chats 48 hours after appointment completion.

No manual trigger needed.


---

## ✅ Example Test IDs

| Role       | ID             |
|------------|----------------|
| Pet Owner  | `petOwner123`  |
| Hospital   | `hospital456`  |
| Staff      | `staff789`     |

Use them to test the `/get-token` and subsequent APIs.

---

## 📁 Folder Structure

```
src/
├── models/           # Mongoose schemas
├── routes/           # Express route handlers
├── controllers/      # Business logic
├── middleware/         
├── sockets/         
├── server.ts         # App entry point
```

---





happy hacking!
