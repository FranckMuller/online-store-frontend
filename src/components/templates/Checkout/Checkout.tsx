"use client";
import { useFetchOrders } from "@/hooks/orders/useFetchOrders";
import { EOrderSortStatuses } from "@/interfaces/orders.interface";

import Link from "next/link";
import Image from "next/image";

import OrderItem from "@/components/modules/Orders/OrderItem/OrderItem";

import styles from "./Checkout.module.scss";

const Checkout = () => {
  const fetchOrders = useFetchOrders({ status: EOrderSortStatuses.PENDING });

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
        {fetchOrders.orders && fetchOrders.orders.length > 0 ? (
          fetchOrders.orders.map(order => (
            <OrderItem key={order.id} order={order} showPaymentDetails={true} />
          ))
        ) : (
          <p>You have no active orders</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
