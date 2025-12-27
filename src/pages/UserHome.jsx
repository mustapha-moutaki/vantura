import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const UserHome = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-12">
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 p-12 sm:p-20 rounded-[4rem] text-white shadow-3xl mb-16">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="text-center md:text-left">
                        <h1 className="text-5xl sm:text-7xl font-black mb-6 tracking-tighter leading-none">
                            Welcome back,<br />
                            <span className="text-indigo-200">{user?.firstName || 'Blogger'}!</span>
                        </h1>
                        <p className="text-xl sm:text-2xl font-medium text-indigo-50/80 max-w-xl leading-relaxed">
                            You have 3 new notifications and 5 recently published stories in your network.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/blogs" className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/20 text-center">
                            Explore Feed
                        </Link>
                        <Link to="/forums" className="bg-indigo-500/30 backdrop-blur-md text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black text-lg transition-all hover:bg-white/10 active:scale-95 text-center">
                            Community
                        </Link>
                    </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-indigo-400/20 rounded-full blur-2xl" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight ml-2 uppercase tracking-[0.2em] text-sm text-gray-400">Your Activity Stack</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="bg-white p-10 rounded-[2.5rem] border-2 border-gray-50 shadow-xl shadow-gray-100/50 group hover:border-indigo-500 transition-all">
                            <h3 className="text-xl font-black text-gray-900 mb-6">Recent Discussions</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 group-hover:bg-indigo-50 transition-colors">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                                    <span className="font-bold text-gray-700">Digital Nomads Forum</span>
                                </li>
                                <li className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50">
                                    <div className="w-2 h-2 bg-gray-300 rounded-full" />
                                    <span className="font-bold text-gray-500">Tech Weekly</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white p-10 rounded-[2.5rem] border-2 border-gray-50 shadow-xl shadow-gray-100/50 group hover:border-purple-500 transition-all">
                            <h3 className="text-xl font-black text-gray-900 mb-6">Bookmarks</h3>
                            <p className="text-gray-500 font-bold italic">No stories saved yet.</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-8 uppercase tracking-[0.2em] text-sm text-gray-400">Pro Insights</h2>
                    <div className="bg-gray-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black mb-4">Level Up Your Content</h3>
                            <p className="text-gray-400 leading-relaxed font-medium mb-8">
                                Blogs with high-quality headers get 40% more engagement. Try using vibrant imagery today.
                            </p>
                            <button className="text-indigo-400 font-black flex items-center space-x-3 group uppercase tracking-widest text-xs">
                                <span>Read Writing Guide</span>
                                <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full -mr-16 -mt-16 blur-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;
