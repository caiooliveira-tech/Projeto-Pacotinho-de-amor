import { useEffect, useState } from 'react';
import { CalendarDays, Users, ArrowRight } from 'lucide-react';
import { fairsAPI } from '../services/api';
import FairCard from '../components/ui/FairCard';

const VOLUNTEER_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSc_OlXpmsjbTWKTi9RwrFDS2xDIqvgUlXIywOUt9Oc-DDk23g/viewform';

const Fairs = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast]         = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    Promise.all([
      fairsAPI.getAll({ upcoming: true }),
      fairsAPI.getAll({ status: 'realizada' }),
    ]).then(([up, done]) => {
      setUpcoming(up.data);
      setPast(done.data.slice(0, 6));
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      {/* Header */}
      <div className="bg-brand-purple text-white px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">Eventos</p>
          <h1 className="text-5xl font-black mb-3">Feirinhas de<br />Adoção</h1>
          <p className="text-white/70 text-lg max-w-xl">
            Momentos especiais onde você pode conhecer nossos animais pessoalmente e levar um novo amigo pra casa.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="text-center py-24">
            <CalendarDays size={48} strokeWidth={1} className="mx-auto mb-4 text-gray-300 animate-bounce" />
            <p className="text-gray-400 font-medium">Carregando feirinhas...</p>
          </div>
        ) : (
          <>
            {/* Próximas */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900">Próximas feirinhas</h2>
                {upcoming.length > 0 && (
                  <span className="badge badge-available">
                    {upcoming.length} agendada{upcoming.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {upcoming.length === 0 ? (
                <div className="card p-12 text-center">
                  <CalendarDays size={40} strokeWidth={1} className="mx-auto mb-3 text-gray-300" />
                  <p className="font-semibold text-gray-500 mb-1">Nenhuma feirinha agendada no momento</p>
                  <p className="text-sm text-gray-400 mb-5">Siga nosso Instagram para ficar por dentro!</p>
                  <a href="https://www.instagram.com/projeto.pacotinhodeamor" target="_blank" rel="noopener noreferrer"
                    className="btn-primary text-sm inline-flex gap-1.5">
                    Seguir no Instagram <ArrowRight size={13} />
                  </a>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {upcoming.map((fair) => <FairCard key={fair.id} fair={fair} />)}
                </div>
              )}
            </section>

            {/* Banner voluntário */}
            <section className="bg-brand-yellow rounded-3xl p-8 mb-16">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                    <Users size={22} className="text-brand-purple" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-brand-purple mb-1">Seja voluntário nas feirinhas!</h3>
                    <p className="text-brand-purple/70 text-sm max-w-md">
                      Ajude na organização, divulgação e cuidado dos animais. Venha fazer parte do nosso time!
                    </p>
                  </div>
                </div>
                <a href={VOLUNTEER_FORM} target="_blank" rel="noopener noreferrer"
                  className="btn-primary flex-shrink-0 gap-1.5">
                  Quero ser voluntário <ArrowRight size={13} />
                </a>
              </div>
            </section>

            {/* Realizadas */}
            {past.length > 0 && (
              <section>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Feirinhas realizadas</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {past.map((fair) => <FairCard key={fair.id} fair={fair} />)}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Fairs;
