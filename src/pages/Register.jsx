import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '', // Added for UX
        role: 'USER' // Initialized to prevent undefined value
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        setIsSubmitting(true);
        
        // Destructure to remove confirmPassword before sending to API
        const { confirmPassword, ...submitData } = formData;
        const result = await register(submitData);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.error || "Registration failed");
        }
        setIsSubmitting(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-teal-50 p-4">
            <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center space-x-2 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-teal-400 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-black text-xl">V</span>
                        </div>
                        <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500">
                            VANTURA
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded animate-pulse">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="firstName"
                            required
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none"
                        />
                        <input
                            type="text"
                            name="lastName"
                            required
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none"
                        />
                    </div>

                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="password"
                            name="password"
                            required
                            minLength={6}
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none"
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Account Type</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-4 py-3 mt-1 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none bg-white"
                        >
                            <option value="USER">Standard User</option>
                            <option value="ADMIN">Administrator</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Processing...' : 'Register'}
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-600">
                    Already registered? <Link to="/" className="text-indigo-600 font-bold hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;