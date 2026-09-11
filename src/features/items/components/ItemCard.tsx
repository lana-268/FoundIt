import { CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatusBadge, TypeBadge } from '../../../components/ui/StatusBadge';
import type { Item } from '../types/item';

const formatDate = (date: string) => new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${date}T12:00:00`));

export function ItemCard({ item }: { item: Item }) {
  return <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-card">
    <Link to={`/items/${item.id}`} className="block overflow-hidden" aria-label={`View details for ${item.title}`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img src={item.imageUrl} alt={`${item.title}, reported ${item.type}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute left-3 top-3"><TypeBadge type={item.type} /></div>
      </div>
    </Link>
    <div className="p-5">
      <div className="flex items-start justify-between gap-3"><p className="text-sm font-semibold text-brand-700">{item.category}</p><StatusBadge status={item.status} /></div>
      <h3 className="mt-2 text-lg font-bold leading-snug"><Link to={`/items/${item.id}`} className="rounded hover:text-brand-700">{item.title}</Link></h3>
      <div className="mt-4 space-y-2 text-sm text-slate-500">
        <p className="flex items-center gap-2"><MapPin size={16} className="shrink-0" aria-hidden="true" />{item.location}</p>
        <p className="flex items-center gap-2"><CalendarDays size={16} className="shrink-0" aria-hidden="true" />{formatDate(item.date)}</p>
      </div>
      <Link to={`/items/${item.id}`} className="mt-5 inline-flex font-bold text-brand-700 hover:text-brand-500">View details <span aria-hidden="true" className="ml-1">→</span></Link>
    </div>
  </article>;
}
