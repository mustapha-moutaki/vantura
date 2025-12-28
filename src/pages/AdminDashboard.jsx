    import { useState, useEffect } from 'react';
    import forumService from '../api/forumService';
    import categoryService from '../api/categoryService';

    const AdminDashboard = () => {
        const [forums, setForums] = useState([]);
        const [categories, setCategories] = useState([]);
        const [showForumForm, setShowForumForm] = useState(false);
        const [showCategoryForm, setShowCategoryForm] = useState(false);
        const [newForum, setNewForum] = useState({ title: '', description: '' , userId: Number(localStorage.getItem('userId'))    });
        const [newCategory, setNewCategory] = useState({ name: '', description: '' });
        const normalizeArray = (res) => {
            if (Array.isArray(res)) return res;
            if (res?.content && Array.isArray(res.content)) return res.content;
            if (res?.data && Array.isArray(res.data)) return res.data;
            return [];
        };

        useEffect(() => {
            fetchData();
        }, []);

        const fetchData = async () => {
            try {
                const [fData, cData] = await Promise.all([
                    forumService.getAll(),
                    categoryService.getAll()
                ]);

                setForums(normalizeArray(fData));
                setCategories(normalizeArray(cData));
            } catch (error) {
                console.error('Error fetching admin data:', error);
            }
        };


        const handleCreateForum = async (e) => {
            e.preventDefault();
            try {
                await forumService.create(newForum);
                setNewForum({ title: '', description: ''  , userId: Number(localStorage.getItem('userId'))});
                setShowForumForm(false);
                fetchData();
            } catch (error) {
                console.error('Error creating forum:', error);
            }
        };

        const handleCreateCategory = async (e) => {
            e.preventDefault();
            try {
                await categoryService.create(newCategory);
                setNewCategory({ name: '', description: '' } );
                setShowCategoryForm(false);
                fetchData();
            } catch (error) {
                console.error('Error creating category:', error);
            }
        };

        const handleDeleteCategory = async (id) => {
            if (window.confirm('Delete this category?')) {
                await categoryService.delete(id);
                fetchData();
            }
        };

        const handleDeleteForum = async (id) => {
            if (window.confirm('Delete this forum?')) {
                await forumService.delete(id);
                fetchData();
            }
        };

        return (
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-12">
                <header className="mb-12">
                    <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-4">Command Center</h1>
                    <p className="text-xl text-gray-500 font-bold uppercase tracking-widest text-indigo-600">Administrator Privileges Active</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Forum Management */}
                    <section className="bg-white p-10 rounded-[3rem] border-2 border-gray-50 shadow-2xl shadow-gray-100">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-black text-gray-900">Forums</h2>
                            <button
                                onClick={() => setShowForumForm(!showForumForm)}
                                className="bg-indigo-600 text-white p-3 rounded-2xl hover:bg-indigo-700 transition-all font-black"
                            >
                                {showForumForm ? '× Close' : '+ New Forum'}
                            </button>
                        </div>

                        {showForumForm && (
                            <form onSubmit={handleCreateForum} className="mb-10 bg-indigo-50 p-8 rounded-3xl border-2 border-indigo-100">
                                <input
                                    placeholder="Forum Title"
                                    className="w-full p-4 rounded-xl mb-4 border-2 border-indigo-100 focus:border-indigo-500 outline-none transition-all font-bold"
                                    value={newForum.title}
                                    onChange={(e) => setNewForum({ ...newForum, title: e.target.value })}
                                    required
                                />
                                <textarea
                                    placeholder="Forum Description"
                                    className="w-full p-4 rounded-xl mb-4 border-2 border-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium"
                                    value={newForum.description}
                                    onChange={(e) => setNewForum({ ...newForum, description: e.target.value })}
                                    rows="3"
                                />
                                <button type="submit" className="w-full bg-indigo-600 text-white p-4 rounded-xl font-black uppercase tracking-widest shadow-xl shadow-indigo-200">
                                    Create Forum Instance
                                </button>
                            </form>
                        )}

                        {/* <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                            {forums && forums.map(f => (
                                <div key={f.id} className="group flex items-center justify-between p-6 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-indigo-100 transition-all">
                                    <div>
                                        <h3 className="font-black text-gray-900 text-lg">{f.title}</h3>
                                        <p className="text-sm text-gray-500 font-medium">{f.userIds?.length || 0} members • {f.blogsIds?.length || 0} posts</p>
                                    </div>
                                    <button onClick={() => handleDeleteForum(f.id)} className="opacity-0 group-hover:opacity-100 text-red-500 font-black transition-all hover:scale-110">
                                        Terminate
                                    </button>
                                </div>
                            ))}
                        </div> */}
                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
    {/* التحقق مما إذا كانت المصفوفة موجودة وتحتوي على عناصر */}
    {forums && forums.length > 0 ? (
        forums.map((f) => (
            <div 
                key={f.id} 
                className="group flex items-center justify-between p-6 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-md transition-all duration-300"
            >
                <div className="flex-1">
                    <h3 className="font-black text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">
                        {f.title || "Untitled Forum"}
                    </h3>
                    <div className="flex items-center space-x-3 mt-1">
                        <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg font-bold">
                            {f.userIds?.length || 0} Members
                        </span>
                        <span className="text-xs px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg font-bold">
                            {f.blogsIds?.length || 0} Posts
                        </span>
                    </div>
                </div>

                {/* زر الحذف: جعلته يظهر دائماً في الجوال ويختفي في الشاشات الكبيرة حتى يتم تمرير الماوس */}
                <button 
                    onClick={() => handleDeleteForum(f.id)} 
                    className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-xl opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all transform hover:scale-110 active:scale-90"
                    title="Delete Forum"
                >
                    <span className="font-black text-xs uppercase tracking-widest">Terminate</span>
                </button>
            </div>
        ))
    ) : (
        /* رسالة تظهر في حال عدم وجود أي منتدى */
        <div className="text-center py-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
                No active forums found
            </p>
        </div>
    )}
</div>
                    </section>

                    {/* Category Management */}
                    <section className="bg-white p-10 rounded-[3rem] border-2 border-gray-50 shadow-2xl shadow-gray-100">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-black text-gray-900">Categories</h2>
                            <button
                                onClick={() => setShowCategoryForm(!showCategoryForm)}
                                className="bg-indigo-600 text-white p-3 rounded-2xl hover:bg-indigo-700 transition-all font-black"
                            >
                                {showCategoryForm ? '× Close' : '+ New Category'}
                            </button>
                        </div>

                        {showCategoryForm && (
                            <form onSubmit={handleCreateCategory} className="mb-10 bg-indigo-50 p-8 rounded-3xl border-2 border-indigo-100">
                                <input
                                    placeholder="Category Name"
                                    className="w-full p-4 rounded-xl mb-4 border-2 border-indigo-100 focus:border-indigo-500 outline-none transition-all font-bold"
                                    value={newCategory.name}
                                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                    required
                                />
                                <textarea
                                    placeholder="Description (Optional)"
                                    className="w-full p-4 rounded-xl mb-4 border-2 border-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium"
                                    value={newCategory.description}
                                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                    rows="2"
                                />
                                <button type="submit" className="w-full bg-indigo-600 text-white p-4 rounded-xl font-black uppercase tracking-widest shadow-xl shadow-indigo-200">
                                    Authorize Category
                                </button>
                            </form>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Array.isArray(categories) && categories.map(c => (
                                <div key={c.id} className="group relative p-6 bg-gray-50 rounded-3xl border-2 border-transparent hover:border-indigo-500 transition-all">
                                    <h3 className="font-black text-gray-900">{c.name}</h3>
                                    <p className="text-xs text-gray-500 font-bold uppercase mb-4 tracking-tighter">{c.blogCount || 0} BLOGS</p>
                                    <button
                                        onClick={() => handleDeleteCategory(c.id)}
                                        className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        );
    };

    export default AdminDashboard;
