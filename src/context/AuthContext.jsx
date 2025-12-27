import { createContext, useState, useContext, useEffect } from 'react';
import authService from '../api/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCurrentUser = async () => {
        try {
            const userData = await authService.getCurrentUser();
            if (userData) {
                setUser(userData);
                // تحديث المعرف في التخزين المحلي لضمان بقائه صحيحاً
                localStorage.setItem('userId', userData.id);
            }
        } catch (error) {
            setUser(null);
            localStorage.removeItem('userId'); // مسحه إذا انتهت الجلسة
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const login = async (credentials) => {
        try {
            const data = await authService.login(credentials);
            if (data && data.role) {
                setUser(data);
                
               
                localStorage.setItem('userId', data.id);
                
                return { success: true, role: data.role };
            }
            return { success: false };
        } catch (error) {
            return { success: false, error: error.response?.data || "Login failed" };
        }
    };

    const logout = () => {
        setUser(null);
      
        localStorage.removeItem('userId');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);