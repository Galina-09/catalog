import { useState } from 'react';
import { X, Trash2, Minus, Plus, Send, CheckCircle2 } from 'lucide-react';
import { useInquiry } from '../context/InquiryContext';
import { useRouter } from '../router/router';

export default function InquiryDrawer() {
  const { items, count, isOpen, closeDrawer, remove, setQuantity, clear } = useInquiry();
  const { navigate } = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      clear();
      setSubmitted(false);
      closeDrawer();
    }, 2200);
  };

  const goProduct = (id) => {
    closeDrawer();
    navigate(`/product/${id}`);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-forest-950/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />
      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-stone-50 shadow-lift transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Список запиту"
      >
        <div className="flex items-center justify-between border-b border-stone-200 bg-white px-5 py-4">
          <div>
            <h2 className="font-display text-lg font-semibold text-forest-900">Список запиту</h2>
            <p className="text-xs text-sage-600">{count} позицій · ми підготуємо комерційну пропозицію</p>
          </div>
          <button
            onClick={closeDrawer}
            className="flex h-9 w-9 items-center justify-center rounded-full text-forest-600 hover:bg-stone-100"
            aria-label="Закрити"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-forest-100">
              <CheckCircle2 className="h-9 w-9 text-forest-600" />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-forest-900">Запит надіслано!</h3>
            <p className="mt-2 text-sm text-forest-600">Наш менеджер зв'яжеться з вами протягом робочого дня.</p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100">
              <Send className="h-8 w-8 text-stone-400" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-forest-900">Список порожній</h3>
            <p className="mt-1 text-sm text-forest-600">Додайте рослини з каталогу, щоб отримати пропозицію.</p>
            <button
              onClick={() => {
                closeDrawer();
                navigate('/catalog');
              }}
              className="btn-primary mt-5"
            >
              Перейти до каталогу
            </button>
          </div>
        ) : (
          <>
            <div className="scrollbar-thin flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3 rounded-xl bg-white p-3 shadow-soft">
                    <button
                      onClick={() => goProduct(item.id)}
                      className="h-20 w-20 shrink-0 overflow-hidden rounded-lg"
                    >
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </button>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <button
                        onClick={() => goProduct(item.id)}
                        className="truncate text-left text-sm font-semibold text-forest-900 hover:text-forest-600"
                      >
                        {item.name}
                      </button>
                      <p className="truncate text-xs italic text-sage-600">{item.latinName}</p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setQuantity(item.id, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-stone-200 text-forest-600 hover:bg-stone-50"
                            aria-label="Менше"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => setQuantity(item.id, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-stone-200 text-forest-600 hover:bg-stone-50"
                            aria-label="Більше"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-forest-700">
                          {item.price * item.quantity} грн
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => remove(item.id)}
                      className="self-start text-stone-400 transition-colors hover:text-earth-600"
                      aria-label="Видалити"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="border-t border-stone-200 bg-white px-5 py-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-forest-600">Орієнтовна сума:</span>
                <span className="font-display text-xl font-bold text-forest-900">{total} грн</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input required placeholder="Ваше ім'я" className="input py-2" />
                <input required type="tel" placeholder="Телефон" className="input py-2" />
              </div>
              <input type="email" placeholder="Email (необов'язково)" className="input mt-2 py-2" />
              <button type="submit" className="btn-primary mt-3 w-full">
                <Send className="h-4 w-4" /> Надіслати запит
              </button>
              <p className="mt-2 text-center text-xs text-sage-600">
                Натискаючи кнопку, ви погоджуєтесь на обробку контактних даних
              </p>
            </form>
          </>
        )}
      </aside>
    </>
  );
}
