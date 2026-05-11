import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SuperAdminLogin from './pages/SuperAdminLogin';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import AdminSignup from './pages/AdminSignup';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import UserCheckFeature from './pages/UserCheckFeature';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/user" />} />
        
        {/* Super Admin Routes */}
        <Route path="/super-admin/login" element={<SuperAdminLogin />} />
        <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />

        {/* Org Admin Routes */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* User Route */}
        <Route path="/user" element={<UserCheckFeature />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
