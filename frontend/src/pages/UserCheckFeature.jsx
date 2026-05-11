import { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

export default function UserCheckFeature() {
  const [featureKey, setFeatureKey] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCheck = async (e) => {
    e.preventDefault();
    setResult(null);
    setError('');
    
    try {
      const res = await API.post('/user/check-feature', { featureKey, organizationId });
      setResult(res.data.enabled);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Feature not found for this organization');
      } else {
        setError(err.response?.data?.message || 'Error checking feature');
      }
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="title text-center">Check Feature Flag</h2>
        <form onSubmit={handleCheck}>
          <div className="form-group">
            <label className="form-label">Organization ID</label>
            <input 
              type="text" 
              className="form-input" 
              value={organizationId} 
              onChange={(e) => setOrganizationId(e.target.value)} 
              required 
              placeholder="e.g. 64abc123..."
            />
          </div>
          <div className="form-group">
            <label className="form-label">Feature Key (Name)</label>
            <input 
              type="text" 
              className="form-input" 
              value={featureKey} 
              onChange={(e) => setFeatureKey(e.target.value)} 
              required 
              placeholder="e.g. NEW_UI"
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Check Status</button>
        </form>

        {error && (
          <div className="mt-4 p-4 text-center text-danger" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
            {error}
          </div>
        )}

        {result !== null && (
          <div className="mt-4 p-4 text-center" style={{ 
            backgroundColor: result ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
            color: result ? 'var(--success)' : 'var(--danger)',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>
            {result ? 'Feature is ENABLED' : 'Feature is DISABLED'}
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-4 text-muted">
        <Link to="/admin/login" className="nav-link">Org Admin Login</Link>
        <span>|</span>
        <Link to="/super-admin/login" className="nav-link">Super Admin Login</Link>
      </div>
    </div>
  );
}
