import React from "react";
import { Link } from 'react-router-dom';
import { Notebook } from "lucide-react";

function Navbar() {
    return (
        <nav className="bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <Notebook className="h-8 w-8 text-indigo-600" />
                        <span className="text-xl font-semibold text-gray-900">
                            QuickNotes
                        </span>
                    </Link>
                    
                    <div className="flex items-center space-x-4">
                        <Link 
                            to="/login" 
                            className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/signup" 
                            className="text-sm font-medium text-white px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            Signup
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;