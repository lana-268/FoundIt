import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return <main className="container-page grid min-h-[65vh] place-items-center py-16 text-center"><div><p className="text-8xl font-extrabold text-brand-100">404</p><h1 className="mt-3 text-3xl font-extrabold">This page wandered off</h1><p className="mt-3 text-slate-500">Let’s get you back to the community board.</p><Link to="/" className="btn-primary mt-7"><ArrowLeft size={18} /> Browse items</Link></div></main>;
}
