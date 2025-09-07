import { JSX, ReactNode } from 'react';

export interface Transaction {
  id: string;
  transactionId: string;
  dateTime: string;
  type: string;
  from: string;
  to: string;
  amount: number;
  method: string;
  status: 'Active' | 'Pending' | 'Failed';
  currency: string;
  associatedMerchant?: string;
  gateway?: string;
}

export interface Metric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: ReactNode;
  bgColor: string;
  iconColor: string;
}

export interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: ReactNode;
  bgColor: string;
  iconColor: string;
}

export interface MerchantData {
  name: string;
  points: string;
  pointsRedeemed: string;
  ratio: string;
}

export interface PieData {
  name: string;
  value: number;
  color: string;
}

export interface GrowthData {
  day: string;
  value: number;
}

export interface SalesLoyaltyData {
  month: string;
  withLoyalty: number;
  withoutLoyalty: number;
}

export interface RewardData {
  rank: string;
  reward: string;
  merchant: string;
  total: string;
  last: string;
}

export interface PromotionUpliftData {
  name: string;
  value: number;
  color: string;
}



export interface Merchant {
  id: string;
  profile: string;
  merchantName: string;
  email: string;
  plan: string;
  lastVisit: string;
  status: 'Active' | 'Hold' | 'Inactive';
  category?: string;
  description?: string;
  city?: string;
  postalCode?: string;
  location?: string;
  totalCustomers?: number;
}



export interface Message {
  id: number;
  text: string;
  time: string;
  date: string;
  fromMe: boolean;
  senderName: string;
  senderEmail: string;
  avatar: string;
}

export interface EmailMessage {
  id: number;
  folder: string;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  avatar: string;
  label: string;
  labelColor: string;
  time: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
  messages: Message[];
}

export interface Folder {
  name: string;
  count: number;
  icon: JSX.Element;
}


export interface Customer {
  avatar: string;
  name: string;
  email: string;
  points: number;
  lastVisit: string;
  status: string;
};


export interface PurchaseHistory {
  id: string;
  merchantId: string;
  name: string;
  pointsPurchased: number;
  amountPaid: string;
  paymentMethod: string;
  status: 'Active';
}


export interface Reward {
  id: string;
  name: string;
  points: number;
  level: string;
  type: string;
  expired: string;
  status: string;
  image?: string;
};


export interface Tier {
  id: string;
  name: string;
  points: number;
  level: number;
  color: string;
  image?: string;
}


export interface VIPPricingPlan {
  id: string;
  type: string;
  price: number;
  period: string;
  features: string[];
}
