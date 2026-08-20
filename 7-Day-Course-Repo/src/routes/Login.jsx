import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Notebook } from "lucide-react"

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle login logic here
        console.log('Login attempt with:', { email, password })
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex flex-col items-center mb-6">
                    <Notebook className="h-12 w-12 text-indigo-600 mb-2" />
                    <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
                    <p className="text-gray-600">Sign in to access your Notes</p>
                </div>

                <form onSubmit={handleSubmit}>
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

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors font-medium"
                    >
                        Sign In
                    </button>
                </form>

                <div className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account yet?{' '}
                    <Link to="/signup" className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login