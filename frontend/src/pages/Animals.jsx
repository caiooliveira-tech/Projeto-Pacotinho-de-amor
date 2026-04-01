import { useState, useEffect, useCallback } from 'react';
import { SlidersHorizontal, Dog, Cat, PawPrint } from 'lucide-react';
import { animalsAPI } from '../services/api';
import AnimalCard from '../components/ui/AnimalCard';

const STATUSES = [
  { value: 'disponivel', label: 'Disponíveis' },
  { value: 'todos',      label: 'Todos'       },
  { value: 'adotado',    label: 'Adotados'    },
];
const SPECIES  = [{ value: '', label: 'Todos' }, { value: 'cachorro', label: 'Cachorros' }, { value: 'gato', label: 'Gatos' }];
const GENDERS  = [{ value: '', label: 'Qualquer' }, { value: 'macho', label: 'Macho' }, { value: 'femea', label: 'Fêmea' }];
const SIZES    = [{ value: '', label: 'Qualquer' }, { value: 'pequeno', label: 'Pequeno' }, { value: 'medio', label: 'Médio' }, { value: 'grande', label: 'Grande' }];

const FilterGroup = ({ label, options, value, onChange }) => (
  <div>
    <p className="label mb-2">{label}</p>
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            value === opt.value
              ? 'bg-brand-purple text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-brand-purple-lighter hover:text-brand-purple'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

const Animals = () => {
  const [animals, setAnimals] = useState([]);
  const [total, setTotal]     = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage]       = useState(1);
  const [filters, setFilters] = useState({ species: '', gender: '', size: '', status: 'disponivel' });
  const limit = 12;

  const fetchAnimals = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await animalsAPI.getAll({ ...filters, page, limit });
      setAnimals(data.data);
      setTotal(data.total);
    } catch { setAnimals([]); }
    finally { setLoading(false); }
  }, [filters, page]);

  useEffect(() => { fetchAnimals(); }, [fetchAnimals]);

  const set = (key, val) => { setFilters((p) => ({ ...p, [key]: val })); setPage(1); };
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      {/* Header */}
      <div className="bg-brand-purple text-white px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">Adoção</p>
          <h1 className="text-5xl font-black mb-3">Animais para<br />Adoção</h1>
          <p className="text-white/70 text-lg max-w-xl">
            Todos prontos para conquistar seu coração. Encontre seu novo melhor amigo.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-[240px_1fr] gap-8">

          {/* Sidebar de filtros */}
          <aside>
            <div className="card p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-5 text-gray-900">
                <SlidersHorizontal size={16} className="text-brand-purple" />
                <span className="font-bold text-sm">Filtros</span>
              </div>
              <div className="space-y-5">
                <FilterGroup label="Status"   options={STATUSES} value={filters.status}  onChange={(v) => set('status', v)} />
                <FilterGroup label="Espécie"  options={SPECIES}  value={filters.species} onChange={(v) => set('species', v)} />
                <FilterGroup label="Gênero"   options={GENDERS}  value={filters.gender}  onChange={(v) => set('gender', v)} />
                <FilterGroup label="Porte"    options={SIZES}    value={filters.size}    onChange={(v) => set('size', v)} />
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div>
            <p className="text-sm text-gray-400 mb-6 font-medium">
              {loading ? 'Buscando...' : `${total} ${total === 1 ? 'animal encontrado' : 'animais encontrados'}`}
            </p>

            {loading ? (
              <div className="text-center py-24 text-gray-300">
                <PawPrint size={56} strokeWidth={1} className="mx-auto mb-4 animate-bounce" />
                <p className="font-medium text-gray-400">Buscando amiguinhos...</p>
              </div>
            ) : animals.length === 0 ? (
              <div className="text-center py-24 text-gray-300">
                <Dog size={56} strokeWidth={1} className="mx-auto mb-4" />
                <p className="font-bold text-gray-500 mb-1">Nenhum animal encontrado</p>
                <p className="text-sm text-gray-400">Tente ajustar os filtros.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {animals.map((animal) => <AnimalCard key={animal.id} animal={animal} />)}
              </div>
            )}

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 hover:border-brand-purple text-gray-500 hover:text-brand-purple disabled:opacity-40 transition-colors">
                  ← Anterior
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-xl text-sm font-bold transition-colors ${p === page ? 'bg-brand-purple text-white' : 'border border-gray-200 text-gray-500 hover:border-brand-purple hover:text-brand-purple'}`}>
                    {p}
                  </button>
                ))}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 hover:border-brand-purple text-gray-500 hover:text-brand-purple disabled:opacity-40 transition-colors">
                  Próxima →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animals;
