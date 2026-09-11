import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return <footer className="mt-auto border-t border-slate-200 bg-white">
    <div className="container-page flex flex-col items-center justify-between gap-3 py-8 text-sm text-slate-500 sm:flex-row">
      <Link to="/" className="font-['Manrope'] text-lg font-extrabold text-ink">Found<span className="text-brand-600">It</span></Link>
      <p className="flex items-center gap-1.5">Helping neighbors reconnect with what matters <Heart size={15} className="fill-orange-400 text-orange-400" aria-hidden="true" /></p>
      <p>© {new Date().getFullYear()} FoundIt</p>
    </div>
  </footer>;
}
