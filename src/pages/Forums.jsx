import { useState, useEffect } from 'react';
import forumService from '../api/forumService';
import { useAuth } from '../context/AuthContext';

const Forums = () => {
    const [forums, setForums] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const isAdmin = user?.role?.toLowerCase() === 'admin';

    useEffect(() => {
        fetchForums();
    }, []);

    const fetchForums = async () => {
        try {
            const data = await forumService.getAll();
            setForums(data);
        } catch (error) {
            console.error('Error fetching forums:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading forums...</div>;

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Community Forums</h1>
                    <p className="text-gray-500 mt-2 text-lg">Join discussions and share your thoughts.</p>
                </div>
                {isAdmin && (
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-100 active:scale-95">
                        Create New Forum
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {forums.map((forum) => (
                    <div key={forum.id} className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                        <div className="flex items-start justify-between mb-6">
                            <div className="p-4 bg-indigo-50 rounded-2xl group-hover:bg-indigo-600 transition-colors duration-300">
                                <svg className="w-8 h-8 text-indigo-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">{forum.title}</h2>
                        <p className="text-gray-600 mb-8 line-clamp-2 text-lg leading-relaxed">{forum.description}</p>
                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                            <div className="flex space-x-4">
                                <div className="text-center">
                                    <span className="block text-xl font-bold text-gray-900">{forum.blogsIds?.length || 0}</span>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Blogs</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-xl font-bold text-gray-900">{forum.userIds?.length || 0}</span>
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

            {forums.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-xl text-gray-500 font-medium">No forums found. Be the first to start a conversation!</p>
                </div>
            )}
        </div>
    );
};

export default Forums;
