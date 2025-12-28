import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import forumService from '../api/forumService';
import blogService from '../api/blogService'; 
import { useAuth } from '../context/AuthContext';
import CreateBlogModal from '../components/CreateBlogModal';

const ForumDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [forum, setForum] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch Forum Details
                const forumData = await forumService.getById(id);
                setForum(forumData);

                // 2. Fetch Blogs for this Forum
                // Note: Ensure your blogService has a method to get blogs by forum ID
                // If not, you might need to filter client-side or add the endpoint
                const blogsData = await blogService.getByForumId(id); 
                setBlogs(Array.isArray(blogsData) ? blogsData : []);
            } catch (error) {
                console.error('Error fetching forum details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-500 font-medium">Loading forum discussions...</p>
        </div>
    );

    if (!forum) return <div className="p-8 text-center text-red-500 font-bold text-2xl">Forum not found.</div>;

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-12">
            
            {/* --- HERO SECTION (Forum Info) --- */}
            <header className="mb-20 text-center max-w-3xl mx-auto">
                <div className="inline-block px-5 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">
                    Community Forum
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tighter mb-8">
                    {forum.title}
                </h1>
                <p className="text-xl text-gray-500 font-medium leading-relaxed mb-10">
                    {forum.description}
                </p>

                {/* Stats Row */}
                <div className="flex justify-center items-center space-x-12 border-y border-gray-100 py-8">
                    <div className="text-center">
                        <span className="block text-3xl font-black text-gray-900">{blogs.length}</span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Discussions</span>
                    </div>
                    <div className="text-center">
                        <span className="block text-3xl font-black text-gray-900">{forum.userIds?.length || 0}</span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Members</span>
                    </div>
                </div>

                {/* Create Blog Button
                {user && (
                    <div className="mt-10">
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-xl shadow-indigo-100 active:scale-95 uppercase tracking-widest text-sm"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                            Start New Discussion
                        </button>
                    </div>
                )} */}
            </header>


            {/* --- BLOGS LIST SECTION --- */}
            <section>
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                        Latest Discussions
                    </h2>
                </div>

                {blogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {blogs.map((blog) => (
                            <Link 
                                key={blog.id} 
                                to={`/blogs/${blog.id}`}
                                className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:border-indigo-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                            >
                                {/* Category Tag */}
                                <div className="mb-6">
                                    <span className="px-4 py-1.5 bg-gray-50 text-gray-500 group-hover:bg-indigo-600 group-hover:text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors duration-300">
                                        {blog.categoryName || 'General'}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors">
                                    {blog.title}
                                </h3>

                                {/* Excerpt/Preview (Optional) */}
                                <p className="text-gray-500 mb-8 line-clamp-3 font-medium flex-grow">
                                    {blog.content}
                                </p>

                                {/* Author Footer */}
                                <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                                            {blog.authorName?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-gray-900">{blog.authorName}</p>
                                            <p className="text-xs font-bold text-gray-400">
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <span className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                        <p className="text-xl text-gray-400 font-black italic uppercase tracking-widest mb-4">It's quiet in here...</p>
                        <p className="text-gray-500 font-medium">Be the first to start a discussion in this forum!</p>
                    </div>
                )}
            </section>

            {/* Create Blog Modal */}
            {isModalOpen && (
                <CreateBlogModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)}
                    // 👇 This allows the modal to know which forum was clicked
                    preselectedForumId={forum.id} 
                    // Optional: Update list after successful post
                    onSuccess={() => {
                        setIsModalOpen(false);
                        // trigger a refresh of blogs here if needed
                    }}
                />
            )}
        </div>
    );
};

export default ForumDetail;