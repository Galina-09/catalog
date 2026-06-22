import { useState } from 'react';
import {
  ChevronRight, Plus, Check, Sun, CloudSun, Cloud, Truck, Ruler,
  ThermometerSnowflake, CalendarDays, Mountain, ArrowLeft, Info, Leaf,
} from 'lucide-react';
import { plants } from '../data/plantsData';
import { useRouter } from '../router/router';
import { useInquiry } from '../context/InquiryContext';
import ProductCard from '../components/ProductCard';
import { StatusBadge, CategoryBadge, lightLabels, typeLabels } from '../components/productHelpers';

const specIcons = {
  frostHardiness: ThermometerSnowflake,
  matureHeight: Ruler,
  bloomPeriod: CalendarDays,
  soilRequirement: Mountain,
};

const specLabels = {
  frostHardiness: 'Морозостійкість',
  matureHeight: 'Висота дорослої рослини',
  bloomPeriod: 'Період цвітіння',
  soilRequirement: 'Вимога до ґрунту',
};

export default function ProductDetail() {
  const { route, navigate } = useRouter();
  const { add, has } = useInquiry();
  const [activeImage, setActiveImage] = useState(0);
  const [tab, setTab] = useState('specs');

  const id = route.segments[1];
  const plant = plants.find((p) => p.id === id);

  if (!plant) {
    return (
      <div className="container-page flex flex-col items-center justify-center py-32 text-center">
        <h1 className="font-display text-2xl font-semibold text-forest-900">Рослину не знайдено</h1>
        <p className="mt-2 text-forest-600">Можливо, посилання застаріло або було видалено.</p>
        <button onClick={() => navigate('/catalog')} className="btn-primary mt-6">
          <ArrowLeft className="h-4 w-4" /> До каталогу
        </button>
      </div>
    );
  }

  const inList = has(plant.id);
  const LightIcon = lightLabels[plant.light].icon;
  const related = plants.filter((p) => p.category === plant.category && p.id !== plant.id).slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="border-b border-stone-100 bg-white">
        <div className="container-page flex items-center gap-1.5 py-4 text-xs text-forest-500">
          <button onClick={() => navigate('/')} className="hover:text-forest-700">Головна</button>
          <ChevronRight className="h-3 w-3" />
          <button onClick={() => navigate('/catalog')} className="hover:text-forest-700">Каталог</button>
          <ChevronRight className="h-3 w-3" />
          <button onClick={() => navigate(`/catalog?category=${plant.category}`)} className="hover:text-forest-700">
            {plant.categoryName}
          </button>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate text-forest-700">{plant.name}</span>
        </div>
      </div>

      <div className="container-page py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-3xl bg-stone-100 shadow-card">
              <img
                src={plant.images[activeImage]}
                alt={plant.name}
                className="aspect-square w-full object-cover"
              />
              <div className="absolute left-4 top-4 flex gap-2">
                <StatusBadge status={plant.status} />
                <CategoryBadge>{plant.categoryName}</CategoryBadge>
              </div>
            </div>
            {plant.images.length > 1 && (
              <div className="mt-3 flex gap-3">
                {plant.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`h-20 w-20 overflow-hidden rounded-xl ring-2 transition-all ${
                      activeImage === i ? 'ring-forest-500' : 'ring-transparent hover:ring-forest-200'
                    }`}
                  >
                    <img src={img} alt={`${plant.name} ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="font-display text-3xl font-semibold leading-tight text-forest-900 sm:text-4xl">
              {plant.name}
            </h1>
            <p className="mt-1 text-lg italic text-sage-600">{plant.latinName}</p>

            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-xl bg-stone-100 px-3.5 py-2 text-sm text-forest-700">
                <LightIcon className="h-4 w-4 text-sage-500" />
                Освітлення: <b>{lightLabels[plant.light].label}</b>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-stone-100 px-3.5 py-2 text-sm text-forest-700">
                <Ruler className="h-4 w-4 text-sage-500" />
                Висота: <b>{plant.height}</b>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-stone-100 px-3.5 py-2 text-sm text-forest-700">
                <Leaf className="h-4 w-4 text-sage-500" />
                {typeLabels[plant.type]}
              </div>
            </div>

            <p className="mt-5 leading-relaxed text-forest-700">{plant.description}</p>

            <div className="mt-6 flex items-end justify-between rounded-2xl bg-forest-50 p-5">
              <div>
                <div className="text-xs uppercase tracking-wider text-sage-600">Орієнтовна ціна</div>
                <div className="font-display text-3xl font-bold text-forest-800">{plant.price} грн</div>
                <div className="text-xs text-forest-500">/ одиниця посадкового матеріалу</div>
              </div>
              <button
                onClick={() => add(plant)}
                disabled={inList}
                className={`btn ${inList ? 'bg-sage-100 text-sage-700' : 'btn-primary'}`}
              >
                {inList ? <><Check className="h-4 w-4" /> У списку</> : <><Plus className="h-4 w-4" /> У список запиту</>}
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-forest-500">
              <Truck className="h-4 w-4 text-sage-500" />
              Доставка по Україні · Самовивіз з розплідника · Можливі оптові знижки
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex gap-2 border-b border-stone-200">
            <button
              onClick={() => setTab('specs')}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                tab === 'specs' ? 'border-forest-600 text-forest-700' : 'border-transparent text-forest-500 hover:text-forest-700'
              }`}
            >
              <Info className="h-4 w-4" /> Характеристики
            </button>
            <button
              onClick={() => setTab('care')}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                tab === 'care' ? 'border-forest-600 text-forest-700' : 'border-transparent text-forest-500 hover:text-forest-700'
              }`}
            >
              <Leaf className="h-4 w-4" /> Посадка та догляд
            </button>
          </div>

          <div className="py-6">
            {tab === 'specs' ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(plant.specifications).map(([key, value]) => {
                  const Icon = specIcons[key] || Info;
                  return (
                    <div key={key} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-soft">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-100 text-forest-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wide text-sage-600">{specLabels[key]}</div>
                        <div className="font-medium text-forest-900">{value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl bg-white p-6 shadow-soft sm:p-8">
                <h3 className="font-display text-xl font-semibold text-forest-900">Посадка та догляд</h3>
                <p className="mt-3 leading-relaxed text-forest-700">{plant.care}</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    { icon: ThermometerSnowflake, text: 'Укриття на зиму молодих рослин у перший рік' },
                    { icon: CalendarDays, text: 'Оптимальний час посадки: березень—квітень або вересень—жовтень' },
                    { icon: Mountain, text: 'Дотримуйтесь дренажу та рекомендацій по pH ґрунту' },
                    { icon: Leaf, text: 'Регулярний полив перші 2 сезони після посадки' },
                  ].map(({ icon: Icon, text }, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-forest-700">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" /> {text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="section-title mb-6">Схожі рослини</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} plant={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
