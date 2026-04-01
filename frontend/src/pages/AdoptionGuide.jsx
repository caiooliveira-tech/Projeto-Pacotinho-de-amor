import { CheckCircle2, AlertTriangle, Phone } from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="card p-6 mb-4">
    <h2 className="font-extrabold text-gray-900 mb-4 text-base">{title}</h2>
    {children}
  </div>
);

const Check = ({ text }) => (
  <li className="flex items-start gap-2.5 text-sm text-gray-600">
    <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
    {text}
  </li>
);

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const AdoptionGuide = () => (
  <div className="min-h-screen bg-gray-50 animate-fade-in">
    {/* Header */}
    <div className="bg-brand-purple text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">Guia</p>
        <h1 className="text-5xl font-black mb-3">Adotei!<br />E agora?</h1>
        <p className="text-white/70 text-lg max-w-xl">
          Parabéns pela adoção! Este guia vai te ajudar a receber seu novo amigo
          com todo o cuidado e amor que ele merece.
        </p>
      </div>
    </div>

    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Boas-vindas */}
      <div className="bg-brand-yellow rounded-3xl p-7 mb-8">
        <h2 className="text-xl font-extrabold text-brand-purple mb-2">Você acabou de salvar uma vida!</h2>
        <p className="text-brand-purple/80 text-sm leading-relaxed">
          Adotar é um ato de amor enorme. Seu novo amigo vai precisar de tempo, paciência e muito
          carinho para se adaptar. A regra dos <strong>3-3-3</strong>: 3 dias para se sentir seguro,
          3 semanas para entender a rotina, 3 meses para se sentir em casa de verdade.
        </p>
      </div>

      <Section title="Antes de buscar o animal">
        <ul className="space-y-2">
          <Check text="Prepare um espaço seguro e confortável" />
          <Check text="Compre tigelas, cama/cainha e brinquedos" />
          <Check text="Para gatos: caixa de areia, arranhador e comedouro" />
          <Check text="Para cães: coleira, guia e local seguro para passear" />
          <Check text="Pesquise veterinários próximos" />
          <Check text="Se tem outros pets, prepare uma área separada para apresentação gradual" />
        </ul>
      </Section>

      <Section title="Os primeiros dias em casa">
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          Ficar escondido, sem comer direito ou quieto nos primeiros dias é <strong>completamente normal</strong>.
          Isso passa com tempo e paciência.
        </p>
        <ul className="space-y-2 mb-4">
          <Check text="Deixe o animal explorar no próprio ritmo, sem forçar contato" />
          <Check text="Mantenha ambiente calmo — evite visitas e barulhos nas primeiras semanas" />
          <Check text="Ofereça a mesma ração que ele comia antes" />
          <Check text="Fale com calma e voz suave" />
        </ul>
        <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm">
          <AlertTriangle size={15} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-amber-700">Tenha paciência! A adaptação completa pode levar até 3 meses.</p>
        </div>
      </Section>

      <Section title="Saúde e cuidados veterinários">
        <ul className="space-y-2">
          <Check text="Agende consulta veterinária na primeira semana" />
          <Check text="Mantenha o calendário de vacinas em dia (anual)" />
          <Check text="Vermifugue a cada 3-6 meses conforme orientação" />
          <Check text="Aplique antipulgas e carrapatos regularmente" />
          <Check text="Para gatos: consultas anuais mesmo sem sintomas" />
        </ul>
      </Section>

      <Section title="Alimentação">
        <ul className="space-y-2 mb-4">
          <Check text="Ração premium ou super premium — consulte o veterinário" />
          <Check text="Água fresca disponível o tempo todo" />
          <Check text="Horários regulares de alimentação" />
          <Check text="Evite: uva, cebola, alho, chocolate, avocado (tóxicos)" />
          <Check text="Para gatos: estimule ingestão de água com fontes ou ração úmida" />
        </ul>
      </Section>

      <Section title="Dicas rápidas">
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            'Mantenha rotinas — animais adoram previsibilidade',
            'Nunca dê remédio humano sem prescrição veterinária',
            'Coloque identificação com seu contato no animal',
            'Tenha um plano para emergências veterinárias',
            'Brinque todos os dias — é saúde física e mental',
            'Invista em adestramento positivo — sem punições',
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <CheckCircle2 size={13} className="text-brand-purple mt-0.5 flex-shrink-0" />
              {tip}
            </div>
          ))}
        </div>
      </Section>

      {/* Suporte */}
      <div className="card p-6 border-brand-purple-light">
        <h3 className="font-extrabold text-gray-900 mb-2">Estamos aqui para te apoiar!</h3>
        <p className="text-gray-500 text-sm mb-5 leading-relaxed">
          Dúvidas, inseguranças ou qualquer situação — pode nos contatar!
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="https://wa.me/5511994896555" target="_blank" rel="noopener noreferrer"
            className="btn-primary gap-1.5 text-sm">
            <Phone size={13} /> WhatsApp
          </a>
          <a href="https://www.instagram.com/projeto.pacotinhodeamor" target="_blank" rel="noopener noreferrer"
            className="btn-outline gap-1.5 text-sm">
            <InstagramIcon /> Instagram
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default AdoptionGuide;
