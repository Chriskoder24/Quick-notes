import React, { useState } from "react";
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from "../firebaseconfig";
import { useAuth } from "../context/AuthContext";
import { Trash2, PenLine, Clock } from "lucide-react";

function Notecard({ note, onDelete, onEdit }) {
    const { currentUser } = useAuth();
    const [deleting, setDeleting] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [error, setError] = useState("");

    const formatDate = (timestamp) => {
        if (!timestamp) return "Just now";
        try {
            const date = timestamp.toDate();
            return new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            }).format(date);
        } catch (err) {
            return "Invalid date";
        }
    };

    const handleDelete = async () => {
        if (!confirmDelete) {
            setConfirmDelete(true);
            setTimeout(() => setConfirmDelete(false), 3000);
            return;
        }

        if (note.userId !== currentUser?.uid) {
            setError("You don't have permission to delete this note");
            return;
        }

        try {
            setDeleting(true);
            setError("");
            await deleteDoc(doc(db, 'notes', note.id));
            setDeleting(false);
            setConfirmDelete(false);
            if (onDelete) onDelete(note.id);
        } catch (error) {
            console.error('Error deleting note:', error);
            setError('Failed to delete note. Please try again.');
            setDeleting(false);
            setConfirmDelete(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            {error && (
                <div className="bg-red-50 text-red-700 p-2 rounded-md mb-3 text-sm">
                    {error}
                </div>
            )}

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {note.title || "Untitled"}
            </h3>

            <p className="text-gray-700 mb-4 whitespace-pre-wrap">
                {note.content || "No content"}
            </p>

            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(note.createdAt)}</span>
                    {note.updatedAt && (
                        <span className="text-xs text-gray-400 ml-1">
                            (edited {formatDate(note.updatedAt)})
                        </span>
                    )}
                </div>

                <div className="flex space-x-2">
                    {/* ✅ Edit Button */}
                    <button
                        onClick={() => onEdit(note)}
                        className="text-gray-500 hover:text-indigo-600 transition-colors px-2 py-1 rounded hover:bg-indigo-50"
                    >
                        <PenLine className="h-4 w-4" />
                    </button>

                    {/* Delete Button */}
                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
                            confirmDelete && !deleting
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                        } ${deleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span>
                            {deleting 
                                ? 'Deleting...' 
                                : confirmDelete 
                                    ? 'Confirm' 
                                    : ''
                            }
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Notecard;