import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Building, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function Contacts() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', phone: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contactCards = [
    { icon: Phone, title: 'Телефон', lines: [' +38 043 250 94 94', '++38 096 250 94 94'], href: 'tel: +380432509494' },
    { icon: Mail, title: 'Email', lines: ['info@dekoplant.ua', 'wholesale@dekoplant.ua'], href: 'mailto:info@dekoplant.ua' },
    { icon: MapPin, title: 'Адреса', lines: ['22353, Україна, Вінницька обл., с. Микулинці,  вул. Коцюбинського, 11А'], href: null },
    { icon: Clock, title: 'Графік роботи', lines: ['Пн-Пт: 9:00 — 18:00', 'Сб: 10:00 — 16:00'], href: null },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="bg-forest-900 py-14 text-white">
        <div className="container-page">
          <nav className="mb-2 text-xs text-forest-200">Головна / Контакти</nav>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold">Контакти</h1>
          <p className="mt-2 max-w-2xl text-forest-100">
            Зв'яжіться з нами для консультації, замовлення або організації візиту до розплідника.
          </p>
        </div>
      </section>

      <div className="container-page py-14">
        {/* Contact cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map(({ icon: Icon, title, lines, href }) => (
            <div key={title} className="card p-6 hover:shadow-lift hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-100 text-forest-700">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-forest-900">{title}</h3>
              <div className="mt-1.5 space-y-0.5">
                {lines.map((line) =>
                  href ? (
                    <a key={line} href={href} className="block text-sm text-forest-600 transition-colors hover:text-forest-800">
                      {line}
                    </a>
                  ) : (
                    <p key={line} className="text-sm text-forest-600">{line}</p>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-100 text-forest-700">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-forest-900">Форма запиту</h2>
                <p className="text-sm text-forest-600">Заповніть, і ми зв'яжемось протягом робочого дня</p>
              </div>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-forest-50 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-forest-100">
                  <CheckCircle2 className="h-9 w-9 text-forest-600" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-forest-900">Дякуємо за звернення!</h3>
                <p className="mt-1 text-sm text-forest-600">Ми зв'яжемось з вами найближчим часом.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-forest-700">Ім'я *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input"
                      placeholder="Ваше ім'я"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-forest-700">Телефон *</label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="input"
                      placeholder="+380 __ ___ __ __"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-forest-700">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-forest-700">Повідомлення</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input resize-none"
                    placeholder="Опишіть вашим запит або інтерес до асортименту..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  <Send className="h-4 w-4" /> Надіслати запит
                </button>
                <p className="text-center text-xs text-sage-600">
                  Натискаючи кнопку, ви погоджуєтесь на обробку контактних даних
                </p>
              </form>
            )}
          </div>

          {/* Map placeholder */}
          <div className="overflow-hidden rounded-3xl bg-forest-50 shadow-card">
            <div className="relative flex aspect-square h-full min-h-[340px] items-center justify-center bg-gradient-to-br from-forest-100 via-sage-50 to-forest-50 lg:aspect-auto">
              <svg className="absolute inset-0 h-full w-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#265432" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              {/* Fake roads */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                <path d="M0 220 Q120 200 200 230 T400 200" stroke="#5fa269" strokeWidth="6" fill="none" opacity="0.4" strokeLinecap="round" />
                <path d="M180 0 Q200 120 230 200 T260 400" stroke="#5fa269" strokeWidth="6" fill="none" opacity="0.4" strokeLinecap="round" />
              </svg>
              <div className="relative text-center">
                <div className="relative mx-auto flex h-14 w-14 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest-500 opacity-20" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-forest-600 text-white shadow-lift">
                    <Building className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 font-display text-lg font-semibold text-forest-900">Розплідник «Декоплант»</div>
                <p className="mt-1 max-w-xs px-4 text-sm text-forest-600">
                22353, Україна, Вінницька обл., с. Микулинці,  вул. Коцюбинського, 11А
                </p>
                <a
                  href="https://maps.google.com/?q=Софіївська+Борщагівка"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary mt-4"
                >
                  <MapPin className="h-4 w-4" /> Відкрити на карті
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
