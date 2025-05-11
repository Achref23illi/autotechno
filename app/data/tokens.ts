// app/data/tokens.ts
import { TokenPackage } from '../types';

export const tokenPackages: TokenPackage[] = [
  {
    id: '1',
    name: 'Basic',
    tokens: 10,
    price: 9.99,
    discountPercentage: 0,
  },
  {
    id: '2',
    name: 'Standard',
    tokens: 50,
    price: 39.99,
    discountPercentage: 20,
    popular: true,
  },
  {
    id: '3',
    name: 'Professional',
    tokens: 100,
    price: 69.99,
    discountPercentage: 30,
  },
  {
    id: '4',
    name: 'Enterprise',
    tokens: 500,
    price: 299.99,
    discountPercentage: 40,
  }
];

export const tokenUsageCosts = {
  ecuDecrypt: 2,
  airbagReset: 3,
  dashboardRepair: 4,
  immobilizerBypass: 5,
  specialFiles: 10
};