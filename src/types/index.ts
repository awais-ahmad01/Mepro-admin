import { ReactNode } from 'react';

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