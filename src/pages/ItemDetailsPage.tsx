import { ArrowLeft, CalendarDays, CheckCircle2, Mail, MapPin, Phone, Tag, UserRound } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LoadingState } from '../components/ui/States';
import { StatusBadge, TypeBadge } from '../components/ui/StatusBadge';
import { useItems } from '../features/items/context/useItems';

export function ItemDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, isLoading, resolveItem } = useItems();
  const [success, setSuccess] = useState(false);
  if (isLoading) return <main className="container-page py-16"><LoadingState /></main>;
  const item = items.find((entry) => entry.id === id);
  if (!item) return <main className="container-page grid min-h-[65vh] place-items-center py-16 text-center"><div><p className="text-7xl font-extrabold text-brand-100">404</p><h1 className="mt-2 text-3xl font-extrabold">Item not found</h1><p className="mt-3 text-slate-500">This post may have been removed or the link may be incorrect.</p><Link to="/" className="btn-primary mt-7"><ArrowLeft size={18} /> Back to all items</Link></div></main>;
  const details = [[Tag, 'Category', item.category], [MapPin, 'Location', item.location], [CalendarDays, 'Date', new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date(`${item.date}T12:00:00`))]] as const;
  const handleResolve = () => { resolveItem(item.id); setSuccess(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return <main className="container-page py-8 sm:py-12">
    <button onClick={() => navigate(-1)} className="mb-7 inline-flex items-center gap-2 rounded-lg font-bold text-slate-600 hover:text-brand-700"><ArrowLeft size={18} /> Back</button>
    {success && <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 font-semibold text-emerald-800" role="status" aria-live="polite"><CheckCircle2 size={20} /> This item has been marked as resolved.</div>}
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card lg:grid lg:grid-cols-[1.05fr_.95fr]">
      <div className="min-h-80 bg-slate-100 lg:min-h-[620px]"><img src={item.imageUrl} alt={`${item.title}, reported ${item.type}`} className="h-full w-full object-cover" /></div>
      <div className="p-6 sm:p-10 lg:p-12">
        <div className="flex flex-wrap gap-2"><TypeBadge type={item.type} /><StatusBadge status={item.status} /></div>
        <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">{item.title}</h1>
        <p className="mt-5 leading-7 text-slate-600">{item.description}</p>
        <dl className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">{details.map(([Icon, label, value]) => <div key={label} className="rounded-xl bg-slate-50 p-4"><dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400"><Icon size={15} />{label}</dt><dd className="mt-2 font-semibold text-slate-700">{value}</dd></div>)}</dl>
        <div className="mt-8 border-t border-slate-200 pt-8"><p className="text-sm font-bold uppercase tracking-wider text-slate-400">Contact</p><div className="mt-4 space-y-3"><p className="flex items-center gap-3 font-semibold"><UserRound className="text-brand-600" size={19} />{item.contactName}</p><p className="flex items-center gap-3 break-all text-slate-600"><Mail className="shrink-0 text-brand-600" size={19} />{item.contactEmail ?? item.contactMethod}</p>{item.contactPhone && <p className="flex items-center gap-3 text-slate-600"><Phone className="shrink-0 text-brand-600" size={19} />{item.contactPhone}</p>}</div></div>
        {item.status === 'active' ? <button onClick={handleResolve} className="btn-primary mt-9 w-full !bg-emerald-600 hover:!bg-emerald-700"><CheckCircle2 size={19} /> Mark as resolved</button> : <p className="mt-9 rounded-xl bg-emerald-50 p-4 text-center font-semibold text-emerald-800">Great news — this item has been resolved.</p>}
      </div>
    </article>
  </main>;
}
