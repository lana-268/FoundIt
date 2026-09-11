import { ArrowRight, CheckCircle2, MapPin, PlusCircle, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EmptyState, ErrorState, LoadingState } from '../components/ui/States';
import { ItemCard } from '../features/items/components/ItemCard';
import { SearchFilters, type FilterValues } from '../features/items/components/SearchFilters';
import { useItems } from '../features/items/context/useItems';

const defaultFilters: FilterValues = { search: '', type: 'all', category: '', sort: 'newest' };

export function HomePage() {
  const { items, isLoading, error, retry } = useItems();
  const [filters, setFilters] = useState<FilterValues>(defaultFilters);
  const filteredItems = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    return items.filter((item) => {
      const matchesSearch = !query || [item.title, item.description, item.location].some((value) => value.toLowerCase().includes(query));
      return matchesSearch && (filters.type === 'all' || item.type === filters.type) && (!filters.category || item.category === filters.category);
    }).sort((a, b) => filters.sort === 'newest' ? b.createdAt.localeCompare(a.createdAt) : a.createdAt.localeCompare(b.createdAt));
  }, [items, filters]);
  const active = items.filter((item) => item.status === 'active').length;
  const lost = items.filter((item) => item.type === 'lost').length;
  const found = items.filter((item) => item.type === 'found').length;
  const resolved = items.filter((item) => item.status === 'resolved').length;

  return <>
    <section className="relative overflow-hidden bg-ink pb-20 pt-16 text-white sm:pb-24 sm:pt-24">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-orange-400/10 blur-3xl" aria-hidden="true" />
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100"><span className="h-2 w-2 rounded-full bg-emerald-400" />Your neighborhood lost &amp; found</p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">Lost something?<br /><span className="text-blue-300">Let’s reconnect it.</span></h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">A friendly community board where neighbors help lost belongings find their way home.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link to="/report" className="btn-primary !bg-white !text-ink hover:!bg-blue-50"><PlusCircle size={19} /> Report an item</Link><a href="#items" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white hover:bg-white/10">Browse posts <ArrowRight size={18} /></a></div>
        </div>
        <div className="grid grid-cols-2 gap-3" aria-label="Community board statistics">
          {[['Active', active, Search, 'text-blue-300'], ['Lost', lost, MapPin, 'text-orange-300'], ['Found', found, PlusCircle, 'text-emerald-300'], ['Resolved', resolved, CheckCircle2, 'text-green-300']].map(([label, value, Icon, color]) => {
            const StatIcon = Icon as typeof Search;
            return <div key={String(label)} className="rounded-2xl border border-white/10 bg-white/[.07] p-5 backdrop-blur-sm"><StatIcon className={String(color)} size={22} /><p className="mt-5 text-3xl font-bold">{String(value)}</p><p className="mt-1 text-sm text-slate-300">{String(label)} posts</p></div>;
          })}
        </div>
      </div>
    </section>
    <main id="items" className="container-page pb-20">
      <SearchFilters {...filters} onChange={setFilters} onClear={() => setFilters(defaultFilters)} />
      <div className="mb-7 mt-12 flex items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-widest text-brand-600">Community board</p><h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Recent posts</h2></div>{!isLoading && !error && <p className="text-sm font-medium text-slate-500" aria-live="polite">{filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}</p>}</div>
      {isLoading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={retry} /> : filteredItems.length === 0 ? <EmptyState onClear={() => setFilters(defaultFilters)} /> : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filteredItems.map((item) => <ItemCard key={item.id} item={item} />)}</div>}
    </main>
  </>;
}
