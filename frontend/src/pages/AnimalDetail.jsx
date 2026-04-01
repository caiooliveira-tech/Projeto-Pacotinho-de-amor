import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Dog, Cat, CheckCircle2, XCircle, ChevronRight, MessageCircle, ExternalLink, PawPrint } from 'lucide-react';
import { animalsAPI } from '../services/api';

const ADOPTION_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc1gEo9RoKfEVOoq1ysEhD2mFEKhu8STeAs5JNShcQowYZywg/viewform';

const AnimalDetail = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    animalsAPI.getById(id)
      .then(({ data }) => setAnimal(data))
      .catch(() => setAnimal(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <PawPrint size={48} strokeWidth={1} className="text-brand-purple-light animate-bounce" />
    </div>
  );

  if (!animal) return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <PawPrint size={48} strokeWidth={1} className="mx-auto mb-4 text-gray-300" />
        <h2 className="text-xl font-bold text-gray-600 mb-4">Animal não encontrado</h2>
        <Link to="/adocao" className="btn-primary">← Voltar</Link>
      </div>
    </div>
  );

  const SpeciesIcon = animal.species === 'gato' ? Cat : Dog;
  const isAvailable = animal.status === 'disponivel';
  const statusConfig = {
    disponivel: { label: 'Disponível', cls: 'badge-available' },
    em_processo: { label: 'Em processo', cls: 'badge-process' },
    adotado:     { label: 'Adotado',     cls: 'badge-adopted' },
  };
  const status = statusConfig[animal.status] || statusConfig.disponivel;

  const healthItems = [
    { label: 'Vacinado',    value: animal.vaccinated    },
    { label: 'Castrado',    value: animal.neutered      },
    { label: 'Vermifugado', value: animal.dewormed      },
    { label: 'Microchipado',value: animal.microchipped  },
  ];

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3 px-6">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-brand-purple transition-colors">Início</Link>
          <ChevronRight size={14} />
          <Link to="/adocao" className="hover:text-brand-purple transition-colors">Adoção</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700 font-medium">{animal.name}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* Foto */}
          <div className="card overflow-hidden">
            {animal.photo_main ? (
              <img src={animal.photo_main} alt={animal.name} className="w-full aspect-square object-cover" />
            ) : (
              <div className="w-full aspect-square bg-brand-purple-lighter flex flex-col items-center justify-center text-brand-purple-medium gap-3">
                <SpeciesIcon size={72} strokeWidth={1.2} className="opacity-30" />
                <p className="text-sm font-medium opacity-40">Foto em breve</p>
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <h1 className="text-4xl font-black text-gray-900">{animal.name}</h1>
              <span className={`badge mt-1 flex-shrink-0 ${status.cls}`}>{status.label}</span>
            </div>

            <p className="text-gray-400 mb-6">
              {animal.species === 'gato' ? 'Gato' : 'Cachorro'} ·{' '}
              {animal.gender === 'femea' ? 'Fêmea' : 'Macho'}
              {animal.breed    && ` · ${animal.breed}`}
              {animal.age_label && ` · ${animal.age_label}`}
              {animal.size      && ` · Porte ${animal.size}`}
            </p>

            {/* Saúde */}
            <div className="card p-5 mb-5">
              <p className="label mb-3">Saúde</p>
              <div className="grid grid-cols-2 gap-2">
                {healthItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm">
                    {item.value
                      ? <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0" />
                      : <XCircle     size={15} className="text-gray-200 flex-shrink-0" />}
                    <span className={item.value ? 'text-gray-700' : 'text-gray-300'}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {animal.description && (
              <div className="mb-4">
                <p className="label mb-1">Sobre</p>
                <p className="text-gray-600 text-sm leading-relaxed">{animal.description}</p>
              </div>
            )}

            {animal.personality && (
              <div className="mb-4">
                <p className="label mb-1">Personalidade</p>
                <p className="text-gray-600 text-sm leading-relaxed">{animal.personality}</p>
              </div>
            )}

            {animal.special_needs && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-5">
                <p className="text-amber-700 text-sm font-semibold mb-1">Necessidades especiais</p>
                <p className="text-amber-600 text-sm leading-relaxed">{animal.special_needs}</p>
              </div>
            )}

            {/* CTAs */}
            {isAvailable ? (
              <div className="space-y-2.5">
                <a href={ADOPTION_FORM_URL} target="_blank" rel="noopener noreferrer"
                  className="btn-primary w-full justify-center py-3.5 gap-2">
                  <ExternalLink size={15} /> Preencher formulário de adoção
                </a>
                <a href="https://wa.me/5511994896555" target="_blank" rel="noopener noreferrer"
                  className="btn-outline w-full justify-center gap-2">
                  <MessageCircle size={15} /> Falar pelo WhatsApp
                </a>
              </div>
            ) : animal.status === 'adotado' ? (
              <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 text-center">
                <p className="font-bold text-sky-700 mb-1">{animal.name} já foi adotado!</p>
                <p className="text-sky-600 text-sm mb-4">Mas temos outros amiguinhos esperando por você.</p>
                <Link to="/adocao" className="btn-primary text-sm">Ver disponíveis</Link>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-center">
                <p className="font-medium text-amber-700 mb-1">{animal.name} está em processo de adoção.</p>
                <Link to="/adocao" className="btn-primary text-sm mt-3 inline-flex">Ver disponíveis</Link>
              </div>
            )}
          </div>
        </div>

        {/* Info adoção */}
        <div className="mt-12 card p-6 bg-brand-purple-lighter border-none">
          <p className="font-bold text-brand-purple mb-2">Como funciona o processo de adoção?</p>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            Após o formulário, nossa equipe entra em contato para conhecer melhor seu perfil
            e garantir que seja a combinação perfeita.
          </p>
          <Link to="/como-adotar" className="text-brand-purple font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
            Ver processo completo <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetail;
