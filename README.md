# Chat App - Frontend

A modern, responsive real-time chat application frontend built with Next.js, React, TypeScript, and Socket.IO.

---

## 📦 Tech Stack

- **Next.js** – React framework for SSR, routing, and API routes
- **React** + **TypeScript** – Component-based UI with type safety
- **Socket.IO Client** – Real-time, bidirectional communication
- **TailwindCSS** – Utility-first CSS for rapid UI development
- **Framer Motion** – Declarative animations for React
- **React Hot Toast** – Toast notifications
- **Axios** – Promise-based HTTP client

---

## 🚀 Features

- Real-time messaging with Socket.IO
- File and image upload with previews
- Responsive design (mobile, tablet, desktop)
- Modern UI with TailwindCSS
- Smooth animations with Framer Motion
- Dark mode support
- Authentication flow (login / register)

---

## 📋 Requirements

- Node.js v18 or higher

---

## ⚡ Getting Started

1. **Clone the repository:**

   ```sh
   git clone <repo-url>
   cd project-folder
   ```

2. **Install dependencies:**

   ```sh
   yarn install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory and add:

   ```
   NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
   ```

4. **Run the development server:**

   ```sh
   yarn dev
   ```

---

## 🔌 Socket.IO Events

- `connection` — Client connects (must send JWT in handshake)
- `join` — Join a user room
- `sendMessage` — Send a message (text, image, or document)
- `receiveMessage` — Receive a message
- `disconnect` — Client disconnects

---

## 📦 Scripts

- `yarn dev` — Start server in development mode
- `yarn build` — Build TypeScript for production
- `yarn start` — Start server in production mode
- `yarn lint` — Run ESLint

---

## 📝 License

This project is licensed under the MIT License
