# ConnectVerse

ConnectVerse is a MERN-stack web application that helps users connect with people who share similar hobbies and interests within their city. It includes a **frontend**, **backend**, and an **admin panel**, with features like real-time chat, friend requests, and user verification.

---

## 🚀 Features

### 👥 User Features

- **User Registration & Login** with email verification
- **Password Reset** via email
- **Profile Management** (update personal details, upload profile picture)
- **Find People with Similar Hobbies** in your city
- **Send & Manage Friend Requests**
- **Friends List & Profiles**
- **Real-Time Messaging** via Socket.IO

### 🛠 Admin Panel

- View & manage users
- Edit available hobbies/resources
- Manage system notifications

### 💬 Messaging

- Real-time chat between friends
- Supports text & image messages
- Read/unread status tracking

---

## 📂 Project Structure

```
connectverse/
│── admin/        # Next.js admin panel
│── backend/      # Express.js backend server
│── frontend/     # Next.js frontend app
│── package.json  # Monorepo scripts
```

---

## 🖥️ Tech Stack

- **Frontend:** Next.js, React, TailwindCSS, Redux Toolkit, PrimeReact, Socket.IO Client
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Socket.IO
- **Authentication:** JWT (JSON Web Token)
- **Image Hosting:** Cloudinary
- **Email Services:** Nodemailer (Gmail SMTP)
- **Deployment:** Vercel (frontend/admin), Render/AWS (backend)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/connectverse.git
cd connectverse
```

### 2️⃣ Install Dependencies

```bash
npm run bootstrap
```

This installs dependencies for the root, frontend, backend, and admin.

### 3️⃣ Environment Variables

Create `.env` files in **backend**, **frontend**, and **admin** with the following:

**Backend `.env`:**

```
PORT=5500
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
FRONTEND_URL=http://localhost:3300
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

**Frontend `.env.local` & Admin `.env.local`:**

```
NEXT_PUBLIC_API_URL=http://localhost:5500
NEXT_PUBLIC_BASE_URL=http://localhost:5500
```

---

## ▶️ Running the Project Locally

Run all services in parallel:

```bash
npm start
```

Or run each service separately:

```bash
npm run frontend:start
npm run backend:start
npm run admin:start
```

---

## 🌐 Deployment

- **Frontend & Admin:** Deploy on [Vercel](https://vercel.com/)
- **Backend:** Deploy on [Render](https://render.com/) or AWS EC2 with MongoDB Atlas

---

<!-- ## 📸 Screenshots (Optional)

_(You can add images of dashboard, chat, and friend request UI here)_

--- -->

## 🤝 Contributing

1. Fork the repo
2. Create a new branch (`feature/your-feature`)
3. Commit changes
4. Push to branch
5. Create a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.
