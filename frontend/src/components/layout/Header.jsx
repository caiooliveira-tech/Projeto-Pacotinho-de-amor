import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, PawPrint } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Início' },
  { to: '/adocao', label: 'Adotar' },
  { to: '/como-adotar', label: 'Como Adotar' },
  { to: '/feirinhas', label: 'Feirinhas' },
  { to: '/historias', label: 'Histórias' },
  { to: '/ajude', label: 'Ajude' },
  { to: '/contato', label: 'Contato' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/98 backdrop-blur-md shadow-sm border-b border-gray-100 py-2'
        : 'bg-white py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-12">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative">
              <img
                src="/logo.jpeg"
                alt="Projeto Pacotinho de Amor"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="font-extrabold text-brand-purple text-sm tracking-tight">
                Pacotinho de Amor
              </p>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                Proteção Animal
              </p>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'text-brand-purple bg-brand-purple-lighter font-semibold'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-2">
            <Link to="/adocao" className="hidden lg:inline-flex btn-primary gap-1.5 text-xs px-5 py-2.5">
              <PawPrint size={13} />
              Quero Adotar
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-100 pt-3 pb-4 mt-2 animate-fade-in">
            <nav className="flex flex-col gap-0.5 mb-4">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-brand-purple bg-brand-purple-lighter font-semibold'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <Link to="/adocao" className="btn-primary w-full justify-center gap-1.5">
              <PawPrint size={14} />
              Quero Adotar
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
