# ✅ MERN Task Management App (https://task-management-r5rg.onrender.com/register)  (Live on Render)

A simple **Task Management Web App** built with the MERN stack (MongoDB, Express, React, Node.js).  
Users can register, log in, and manage their tasks with full CRUD functionality.

---

## 🚀 Features

- 🔐 User Authentication (Register / Login with JWT)
- 📝 Create, Read, Update, Delete tasks
- 🔄 Toggle task status (`pending` / `completed`)
- 📱 Responsive design with Tailwind CSS
- ⚡ Protected routes (only logged-in users can access tasks)

---

## 🛠️ Tech Stack

- **Frontend:** React, Axios, React Router, Tailwind CSS  
- **Backend:** Node.js, Express.js, Mongoose, bcryptjs, jsonwebtoken  
- **Database:** MongoDB (local or Atlas)

---

## 📂 Project Structure

project-root/
│── backend/        # Express server, routes, models
│── frontend/       # React app
│── README.md       # Project documentation


---



## ⚙️ Installation & Setup (For running on the Local System)

### 1. Clone the repository

git clone <your-repo-url>
cd project-root

### 2. Install dependencies
   
cd ./backend
npm install

cd ./frontend
npm install

### 3. Configure environment variables
Create a .env file inside the backend folder:

PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/taskapp
JWT_SECRET=yourSecretKey

### 4. Running the App

### Start backend:

cd ./backend
nodemon

### Start frontend:

cd ./frontend
npm run dev

Backend runs on: http://localhost:3000

### Usage
### Frontend runs on: 
## http://localhost:5173/register 
(There is no Home page so no route for "/")
## http://localhost:5173 -> this is empty 
### Register a new account.

### Access the dashboard to:

### Add new tasks
### Edit or delete tasks
### Search tasks by title
### Filter tasks by status




