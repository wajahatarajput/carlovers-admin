import { createContext, ReactNode } from 'react';

interface OrdersContextType {
  orders: any[];
  filterOrders?: (criteria: any) => any[];
  getOrders: (id: string) => Promise<void>;
  filterUserOrders?: () => any[];
  getActiveOrders: () => any[];
  getCompletedOrders: () => any[];
  getPaidOrders: () => any[];
  getRecurringOrders: () => void;
  checkExistingOrder: (id: string) => any[];
  clearOrders: () => Promise<void>;
}

export const OrdersContext = createContext<OrdersContextType>({
  orders: [],
  filterOrders: () => [],
  getOrders: async () => { },
  filterUserOrders: () => [],
  getActiveOrders: () => [],
  getCompletedOrders: () => [],
  getPaidOrders: () => [],
  getRecurringOrders: () => { },
  checkExistingOrder: () => [],
  clearOrders: async () => { },
});
