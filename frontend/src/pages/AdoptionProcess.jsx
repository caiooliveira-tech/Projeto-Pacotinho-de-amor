import { Link } from 'react-router-dom';
import { Search, FileText, MessageCircle, PawPrint, ScrollText, Home, ArrowRight, ChevronDown } from 'lucide-react';

const ADOPTION_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSc1gEo9RoKfEVOoq1ysEhD2mFEKhu8STeAs5JNShcQowYZywg/viewform';

const steps = [
  { number: '01', icon: Search,      title: 'Conheça os animais',      description: 'Navegue pela nossa galeria ou venha às feirinhas para conhecer pessoalmente.',      tip: 'Siga nosso Instagram para ver os animais mais recentes!' },
  { number: '02', icon: FileText,    title: 'Formulário de interesse',  description: 'Preencha o formulário online. Ele nos ajuda a entender seu perfil e rotina.',        tip: 'Leva cerca de 5 minutos.' },
  { number: '03', icon: MessageCircle,title:'Conversa com a equipe',    description: 'Entramos em contato para uma conversa descontraída. Sem julgamentos!',              tip: 'Respondemos em até 48 horas úteis.' },
  { number: '04', icon: PawPrint,    title: 'Encontro com o animal',    description: 'Combinamos um encontro — numa feirinha ou com nosso cuidador.',                     tip: 'Se você tem pets em casa, pode ser necessário um encontro supervisionado.' },
  { number: '05', icon: ScrollText,  title: 'Termo de adoção',          description: 'Formalizamos com um termo de responsabilidade. É um compromisso de amor.',           tip: 'Garante a segurança do animal adotado.' },
  { number: '06', icon: Home,        title: 'Novo lar!',                description: 'Seu novo amigo vai para casa! Estamos disponíveis para apoiar a adaptação.',         tip: 'Adoramos receber fotos depois.' },
];

const faqs = [
  { q: 'Posso adotar se moro em apartamento?', a: 'Sim! Apartamentos podem ser ótimos lares, especialmente para gatos e cães de porte pequeno. O importante é garantir exercício, estimulação e muito amor.' },
  { q: 'Preciso ter experiência com animais?', a: 'Não é obrigatório, mas é importante ter responsabilidade e comprometimento. Nossa equipe orienta em todo o processo.' },
  { q: 'A adoção tem algum custo?', a: 'A adoção em si é gratuita! Os animais já chegam vacinados, vermifugados e castrados. Mas lembre-se: ter um pet tem custos mensais.' },
  { q: 'Posso adotar mais de um animal?', a: 'Claro! Em alguns casos recomendamos adoção em dupla, pois os animais se fazem companhia.' },
  { q: 'E se não der certo a adoção?', a: 'Acontece, e sem julgamentos. Entre em contato antes de qualquer decisão — estamos aqui para ajudar na adaptação.' },
];

const AdoptionProcess = () => (
  <div className="min-h-screen bg-gray-50 animate-fade-in">
    {/* Header */}
    <div className="bg-brand-purple text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">Adoção</p>
        <h1 className="text-5xl font-black mb-3">Como Adotar</h1>
        <p className="text-white/70 text-lg max-w-xl">
          Simples, amoroso e responsável. Veja o passo a passo do nosso processo.
        </p>
      </div>
    </div>

    <div className="max-w-3xl mx-auto px-6 py-14">
      {/* Intro */}
      <div className="card p-7 mb-12 text-center border-brand-purple-lighter">
        <p className="eyebrow mb-3">Nossa missão</p>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
          Adoção responsável salva vidas
        </h2>
        <p className="text-gray-500 leading-relaxed text-sm max-w-lg mx-auto">
          Nosso processo garante que cada animal vá para o lar certo, onde será amado e cuidado
          para sempre. Não é burocracia — é cuidado!
        </p>
      </div>

      {/* Steps */}
      <div className="relative mb-14">
        <div className="absolute left-[27px] top-0 bottom-0 w-px bg-gray-100 hidden sm:block" />
        <div className="space-y-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex gap-5 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-white border-2 border-gray-100 group-hover:border-brand-purple group-hover:bg-brand-purple flex items-center justify-center flex-shrink-0 transition-all duration-200 z-10">
                  <Icon size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <div className="card p-5 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black text-gray-300 tracking-widest">PASSO {step.number}</span>
                  </div>
                  <h3 className="font-extrabold text-gray-900 mb-1.5">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-2">{step.description}</p>
                  <p className="text-xs text-brand-purple-medium font-medium">
                    {step.tip}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-12">
        <p className="eyebrow mb-2">Dúvidas</p>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Perguntas frequentes</h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <details key={i} className="card group">
              <summary className="flex items-center justify-between gap-3 p-5 cursor-pointer list-none font-semibold text-gray-900 text-sm">
                {faq.q}
                <ChevronDown size={16} className="text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform duration-200" />
              </summary>
              <div className="px-5 pb-5 pt-0">
                <p className="text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-brand-purple rounded-3xl p-8 text-white text-center">
        <h3 className="text-2xl font-extrabold mb-3">Pronto para adotar?</h3>
        <p className="text-white/75 text-sm mb-6">Veja nossos animais disponíveis e preencha o formulário.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/adocao" className="btn-secondary gap-1.5">
            <PawPrint size={13} /> Ver animais
          </Link>
          <a href={ADOPTION_FORM} target="_blank" rel="noopener noreferrer" className="btn-white gap-1.5">
            <FileText size={13} /> Formulário de adoção
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default AdoptionProcess;
