import React, { useState, useEffect } from 'react';
import NoteForm from '../components/NoteForm';
import Notecard from '../components/Notecard'; // ✅ Check case sensitivity!
import EditNote from '../components/EditNote'; // ✅ Import EditNote
import { db } from '../firebaseconfig';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { StickyNote, FileWarning, Loader2 } from 'lucide-react';

function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingNote, setEditingNote] = useState(null); // ✅ Added this!
    const { currentUser } = useAuth();

    // ✅ Handle delete
    const handleDelete = (noteId) => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
    };

    // ✅ Handle edit (updates the note in the list)
    const handleEdit = (updatedNote) => {
        setNotes(prevNotes => 
            prevNotes.map(note => 
                note.id === updatedNote.id ? updatedNote : note
            )
        );
        setEditingNote(null); // Close modal
    };

    useEffect(() => {
        if (!currentUser) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");

        const notesQuery = query(
            collection(db, 'notes'),
            where('userId', '==', currentUser.uid)
        );

        const unsubscribe = onSnapshot(
            notesQuery,
            (querySnapshot) => {
                const notesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                notesData.sort((a, b) => {
                    const timeA = a.createdAt?.toMillis?.() || 0;
                    const timeB = b.createdAt?.toMillis?.() || 0;
                    return timeB - timeA;
                });

                setNotes(notesData);
                setLoading(false);
            },
            (err) => {
                console.error("Error fetching notes:", err);
                setError("Failed to load notes. Please try refreshing the page.");
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [currentUser]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mb-3" />
                    <p className="text-gray-500">Loading your notes...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 text-red-700 p-4 rounded-md border border-red-200">
                    <p className="font-medium">⚠️ {error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                    >
                        Refresh page
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2 mb-6">
                        <StickyNote className="h-6 w-6 text-indigo-600" />
                        <span>Your Notes</span>
                        <span className="text-sm font-normal text-gray-500">
                            ({notes.length} {notes.length === 1 ? 'note' : 'notes'})
                        </span>
                    </h1>
                    
                    <NoteForm />
                </div>

                {notes.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                        <FileWarning className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No notes yet</h3>
                        <p className="text-gray-500">Create your first note to get started! ✏️</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                        {notes.map((note) => (
                            <Notecard
                                key={note.id}
                                note={note}
                                onDelete={handleDelete}
                                onEdit={() => setEditingNote(note)} // ✅ Pass edit handler
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* ✅ EditNote Modal - This was missing! */}
            {editingNote && (
                <EditNote
                    note={editingNote}
                    onClose={() => setEditingNote(null)}
                    onUpdate={handleEdit}
                />
            )}
        </>
    );
}

export default Dashboard;