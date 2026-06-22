import { ArrowRight, Flower, Trees, Shrub, Sprout, Leaf, Truck, ShieldCheck, Award, Calendar } from 'lucide-react';
import { useRouter } from '../router/router';
import { categories, plants, news, companyStats } from '../data/plantsData';
import ProductCard from '../components/ProductCard';

const categoryIcons = { Flower, Trees, Shrub, Sprout };

export default function Home() {
  const { navigate } = useRouter();
  const featured = plants.slice(0, 4);
  const seasonal = plants.filter((p) => p.status === 'in_stock').slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?w=1600&auto=format&fit=crop&q=80"
            alt="Розплідник декоративних рослин"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/85 via-forest-900/70 to-forest-900/30" />
        </div>
        <div className="container-page relative flex min-h-[88vh] flex-col justify-center py-20">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur">
              <Leaf className="h-3.5 w-3.5" /> Розплідник від виробника · з 2002 року
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Найкращі декоративні рослини та троянди від виробника
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-forest-100">
              Понад 320 сортів троянд, хвойних, чагарників та багаторічників. Власне виробництво, гарантія якості та оптові постачання по всій Україні.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => navigate('/catalog')} className="btn bg-white text-forest-800 hover:bg-forest-50 active:scale-95">
                Переглянути каталог <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => navigate('/wholesale')} className="btn border border-white/40 text-white hover:bg-white/10">
                Оптовим покупцям
              </button>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-4 gap-4">
              {companyStats.map((s) => (
                <div key={s.label} className="text-center">
                  <dt className="font-display text-2xl font-bold text-white sm:text-3xl">{s.value}</dt>
                  <dd className="mt-1 text-[11px] leading-tight text-forest-200">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page py-20">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow"><Leaf className="h-3.5 w-3.5" /> Категорії</span>
            <h2 className="section-title mt-2">Оберіть тип рослин</h2>
          </div>
          <button onClick={() => navigate('/catalog')} className="btn-ghost">
            Весь каталог <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.icon] || Leaf;
            return (
              <button
                key={cat.id}
                onClick={() => navigate(`/catalog?category=${cat.id}`)}
                className="card group relative overflow-hidden text-left hover:shadow-lift hover:-translate-y-1"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-forest-700 backdrop-blur transition-transform group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">{cat.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-forest-100">{cat.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                    Переглянути <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* About teaser */}
      <section className="bg-forest-50 py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?w=1600&auto=format&fit=crop&q=80"
              alt="Розплідник Декоплант"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card"
            />
            <div className="absolute -bottom-6 -right-2 hidden rounded-2xl bg-forest-700 p-6 text-white shadow-lift sm:block">
              <div className="font-display text-3xl font-bold">24</div>
              <div className="text-sm text-forest-100">роки вирощування рослин</div>
            </div>
          </div>
          <div>
            <span className="eyebrow"><Award className="h-3.5 w-3.5" /> Про нас</span>
            <h2 className="section-title mt-2">Розплідник, якому довіряють професіонали</h2>
            <p className="mt-4 text-forest-700">
              «Декоплант» — власний розплідник площею 18 гектарів, де ми вирощуємо декоративні
              рослини за адаптованими до українського клімату технологіями. Ми контролюємо
              повний цикл від щеплення до продажу.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, title: 'Гарантія якості', text: 'Сертифікований посадковий матеріал' },
                { icon: Truck, title: 'Оптові постачання', text: 'Доставка по всій Україні' },
                { icon: Award, title: 'Досвід', text: 'Власне виробництво з 2002 року' },
                { icon: Leaf, title: 'Адаптованість', text: 'Зони стійкості 3-6 USDA' },
              ].map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest-100 text-forest-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-forest-900">{title}</div>
                    <div className="text-sm text-forest-600">{text}</div>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={() => navigate('/about')} className="btn-primary mt-8">
              Дізнатися більше <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Seasonal recommendations */}
      <section className="container-page py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="eyebrow"><Calendar className="h-3.5 w-3.5" /> Сезонні рекомендації</span>
            <h2 className="section-title mt-2">В наявності зараз</h2>
          </div>
          <button onClick={() => navigate('/catalog')} className="btn-ghost hidden sm:inline-flex">
            Усі рослини <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {seasonal.map((plant) => (
            <ProductCard key={plant.id} plant={plant} />
          ))}
        </div>
      </section>

      {/* News */}
      <section className="bg-forest-950 py-20 text-white">
        <div className="container-page">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="eyebrow text-sage-400"><Calendar className="h-3.5 w-3.5" /> Новини та статті</span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-white">Сезонні поради та новини</h2>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {news.map((item) => (
              <article key={item.id} className="group overflow-hidden rounded-2xl bg-forest-900 shadow-soft transition-all hover:shadow-lift">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <span className="badge bg-sage-900/60 text-sage-200">{item.category}</span>
                  <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-white">{item.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-forest-200">{item.excerpt}</p>
                  <p className="mt-3 text-xs text-sage-400">{item.date}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
