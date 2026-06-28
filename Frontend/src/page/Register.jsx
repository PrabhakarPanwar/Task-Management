import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { sendData } from "../utils/DataApi";
import API_URL from "../utils/api";

function Register() {
    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        sendData(`${API_URL}/api/register`, { name, pwd, email });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4 text-center">Register</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(i) => setName(i.target.value)}
                        placeholder="Username"
                        required
                        minLength={2}
                        className="w-full mb-3 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-300"
                    />

                    <input
                        type="email"
                        value={email}
                        onChange={(i) => setEmail(i.target.value)}
                        placeholder="E-mail"
                        required
                        className="w-full mb-3 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-300"
                    />

                    <input
                        type="password"
                        value={pwd}
                        onChange={(i) => setPwd(i.target.value)}
                        placeholder="Password"
                        minLength={8}
                        maxLength={16}
                        required
                        className="w-full mb-3 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-300"
                    />

                    <NavLink
                        to="/login"
                        className="block text-sm text-blue-600 hover:underline mb-4"
                    >
                        Click here to login
                    </NavLink>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-blue-700"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;