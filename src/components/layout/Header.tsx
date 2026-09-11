import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export function Header() {
  const [open, setOpen] = useState(false);
  const navClass = ({ isActive }: { isActive: boolean }) => `rounded-lg px-3 py-2 font-semibold transition ${isActive ? 'text-brand-700' : 'text-slate-600 hover:text-ink'}`;
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-cream/90 backdrop-blur-xl">
      <div className="container-page flex h-18 items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2 rounded-lg" aria-label="FoundIt home">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white shadow-sm"><Search size={20} strokeWidth={3} /></span>
          <span className="font-['Manrope'] text-xl font-extrabold tracking-tight">Found<span className="text-brand-600">It</span></span>
        </Link>
        <nav className="hidden items-center gap-2 sm:flex" aria-label="Main navigation">
          <NavLink to="/" className={navClass}>Browse Items</NavLink>
          <Link to="/report" className="btn-primary !px-4 !py-2.5">Report Item</Link>
        </nav>
        <button className="rounded-lg p-2 sm:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="container-page flex flex-col gap-2 border-t border-slate-200 py-4 sm:hidden" aria-label="Mobile navigation">
        <NavLink to="/" onClick={() => setOpen(false)} className={navClass}>Browse Items</NavLink>
        <Link to="/report" onClick={() => setOpen(false)} className="btn-primary">Report Item</Link>
      </nav>}
    </header>
  );
}
