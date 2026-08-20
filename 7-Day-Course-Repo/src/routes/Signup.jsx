import React, { useState } from "react";
import { Link, } from "react-router-dom";
import { Notebook } from "lucide-react";

function Signup() {
   
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Handle signup logic here (e.g., Firebase)
        console.log("Signup attempt with:", { name, email, password });
        // After successful signup, redirect to login or dashboard
        // navigate("/login");
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex flex-col items-center mb-6">
                    <Notebook className="h-12 w-12 text-indigo-600 mb-2" />
                    <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
                    <p className="text-gray-600">Start capturing your ideas today</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Create a password"
                            required
                            minLength={6}
                        />
                        <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors font-medium"
                    >
                        Create Account
                    </button>
                </form>

                <div className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;