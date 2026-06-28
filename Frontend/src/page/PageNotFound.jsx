import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen text-center bg-gray-50 px-4">
            <h1 className="text-9xl font-bold text-gray-800">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mt-2">
                Page Not Found
            </h2>
            <p className="text-gray-500 mt-2 max-w-md">
                Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
                Go back home
            </Link>
        </div>
    )
}

export default PageNotFound