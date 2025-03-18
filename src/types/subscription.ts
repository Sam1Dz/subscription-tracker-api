/* TYPES */
import type { Types, Document } from 'mongoose';

type SubscriptionCurrency = 'IDR' | 'SGD' | 'USD';
type SubscriptionCategory =
  | 'sports'
  | 'news'
  | 'entertainment'
  | 'lifestyle'
  | 'technology'
  | 'finance'
  | 'politics'
  | 'other';
type SubscriptionStatus = 'active' | 'cancelled' | 'expired';
export type SubscriptionFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface ISubscription {
  name: string;
  user: Types.ObjectId;
  price: number;
  currency: SubscriptionCurrency;
  category: SubscriptionCategory;
  startDate: NativeDate;
  frequency: SubscriptionFrequency;
  paymentMethod: string;
  status: SubscriptionStatus;
  renewalDate?: NativeDate;
}
export type ISubscriptionDocument = ISubscription & Document;
