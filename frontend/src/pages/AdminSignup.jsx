import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

export default function AdminSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', { name, email, password, organizationId });
      navigate('/admin/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="title text-center">Org Admin Signup</h2>
        {error && <div className="text-danger mb-4 text-center">{error}</div>}
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input 
              type="text" 
              className="form-input" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Organization ID</label>
            <input 
              type="text" 
              className="form-input" 
              value={organizationId} 
              onChange={(e) => setOrganizationId(e.target.value)} 
              required 
              placeholder="Enter Org ID from Super Admin"
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign Up</button>
        </form>
        <div className="text-center mt-4">
          <Link to="/admin/login" className="nav-link">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
}
