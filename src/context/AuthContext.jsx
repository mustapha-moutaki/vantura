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
                localStorage.setItem('userId', userData.id);
            }
        } catch (error) {
            setUser(null);
            localStorage.removeItem('userId'); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    // --- KEEPING LOGIN LOGIC UNCHANGED ---
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

    // --- ADDING REGISTER LOGIC ---
    const register = async (userData) => {
        try {
            const data = await authService.register(userData);
            // We return success true so the component can redirect to login
            return { success: true, data };
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data || "Registration failed" 
            };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userId');
    };

    return (
        /* Added 'register' to the value object below */
        <AuthContext.Provider value={{ user, login, logout, loading, register }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);