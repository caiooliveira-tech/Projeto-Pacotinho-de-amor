import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Heart, ArrowRight, MapPin, Calendar, Users, ChevronRight } from 'lucide-react';
import { animalsAPI, fairsAPI, storiesAPI } from '../services/api';
import AnimalCard from '../components/ui/AnimalCard';

const Home = () => {
  const [featuredAnimals, setFeaturedAnimals] = useState([]);
  const [nextFair, setNextFair] = useState(null);
  const [story, setStory] = useState(null);
  const [stats, setStats] = useState({ historico: 1700, disponivel: 0 });

  useEffect(() => {
    animalsAPI.getAll({ featured: true, limit: 6 }).then(({ data }) => setFeaturedAnimals(data.data));
    animalsAPI.getStats().then(({ data }) => setStats(data));
    fairsAPI.getAll({ upcoming: true }).then(({ data }) => setNextFair(data[0] || null));
    storiesAPI.getAll().then(({ data }) => setStory(data[0] || null));
  }, []);

  return (
    <div className="animate-fade-in">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-white pt-6 pb-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-end min-h-[80vh]">

            {/* Texto — 7 cols */}
            <div className="lg:col-span-7 pb-16 pt-10 lg:pt-16">
              <div className="inline-flex items-center gap-2 border border-brand-purple/20 text-brand-purple rounded-full px-4 py-1.5 text-xs font-semibold mb-10 bg-brand-purple-lighter/50">
                <PawPrint size={12} />
                Proteção animal independente desde 2019
              </div>

              <h1 className="text-[clamp(3.5rem,8vw,6.5rem)] font-black text-gray-900 leading-[0.88] tracking-tight mb-8">
                Todo<br />
                animal<br />
                merece<br />
                <span className="text-brand-purple">um lar</span>
              </h1>

              <p className="text-lg text-gray-500 mb-10 max-w-md leading-relaxed">
                Resgatamos, cuidamos e encontramos famílias para cães e gatos
                em situação de risco em São Paulo.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/adocao" className="btn-primary gap-2 px-7 py-3.5 text-base">
                  <PawPrint size={16} />
                  Ver animais
                </Link>
                <Link to="/ajude" className="btn-outline gap-2 px-7 py-3.5 text-base">
                  <Heart size={16} />
                  Quero ajudar
                </Link>
              </div>
            </div>

            {/* Visual — 5 cols */}
            <div className="lg:col-span-5 relative flex flex-col h-full justify-end pb-0">
              {/* Bloco amarelo de fundo */}
              <div className="absolute inset-x-0 bottom-0 top-8 bg-brand-yellow rounded-t-[2.5rem]" />

              {/* Card flutuante de estatística */}
              <div className="absolute top-16 -left-6 z-10 bg-white rounded-2xl shadow-xl px-5 py-4 border border-gray-100">
                <span className="block text-3xl font-black text-brand-purple leading-none">+1.700</span>
                <span className="text-xs text-gray-400 font-medium">animais adotados</span>
              </div>

              {/* Imagem / placeholder */}
              <div className="relative z-10 mx-6 rounded-t-[2rem] overflow-hidden bg-brand-purple-lighter aspect-[3/4] flex items-center justify-center">
                <div className="text-center text-brand-purple-medium">
                  <PawPrint size={72} strokeWidth={1} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium opacity-50">Fotos em breve</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAIXA STATS ──────────────────────────────────────── */}
      <section className="bg-brand-purple">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
            {[
              { value: '2019', label: 'Fundação' },
              { value: '+1.700', label: 'Adotados' },
              { value: stats.disponivel || '—', label: 'Disponíveis' },
              { value: '100%', label: 'Dedicação' },
            ].map((s, i) => (
              <div key={i} className="text-center py-4 px-6">
                <div className="text-3xl font-black text-white">{s.value}</div>
                <div className="text-xs text-white/50 uppercase tracking-widest mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE ────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Texto */}
            <div>
              <p className="eyebrow mb-4">Nossa história</p>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
                Feito com amor<br />e muita<br />
                <span className="text-brand-purple">dedicação</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                O Projeto Pacotinho de Amor nasceu em 2019 com uma missão clara:
                dar uma segunda chance para animais em situação de risco. Somos uma organização
                independente, sem fins lucrativos, movida pela paixão pelos animais.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Cada animal que chega até nós recebe cuidados veterinários, carinho e todo o suporte
                necessário até encontrar uma família amorosa. Adotar é um ato de amor que transforma
                duas vidas.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/como-adotar" className="btn-primary">Como funciona</Link>
                <Link to="/ajude" className="btn-ghost text-brand-purple hover:bg-brand-purple-lighter">
                  Seja voluntário <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Cards de valores */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <PawPrint size={22} className="text-brand-purple" />, title: 'Saúde garantida', text: 'Vacinados, castrados e vermifugados antes da adoção.' },
                { icon: <Heart size={22} className="text-brand-purple" />, title: 'Adoção responsável', text: 'Triagem cuidadosa para garantir o melhor lar para cada animal.' },
                { icon: <Users size={22} className="text-brand-purple" />, title: 'Voluntariado', text: 'Contamos com voluntários que ajudam nas feirinhas e no dia a dia.' },
                { icon: <ChevronRight size={22} className="text-brand-purple" />, title: 'Transparência', text: 'Projeto sério e confiável, com anos de histórias de sucesso.' },
              ].map((item, i) => (
                <div key={i} className="card p-5 hover:border-brand-purple-light transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-brand-purple-lighter flex items-center justify-center mb-3">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ANIMAIS ──────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="eyebrow mb-3">Adoção</p>
              <h2 className="text-4xl font-black text-gray-900 leading-tight">
                Esperando<br />por você
              </h2>
            </div>
            <Link to="/adocao" className="hidden sm:inline-flex items-center gap-1.5 text-brand-purple font-semibold text-sm hover:gap-3 transition-all">
              Ver todos <ArrowRight size={15} />
            </Link>
          </div>

          {featuredAnimals.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {featuredAnimals.map((animal) => (
                  <AnimalCard key={animal.id} animal={animal} />
                ))}
              </div>
              <div className="text-center mt-10">
                <Link to="/adocao" className="btn-primary gap-2">
                  <PawPrint size={14} /> Ver todos os animais
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <PawPrint size={48} strokeWidth={1} className="mx-auto mb-4 opacity-30" />
              <p className="font-medium">Carregando nossos amiguinhos...</p>
            </div>
          )}
        </div>
      </section>

      {/* ── COMO ADOTAR ──────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="eyebrow mb-4">Processo</p>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
                Como<br />funciona<br />a adoção?
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Simples, amoroso e responsável. Nosso processo garante que cada animal
                vá para o lar certo, onde será amado para sempre.
              </p>
              <Link to="/como-adotar" className="btn-primary gap-2">
                Saiba mais <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { n: '01', title: 'Conheça os animais', text: 'Navegue pela galeria ou venha às feirinhas.' },
                { n: '02', title: 'Preencha o formulário', text: 'Formulário de intenção de adoção online.' },
                { n: '03', title: 'Conversa com a equipe', text: 'Entramos em contato para alinhar o match.' },
                { n: '04', title: 'Novo lar!', text: 'Seu novo amigo vai pra casa cheio de amor.' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-5 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                  <span className="text-xs font-black text-brand-purple-medium w-8 text-right flex-shrink-0">
                    {step.n}
                  </span>
                  <div className="w-px h-8 bg-gray-100 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-sm">{step.title}</p>
                    <p className="text-gray-500 text-sm">{step.text}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-brand-purple transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEIRINHA ─────────────────────────────────────────── */}
      {nextFair && (
        <section className="bg-brand-yellow py-14 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-bold text-brand-purple/60 uppercase tracking-widest mb-2">Próxima feirinha</p>
                <h3 className="text-2xl font-extrabold text-brand-purple mb-3">{nextFair.title}</h3>
                <div className="flex flex-wrap gap-4 text-brand-purple/70 text-sm font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {new Date(nextFair.date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    {nextFair.location_name}
                  </span>
                </div>
              </div>
              <Link to="/feirinhas" className="btn-primary flex-shrink-0 gap-1.5">
                Ver detalhes <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── DEPOIMENTO ───────────────────────────────────────── */}
      {story && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <p className="eyebrow mb-4 text-center">Histórias</p>
            <h2 className="text-4xl font-black text-gray-900 text-center mb-12">
              Amor que<br />transforma vidas
            </h2>

            <div className="relative">
              <div className="absolute -top-4 -left-2 text-[8rem] leading-none text-brand-purple-lighter font-serif select-none pointer-events-none">"</div>
              <blockquote className="pt-8 px-6 text-xl text-gray-700 leading-relaxed italic mb-8">
                {story.story}
              </blockquote>
              <div className="flex items-center gap-4 px-6 pt-6 border-t border-gray-100">
                {story.photo ? (
                  <img src={story.photo} alt={story.adopter_name} className="w-11 h-11 rounded-full object-cover" />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-brand-purple flex items-center justify-center text-white font-extrabold">
                    {story.adopter_name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-bold text-gray-900">{story.adopter_name}</p>
                  <p className="text-sm text-gray-400">Adotou {story.animal_name}</p>
                </div>
                <Link to="/historias" className="ml-auto text-sm text-brand-purple font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  Ver mais <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── AJUDE ────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gray-950 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Apoie o projeto</p>
              <h2 className="text-4xl lg:text-5xl font-black leading-tight mb-6">
                Você pode<br />fazer a<br />
                <span className="text-brand-yellow">diferença</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Existem várias formas de ajudar o Projeto Pacotinho de Amor.
                Escolha a que mais combina com você e faça parte dessa história.
              </p>
              <Link to="/ajude" className="btn-secondary gap-2">
                <Heart size={14} /> Ver formas de ajudar
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { icon: <Heart size={18} />, title: 'Doação financeira', text: 'Pix, Benfeitoria ou transferência. Todo valor ajuda.' },
                { icon: <Users size={18} />, title: 'Voluntariado', text: 'Ajude nas feirinhas, fotos, transporte e mais.' },
                { icon: <PawPrint size={18} />, title: 'Lar temporário', text: 'Abrigue um animal enquanto aguarda adoção.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 hover:border-white/15 hover:bg-white/5 transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-brand-purple/30 flex items-center justify-center text-gray-400 group-hover:text-brand-purple-light transition-colors flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-sm mb-0.5">{item.title}</p>
                    <p className="text-gray-500 text-sm">{item.text}</p>
                  </div>
                  <ArrowRight size={15} className="text-gray-700 group-hover:text-gray-400 mt-0.5 flex-shrink-0 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
