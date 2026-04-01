import { useEffect, useState } from 'react';
import { PawPrint, ArrowRight } from 'lucide-react';
import { storiesAPI } from '../services/api';

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storiesAPI.getAll().then(({ data }) => setStories(data)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      {/* Header */}
      <div className="bg-brand-purple text-white px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">Depoimentos</p>
          <h1 className="text-5xl font-black mb-3">Histórias de<br />Sucesso</h1>
          <p className="text-white/70 text-lg max-w-xl">
            Cada adoção é uma história linda. Aqui estão alguns dos relatos de quem
            transformou a vida de um animal — e teve a própria vida transformada de volta.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-14">
        {loading ? (
          <div className="text-center py-24 text-gray-300">
            <PawPrint size={48} strokeWidth={1} className="mx-auto mb-4 animate-bounce" />
            <p className="text-gray-400 font-medium">Carregando histórias...</p>
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-24 text-gray-300">
            <PawPrint size={48} strokeWidth={1} className="mx-auto mb-4" />
            <p className="font-semibold text-gray-500 mb-1">Em breve, histórias incríveis!</p>
            <p className="text-sm text-gray-400">Estamos reunindo os relatos dos nossos adotantes.</p>
          </div>
        ) : (
          <>
            {/* Destaque — primeira história */}
            {stories[0] && (
              <div className="card p-8 mb-8 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-purple rounded-l-2xl" />
                <div className="text-[7rem] leading-none text-brand-purple-lighter font-serif select-none pointer-events-none absolute top-0 left-6 opacity-40">"</div>
                <blockquote className="relative z-10 pt-6 pl-2 text-xl text-gray-700 leading-relaxed italic mb-6">
                  {stories[0].story}
                </blockquote>
                <div className="flex items-center gap-4 pt-5 border-t border-gray-100">
                  {stories[0].photo ? (
                    <img src={stories[0].photo} alt={stories[0].adopter_name} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-brand-purple flex items-center justify-center text-white font-extrabold text-lg">
                      {stories[0].adopter_name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-extrabold text-gray-900">{stories[0].adopter_name}</p>
                    <p className="text-sm text-gray-400">Adotou {stories[0].animal_name}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Grid */}
            {stories.length > 1 && (
              <div className="grid md:grid-cols-2 gap-5 mb-10">
                {stories.slice(1).map((story) => (
                  <div key={story.id} className="card p-6 relative">
                    <div className="text-[4rem] leading-none text-brand-purple-lighter font-serif absolute top-0 left-5 pointer-events-none select-none">"</div>
                    <blockquote className="text-gray-600 text-sm leading-relaxed italic mb-5 pt-4 line-clamp-5">
                      {story.story}
                    </blockquote>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                      {story.photo ? (
                        <img src={story.photo} alt={story.adopter_name} className="w-9 h-9 rounded-full object-cover" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-brand-purple-lighter flex items-center justify-center text-brand-purple font-bold text-sm">
                          {story.adopter_name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{story.adopter_name}</p>
                        <p className="text-xs text-gray-400">Adotou {story.animal_name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <div className="bg-brand-yellow rounded-3xl p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
              <h3 className="text-xl font-extrabold text-brand-purple mb-1">Escreva a sua história!</h3>
              <p className="text-brand-purple/70 text-sm">Animais esperando um lar como o seu.</p>
            </div>
            <a href="/adocao" className="btn-primary flex-shrink-0 gap-1.5">
              Ver animais disponíveis <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
