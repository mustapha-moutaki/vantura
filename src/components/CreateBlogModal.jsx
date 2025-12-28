import { useState, useEffect } from 'react';
import blogService from '../api/blogService';
import forumService from '../api/forumService';
import categoryService from '../api/categoryService';
import { useAuth } from '../context/AuthContext';

const CreateBlogModal = ({ isOpen, onClose, onBlogCreated, preselectedForumId }) => {
    const { user } = useAuth();
    const [forums, setForums] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        forumId: preselectedForumId || '',
        categoryId: ''
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchOptions();
        }
    }, [isOpen]);

    const fetchOptions = async () => {
        try {
            const [fData, cData] = await Promise.all([
                forumService.getAll(),
                categoryService.getAll()
            ]);
            const normalizeArray = (res) => {
                if (Array.isArray(res)) return res;
                if (res?.content && Array.isArray(res.content)) return res.content;
                if (res?.data && Array.isArray(res.data)) return res.data;
                return [];
            };

            setForums(normalizeArray(fData));
            setCategories(normalizeArray(cData));
        } catch (error) {
            console.error('Error fetching options:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await blogService.create({
                ...formData,
                userId: user.id
            });
            onBlogCreated();
            onClose();
            setFormData({ title: '', content: '', forumId: '', categoryId: '' });
        } catch (error) {
            console.error('Error creating blog:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl border border-gray-100
                max-h-[90vh] flex flex-col">
                <div className="p-10 overflow-y-auto">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Draft a Story</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors text-3xl font-black">×</button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Headline</label>
                            <input
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full p-6 bg-gray-50 rounded-2xl border-none focus:ring-4 focus:ring-indigo-100 text-xl font-bold placeholder:text-gray-300 transition-all outline-none"
                                placeholder="What's on your mind?"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Forum</label>
                                <select
                                    required
                                    value={formData.forumId}
                                    onChange={(e) => setFormData({ ...formData, forumId: e.target.value })}
                                    className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-4 focus:ring-indigo-100 font-bold text-gray-700 outline-none appearance-none"
                                >
                                    <option value="">Select Destination</option>
                                    {Array.isArray(forums) &&forums.map(f => <option key={f.id} value={f.id}>{f.title}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Category</label>
                                <select
                                    required
                                    value={formData.categoryId}
                                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                    className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-4 focus:ring-indigo-100 font-bold text-gray-700 outline-none appearance-none"
                                >
                                    <option value="">Select Genre</option>
                                    {Array.isArray(categories) && categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Content</label>
                            <textarea
                                required
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="w-full p-6 bg-gray-50 rounded-2xl border-none focus:ring-4 focus:ring-indigo-100 text-lg font-medium min-h-[200px] placeholder:text-gray-300 transition-all outline-none resize-none"
                                placeholder="Write your story here..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white p-6 rounded-2xl font-black text-sm uppercase tracking-[0.3em] shadow-xl shadow-indigo-100 transition-all active:scale-[0.98]"
                        >
                            {submitting ? 'Broadcasting...' : 'Publish Story'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateBlogModal;
