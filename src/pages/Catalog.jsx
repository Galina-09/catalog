import { useMemo, useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X, Leaf } from 'lucide-react';
import { plants, categories } from '../data/plantsData';
import { useRouter } from '../router/router';
import ProductCard from '../components/ProductCard';
import { lightLabels } from '../components/productHelpers';

const statusOptions = [
  { value: 'in_stock', label: 'В наявності' },
  { value: 'on_order', label: 'Під замовлення' },
];
const typeOptions = [
  { value: 'container', label: 'Контейнер' },
  { value: 'open_root', label: 'Відкритий корінь' },
];

export default function Catalog() {
  const { route } = useRouter();
  const urlCat = route.params.get('category');

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(urlCat || 'all');
  const [types, setTypes] = useState([]);
  const [lights, setLights] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [showMobile, setShowMobile] = useState(false);

  useEffect(() => {
    if (urlCat) setCategory(urlCat);
  }, [urlCat]);

  const toggle = (setter, list, value) =>
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const reset = () => {
    setSearch('');
    setCategory('all');
    setTypes([]);
    setLights([]);
    setStatuses([]);
    setSortBy('default');
  };

  const filtered = useMemo(() => {
    let list = plants.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (types.length && !types.includes(p.type)) return false;
      if (lights.length && !lights.includes(p.light)) return false;
      if (statuses.length && !statuses.includes(p.status)) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.latinName.toLowerCase().includes(q)) return false;
      }
      return true;
    });
    if (sortBy === 'price_asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price_desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'uk'));
    return list;
  }, [search, category, types, lights, statuses, sortBy]);

  const activeCount = types.length + lights.length + statuses.length + (category !== 'all' ? 1 : 0);

  const FilterPanel = (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="mb-2.5 text-sm font-semibold text-forest-900">Категорія</h3>
        <div className="space-y-1">
          <button
            onClick={() => setCategory('all')}
            className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              category === 'all' ? 'bg-forest-100 font-medium text-forest-700' : 'text-forest-600 hover:bg-stone-100'
            }`}
          >
            Усі рослини
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                category === c.id ? 'bg-forest-100 font-medium text-forest-700' : 'text-forest-600 hover:bg-stone-100'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <h3 className="mb-2.5 text-sm font-semibold text-forest-900">Тип посадкового матеріалу</h3>
        <div className="space-y-1.5">
          {typeOptions.map((t) => (
            <label key={t.value} className="flex cursor-pointer items-center gap-2.5 text-sm text-forest-700">
              <input
                type="checkbox"
                checked={types.includes(t.value)}
                onChange={() => toggle(setTypes, types, t.value)}
                className="h-4 w-4 rounded border-stone-300 text-forest-600 focus:ring-forest-500"
              />
              {t.label}
            </label>
          ))}
        </div>
      </div>

      {/* Light */}
      <div>
        <h3 className="mb-2.5 text-sm font-semibold text-forest-900">Вимоги до освітлення</h3>
        <div className="space-y-1.5">
          {Object.entries(lightLabels).map(([key, { label, icon: Icon }]) => (
            <label key={key} className="flex cursor-pointer items-center gap-2.5 text-sm text-forest-700">
              <input
                type="checkbox"
                checked={lights.includes(key)}
                onChange={() => toggle(setLights, lights, key)}
                className="h-4 w-4 rounded border-stone-300 text-forest-600 focus:ring-forest-500"
              />
              <Icon className="h-4 w-4 text-sage-500" /> {label}
            </label>
          ))}
        </div>
      </div>

      {/* Status */}
      <div>
        <h3 className="mb-2.5 text-sm font-semibold text-forest-900">Наявність</h3>
        <div className="space-y-1.5">
          {statusOptions.map((s) => (
            <label key={s.value} className="flex cursor-pointer items-center gap-2.5 text-sm text-forest-700">
              <input
                type="checkbox"
                checked={statuses.includes(s.value)}
                onChange={() => toggle(setStatuses, statuses, s.value)}
                className="h-4 w-4 rounded border-stone-300 text-forest-600 focus:ring-forest-500"
              />
              {s.label}
            </label>
          ))}
        </div>
      </div>

      {activeCount > 0 && (
        <button onClick={reset} className="btn-secondary w-full">
          <X className="h-4 w-4" /> Скинути фільтри ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="animate-fade-in">
      {/* Page header */}
      <div className="bg-forest-900 py-12 text-white">
        <div className="container-page">
          <nav className="mb-2 text-xs text-forest-200">Головна / Каталог</nav>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold">Каталог рослин</h1>
          <p className="mt-2 max-w-2xl text-forest-100">
            Власні декоративні рослини та троянди. Використовуйте фільтри для добору за категорією,
            типом кореневої системи, висотою та вимогами до освітлення.
          </p>
        </div>
      </div>

      <div className="container-page py-10">
        {/* Search + sort + mobile toggle */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-stone-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Пошук за назвою або латинським іменем..."
              className="input pl-11"
            />
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input sm:w-52">
            <option value="default">За замовчуванням</option>
            <option value="price_asc">Ціна: за зростанням</option>
            <option value="price_desc">Ціна: за спаданням</option>
            <option value="name">За назвою (А-Я)</option>
          </select>
          <button onClick={() => setShowMobile(true)} className="btn-secondary lg:hidden">
            <SlidersHorizontal className="h-4 w-4" /> Фільтри
            {activeCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest-600 text-xs font-bold text-white">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl bg-white p-5 shadow-soft">{FilterPanel}</div>
          </aside>

          {/* Mobile drawer */}
          {showMobile && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-forest-950/50 backdrop-blur-sm" onClick={() => setShowMobile(false)} />
              <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-stone-50 p-5 shadow-lift">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-display text-lg font-semibold text-forest-900">Фільтри</h2>
                  <button onClick={() => setShowMobile(false)} className="text-forest-600">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                {FilterPanel}
                <button onClick={() => setShowMobile(false)} className="btn-primary mt-6 w-full">
                  Показати ({filtered.length})
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-forest-600">
                Знайдено: <b className="text-forest-900">{filtered.length}</b> позицій
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-20 text-center shadow-soft">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100">
                  <Leaf className="h-8 w-8 text-stone-400" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-forest-900">Нічого не знайдено</h3>
                <p className="mt-1 text-sm text-forest-600">Спробуйте змінити параметри пошуку або фільтрів.</p>
                <button onClick={reset} className="btn-primary mt-5">Скинути фільтри</button>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((plant) => (
                  <ProductCard key={plant.id} plant={plant} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
