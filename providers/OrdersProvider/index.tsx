import { collectionGroup, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState, ReactNode } from "react";
import { OrdersContext } from "./context";
import { useOrders } from "./useOrders";
import { useAuth } from "../AuthProvider";
//import { useUserProfile } from "../ProfileProvider";
import { auth, db } from "@/lib";

interface OrdersProviderProps {
  children: ReactNode;
}

export const OrdersProvider: React.FC<OrdersProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  //  const { profile } = useUserProfile();

  const getOrders = useCallback(
    async (id: string) => {
      try {
        const ordersQuery = query(
          collectionGroup(db, "myorders"),
          where("workshopid", "==", id)
        );
        const docs = await getDocs(ordersQuery);
        if (docs?.docs?.length > 0) {
          setOrders(
            docs?.docs?.map((doc) => doc?.data()).filter((doc) => {
              return doc?.workshopid === auth?.currentUser?.uid;
            })
          );
        }
      } catch (err) {
        console.error(err);
      }
    },
    []
  );

  const getActiveOrders = useCallback(() => {
    return orders.filter((doc) => doc?.status === "Accepted");
  }, [orders]);

  const getCompletedOrders = useCallback(() => {
    return orders.filter((doc) => doc?.status === "Workshop-Completed");
  }, [orders]);

  const getPaidOrders = useCallback(() => {
    return orders.filter((doc) => doc?.status === "Paid");
  }, [orders]);

  const getRecurringOrders = useCallback(() => { }, []);

  const checkExistingOrder = useCallback(
    (id: string) => {
      return orders.filter((doc) => {
        return doc?.carid === id;
      });
    },
    [orders]
  );

  const clearOrders = useCallback(async () => {
    setOrders([]);
  }, []);

  useEffect(() => {
    if (user) getOrders(user?.uid);
  }, [user, getOrders]);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        getOrders,
        getActiveOrders,
        getCompletedOrders,
        getPaidOrders,
        getRecurringOrders,
        checkExistingOrder,
        clearOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export { useOrders };
