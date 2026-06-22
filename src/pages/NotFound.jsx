import { Home, ArrowLeft } from 'lucide-react';
import { useRouter } from '../router/router';

export default function NotFound() {
  const { navigate } = useRouter();
  return (
    <div className="container-page flex flex-col items-center justify-center py-32 text-center">
      <div className="font-display text-7xl font-bold text-forest-200">404</div>
      <h1 className="mt-4 font-display text-2xl font-semibold text-forest-900">Сторінку не знайдено</h1>
      <p className="mt-2 text-forest-600">Можливо, посилання застаріле або було видалене.</p>
      <div className="mt-6 flex gap-3">
        <button onClick={() => navigate('/')} className="btn-primary">
          <Home className="h-4 w-4" /> На головну
        </button>
        <button onClick={() => navigate('/catalog')} className="btn-secondary">
          <ArrowLeft className="h-4 w-4" /> До каталогу
        </button>
      </div>
    </div>
  );
}
