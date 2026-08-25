import React from "react";
import {Link} from 'react-router-dom';
import {Notebook, CheckCircle, Zap, Lock} from 'lucide-react'




function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-6">
                        <Notebook className="h-16 w-16 text-indigo-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-600 max-w-2xl mx-auto mb-8">
                        Capture your idea with QuickNotes
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                        A simple, fast, and secure way to keep track of your thoughts, ideas, and important information.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to="/signup" 
                            className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-200/50"
                        >
                            Get started free
                             
                        </Link>
                        <Link 
                            to="/login" 
                            className="inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors shadow-lg"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="bg-white p-6 rounded-xl shadow-sm border-gray-100">
                        <div>
                            <Zap className="h-6 w-6 text-indigo-600 mr-3"/>
                            <h3 className="text-1g font-semibold text-gray-900">Lightining Fast</h3>
                        </div>
                        <p className="text-gray-600">Create and access your notes instantly with our real time sync technology</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border-gray-100">
                        <div>
                            <Lock className="h-6 w-6 text-indigo-600 mr-3"/>
                            <h3 className="text-1g font-semibold text-gray-900">Secure and Private</h3>
                        </div>
                        <p className="text-gray-600">Your notes are protected with enterprise-grade security and encryption</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border-gray-100">
                        <div>
                            <CheckCircle className="h-6 w-6 text-indigo-600 mr-3"/>
                            <h3 className="text-1g font-semibold text-gray-900">Easy to use</h3>
                        </div>
                        <p className="text-gray-600">Clean and intuitive interface that lets you focus on what matters most</p>
                    </div>
                </div>
                
            </div>
            
        </div>
    );
}

export default LandingPage;