import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useRouter } from '../router/router';

export default function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="mt-24 bg-forest-950 text-forest-100">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-600 text-white">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M12 2C8 6 5 9 5 13c0 3.5 3 6 7 6s7-2.5 7-6c0-4-3-7-7-11z" />
              </svg>
            </div>
            <div className="leading-none">
              <div className="font-display text-xl font-semibold text-white">Декоплант</div>
              <div className="text-[11px] uppercase tracking-wider text-sage-400">Розплідник рослин</div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-forest-200">
            Власний розплідник декоративних рослин та троянд від виробника в Україні з 2002 року.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Навігація</h3>
          <ul className="space-y-2.5 text-sm">
            {[
              ['/', 'Головна'],
              ['/catalog', 'Каталог рослин'],
              ['/about', 'Про розплідник'],
              ['/wholesale', 'Оптовим покупцям'],
              ['/contacts', 'Контакти'],
            ].map(([path, label]) => (
              <li key={path}>
                <button
                  onClick={() => navigate(path)}
                  className="text-forest-200 transition-colors hover:text-white"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Контакти</h3>
          <ul className="space-y-3 text-sm text-forest-200">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage-400" />
              22353, Україна, Вінницька обл., с. Микулинці,  вул. Коцюбинського, 11А
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-sage-400" />
               +38 043 250 94 94
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-sage-400" />
              info@dekoplant.ua
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Графік роботи</h3>
          <ul className="space-y-2 text-sm text-forest-200">
            <li className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-sage-400" /> Пн-Пт: 9:00 — 18:00
            </li>
            <li className="pl-6">Сб: 10:00 — 16:00</li>
            <li className="pl-6">Нд: вихідний</li>
          </ul>
          <button
            onClick={() => navigate('/contacts')}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-forest-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest-500"
          >
            <Send className="h-4 w-4" /> Надіслати запит
          </button>
        </div>
      </div>

      <div className="border-t border-forest-900">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-forest-300 sm:flex-row">
          <p>© {new Date().getFullYear()} Декоплант. Усі права захищені.</p>
          <p>Декоративні рослини та троянди від виробника</p>
        </div>
      </div>
    </footer>
  );
}
