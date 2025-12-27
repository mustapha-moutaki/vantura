import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) return null;

    const isAdmin = user.role?.toLowerCase() === 'admin';
    const isUser = user.role?.toLowerCase() === 'user';
    const fullName = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : (user.name || 'User');

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-teal-400 rounded-lg shadow-lg shadow-indigo-200 flex items-center justify-center">
                                <span className="text-white font-black text-lg">V</span>
                            </div>
                            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500 tracking-tighter">
                                VANTURA
                            </span>
                        </div>
                        <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                            {(isAdmin || isUser) && (
                                <>
                                    <Link
                                        to="/forums"
                                        className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-500 text-sm font-semibold transition-all"
                                    >
                                        Forums
                                    </Link>
                                    <Link
                                        to="/blogs"
                                        className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-500 text-sm font-semibold transition-all"
                                    >
                                        Blogs
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{user.role}</span>
                            <span className="text-sm font-bold text-gray-800">{fullName}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-gray-900 hover:bg-black text-white px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-gray-200 active:scale-95"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
