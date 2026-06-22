import { Plus, Check, Eye } from 'lucide-react';
import { useRouter } from '../router/router';
import { useInquiry } from '../context/InquiryContext';
import { StatusBadge, CategoryBadge } from './productHelpers';

export default function ProductCard({ plant }) {
  const { navigate } = useRouter();
  const { add, has } = useInquiry();
  const inList = has(plant.id);

  return (
    <article className="card group flex flex-col overflow-hidden hover:shadow-lift hover:-translate-y-1">
      <button
        onClick={() => navigate(`/product/${plant.id}`)}
        className="relative block aspect-[4/3] overflow-hidden"
        aria-label={`Переглянути ${plant.name}`}
      >
        <img
          src={plant.images[0]}
          alt={plant.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <StatusBadge status={plant.status} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-forest-700 opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
          <Eye className="h-3.5 w-3.5" /> Детальніше
        </span>
      </button>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <CategoryBadge>{plant.categoryName}</CategoryBadge>
          <span className="text-sm font-bold text-forest-700">{plant.price} грн</span>
        </div>
        <h3 className="font-display text-lg font-semibold leading-snug text-forest-900">
          <button
            onClick={() => navigate(`/product/${plant.id}`)}
            className="text-left transition-colors hover:text-forest-600"
          >
            {plant.name}
          </button>
        </h3>
        <p className="text-sm italic text-sage-600">{plant.latinName}</p>
        <p className="mt-2 line-clamp-2 text-sm text-forest-600">{plant.description}</p>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-forest-500">
          <span>Висота: <b className="text-forest-700">{plant.height}</b></span>
        </div>

        <button
          onClick={() => add(plant)}
          disabled={inList}
          className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] ${
            inList
              ? 'bg-sage-100 text-sage-700'
              : 'bg-forest-600 text-white hover:bg-forest-700'
          }`}
        >
          {inList ? (
            <>
              <Check className="h-4 w-4" /> У списку запиту
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> У список запиту
            </>
          )}
        </button>
      </div>
    </article>
  );
}
