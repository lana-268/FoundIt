import { AlertCircle, Inbox, LoaderCircle, RotateCcw } from 'lucide-react';

export function LoadingState() {
  return <div className="flex min-h-72 flex-col items-center justify-center gap-3 text-slate-500" role="status"><LoaderCircle className="animate-spin text-brand-600" size={34} /><p className="font-semibold">Gathering community posts…</p></div>;
}

export function EmptyState({ onClear }: { onClear: () => void }) {
  return <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
    <span className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-slate-500"><Inbox /></span>
    <h2 className="text-xl font-bold">No matching items</h2><p className="mt-2 max-w-md text-slate-500">Try a broader search, or clear your filters to see all community posts.</p>
    <button className="btn-secondary mt-5" onClick={onClear}>Clear all filters</button>
  </div>;
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-8 text-center" role="alert">
    <AlertCircle className="text-red-600" size={34} /><h2 className="mt-4 text-xl font-bold">Something went wrong</h2><p className="mt-2 text-slate-600">{message}</p>
    <button className="btn-secondary mt-5" onClick={onRetry}><RotateCcw size={17} /> Try again</button>
  </div>;
}
