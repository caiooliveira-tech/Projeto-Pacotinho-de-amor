import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Dog, Cat, Star, Trash2, Pencil } from 'lucide-react';
import { animalsAPI } from '../../services/api';

const statusCls   = { disponivel: 'badge-available', em_processo: 'badge-process', adotado: 'badge-adopted' };
const statusLabel = { disponivel: 'Disponível',      em_processo: 'Em processo',   adotado: 'Adotado'       };

const STATUSES = [
  { value: 'todos',      label: 'Todos'       },
  { value: 'disponivel', label: 'Disponíveis' },
  { value: 'em_processo',label: 'Em processo' },
  { value: 'adotado',    label: 'Adotados'    },
];
const SPECIES = [{ value: '', label: 'Todos' }, { value: 'cachorro', label: 'Cães' }, { value: 'gato', label: 'Gatos' }];

const AdminAnimals = () => {
  const [animals, setAnimals]     = useState([]);
  const [total, setTotal]         = useState(0);
  const [loading, setLoading]     = useState(true);
  const [page, setPage]           = useState(1);
  const [statusFilter, setStatus] = useState('todos');
  const [speciesFilter, setSpecies] = useState('');
  const [deleting, setDeleting]   = useState(null);
  const limit = 15;

  const fetchAnimals = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit, status: statusFilter };
      if (speciesFilter) params.species = speciesFilter;
      const { data } = await animalsAPI.getAll(params);
      setAnimals(data.data);
      setTotal(data.total);
    } finally { setLoading(false); }
  }, [page, statusFilter, speciesFilter]);

  useEffect(() => { fetchAnimals(); }, [fetchAnimals]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remover "${name}"? Esta ação não pode ser desfeita.`)) return;
    setDeleting(id);
    try { await animalsAPI.remove(id); fetchAnimals(); }
    catch { alert('Erro ao remover animal.'); }
    finally { setDeleting(null); }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">Animais</h1>
          <p className="text-xs text-gray-400 mt-0.5">{total} cadastrado{total !== 1 ? 's' : ''}</p>
        </div>
        <Link to="/admin/animais/novo" className="btn-primary gap-1.5 text-xs py-2 px-4">
          <Plus size={13} /> Novo Animal
        </Link>
      </div>

      {/* Filtros */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-wrap gap-4">
        <div>
          <p className="label mb-2">Status</p>
          <div className="flex gap-1.5 flex-wrap">
            {STATUSES.map((s) => (
              <button key={s.value} onClick={() => { setStatus(s.value); setPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${statusFilter === s.value ? 'bg-brand-purple text-white' : 'bg-gray-100 text-gray-500 hover:bg-brand-purple-lighter hover:text-brand-purple'}`}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="label mb-2">Espécie</p>
          <div className="flex gap-1.5">
            {SPECIES.map((s) => (
              <button key={s.value} onClick={() => { setSpecies(s.value); setPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${speciesFilter === s.value ? 'bg-brand-purple text-white' : 'bg-gray-100 text-gray-500 hover:bg-brand-purple-lighter hover:text-brand-purple'}`}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-gray-300">
            <Dog size={36} strokeWidth={1} className="mx-auto mb-3 animate-bounce" />
            <p className="text-gray-400 text-sm">Carregando...</p>
          </div>
        ) : animals.length === 0 ? (
          <div className="text-center py-16 text-gray-300">
            <Dog size={36} strokeWidth={1} className="mx-auto mb-3" />
            <p className="text-gray-400 text-sm mb-4">Nenhum animal encontrado</p>
            <Link to="/admin/animais/novo" className="btn-primary text-xs gap-1 inline-flex">
              <Plus size={12} /> Cadastrar animal
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['Foto', 'Nome', 'Espécie', 'Gênero', 'Status', 'Destaque', 'Ações'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {animals.map((animal) => {
                    const Icon = animal.species === 'gato' ? Cat : Dog;
                    return (
                      <tr key={animal.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3">
                          {animal.photo_main
                            ? <img src={animal.photo_main} alt={animal.name} className="w-9 h-9 rounded-xl object-cover" />
                            : <div className="w-9 h-9 rounded-xl bg-brand-purple-lighter flex items-center justify-center"><Icon size={14} className="text-brand-purple" /></div>
                          }
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-800">{animal.name}</td>
                        <td className="px-4 py-3 text-gray-500 capitalize">{animal.species}</td>
                        <td className="px-4 py-3 text-gray-500">{animal.gender === 'femea' ? 'Fêmea' : 'Macho'}</td>
                        <td className="px-4 py-3">
                          <span className={`badge text-[11px] ${statusCls[animal.status] || 'badge-available'}`}>
                            {statusLabel[animal.status] || animal.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {animal.featured ? <Star size={14} className="text-brand-yellow fill-brand-yellow mx-auto" /> : <span className="text-gray-200">—</span>}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5">
                            <Link to={`/admin/animais/${animal.id}/editar`}
                              className="p-1.5 rounded-lg bg-brand-purple-lighter text-brand-purple hover:bg-brand-purple hover:text-white transition-colors">
                              <Pencil size={13} />
                            </Link>
                            <button onClick={() => handleDelete(animal.id, animal.name)}
                              disabled={deleting === animal.id}
                              className="p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-colors disabled:opacity-40">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center gap-1.5 p-4 border-t border-gray-50">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-500 hover:bg-brand-purple hover:text-white disabled:opacity-40 transition-colors">
                  ← Ant.
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${p === page ? 'bg-brand-purple text-white' : 'bg-gray-100 text-gray-500 hover:bg-brand-purple-lighter'}`}>
                    {p}
                  </button>
                ))}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-500 hover:bg-brand-purple hover:text-white disabled:opacity-40 transition-colors">
                  Próx. →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminAnimals;
