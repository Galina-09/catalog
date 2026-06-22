import { Award, ShieldCheck, Truck, Leaf, Sprout, Factory, FlaskConical, TreePine, ArrowRight } from 'lucide-react';
import { companyStats } from '../data/plantsData';
import { useRouter } from '../router/router';

const milestones = [
  { year: '2002', title: 'Заснування розплідника', text: 'Старт виробництва на 3 гектарах з власними маточниками троянд.' },
  { year: '2009', title: 'Розширення асортименту', text: 'Введено лінію хвойних та контейнерних рослин, власний зимовий сховок.' },
  { year: '2015', title: 'Сертифікація якості', text: 'Отримано сертифікати відповідності сорту та фітосанітарних норм ЄС.' },
  { year: '2024', title: '18 гектарів виробництва', text: 'Сучасна крапельна система зрошення та клімат-контроль у контейнерному господарстві.' },
];

const infrastructure = [
  { icon: Factory, title: 'Контейнерне господарство', text: '3,5 га відкритого та закритого контейнерного вирощування з автополивом.' },
  { icon: Sprout, title: 'Маточники сортів', text: 'Власні маточники троянд та чагарників для стабільного щеплення та живцювання.' },
  { icon: FlaskConical, title: 'Лабораторія контролю', text: 'Періодичний фітосанітарний контроль і тестування на вірусні інфекції.' },
  { icon: TreePine, title: 'Зимовий сховок', text: 'Площа 2000 м² з температурно-вологісним режимом для збереження контейнерних рослин.' },
];

export default function About() {
  const { navigate } = useRouter();

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1530968464165-7a1861cbaf9e?w=1600&auto=format&fit=crop&q=80" alt="Розплідник" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/85 to-forest-900/40" />
        </div>
        <div className="container-page relative flex min-h-[55vh] items-center py-16">
          <div className="max-w-2xl">
            <span className="eyebrow text-sage-300"><Leaf className="h-3.5 w-3.5" /> Про нас</span>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Розплідник декоративних рослин повного циклу
            </h1>
            <p className="mt-4 text-lg text-forest-100">
              Понад 20 років ми вирощуємо здорові, адаптовані до українського клімату декоративні
              рослини — від щеплення троянд до вирощування крупномірів.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-page -mt-12 relative z-10">
        <div className="grid gap-4 rounded-3xl bg-white p-6 shadow-card sm:grid-cols-4 sm:p-8">
          {companyStats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-bold text-forest-700 sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-forest-600">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?w=1600&auto=format&fit=crop&q=80" alt="Вирощування рослин" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card" />
            <div className="absolute -bottom-5 -right-2 hidden rounded-2xl bg-forest-700 px-6 py-4 text-white shadow-lift sm:block">
              <div className="font-display text-2xl font-bold">18 га</div>
              <div className="text-xs text-forest-100">власних площ</div>
            </div>
          </div>
          <div>
            <span className="eyebrow"><Award className="h-3.5 w-3.5" /> Наша історія</span>
            <h2 className="section-title mt-2">Від щеплення до продажу — повний контроль якості</h2>
            <p className="mt-4 leading-relaxed text-forest-700">
              «Декоплант» почав роботу у 2002 році як сімейний розплідник троянд. Сьогодні ми —
              сучасне підприємство з 18 гектарами виробничих площ, власним контейнерним господарством
              та зимовим сховком.
            </p>
            <p className="mt-3 leading-relaxed text-forest-700">
              Ми працюємо за сортоматеріалом провідних європейських селекціонерів (Kordes, Tantau,
              Poulsen) та адаптуємо технології вирощування до українських кліматичних зон.
              Кожна партія проходить фітосанітарний контроль.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              {[
                { icon: ShieldCheck, text: 'Сертифікований матеріал' },
                { icon: Truck, text: 'Доставка по Україні' },
                { icon: Award, text: 'Гарантія сорту' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm font-medium text-forest-700">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest-100 text-forest-700">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-forest-50 py-16">
        <div className="container-page">
          <div className="mb-10">
            <span className="eyebrow"><Sprout className="h-3.5 w-3.5" /> Етапи розвитку</span>
            <h2 className="section-title mt-2">Наш шлях</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {milestones.map((m, i) => (
              <div key={m.year} className="relative rounded-2xl bg-white p-6 shadow-soft">
                <div className="font-display text-2xl font-bold text-forest-600">{m.year}</div>
                <div className="mt-1 h-px w-12 bg-earth-400" />
                <h3 className="mt-3 font-semibold text-forest-900">{m.title}</h3>
                <p className="mt-2 text-sm text-forest-600">{m.text}</p>
                {i < milestones.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-forest-100 text-forest-600 md:flex">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="container-page py-16">
        <div className="mb-10">
          <span className="eyebrow"><Factory className="h-3.5 w-3.5" /> Інфраструктура</span>
          <h2 className="section-title mt-2">Технічна база розплідника</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {infrastructure.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card p-6 hover:shadow-lift hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-100 text-forest-700">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-forest-900">{title}</h3>
              <p className="mt-2 text-sm text-forest-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-20">
        <div className="overflow-hidden rounded-3xl bg-forest-800 px-8 py-12 text-center text-white sm:px-12">
          <h2 className="font-display text-3xl font-semibold">Готові співпрацювати?</h2>
          <p className="mx-auto mt-3 max-w-xl text-forest-100">
            Замовте комерційну пропозицію або відвідайте розплідник особисто для добору асортименту.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate('/wholesale')} className="btn bg-white text-forest-800 hover:bg-forest-50">
              Оптовим покупцям <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => navigate('/contacts')} className="btn border border-white/40 text-white hover:bg-white/10">
              Контакти
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
