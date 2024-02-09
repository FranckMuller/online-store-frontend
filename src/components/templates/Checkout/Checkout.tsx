"use client";
import {
  useQueryPendingOrders,
  useMutationCancelOrder
} from "@/hooks/orders/queries";

import Link from "next/link";
import Image from "next/image";

import OrderItem from "@/components/modules/Orders/OrderItem/OrderItem";

import styles from "./Checkout.module.scss";

const Checkout = () => {
  const { orders } = useQueryPendingOrders();
  const { cancelOrder, isLoadingCancelOrder } = useMutationCancelOrder();

  return (
    <div className={styles["checkout"]}>
      <div className={styles["order-details"]}>
        <div className={`${styles["recipient"]} bg-white`}>
          <h3 className={styles["title"]}>Recipient</h3>
          <p className={styles["name-phone"]}>
            Dmitry Svetlov, +375 29 128-56-74
          </p>
          <p className={styles["address"]}>Minsk, Voloha 25 30</p>
        </div>

        <div className={`${styles["shipping"]} bg-white`}>
          <h3 className={styles["title"]}>Shipping</h3>
          <p>delivery address</p>
          <p className={styles["address"]}>Minsk, Voloha 25 30</p>
        </div>
      </div>
      <div className={styles["order-items"]}>
        {orders && orders.length > 0 ? (
          orders.map(order => (
            <OrderItem
              key={order.id}
              onCancelOrder={cancelOrder}
              isLoadingCancel={isLoadingCancelOrder}
              order={order}
              showPaymentDetails={true}
            />
          ))
        ) : (
          <p>You have no active orders</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
