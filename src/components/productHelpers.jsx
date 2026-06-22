import { Sun, Cloud, CloudSun, CheckCircle2, Clock } from 'lucide-react';

export const lightLabels = {
  sun: { label: 'Сонце', icon: Sun },
  semi_shade: { label: 'Півтінь', icon: CloudSun },
  shade: { label: 'Тінь', icon: Cloud },
};

export const typeLabels = {
  container: 'Контейнер',
  open_root: 'Відкритий корінь',
};

export const typeColor = {
  container: 'bg-forest-100 text-forest-700',
  open_root: 'bg-sage-100 text-sage-700',
};

export function StatusBadge({ status }) {
  const inStock = status === 'in_stock';
  const Icon = inStock ? CheckCircle2 : Clock;
  return (
    <span
      className={`badge ${
        inStock ? 'bg-green-100 text-green-700' : 'bg-earth-100 text-earth-700'
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {inStock ? 'В наявності' : 'Під замовлення'}
    </span>
  );
}

export function CategoryBadge({ children }) {
  return <span className="badge bg-sage-100 text-sage-700">{children}</span>;
}
