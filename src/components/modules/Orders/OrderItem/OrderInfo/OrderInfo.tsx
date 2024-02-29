import Link from "next/link";
import Button, { EButtonVariants } from "@/components/ui/Button/Button";

import { type IOrder, EOrderStatuses } from "@/interfaces/orders.interface";

import styles from "./OrderInfo.module.scss";

type Props = {
  order: IOrder;
  onRemoveOrder: () => void;
  isLoadingRemoveOrder: boolean;
  onConfirmShipment: () => void;
  isLoadingConfirmShipment: boolean;
  onConfirmDelivery: () => void;
  isLoadingConfirmDelivery: boolean;
};

const notificationMessages = {
  [EOrderStatuses.Pending]:
    "You should pay this order if you did it please wait for confirm payment",
  [EOrderStatuses.Payed]: "This order is payed you can cofirm for shipment",
  [EOrderStatuses.Shipped]: "If you got your order please confirm delivery",
  [EOrderStatuses.Delivered]: "",
  [EOrderStatuses.Canceled]: ""
};

const orderStatusItems = {
  [EOrderStatuses.Pending]: {
    title: EOrderStatuses.Pending,
    styles: { backgroundColor: "var(--blue)" }
  },
  [EOrderStatuses.Payed]: {
    title: EOrderStatuses.Payed,
    styles: { backgroundColor: "var(--green)" }
  },
  [EOrderStatuses.Canceled]: {
    title: EOrderStatuses.Canceled,
    styles: { backgroundColor: "var(--orange)" }
  },
  [EOrderStatuses.Shipped]: {
    title: EOrderStatuses.Shipped,
    styles: { backgroundColor: "var(--orange)" }
  },
  [EOrderStatuses.Delivered]: {
    title: EOrderStatuses.Delivered,
    styles: { backgroundColor: "var(--blue-dark)" }
  }
};

const OrderInfo = ({
  order,
  onRemoveOrder,
  isLoadingRemoveOrder,
  onConfirmShipment,
  isLoadingConfirmShipment,
  onConfirmDelivery,
  isLoadingConfirmDelivery
}: Props) => {
  return (
    <div className={styles["order-info"]}>
      <p className={styles["status"]}>
        Status:
        <span style={orderStatusItems[order.status].styles}>
          {orderStatusItems[order.status].title}
        </span>
      </p>
      <p className={styles["total"]}>Total: {order.amount}</p>

      <p className={styles["notification-message"]}>
        {notificationMessages[order.status]}
      </p>

      <div className={styles["controls"]}>
        <Button
          customClass={styles["delete-btn"]}
          size="sm"
          text="Delete order"
          variant={EButtonVariants.Danger}
          onClick={onRemoveOrder}
          loading={isLoadingRemoveOrder}
          disabled={isLoadingRemoveOrder}
        />

        {order.status === EOrderStatuses.Payed && (
          <Button
            text="Confirm shipment"
            size="sm"
            variant={EButtonVariants.Secondary}
            onClick={onConfirmShipment}
            loading={isLoadingConfirmShipment}
            disabled={isLoadingConfirmShipment}
          />
        )}

        {order.status === EOrderStatuses.Shipped && (
          <Button
            text="Confirm delivery"
            size="sm"
            variant={EButtonVariants.Secondary}
            onClick={onConfirmDelivery}
            loading={isLoadingConfirmDelivery}
            disabled={isLoadingConfirmDelivery}
          />
        )}

        {order.paymentUrl && (
          <Button
            text="Pay order"
            src={order.paymentUrl}
            variant={EButtonVariants.Secondary}
            size="sm"
          />
        )}
      </div>
    </div>
  );
};

export default OrderInfo;
