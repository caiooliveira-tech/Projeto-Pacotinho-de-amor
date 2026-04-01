import { Link } from 'react-router-dom';
import { Dog, Cat, CheckCircle2, PawPrint } from 'lucide-react';

const statusConfig = {
  disponivel: { label: 'Disponível', className: 'badge-available' },
  em_processo: { label: 'Em processo', className: 'badge-process' },
  adotado: { label: 'Adotado', className: 'badge-adopted' },
};

const AnimalCard = ({ animal }) => {
  const status = statusConfig[animal.status] || statusConfig.disponivel;
  const SpeciesIcon = animal.species === 'gato' ? Cat : Dog;

  return (
    <Link to={`/adocao/${animal.id}`} className="group block card-hover">
      {/* Foto */}
      <div className="relative overflow-hidden bg-brand-purple-lighter aspect-[4/3]">
        {animal.photo_main ? (
          <img
            src={animal.photo_main}
            alt={animal.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-brand-purple-medium gap-2">
            <SpeciesIcon size={48} strokeWidth={1.2} className="opacity-30" />
            <p className="text-xs font-medium opacity-40">Foto em breve</p>
          </div>
        )}

        {/* Status */}
        <div className="absolute top-3 right-3">
          <span className={`badge shadow-sm backdrop-blur-sm ${status.className}`}>
            {status.label}
          </span>
        </div>

        {animal.featured === 1 && (
          <div className="absolute top-3 left-3">
            <span className="badge bg-brand-yellow text-brand-purple shadow-sm">
              Destaque
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-brand-purple transition-colors leading-tight">
            {animal.name}
          </h3>
          <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-brand-purple-lighter flex items-center justify-center mt-0.5">
            <SpeciesIcon size={14} className="text-brand-purple" />
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-3">
          {animal.gender === 'femea' ? 'Fêmea' : 'Macho'}
          {animal.age_label && ` · ${animal.age_label}`}
          {animal.size && ` · Porte ${animal.size}`}
        </p>

        {/* Health chips */}
        <div className="flex flex-wrap gap-1.5">
          {animal.vaccinated === 1 && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
              <CheckCircle2 size={11} /> Vacinado
            </span>
          )}
          {animal.neutered === 1 && (
            <span className="inline-flex items-center gap-1 text-xs text-sky-600 font-medium">
              <CheckCircle2 size={11} /> Castrado
            </span>
          )}
          {animal.dewormed === 1 && (
            <span className="inline-flex items-center gap-1 text-xs text-violet-600 font-medium">
              <CheckCircle2 size={11} /> Vermifugado
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default AnimalCard;
