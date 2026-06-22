import { createContext, useContext, useEffect, useState, useCallback } from 'react';

// "Список запиту" — інтерес до рослин для отримання комерційної пропозиції.
// Зберігається у localStorage для збереження між навігацією та перезавантаженнями.

const InquiryContext = createContext(null);
const STORAGE_KEY = 'dekoplant_inquiry';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function InquiryProvider({ children }) {
  const [items, setItems] = useState(load);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const add = useCallback((plant) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === plant.id)) return prev;
      return [...prev, { id: plant.id, name: plant.name, latinName: plant.latinName, price: plant.price, image: plant.images[0], quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const setQuantity = useCallback((id, quantity) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, quantity) } : p)));
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);

  const has = useCallback((id) => items.some((p) => p.id === id), [items]);

  return (
    <InquiryContext.Provider value={{ items, count: items.length, add, remove, setQuantity, clear, has, isOpen, openDrawer, closeDrawer }}>
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const ctx = useContext(InquiryContext);
  if (!ctx) throw new Error('useInquiry must be used within InquiryProvider');
  return ctx;
}
