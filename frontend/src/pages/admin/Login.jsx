import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Lock, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminLogin = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && isAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Email ou senha incorretos.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/logo.jpeg" alt="Logo" className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-white/10" />
          <h1 className="text-lg font-extrabold text-white">Pacotinho de Amor</h1>
          <p className="text-gray-500 text-xs uppercase tracking-widest mt-0.5">Área Administrativa</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 border border-white/5 rounded-2xl p-7">
          <div className="flex items-center gap-2 mb-6">
            <Lock size={16} className="text-brand-purple-light" />
            <h2 className="font-bold text-white text-sm">Entrar</h2>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3.5 mb-5 text-sm">
              <AlertCircle size={14} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-white/5 rounded-xl text-sm text-white placeholder:text-gray-600 focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20 transition-colors"
                placeholder="seu@email.com"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-white/5 rounded-xl text-sm text-white placeholder:text-gray-600 focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full justify-center py-3 mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        <a href="/" className="flex items-center justify-center gap-1.5 text-gray-600 hover:text-gray-400 text-sm mt-6 transition-colors">
          <ArrowLeft size={13} /> Voltar ao site
        </a>
      </div>
    </div>
  );
};

export default AdminLogin;
