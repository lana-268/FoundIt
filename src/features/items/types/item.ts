export const categories = ['Electronics', 'Bags', 'Documents', 'Pets', 'Clothing', 'Keys', 'Accessories', 'Other'] as const;

export type ItemCategory = (typeof categories)[number];
export type ItemType = 'lost' | 'found';
export type ItemStatus = 'active' | 'resolved';

export interface Item {
  id: string;
  title: string;
  type: ItemType;
  category: ItemCategory;
  description: string;
  location: string;
  date: string;
  imageUrl: string;
  contactName: string;
  contactMethod: string;
  contactEmail?: string;
  contactPhone?: string;
  status: ItemStatus;
  createdAt: string;
}
