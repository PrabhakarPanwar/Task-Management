import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { sendData } from "../utils/DataApi";
import API_URL from "../utils/api";

function Login() {
    const [pwd, setPwd] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4 text-center">Login</h2>

                <input
                    type="email"
                    onChange={(i) => setEmail(i.target.value)}
                    placeholder="E-mail"
                    required
                    className="w-full mb-3 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-300"
                />

                <input
                    type="password"
                    onChange={(i) => setPwd(i.target.value)}
                    placeholder="Password"
                    required
                    className="w-full mb-3 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-300"
                />

                <NavLink
                    to="/register"
                    className="block text-sm text-blue-600 hover:underline mb-4"
                >
                    Click here to register
                </NavLink>

                <button
                    type="submit"
                    onClick={() =>
                        sendData(`${API_URL}/api/login`, { pwd, email })
                    }
                    className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700"
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;
