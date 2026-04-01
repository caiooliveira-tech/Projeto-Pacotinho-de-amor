import { Calendar, Clock, MapPin, CalendarDays } from 'lucide-react';

const statusConfig = {
  agendada: { label: 'Em breve', className: 'badge-available' },
  realizada: { label: 'Realizada', className: 'bg-gray-100 text-gray-500 border border-gray-200' },
  cancelada: { label: 'Cancelada', className: 'bg-red-50 text-red-500 border border-red-100' },
};

const formatDate = (dateStr) =>
  new Date(dateStr + 'T00:00:00').toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

const formatTime = (t) => t?.slice(0, 5) ?? '';

const FairCard = ({ fair }) => {
  const status = statusConfig[fair.status] || statusConfig.agendada;
  const isUpcoming = fair.status === 'agendada';

  return (
    <div className={`card overflow-hidden ${isUpcoming ? 'border-brand-yellow border-2' : ''}`}>
      {/* Foto */}
      <div className="relative aspect-video bg-brand-purple-lighter overflow-hidden">
        {fair.cover_photo ? (
          <img src={fair.cover_photo} alt={fair.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-brand-purple-medium gap-2">
            <CalendarDays size={44} strokeWidth={1.2} className="opacity-30" />
            <p className="text-xs font-medium opacity-40">Feirinha de Adoção</p>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className={`badge text-xs shadow-sm backdrop-blur-sm ${status.className}`}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-extrabold text-gray-900 mb-4 leading-snug">{fair.title}</h3>

        <ul className="space-y-2 mb-4">
          <li className="flex items-start gap-2.5 text-sm text-gray-500">
            <Calendar size={14} className="text-brand-purple mt-0.5 flex-shrink-0" />
            <span className="capitalize">{formatDate(fair.date)}</span>
          </li>
          <li className="flex items-center gap-2.5 text-sm text-gray-500">
            <Clock size={14} className="text-brand-purple flex-shrink-0" />
            <span>
              {formatTime(fair.start_time)}
              {fair.end_time && ` às ${formatTime(fair.end_time)}`}
            </span>
          </li>
          <li className="flex items-start gap-2.5 text-sm text-gray-500">
            <MapPin size={14} className="text-brand-purple mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-700">{fair.location_name}</p>
              {fair.address && <p className="text-gray-400 text-xs mt-0.5">{fair.address}</p>}
              {(fair.city || fair.state) && (
                <p className="text-gray-400 text-xs">{[fair.city, fair.state].filter(Boolean).join(' — ')}</p>
              )}
            </div>
          </li>
        </ul>

        {fair.description && (
          <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{fair.description}</p>
        )}

        {fair.maps_link && isUpcoming && (
          <a href={fair.maps_link} target="_blank" rel="noopener noreferrer"
            className="btn-primary w-full justify-center text-sm gap-1.5">
            <MapPin size={13} /> Ver no Mapa
          </a>
        )}
      </div>
    </div>
  );
};

export default FairCard;
