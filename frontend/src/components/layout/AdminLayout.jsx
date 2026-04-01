import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, PawPrint, CalendarDays, Heart, LogOut, ChevronRight } from 'lucide-react';

const ADMIN_LINKS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/animais', label: 'Animais', icon: PawPrint },
  { to: '/admin/feirinhas', label: 'Feirinhas', icon: CalendarDays },
  { to: '/admin/historias', label: 'Histórias', icon: Heart },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar desktop */}
      <aside className="w-60 bg-gray-950 text-white flex-col fixed inset-y-0 left-0 z-50 hidden md:flex">
        <div className="px-5 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="Logo" className="w-9 h-9 rounded-full" />
            <div>
              <p className="font-bold text-sm text-white leading-tight">Pacotinho de Amor</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {ADMIN_LINKS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-purple text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/5">
          <div className="px-3 mb-2">
            <p className="text-[10px] text-gray-600 uppercase tracking-widest">Usuário</p>
            <p className="text-sm font-medium text-gray-300 truncate">{user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut size={15} />
            Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo */}
      <div className="flex-1 md:ml-60 flex flex-col min-h-screen">
        {/* Top bar mobile */}
        <div className="md:hidden bg-gray-950 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2.5">
            <img src="/logo.jpeg" alt="Logo" className="w-7 h-7 rounded-full" />
            <span className="font-bold text-sm">Admin</span>
          </div>
          <button onClick={handleLogout} className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1">
            <LogOut size={13} /> Sair
          </button>
        </div>

        {/* Nav mobile */}
        <nav className="md:hidden flex gap-1 px-3 py-2 bg-gray-900 border-b border-white/5 overflow-x-auto">
          {ADMIN_LINKS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive ? 'bg-brand-purple text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Icon size={13} />
              {label}
            </NavLink>
          ))}
        </nav>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
