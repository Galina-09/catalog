import { useState, useEffect } from 'react';
import { Phone, Mail, Menu, X, ShoppingBag, ChevronDown } from 'lucide-react';
import { useRouter } from '../router/router';
import { useInquiry } from '../context/InquiryContext';

const navItems = [
  { label: 'Головна', path: '/' },
  { label: 'Каталог', path: '/catalog' },
  { label: 'Про нас', path: '/about' },
  { label: 'Опт', path: '/wholesale' },
  { label: 'Контакти', path: '/contacts' },
];

export default function Header() {
  const { route, navigate } = useRouter();
  const { count, openDrawer } = useInquiry();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => (path === '/' ? route.path === '/' : route.path.startsWith(path));

  const go = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-soft' : 'bg-white'
      }`}
    >
      {/* Top bar */}
      <div className="hidden bg-forest-800 text-forest-50 lg:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" /> +38 (044) 555-12-34
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> info@dekoplant.ua
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sage-300" />
            Розплідник відкритий: Пн-Сб 9:00-18:00
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <button
          onClick={() => go('/')}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          aria-label="Декоплант — на головну"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-600 text-white">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
              <path d="M12 2C8 6 5 9 5 13c0 3.5 3 6 7 6s7-2.5 7-6c0-4-3-7-7-11z" />
            </svg>
          </div>
          <div className="leading-none">
            <div className="font-display text-xl font-semibold text-forest-900">Декоплант</div>
            <div className="text-[11px] uppercase tracking-wider text-sage-600">Розплідник рослин</div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => go(item.path)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? 'text-forest-700'
                  : 'text-forest-600 hover:text-forest-900'
              }`}
            >
              {item.label}
              {isActive(item.path) && (
                <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-forest-500" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={openDrawer}
            className="relative flex h-11 items-center gap-2 rounded-full bg-forest-600 px-4 text-sm font-semibold text-white transition-all hover:bg-forest-700 active:scale-95"
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            <span className="hidden sm:inline">Список запиту</span>
            {count > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-earth-500 px-1.5 text-xs font-bold text-white">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-forest-700 hover:bg-forest-50 lg:hidden"
            aria-label="Меню"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="animate-slide-down border-t border-stone-100 bg-white lg:hidden">
          <nav className="container-page flex flex-col py-3">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => go(item.path)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-forest-50 text-forest-700'
                    : 'text-forest-600 hover:bg-stone-50'
                }`}
              >
                {item.label}
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
