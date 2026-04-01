import { Banknote, RefreshCw, Users, Share2, Package, Home, ArrowRight, CheckCircle2, PawPrint } from 'lucide-react';

const VOLUNTEER_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSc_OlXpmsjbTWKTi9RwrFDS2xDIqvgUlXIywOUt9Oc-DDk23g/viewform';

const Help = () => (
  <div className="min-h-screen bg-gray-50 animate-fade-in">
    {/* Header */}
    <div className="bg-brand-purple text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">Apoio</p>
        <h1 className="text-5xl font-black mb-3">Quero<br />Ajudar</h1>
        <p className="text-white/70 text-lg max-w-xl">
          Existem muitas formas de fazer parte dessa história. Cada contribuição salva uma vida.
        </p>
      </div>
    </div>

    <div className="max-w-5xl mx-auto px-6 py-14 space-y-14">

      {/* Doação financeira */}
      <section id="doacao">
        <p className="eyebrow mb-4">Doação financeira</p>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          Sua doação transforma<br />vidas direto da fonte
        </h2>

        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {/* Pix */}
          <div className="card p-6">
            <div className="w-10 h-10 rounded-xl bg-brand-purple-lighter flex items-center justify-center mb-4">
              <Banknote size={20} className="text-brand-purple" />
            </div>
            <h3 className="font-extrabold text-gray-900 mb-1">Doação via Pix</h3>
            <p className="text-gray-500 text-sm mb-5">Rápido, fácil e sem taxas.</p>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center mb-4">
              <p className="text-xs text-gray-400 mb-1">Chave Pix — celular</p>
              <p className="text-2xl font-black text-brand-purple tracking-wide">11 99489-6555</p>
            </div>
            <p className="text-xs text-gray-400">Após o Pix, envie o comprovante pelo WhatsApp.</p>
          </div>

          {/* Benfeitoria */}
          <div className="card p-6">
            <div className="w-10 h-10 rounded-xl bg-brand-purple-lighter flex items-center justify-center mb-4">
              <RefreshCw size={20} className="text-brand-purple" />
            </div>
            <h3 className="font-extrabold text-gray-900 mb-1">Doação Recorrente</h3>
            <p className="text-gray-500 text-sm mb-5">
              Contribua mensalmente pela Benfeitoria e faça parte do nosso time de apoiadores fixos.
            </p>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center mb-5">
              <p className="text-sm text-gray-500">Plataforma segura · múltiplas formas de pagamento</p>
            </div>
            <a href="https://benfeitoria.com/" target="_blank" rel="noopener noreferrer"
              className="btn-primary w-full justify-center gap-1.5">
              Apoiar via Benfeitoria <ArrowRight size={13} />
            </a>
          </div>
        </div>

        {/* O que custeia */}
        <div className="card p-6">
          <p className="label mb-4">O que sua doação custeia</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: <PawPrint size={16} />, label: 'Vacinas' },
              { icon: <PawPrint size={16} />, label: 'Castração' },
              { icon: <PawPrint size={16} />, label: 'Ração' },
              { icon: <PawPrint size={16} />, label: 'Medicamentos' },
              { icon: <PawPrint size={16} />, label: 'Consultas vet.' },
              { icon: <PawPrint size={16} />, label: 'Vermifugação' },
              { icon: <PawPrint size={16} />, label: 'Abrigo' },
              { icon: <PawPrint size={16} />, label: 'Cuidado diário' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-600 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voluntariado */}
      <section id="voluntario">
        <p className="eyebrow mb-4">Voluntariado</p>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          Venha fazer parte<br />do nosso time
        </h2>

        <div className="grid md:grid-cols-2 gap-5 mb-6">
          <div className="card p-6">
            <p className="label mb-4">O que você pode fazer</p>
            <ul className="space-y-3">
              {[
                { icon: <Users size={15} />, text: 'Ajudar nas feirinhas de adoção' },
                { icon: <Share2 size={15} />, text: 'Fotografar e filmar os animais' },
                { icon: <Home size={15} />, text: 'Ser motorista voluntário' },
                { icon: <PawPrint size={15} />, text: 'Ser lar temporário' },
                { icon: <Share2 size={15} />, text: 'Divulgação nas redes sociais' },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="w-7 h-7 rounded-lg bg-brand-purple-lighter flex items-center justify-center text-brand-purple flex-shrink-0">
                    {item.icon}
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-brand-purple-lighter rounded-2xl p-6">
            <p className="label mb-4" style={{ color: '#6B2D8B' }}>O que você recebe</p>
            <ul className="space-y-2.5">
              {[
                'A gratidão dos animais e de quem os adota',
                'Fazer parte de uma comunidade incrível',
                'Experiência em gestão de eventos pet',
                'Momentos inesquecíveis com os animais',
                'A satisfação de transformar vidas',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 size={14} className="text-brand-purple mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card p-6 text-center">
          <h3 className="font-extrabold text-gray-900 mb-2">Pronto para fazer a diferença?</h3>
          <p className="text-gray-500 text-sm mb-5">Preencha o formulário e entraremos em contato em breve.</p>
          <a href={VOLUNTEER_FORM} target="_blank" rel="noopener noreferrer"
            className="btn-primary gap-1.5">
            Preencher formulário de voluntariado <ArrowRight size={13} />
          </a>
        </div>
      </section>

      {/* Outras formas */}
      <section>
        <p className="eyebrow mb-4">Outras formas</p>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Mais formas de ajudar</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: <Share2 size={20} className="text-brand-purple" />,
              title: 'Divulgue',
              text: 'Compartilhe nossos animais nas redes. Um post pode salvar uma vida.',
              href: 'https://www.instagram.com/projeto.pacotinhodeamor',
              label: 'Seguir no Instagram',
            },
            {
              icon: <Package size={20} className="text-brand-purple" />,
              title: 'Doação de itens',
              text: 'Ração, remédios, cobertores e outros itens são sempre bem-vindos.',
              href: 'https://wa.me/5511994896555',
              label: 'Falar pelo WhatsApp',
            },
            {
              icon: <Home size={20} className="text-brand-purple" />,
              title: 'Lar temporário',
              text: 'Abrigue um animal enquanto aguarda sua adoção definitiva.',
              href: 'https://wa.me/5511994896555',
              label: 'Quero ser lar temporário',
            },
          ].map((item, i) => (
            <div key={i} className="card p-5 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-brand-purple-lighter flex items-center justify-center mb-3">
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-1 text-sm">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{item.text}</p>
              <a href={item.href} target="_blank" rel="noopener noreferrer"
                className="btn-outline text-xs py-2 justify-center">
                {item.label}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default Help;
