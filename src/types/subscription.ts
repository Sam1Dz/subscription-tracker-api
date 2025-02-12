/* TYPES */
import type { Types } from 'mongoose';

type SubscriptionCurrency = 'IDR' | 'SGD' | 'USD';
type SubscriptionFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';
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
