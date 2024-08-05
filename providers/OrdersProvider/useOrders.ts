import { useContext } from "react";
import { OrdersContext } from "./context";

export function useOrders() {
  const {
    orders,
    filterOrders,
    getOrders,
    filterUserOrders,
    getActiveOrders,
    getCompletedOrders,
    getPaidOrders,
    getRecurringOrders,
    checkExistingOrder,
    clearOrders,
  } = useContext(OrdersContext);

  return {
    orders,
    filterOrders,
    getOrders,
    filterUserOrders,
    getActiveOrders,
    getCompletedOrders,
    getPaidOrders,
    getRecurringOrders,
    checkExistingOrder,
    clearOrders,
  };
}
