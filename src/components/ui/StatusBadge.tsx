import { CheckCircle2 } from 'lucide-react';
import type { ItemStatus, ItemType } from '../../features/items/types/item';

export function TypeBadge({ type }: { type: ItemType }) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${type === 'lost' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>{type}</span>;
}

export function StatusBadge({ status }: { status: ItemStatus }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${status === 'resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
    {status === 'resolved' && <CheckCircle2 size={13} aria-hidden="true" />}{status === 'resolved' ? 'Resolved' : 'Active'}
  </span>;
}
