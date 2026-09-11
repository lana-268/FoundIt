import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { loadItems, saveItems } from '../utils/storage';
import type { Item } from '../types/item';

interface ItemsContextValue {
  items: Item[];
  isLoading: boolean;
  error: string | null;
  addItem: (item: Item) => void;
  resolveItem: (id: string) => void;
  retry: () => void;
}

export const ItemsContext = createContext<ItemsContextValue | undefined>(undefined);

export function ItemsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hydrate = () => {
    setIsLoading(true);
    setError(null);
    window.setTimeout(() => {
      try { setItems(loadItems()); } catch { setError('We could not load the community board.'); }
      finally { setIsLoading(false); }
    }, 450);
  };

  useEffect(hydrate, []);

  const value = useMemo<ItemsContextValue>(() => ({
    items,
    isLoading,
    error,
    addItem: (item) => setItems((current) => { const next = [item, ...current]; saveItems(next); return next; }),
    resolveItem: (id) => setItems((current) => { const next = current.map((item) => item.id === id ? { ...item, status: 'resolved' as const } : item); saveItems(next); return next; }),
    retry: hydrate,
  }), [items, isLoading, error]);

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>;
}

export const useItems = (): ItemsContextValue => {
  const context = useContext(ItemsContext);
  if (!context) throw new Error('useItems must be used inside ItemsProvider');
  return context;
};
