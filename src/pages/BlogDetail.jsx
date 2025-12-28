import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import blogService from '../api/blogService';
import commentService from '../api/commentService';
import { useAuth } from '../context/AuthContext';

const BlogDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchBlogData();
    }, [id]);

    const fetchBlogData = async () => {
        try {
            const blogData = await blogService.getById(id);
            setBlog(blogData);
        } catch (error) {
            console.error('Error fetching blog:', error);
            setBlog(null);
        }

        try {
            const commentsData = await commentService.getByBlogId(id);
            setComments(Array.isArray(commentsData) ? commentsData : []);
        } catch (error) {
            console.error('Error fetching comments:', error);
            setComments([]);
        } finally {
            setLoading(false);
        }
    };


    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setSubmitting(true);
        try {
            const comment = await commentService.create({
                content: newComment,
                userId: user.id,
                blogId: id
            });
            setComments([...comments, comment]);
            setNewComment('');
        } catch (error) {
            console.error('Error posting comment:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading story...</div>;
    if (!blog) return <div className="p-8 text-center text-red-500 font-bold text-2xl">Story not found.</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-12">
            {/* Hero Section */}
            <article className="mb-20">
                <header className="mb-12">
                    <div className="flex items-center space-x-3 mb-8">
                        <span className="px-5 py-2 bg-indigo-600 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-100">
                            {blog.categoryName}
                        </span>
                        <span className="text-gray-400 font-bold">•</span>
                        <time className="text-gray-500 font-bold text-sm">{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                    </div>
                    <h1 className="text-6xl font-black text-gray-900 leading-[1.1] tracking-tighter mb-10">
                        {blog.title}
                    </h1>
                    <div className="flex items-center justify-between p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                        <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-black shadow-xl">
                                {blog.authorName?.charAt(0) || 'A'}
                            </div>
                            <div>
                                <p className="text-lg font-black text-gray-900 leading-tight">{blog.authorName}</p>
                                <p className="text-sm text-gray-500 font-bold">Author & Contributor</p>
                            </div>
                        </div>
                        <div className="hidden sm:block text-right">
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Posted in</p>
                            <p className="text-indigo-600 font-black">{blog.forumTitle}</p>
                        </div>
                    </div>
                </header>

                <div className="aspect-video w-full bg-gray-100 rounded-[3rem] overflow-hidden mb-16 shadow-2xl">
                    <img
                        src={`https://picsum.photos/seed/${blog.id}/1200/800`}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="prose prose-xl prose-indigo max-w-none text-gray-800 leading-relaxed font-medium">
                    {blog.content.split('\n').map((para, i) => (
                        <p key={i} className="mb-8">{para}</p>
                    ))}
                </div>
            </article>

            {/* Comments Section */}
            <section className="pt-20 border-t-4 border-gray-50">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">
                        Comments <span className="text-indigo-600 ml-1">{comments.length}</span>
                    </h2>
                </div>

                {user ? (
                    <form onSubmit={handleCommentSubmit} className="mb-16 bg-white p-8 rounded-[2.5rem] border-2 border-indigo-50 shadow-2xl shadow-indigo-50/50">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Share your thoughts..."
                            className="w-full p-6 text-lg bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-100 min-h-[150px] transition-all resize-none outline-none font-medium text-gray-800 placeholder:text-gray-400"
                            required
                        />
                        <div className="flex justify-end mt-6">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-xl shadow-indigo-100 active:scale-95 flex items-center space-x-3 uppercase tracking-widest text-sm"
                            >
                                {submitting ? 'Posting...' : 'Post Comment'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="bg-gray-50 p-8 rounded-3xl text-center mb-16">
                        <p className="text-gray-600 font-bold mb-4">You must be logged in to join the conversation.</p>
                        <button className="text-indigo-600 font-black underline underline-offset-4">Log in to continue</button>
                    </div>
                )}

                <div className="space-y-8">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex space-x-6 p-8 rounded-3xl hover:bg-gray-50 transition-colors group">
                            <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-lg">
                                {comment.authorName?.charAt(0) || 'U'}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-black text-gray-900">{comment.authorName}</h4>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-gray-700 text-lg leading-relaxed font-medium">{comment.content}</p>
                            </div>
                        </div>
                    ))}
                    {comments.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-400 font-black text-xl italic uppercase tracking-widest">No comments yet. Start the buzz!</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default BlogDetail;
