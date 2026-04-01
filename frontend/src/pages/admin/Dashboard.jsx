import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, CalendarDays, TrendingUp, Home, ArrowRight, Plus, ExternalLink } from 'lucide-react';
import { animalsAPI, fairsAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const StatBox = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5">
    <div className="flex items-start justify-between mb-3">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={16} className="text-white" />
      </div>
    </div>
    <div className="text-2xl font-black text-gray-900 mb-0.5">{value ?? '—'}</div>
    <div className="text-xs text-gray-400 font-medium">{label}</div>
  </div>
);

const statusCls = { disponivel: 'badge-available', adotado: 'badge-adopted', em_processo: 'badge-process' };
const statusLabel = { disponivel: 'Disponível', adotado: 'Adotado', em_processo: 'Em processo' };

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [nextFair, setNextFair] = useState(null);
  const [recentAnimals, setRecentAnimals] = useState([]);

  useEffect(() => {
    animalsAPI.getStats().then(({ data }) => setStats(data));
    fairsAPI.getAll({ upcoming: true }).then(({ data }) => setNextFair(data[0] || null));
    animalsAPI.getAll({ limit: 5 }).then(({ data }) => setRecentAnimals(data.data));
  }, []);

  return (
    <div className="animate-fade-in space-y-6">
      {/* Saudação */}
      <div>
        <h1 className="text-xl font-extrabold text-gray-900">Olá, {user?.name?.split(' ')[0]}!</h1>
        <p className="text-gray-400 text-sm mt-0.5">Aqui está o resumo do projeto</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBox icon={PawPrint}    label="Disponíveis"        value={stats?.disponivel} color="bg-emerald-500" />
        <StatBox icon={Home}        label="Adotados (sistema)" value={stats?.adotados}   color="bg-sky-500"     />
        <StatBox icon={TrendingUp}  label="Total cadastrados"  value={stats?.total}      color="bg-violet-500"  />
        <StatBox icon={PawPrint}    label="Histórico geral"    value="+1.700"            color="bg-brand-purple"/>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Próxima feirinha */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CalendarDays size={15} className="text-brand-purple" />
              <span className="font-bold text-gray-900 text-sm">Próxima Feirinha</span>
            </div>
            <Link to="/admin/feirinhas" className="text-xs text-gray-400 hover:text-brand-purple transition-colors flex items-center gap-0.5">
              Ver todas <ArrowRight size={11} />
            </Link>
          </div>
          {nextFair ? (
            <div>
              <p className="font-semibold text-gray-800 mb-1 text-sm">{nextFair.title}</p>
              <p className="text-xs text-gray-400 mb-3">
                {new Date(nextFair.date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                {' · '}{nextFair.location_name}
              </p>
              <Link to={`/admin/feirinhas/${nextFair.id}/editar`} className="btn-outline text-xs py-1.5 px-3">
                Editar
              </Link>
            </div>
          ) : (
            <div className="text-center py-5">
              <CalendarDays size={28} strokeWidth={1} className="mx-auto mb-2 text-gray-200" />
              <p className="text-sm text-gray-400 mb-3">Nenhuma feirinha agendada</p>
              <Link to="/admin/feirinhas/nova" className="btn-primary text-xs gap-1">
                <Plus size={12} /> Nova Feirinha
              </Link>
            </div>
          )}
        </div>

        {/* Ações rápidas */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-bold text-gray-900 text-sm">Ações rápidas</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { to: '/admin/animais/novo',   icon: PawPrint,     label: 'Novo Animal'   },
              { to: '/admin/feirinhas/nova', icon: CalendarDays, label: 'Nova Feirinha' },
              { to: '/admin/historias',      icon: Home,         label: 'Histórias'     },
              { to: '/adocao',               icon: ExternalLink, label: 'Ver Site', target: '_blank' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  target={item.target}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 hover:bg-brand-purple-lighter hover:text-brand-purple text-gray-500 font-medium text-xs transition-all duration-150 group"
                >
                  <Icon size={14} className="group-hover:text-brand-purple transition-colors" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Animais recentes */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PawPrint size={15} className="text-brand-purple" />
              <span className="font-bold text-gray-900 text-sm">Animais recentes</span>
            </div>
            <Link to="/admin/animais" className="text-xs text-gray-400 hover:text-brand-purple transition-colors flex items-center gap-0.5">
              Ver todos <ArrowRight size={11} />
            </Link>
          </div>
          {recentAnimals.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">Nenhum animal cadastrado.</p>
          ) : (
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="text-left py-2 px-1 text-xs font-semibold text-gray-400">Nome</th>
                    <th className="text-left py-2 px-1 text-xs font-semibold text-gray-400">Espécie</th>
                    <th className="text-left py-2 px-1 text-xs font-semibold text-gray-400">Status</th>
                    <th className="text-left py-2 px-1 text-xs font-semibold text-gray-400"></th>
                  </tr>
                </thead>
                <tbody>
                  {recentAnimals.map((animal) => (
                    <tr key={animal.id} className="border-b border-gray-50 last:border-0">
                      <td className="py-2.5 px-1 font-semibold text-gray-800">{animal.name}</td>
                      <td className="py-2.5 px-1 text-gray-500 capitalize">{animal.species}</td>
                      <td className="py-2.5 px-1">
                        <span className={`badge text-[11px] ${statusCls[animal.status] || 'badge-available'}`}>
                          {statusLabel[animal.status] || animal.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-1">
                        <Link to={`/admin/animais/${animal.id}/editar`}
                          className="text-xs text-brand-purple hover:underline font-medium">
                          Editar
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
