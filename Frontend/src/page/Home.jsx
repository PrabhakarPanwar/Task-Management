import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-screen text-center px-4 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      {/* Decorative blurred shapes for depth */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      {/* Content sits above the blobs */}
      <div className="relative">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Welcome to the Task Manager
        </h1>

        <p className="text-gray-700 mt-4 max-w-xl mx-auto">
          A simple Task Management Web App built with the MERN stack
          (MongoDB, Express, React, Node.js). Register, log in, and manage
          your tasks with full CRUD functionality.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-6 text-sm text-gray-800">
          <span className="px-3 py-1 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm">🔐 JWT Auth</span>
          <span className="px-3 py-1 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm">📝 Create / Edit / Delete Tasks</span>
          <span className="px-3 py-1 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm">🔄 Pending / Completed</span>
          <span className="px-3 py-1 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm">📱 Responsive UI</span>
        </div>

        <div className="flex gap-4 mt-8 justify-center">
          <Link
            to="/login"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 border border-gray-800 text-gray-800 rounded-lg hover:bg-white/60 transition-colors"
          >
            Register
          </Link>
        </div>

        <p className="text-gray-600 text-sm mt-10">
          Made by <span className="font-medium text-gray-800">Prabhakar</span>
        </p>
      </div>
    </div>
  );
}

export default Home;