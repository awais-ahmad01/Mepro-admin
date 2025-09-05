// types.ts
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