import { Phone, ExternalLink, PawPrint, CalendarDays, ArrowRight } from 'lucide-react';

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const Contact = () => (
  <div className="min-h-screen bg-gray-50 animate-fade-in">
    {/* Header */}
    <div className="bg-brand-purple text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">Fale conosco</p>
        <h1 className="text-5xl font-black mb-3">Contato</h1>
        <p className="text-white/70 text-lg max-w-xl">
          Dúvidas, adoção, voluntariado ou só um oi — adoramos receber mensagens!
        </p>
      </div>
    </div>

    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8">

        {/* Canais */}
        <div>
          <p className="eyebrow mb-5">Canais</p>
          <div className="space-y-3">
            {[
              {
                icon: <Phone size={18} className="text-brand-purple" />,
                title: 'WhatsApp',
                value: '(11) 99489-6555',
                desc: 'Para adoção, dúvidas e voluntariado.',
                href: 'https://wa.me/5511994896555',
                label: 'Enviar mensagem',
              },
              {
                icon: <InstagramIcon size={18} />,
                title: 'Instagram',
                value: '@projeto.pacotinhodeamor',
                desc: 'Animais, feirinhas e novidades.',
                href: 'https://www.instagram.com/projeto.pacotinhodeamor',
                label: 'Ver perfil',
              },
              {
                icon: <PawPrint size={18} className="text-brand-purple" />,
                title: 'Pix — Doações',
                value: '11 99489-6555',
                desc: 'Qualquer valor ajuda a cuidar de mais animais.',
                href: null,
              },
            ].map((item, i) => (
              <div key={i} className="card p-5 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-brand-purple-lighter flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                  <p className="font-semibold text-brand-purple text-sm">{item.value}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
                  {item.href && (
                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-brand-purple font-semibold mt-2 hover:underline">
                      {item.label} <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Links úteis */}
        <div>
          <p className="eyebrow mb-5">Links úteis</p>
          <div className="space-y-2">
            {[
              { icon: <PawPrint size={15} />,      title: 'Ver animais para adoção',    desc: 'Galeria completa com filtros.',                href: '/adocao',           ext: false },
              { icon: <ExternalLink size={15} />,  title: 'Formulário de adoção',       desc: 'Preencha sua intenção de adoção.',             href: 'https://docs.google.com/forms/d/e/1FAIpQLSc1gEo9RoKfEVOoq1ysEhD2mFEKhu8STeAs5JNShcQowYZywg/viewform', ext: true },
              { icon: <ExternalLink size={15} />,  title: 'Formulário de voluntariado', desc: 'Cadastre-se para ajudar nas feirinhas.',        href: 'https://docs.google.com/forms/d/e/1FAIpQLSc_OlXpmsjbTWKTi9RwrFDS2xDIqvgUlXIywOUt9Oc-DDk23g/viewform', ext: true },
              { icon: <PawPrint size={15} />,      title: 'Fazer uma doação',           desc: 'Pix ou doação recorrente via Benfeitoria.',    href: '/ajude#doacao',     ext: false },
              { icon: <CalendarDays size={15} />,  title: 'Próximas feirinhas',         desc: 'Datas e locais das próximas feirinhas.',        href: '/feirinhas',        ext: false },
            ].map((item, i) => {
              const props = item.ext
                ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
                : { href: item.href };
              return (
                <a key={i} {...props} className="card p-4 flex items-center gap-3 hover:border-brand-purple-light transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-brand-purple-lighter flex items-center justify-center text-brand-purple flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                    <p className="text-gray-400 text-xs truncate">{item.desc}</p>
                  </div>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-brand-purple flex-shrink-0 transition-colors" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sobre */}
      <div className="mt-10 card p-8 text-center">
        <img src="/logo.jpeg" alt="Logo" className="w-16 h-16 rounded-full mx-auto mb-4" />
        <h3 className="text-xl font-extrabold text-brand-purple mb-2">Projeto Pacotinho de Amor</h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-xl mx-auto mb-5">
          Organização independente sem fins lucrativos que atua desde 2019 resgatando, cuidando e
          disponibilizando animais para adoção responsável. Já são mais de{' '}
          <strong className="text-gray-700">1.700 animais</strong> em lares amorosos.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="https://www.instagram.com/projeto.pacotinhodeamor" target="_blank" rel="noopener noreferrer" className="btn-primary gap-1.5 text-sm">
            <InstagramIcon size={13} /> Instagram
          </a>
          <a href="https://wa.me/5511994896555" target="_blank" rel="noopener noreferrer" className="btn-outline gap-1.5 text-sm">
            <Phone size={13} /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
