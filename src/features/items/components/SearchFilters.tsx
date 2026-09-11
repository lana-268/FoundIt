import { Search, SlidersHorizontal, X } from 'lucide-react';
import { categories } from '../types/item';

export interface FilterValues { search: string; type: 'all' | 'lost' | 'found'; category: string; sort: 'newest' | 'oldest'; }

interface Props extends FilterValues { onChange: (values: FilterValues) => void; onClear: () => void; }

export function SearchFilters({ search, type, category, sort, onChange, onClear }: Props) {
  const hasFilters = Boolean(search || type !== 'all' || category || sort !== 'newest');
  return <section className="relative -mt-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-card sm:p-5" aria-label="Search and filters">
    <div className="grid gap-3 md:grid-cols-[minmax(240px,1fr)_repeat(3,minmax(130px,auto))]">
      <label className="relative"><span className="sr-only">Search items</span><Search className="absolute left-4 top-3.5 text-slate-400" size={19} aria-hidden="true" /><input className="field !mt-0 pl-11" value={search} onChange={(e) => onChange({ search: e.target.value, type, category, sort })} placeholder="Search items or locations…" /></label>
      <label><span className="sr-only">Item type</span><select aria-label="Item type" className="field !mt-0" value={type} onChange={(e) => onChange({ search, type: e.target.value as FilterValues['type'], category, sort })}><option value="all">All posts</option><option value="lost">Lost</option><option value="found">Found</option></select></label>
      <label><span className="sr-only">Category</span><select aria-label="Category" className="field !mt-0" value={category} onChange={(e) => onChange({ search, type, category: e.target.value, sort })}><option value="">All categories</option>{categories.map((entry) => <option key={entry}>{entry}</option>)}</select></label>
      <label><span className="sr-only">Sort items</span><select aria-label="Sort items" className="field !mt-0" value={sort} onChange={(e) => onChange({ search, type, category, sort: e.target.value as FilterValues['sort'] })}><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></label>
    </div>
    <div className="mt-3 flex items-center justify-between text-sm"><p className="flex items-center gap-2 font-medium text-slate-500"><SlidersHorizontal size={16} /> Search and filters work together</p>{hasFilters && <button className="flex items-center gap-1 font-bold text-brand-700 hover:text-brand-500" onClick={onClear}><X size={16} /> Clear all</button>}</div>
  </section>;
}
