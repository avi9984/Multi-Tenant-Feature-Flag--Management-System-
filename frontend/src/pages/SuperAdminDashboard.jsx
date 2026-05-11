import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function SuperAdminDashboard() {
  const [organizations, setOrganizations] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchOrgs = async () => {
    try {
      const res = await API.get('/super-admin/organizations');
      setOrganizations(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/super-admin/login');
      }
    }
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  const handleCreateOrg = async (e) => {
    e.preventDefault();
    try {
      await API.post('/super-admin/organization', { name });
      setName('');
      fetchOrgs();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create organization');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/super-admin/login');
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1 className="title" style={{ marginBottom: 0 }}>Super Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>

      <div className="card mb-4">
        <h2 className="title" style={{ fontSize: '1.25rem' }}>Create Organization</h2>
        {error && <div className="text-danger mb-4">{error}</div>}
        <form onSubmit={handleCreateOrg} className="flex gap-4 items-center">
          <input 
            type="text" 
            className="form-input" 
            placeholder="Organization Name"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Create Org</button>
        </form>
      </div>

      <div className="card">
        <h2 className="title" style={{ fontSize: '1.25rem' }}>Organizations</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map(org => (
                <tr key={org._id}>
                  <td style={{ fontFamily: 'monospace' }}>{org._id}</td>
                  <td>{org.name}</td>
                </tr>
              ))}
              {organizations.length === 0 && (
                <tr>
                  <td colSpan="2" className="text-center text-muted">No organizations found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
