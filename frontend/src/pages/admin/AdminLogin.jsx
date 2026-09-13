import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api.js';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('sana_admin_token', res.data.token);
      localStorage.setItem('sana_admin_username', res.data.username);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-teal flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <h1 className="font-display italic text-3xl text-paper text-center mb-8">Sana Trends</h1>
        <form onSubmit={handleSubmit} className="bg-paper p-7 space-y-4">
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-ink/15 px-3 py-2.5 text-sm focus:outline-none focus:border-berry"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-ink/15 px-3 py-2.5 text-sm focus:outline-none focus:border-berry"
          />
          {error && <p className="text-berry text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-white font-medium py-2.5 text-sm hover:bg-berry transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  );
}
