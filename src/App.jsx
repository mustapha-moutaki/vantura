import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import UserHome from './pages/UserHome';
import Login from './pages/Login';
import Register from './pages/Register';
import Forums from './pages/Forums';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import ForumDetail from './pages/ForumDetail';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  // While we are fetching user, don't redirect immediately — wait until we know auth state
  if (loading) return null;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.some(role => role.toLowerCase() === user.role?.toLowerCase())) {
    return <Navigate to="/" replace />; // Or a "Not Authorized" page
  }

  return children;
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/home"
              element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <UserHome />
                </ProtectedRoute>
              }
            />

            <Route
              path="/forums"
              element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <Forums />
                </ProtectedRoute>
              }
            />

            <Route
              path="/blogs"
              element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <Blogs />
                </ProtectedRoute>
              }
            />

            <Route 
            path="/forums/:id"
            element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <ForumDetail />
            </ProtectedRoute>
            } 
            />


            <Route
              path="/blog/:id"
              element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <BlogDetail />
                </ProtectedRoute>
              }
            />

            {/* Catch all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
