import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Match your actual folder case

function ProtectedRoute({ children }) {
    const { currentUser, loading } = useAuth();

    // Show nothing (or a spinner) while checking authentication
    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    // If not logged in, redirect to login
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // If logged in, show the protected content
    return children;
}

export default ProtectedRoute;