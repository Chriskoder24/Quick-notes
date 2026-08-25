import React from "react";
import { Link, useNavigate } from 'react-router-dom'; // ✅ Fixed comma
import { Notebook, LogOut, User } from "lucide-react"; // Keep LogOut if using below
import { useAuth } from "../Context/AuthContext";

function Navbar() {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Failed to logout", error);
        }
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <Notebook className="h-8 w-8 text-indigo-600" />
                        <span className="text-xl font-semibold text-gray-900">
                            QuickNotes
                        </span>
                    </Link>

                    {/* Right Side */}
                    <div className="flex items-center space-x-4">
                        {currentUser ? (
                           
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <User className="h-5 w-5 text-gray-500" /> {/* ✅ Fixed size */}
                                    <span className="text-sm text-gray-700">
                                        {currentUser.email}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                                >
                                    <LogOut className="h-4 w-4 mr-1" /> {/* ✅ Using the import! */}
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            // ✅ Logged out: Show Login and Signup
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="text-sm font-medium text-white px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
                                >
                                    Sign Up {/* ✅ Fixed missing text */}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;