import { mockItems } from '../data/mockItems';
import type { Item } from '../types/item';

const STORAGE_KEY = 'foundit-items-v1';

const isItemArray = (value: unknown): value is Item[] => Array.isArray(value) && value.every((item) => {
  if (typeof item !== 'object' || item === null) return false;
  const candidate = item as Record<string, unknown>;
  return typeof candidate.id === 'string' && typeof candidate.title === 'string' && (candidate.type === 'lost' || candidate.type === 'found') && (candidate.status === 'active' || candidate.status === 'resolved');
});

export const loadItems = (): Item[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockItems));
      return mockItems;
    }
    const parsed: unknown = JSON.parse(stored);
    if (!isItemArray(parsed)) return mockItems;
    const migrated = parsed.map((item) => {
      const starterItem = mockItems.find((entry) => entry.id === item.id);
      return starterItem ? { ...starterItem, ...item } : item;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    return migrated;
  } catch {
    return mockItems;
  }
};

export const saveItems = (items: Item[]): void => localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
