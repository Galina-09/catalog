import {
  Download, Truck, Percent, FileText, Handshake, Package, MapPinned,
  CheckCircle2, ArrowRight, Building2, RotateCcw,
} from 'lucide-react';
import { useRouter } from '../router/router';

const conditions = [
  { icon: Percent, title: 'Гнучка система знижок', text: 'Знижки від 7% до 15% у залежності від обсягу замовлення та довгострокового партнерства.' },
  { icon: Package, title: 'Мінімальне замовлення', text: 'Опт від 5000 грн. Для контейнерних партій — індивідуальні умови формування відбору.' },
  { icon: Truck, title: 'Умови доставки', text: 'Доставка власним транспортом по Київській обл. та перевізниками (Нова Пошта, Делівері) по Україні.' },
  { icon: RotateCcw, title: 'Гарантія та заміна', text: 'Заміна бракованого посадкового матеріалу протягом 14 днів за умови дотримання агротехніки.' },
];

const steps = [
  { step: '01', title: 'Заявка', text: 'Заповніть форму або надішліть список потрібних позицій на пошту.' },
  { step: '02', title: 'Пропозиція', text: 'Менеджер готує комерційну пропозицію з актуальними цінами та наявністю.' },
  { step: '03', title: 'Відбір', text: 'Узгоджуємо партію, формуємо відбір та рахунок на оплату.' },
  { step: '04', title: 'Відвантаження', text: 'Доставка транспортом розплідника або перевізником у зручне для вас місце.' },
];

export default function Wholesale() {
  const { navigate } = useRouter();

  const handleDownload = () => {
    const blob = new Blob(
      ['Декоплант — Оптовий прайс-лист 2026 (демонстраційний файл)\n\nЗвертайтесь: info@dekoplant.ua'],
      { type: 'text/plain;charset=utf-8' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dekoplant_pricelist_2026.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest-900">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1600&auto=format&fit=crop&q=80" alt="Опт" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 to-forest-900/40" />
        </div>
        <div className="container-page relative flex min-h-[50vh] items-center py-16">
          <div className="max-w-2xl">
            <span className="eyebrow text-sage-300"><Handshake className="h-3.5 w-3.5" /> Опт</span>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Умови співпраці для оптових покупців
            </h1>
            <p className="mt-4 text-lg text-forest-100">
              Пропонуємо стабільні постачання декоративних рослин для ландшафтних компаній,
              садових центрів, мереж та муніципальних замовників по всій Україні.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={handleDownload} className="btn bg-white text-forest-800 hover:bg-forest-50">
                <Download className="h-4 w-4" /> Завантажити прайс-лист
              </button>
              <button onClick={() => navigate('/contacts')} className="btn border border-white/40 text-white hover:bg-white/10">
                Зв\'язатися з відділом опту <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="container-page py-16">
        <div className="mb-10">
          <span className="eyebrow"><FileText className="h-3.5 w-3.5" /> Умови</span>
          <h2 className="section-title mt-2">Умови роботи з оптовими партнерами</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {conditions.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card p-6 hover:shadow-lift hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-earth-100 text-earth-700">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-forest-900">{title}</h3>
              <p className="mt-2 text-sm text-forest-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="bg-forest-50 py-16">
        <div className="container-page">
          <div className="mb-10">
            <span className="eyebrow"><MapPinned className="h-3.5 w-3.5" /> Як ми працюємо</span>
            <h2 className="section-title mt-2">Етапи співпраці</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.step} className="relative rounded-2xl bg-white p-6 shadow-soft">
                <div className="font-display text-4xl font-bold text-forest-200">{s.step}</div>
                <h3 className="mt-2 font-display text-lg font-semibold text-forest-900">{s.title}</h3>
                <p className="mt-2 text-sm text-forest-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners / delivery */}
      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow"><Building2 className="h-3.5 w-3.5" /> Доставка</span>
            <h2 className="section-title mt-2">Умови доставки та відвантаження</h2>
            <ul className="mt-6 space-y-4">
              {[
                'Власний транспорт по Київській області та Києві',
                'Відвантаження перевізниками Нова Пошта, Делівері,SAT у будь-який регіон',
                'Відбір і фасування партії за погодженим списком',
                'Можливість резервування асортименту на наступний сезон',
                'Сертифікати якості та фітосанітарні документи на кожну партію',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-forest-600" />
                  <span className="text-forest-700">{item}</span>
                </li>
              ))}
            </ul>
            <button onClick={handleDownload} className="btn-primary mt-8">
              <Download className="h-4 w-4" /> Завантажити актуальний прайс
            </button>
          </div>
          <div className="relative">
            <img src="https://images.pexels.com/photos/5230908/pexels-photo-5230908.jpeg" alt="Доставка рослин" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card" />
          </div>
        </div>
      </section>
    </div>
  );
}
