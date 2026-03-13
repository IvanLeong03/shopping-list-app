// src/shared/types.ts

export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Considering' | 'Bought';

export interface AppSettings {
  categories: string[];
  currencies: string[];
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  priority: Priority;
  status: Status;
  urls: string[];
  createdAt: number;
}