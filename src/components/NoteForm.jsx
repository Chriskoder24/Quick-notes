import React, {useState} from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebaseconfig"
import { useAuth } from "../context/AuthContext"
import { PenLine } from "lucide-react"


function NoteForm(){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const {currentUser} = useAuth();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError('');
        setSuccess('');

        if(!title.trim()){
            setError("Title is required");
            return;
        }
        try{
            setLoading(true)

            await addDoc(collection(db, 'notes'), {
                title:title.trim(),
                content:content.trim(),
                userId: currentUser.uid,
                createdAt:serverTimestamp()

            })

            setTitle('');
            setContent('');
            setSuccess('Note created successfully! 🎉');
            setTimeout(() => setSuccess(''), 3000); // Clear success after 3s

        } catch (err){
            setError('Failed to create note' + err.message)
        } finally {
            setLoading(false);
        }
    }


    return(
    
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-2 mb-6">
                    <PenLine className="h-6 w-6 text-indigo-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Create a New Note</h2>
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
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter note title"
                            maxLength={100}
                            required
                        />
                    </div>

                    {/* Content Textarea */}
                    <div className="mb-6">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                            Content
                        </label>
                        <textarea
                            id="content"
                            rows="5"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Write your note here..."
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors font-medium ${
                            loading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? 'Creating note...' : 'Create Note'}
                    </button>
                </form>
            </div>
        </div>
    
                    );       
}

export default NoteForm