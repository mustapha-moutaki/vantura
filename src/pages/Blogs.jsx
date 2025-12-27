import { useState, useEffect } from 'react';
import blogService from '../api/blogService';
import { Link } from 'react-router-dom';
import CreateBlogModal from '../components/CreateBlogModal';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const data = await blogService.getAll();
            setBlogs(data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading blogs...</div>;

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
            <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="text-left">
                    <h1 className="text-6xl font-black text-gray-900 mb-4 tracking-tighter">The Blog Feed</h1>
                    <p className="text-xl text-gray-500 max-w-xl leading-relaxed font-medium">
                        Discover stories, thinking, and expertise from writers across the community.
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-[2rem] font-black transition-all shadow-2xl shadow-indigo-100 active:scale-95 uppercase tracking-widest text-sm"
                >
                    Draft a Story
                </button>
            </header>

            <CreateBlogModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onBlogCreated={fetchBlogs}
            />

            <div className="space-y-12">
                {blogs.map((blog) => (
                    <article key={blog.id} className="group relative bg-white flex flex-col md:flex-row gap-8 items-center p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">
                        <div className="w-full md:w-1/3 aspect-[4/3] bg-indigo-50 rounded-[2rem] overflow-hidden">
                            <img
                                src={`https://picsum.photos/seed/${blog.id}/800/600`}
                                alt={blog.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-4">
                                <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {blog.categoryName || 'General'}
                                </span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-500 text-sm font-medium">
                                    {new Date(blog.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors leading-tight">
                                <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                            </h2>
                            <p className="text-gray-600 mb-8 line-clamp-3 text-lg leading-relaxed">
                                {blog.content}
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                        {blog.authorName?.charAt(0) || 'A'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{blog.authorName || 'Anonymous'}</p>
                                        <p className="text-xs text-gray-500 font-medium">Published in {blog.forumTitle || 'Public'}</p>
                                    </div>
                                </div>
                                <Link
                                    to={`/blog/${blog.id}`}
                                    className="flex items-center space-x-2 text-indigo-600 font-black hover:text-indigo-800 transition-all uppercase tracking-widest text-xs"
                                >
                                    <span>Read Story</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {blogs.length === 0 && (
                <div className="text-center py-24">
                    <div className="mb-6 inline-block p-6 bg-gray-50 rounded-full">
                        <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM14 4v4h4" /></svg>
                    </div>
                    <p className="text-2xl font-bold text-gray-400">No stories discovered yet.</p>
                </div>
            )}
        </div>
    );
};

export default Blogs;
