import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen text-center bg-gray-100 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
        Welcome to the Task Manager
      </h1>

      <p className="text-gray-700 mt-4 max-w-xl">
        A simple Task Management Web App built with the MERN stack
        (MongoDB, Express, React, Node.js). Register, log in, and manage
        your tasks with full CRUD functionality.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mt-6 text-sm text-gray-800">
        <span className="px-3 py-1 bg-gray-200 rounded-full">🔐 JWT Auth</span>
        <span className="px-3 py-1 bg-gray-200 rounded-full">📝 Create / Edit / Delete Tasks</span>
        <span className="px-3 py-1 bg-gray-200 rounded-full">🔄 Pending / Completed</span>
        <span className="px-3 py-1 bg-gray-200 rounded-full">📱 Responsive UI</span>
      </div>

      <div className="flex gap-4 mt-8">
        <Link
          to="/login"
          className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 border border-gray-800 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Register
        </Link>
      </div>

      <p className="text-gray-600 text-sm mt-10">
        Made by <span className="font-medium text-gray-800">Prabhakar</span>
      </p>
    </div>
  );
}

export default Home;