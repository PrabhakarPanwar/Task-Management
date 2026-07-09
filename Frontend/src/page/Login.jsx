import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { sendData } from "../utils/DataApi";
import {API_URL} from "../utils/api";
import { useSubmitGuard } from "../hooks/useSubmitGuard";

function Login() {
    const [pwd, setPwd] = useState("");
    const [email, setEmail] = useState("");
    const [seeThrough, setSeeThrough] = useState(false);
    const { isSubmitting, guard } = useSubmitGuard()

    const handleSubmit = (e) => {
        e.preventDefault();
        guard(() => sendData(`${API_URL}/api/login`, { pwd, email }))
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4 text-center">Login</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        disabled={isSubmitting}
                        onChange={(i) => setEmail(i.target.value)}
                        placeholder="E-mail"
                        required
                        className="w-full mb-3 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-300"
                    />

                    <div className="relative mb-3">
                        <input
                            type={seeThrough ? "text" : "password"}
                            value={pwd}
                            disabled={isSubmitting}
                            onChange={(i) => setPwd(i.target.value)}
                            placeholder="Password"
                            minLength={8}
                            maxLength={16}
                            required
                            className="w-full px-3 py-2 pr-10 border rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        <button
                            type="button"
                            onClick={() => setSeeThrough((prev) => !prev)}
                            tabIndex={-1}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            {seeThrough ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-11-8-11-8a20.3 20.3 0 015.06-6.06M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a20.29 20.29 0 01-3.22 4.42M14.12 14.12a3 3 0 11-4.24-4.24" />
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <NavLink
                        to="/register"
                        className="block text-sm text-blue-600 hover:underline mb-4"
                    >
                        Click here to register
                    </NavLink>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 disabled:opacity-60"
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;