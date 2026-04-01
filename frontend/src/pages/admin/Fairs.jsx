import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Plus, CalendarDays, Pencil, Trash2 } from 'lucide-react';
import { fairsAPI } from '../../services/api';

const statusCls   = { agendada: 'badge-available', realizada: 'bg-gray-100 text-gray-500 border border-gray-200', cancelada: 'bg-red-50 text-red-500 border border-red-100' };
const statusLabel = { agendada: 'Agendada', realizada: 'Realizada', cancelada: 'Cancelada' };

const AdminFairs = () => {
  const [fairs, setFairs]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetchFairs = useCallback(async () => {
    setLoading(true);
    try { const { data } = await fairsAPI.getAll(); setFairs(data); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchFairs(); }, [fetchFairs]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Remover "${title}"?`)) return;
    setDeleting(id);
    try { await fairsAPI.remove(id); fetchFairs(); }
    catch { alert('Erro ao remover feirinha.'); }
    finally { setDeleting(null); }
  };

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">Feirinhas</h1>
          <p className="text-xs text-gray-400 mt-0.5">{fairs.length} cadastrada{fairs.length !== 1 ? 's' : ''}</p>
        </div>
        <Link to="/admin/feirinhas/nova" className="btn-primary gap-1.5 text-xs py-2 px-4">
          <Plus size={13} /> Nova Feirinha
        </Link>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="text-center py-16">
            <CalendarDays size={36} strokeWidth={1} className="mx-auto mb-3 text-gray-200 animate-bounce" />
            <p className="text-gray-400 text-sm">Carregando...</p>
          </div>
        ) : fairs.length === 0 ? (
          <div className="text-center py-16">
            <CalendarDays size={36} strokeWidth={1} className="mx-auto mb-3 text-gray-200" />
            <p className="text-gray-400 text-sm mb-4">Nenhuma feirinha cadastrada</p>
            <Link to="/admin/feirinhas/nova" className="btn-primary text-xs gap-1 inline-flex">
              <Plus size={12} /> Cadastrar feirinha
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Título', 'Data', 'Local', 'Status', 'Ações'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {fairs.map((fair) => (
                  <tr key={fair.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-800 max-w-xs truncate">{fair.title}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(fair.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{fair.location_name}</td>
                    <td className="px-4 py-3">
                      <span className={`badge text-[11px] ${statusCls[fair.status] || 'badge-available'}`}>
                        {statusLabel[fair.status] || fair.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <Link to={`/admin/feirinhas/${fair.id}/editar`}
                          className="p-1.5 rounded-lg bg-brand-purple-lighter text-brand-purple hover:bg-brand-purple hover:text-white transition-colors">
                          <Pencil size={13} />
                        </Link>
                        <button onClick={() => handleDelete(fair.id, fair.title)}
                          disabled={deleting === fair.id}
                          className="p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-colors disabled:opacity-40">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminFairs;
