import { useState, useEffect } from 'react';
import forumService from '../api/forumService';
import { useAuth } from '../context/AuthContext';

const Forums = () => {
    const [forums, setForums] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    
    // Safety check for user role
    const isAdmin = user?.role?.toLowerCase() === 'admin';

    useEffect(() => {
        fetchForums();
    }, []);

    const fetchForums = async () => {
        try {
            const response = await forumService.getAll();
            
            /**
             * FIX: Handle different API response structures.
             * If response is an array, use it.
             * If it's a Spring Boot Page object, use response.content.
             * If it's a generic wrapper, use response.data.
             */
            if (Array.isArray(response)) {
                setForums(response);
            } else if (response && Array.isArray(response.content)) {
                setForums(response.content);
            } else if (response && Array.isArray(response.data)) {
                setForums(response.data);
            } else {
                setForums([]); // Fallback to empty array if format is unknown
            }
        } catch (error) {
            console.error('Error fetching forums:', error);
            setForums([]); // Ensure state is an array even on error
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-gray-500 font-medium">Loading community forums...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Community Forums</h1>
                    <p className="text-gray-500 mt-2 text-lg">Join discussions and share your thoughts with the community.</p>
                </div>
                {isAdmin && (
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-100 active:scale-95 whitespace-nowrap">
                        + Create New Forum
                    </button>
                )}
            </div>

            {/* Added safety check (forums?.length > 0) */}
            {forums && forums.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {forums.map((forum) => (
                        <div key={forum.id} className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-4 bg-indigo-50 rounded-2xl group-hover:bg-indigo-600 transition-colors duration-300">
                                    <svg className="w-8 h-8 text-indigo-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                    </svg>
                                </div>
                            </div>
                            
                            <div className="flex-grow">
                                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                    {forum.title}
                                </h2>
                                <p className="text-gray-600 mb-8 line-clamp-2 text-lg leading-relaxed">
                                    {forum.description}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                                <div className="flex space-x-4">
                                    <div className="text-center">
                                        <span className="block text-xl font-bold text-gray-900">
                                            {forum.blogsIds?.length || 0}
                                        </span>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Blogs</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-xl font-bold text-gray-900">
                                            {forum.userIds?.length || 0}
                                        </span>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Members</span>
                                    </div>
                                </div>
                                <button className="text-indigo-600 font-black hover:text-indigo-800 transition-colors uppercase tracking-widest text-sm underline decoration-2 underline-offset-8">
                                    Enter Forum
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <div className="mb-4 flex justify-center">
                         <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <p className="text-xl text-gray-500 font-medium">No forums found. Be the first to start a conversation!</p>
                </div>
            )}
        </div>
    );
};

export default Forums;