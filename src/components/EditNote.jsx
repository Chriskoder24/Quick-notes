import React, { useState, useEffect } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { useAuth } from "../Context/AuthContext";
import { PenLine, X } from "lucide-react";

function EditNote({ note, onClose, onUpdate }) { // ✅ Receives onUpdate
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { currentUser } = useAuth();

    useEffect(() => {
        if (note) {
            setTitle(note.title || "");
            setContent(note.content || "");
        }
    }, [note]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (note.userId !== currentUser?.uid) {
            setError("You don't have permission to edit this note");
            return;
        }

        if (!title.trim()) {
            setError("Title is required");
            return;
        }

        try {
            setLoading(true);

            const noteRef = doc(db, 'notes', note.id); // ✅ 'notes' plural
            await updateDoc(noteRef, {
                title: title.trim(),
                content: content.trim(),
                updatedAt: serverTimestamp()
            });

            setSuccess("Note updated successfully! 🎉");
            
            // ✅ Call onUpdate to update parent state
            if (onUpdate) {
                onUpdate({
                    ...note,
                    title: title.trim(),
                    content: content.trim(),
                    updatedAt: new Date()
                });
            }

            // Close after success
            setTimeout(() => {
                onClose();
            }, 1000);

        } catch (err) {
            setError('Failed to update note: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2">
                            <PenLine className="h-6 w-6 text-indigo-600" />
                            <h2 className="text-2xl font-bold text-gray-900">Edit Note</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="bg-green-50 text-green-700 p-3 rounded-md mb-4 text-sm">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Title Input */}
                        <div className="mb-4">
                            <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                id="edit-title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter note title"
                                required
                            />
                        </div>

                        {/* Content Textarea */}
                        <div className="mb-6">
                            <label htmlFor="edit-content" className="block text-sm font-medium text-gray-700 mb-1">
                                Content
                            </label>
                            <textarea
                                id="edit-content"
                                rows="6"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Write your note here..."
                                required
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors font-medium ${
                                    loading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                            >
                                {loading ? 'Updating...' : 'Update Note'}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditNote;