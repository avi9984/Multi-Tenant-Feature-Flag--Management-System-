import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function AdminDashboard() {
  const [flags, setFlags] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchFlags = async () => {
    try {
      const res = await API.get('/feature-flags');
      setFlags(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/admin/login');
      }
    }
  };

  useEffect(() => {
    fetchFlags();
  }, []);

  const handleCreateFlag = async (e) => {
    e.preventDefault();
    try {
      await API.post('/feature-flags/create', { name, description, enabled });
      setName('');
      setDescription('');
      setEnabled(false);
      fetchFlags();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create feature flag');
    }
  };

  const toggleFlag = async (id, currentStatus) => {
    try {
      await API.put(`/feature-flags/update/${id}`, { enabled: !currentStatus });
      fetchFlags();
    } catch (err) {
      alert('Failed to update flag');
    }
  };

  const deleteFlag = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await API.delete(`/feature-flags/delete/${id}`);
      fetchFlags();
    } catch (err) {
      alert('Failed to delete flag');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1 className="title" style={{ marginBottom: 0 }}>Organization Dashboard</h1>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>

      <div className="card mb-4">
        <h2 className="title" style={{ fontSize: '1.25rem' }}>Create Feature Flag</h2>
        {error && <div className="text-danger mb-4">{error}</div>}
        <form onSubmit={handleCreateFlag} className="flex gap-4 items-center" style={{ flexWrap: 'wrap' }}>
          <input 
            type="text" 
            className="form-input" 
            style={{ flex: 1, minWidth: '200px' }}
            placeholder="Feature Name (Key)"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <input 
            type="text" 
            className="form-input" 
            style={{ flex: 2, minWidth: '250px' }}
            placeholder="Description"
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
          <label className="flex items-center gap-2 text-muted" style={{ cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            Enabled
          </label>
          <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Create Flag</button>
        </form>
      </div>

      <div className="card">
        <h2 className="title" style={{ fontSize: '1.25rem' }}>Feature Flags</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name (Key)</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {flags.map(flag => (
                <tr key={flag._id}>
                  <td style={{ fontWeight: 500 }}>{flag.name}</td>
                  <td className="text-muted">{flag.description}</td>
                  <td>
                    <span className={`badge ${flag.enabled ? 'badge-success' : 'badge-danger'}`}>
                      {flag.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button onClick={() => toggleFlag(flag._id, flag.enabled)} className="btn btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>
                        Toggle
                      </button>
                      <button onClick={() => deleteFlag(flag._id)} className="btn btn-danger" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {flags.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">No feature flags found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
