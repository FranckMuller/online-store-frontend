"use client";
import OrderItem from "@/components/modules/Orders/OrderItem/OrderItem";

import { useQueryOrders } from "@/hooks/orders/queries";

import styles from "./Orders.module.scss";

const Orders = () => {
  const { orders, isLoadingOrders } = useQueryOrders();

  return (
    <div className={styles["orders"]}>
      <h3>Orders</h3>
      {orders && orders.length ? (
        orders.map(order => (
          <OrderItem
            showOrderDetails={true}
            key={order.id}
            order={order}
          />
        ))
      ) : (
        <p>you have no orders</p>
      )}
    </div>
  );
};

export default Orders;
