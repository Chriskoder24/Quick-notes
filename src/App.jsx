import React from 'react';  // ← ADD THIS LINE - FIXES THE ERROR!
import LandingPage from "./routes/LandingPage";
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import Navebar from "./components/Navebar";
import { useAuth } from "./Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRouter";
import Dashboard from "./routes/Dashboard";

function App() {
  const { loading, currentUser } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-indigo-600 text-xl">Loading QuickNotes</div>
      </div>
    );
  }
  
  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <Navebar />
        <Routes>
          <Route path="/" element={currentUser ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
          <Route path="/login" element={currentUser ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/signup" element={currentUser ? <Navigate to="/dashboard" replace /> : <Signup />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <div className="container mx-auto px-4 py-8">
                <Dashboard />
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;