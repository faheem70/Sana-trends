import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Account() {
  const { user, login, register, updateProfile, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = new URLSearchParams(location.search).get('redirect') || '/orders';
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) setProfile({ ...user });
  }, [user]);

  if (user) {
    return (
      <div className="max-w-xl mx-auto px-5 md:px-8 py-16">
        <p className="text-sm text-ink/50 mb-2">Your account</p>
        <h1 className="font-display text-3xl mb-2">Hello, {user.name}</h1>
        <p className="text-ink/60 mb-8">{user.phone || user.email}</p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError('');
            if ((profile?.phone || '') !== (user.phone || '')) {
              setError('Mobile number changes require OTP verification. This feature is coming soon.');
              return;
            }
            setLoading(true);
            try {
              await updateProfile(profile);
              setError('Profile saved.');
            } catch (err) {
              setError(err.response?.data?.message || 'Unable to update profile');
            } finally {
              setLoading(false);
            }
          }}
          className="space-y-4 mb-8"
        >
          <input required value={profile?.name || ''} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Full name" className="w-full border border-ink/15 px-3 py-3 text-sm" />
          <input type="email" value={profile?.email || ''} onChange={(e) => setProfile({ ...profile, email: e.target.value })} placeholder="Email address (optional)" className="w-full border border-ink/15 px-3 py-3 text-sm" />
          <input value={profile?.phone || ''} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="Mobile number" className="w-full border border-ink/15 px-3 py-3 text-sm" />
          <p className="text-xs text-ink/50">Mobile number changes need OTP verification. Mobile OTP is coming soon.</p>
          <textarea required value={profile?.address || ''} onChange={(e) => setProfile({ ...profile, address: e.target.value })} placeholder="Address" rows={3} className="w-full border border-ink/15 px-3 py-3 text-sm" />
          <div className="grid grid-cols-2 gap-3">
            <input value="Phoolpur" disabled className="w-full border border-ink/10 bg-ink/5 px-3 py-3 text-sm text-ink/50" aria-label="Town" />
            <input value="Azamgarh" disabled className="w-full border border-ink/10 bg-ink/5 px-3 py-3 text-sm text-ink/50" aria-label="City" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input value={profile?.state || ''} onChange={(e) => setProfile({ ...profile, state: e.target.value })} placeholder="State" className="w-full border border-ink/15 px-3 py-3 text-sm" />
            <input value={profile?.pincode || ''} onChange={(e) => setProfile({ ...profile, pincode: e.target.value })} placeholder="Pincode" className="w-full border border-ink/15 px-3 py-3 text-sm" />
          </div>
          {error && <p className={error === 'Profile saved.' ? 'text-teal text-sm' : 'text-berry text-sm'}>{error}</p>}
          <button disabled={loading} className="bg-berry text-white px-5 py-3 text-sm font-medium disabled:opacity-50">{loading ? 'Saving...' : 'Save profile'}</button>
        </form>
        <div className="flex gap-3">
          <Link to="/orders" className="bg-berry text-white px-5 py-3 text-sm font-medium">View my orders</Link>
          <button onClick={logout} className="border border-ink/20 px-5 py-3 text-sm font-medium">Log out</button>
        </div>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') await login(form.email, form.password);
      else await register(form.name, form.email, form.password);
      navigate(redirect);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to continue');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-5 md:px-8 py-16">
      <h1 className="font-display text-3xl mb-2">Your account</h1>
      <p className="text-sm text-ink/55 mb-7">Log in with email to keep every order in one place.</p>
      <div className="flex border-b border-ink/15 mb-6">
        <button type="button" onClick={() => setMode('login')} className={`px-1 pb-3 mr-6 text-sm ${mode === 'login' ? 'border-b-2 border-berry text-berry font-medium' : 'text-ink/50'}`}>Log in</button>
        <button type="button" onClick={() => setMode('register')} className={`px-1 pb-3 text-sm ${mode === 'register' ? 'border-b-2 border-berry text-berry font-medium' : 'text-ink/50'}`}>Sign up</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-ink/15 px-3 py-3 text-sm focus:outline-none focus:border-berry" />}
        <input required type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-ink/15 px-3 py-3 text-sm focus:outline-none focus:border-berry" />
        <input required minLength={6} type="password" placeholder="Password (6+ characters)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full border border-ink/15 px-3 py-3 text-sm focus:outline-none focus:border-berry" />
        {error && <p className="text-berry text-sm">{error}</p>}
        <button disabled={loading} className="w-full bg-berry hover:bg-berry-dark text-white py-3 text-sm font-medium disabled:opacity-50">
          {loading ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Create account'}
        </button>
      </form>
    </div>
  );
}