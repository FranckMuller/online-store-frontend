import { useRemoveOrder } from "@/hooks/orders/useRemoveOrder";
import { useCancelOrder } from "@/hooks/orders/useCancelOrder";
import { useConfirmShipment } from "@/hooks/orders/useConfirmShipment";
import { useConfirmDelivery } from "@/hooks/orders/useConfirmDelivery";

import Image from "next/image";
import Link from "next/link";
import PaymentDetails from "./PaymentDetails/PaymentDetails";
import OrderInfo from "./OrderInfo/OrderInfo";

import { type IOrder, EOrderStatuses } from "@/interfaces/orders.interface";

import styles from "./OrderItem.module.scss";

type Props = {
  order: IOrder;
  showPaymentDetails?: boolean;
  showOrderDetails?: boolean;
};

const OrderItem = ({ order, showPaymentDetails, showOrderDetails }: Props) => {
  const removeOrder = useRemoveOrder();
  const cancelOrder = useCancelOrder();
  const confirmShipment = useConfirmShipment();
  const confirmDelivery = useConfirmDelivery();

  return (
    <div className={styles["order-item"]}>
      <div className={`${styles["products"]} bg-white`}>
        {order.items.map(i => (
          <div key={i.id} className={styles["product"]}>
            <div className={styles["product-image"]}>
              <Image
                src={i.product.mainImage.path}
                alt={i.product.name}
                width={100}
                height={100}
              />
            </div>
            <div className={styles["product-details"]}>
              <p className={styles["product-name"]}>{i.product.name}</p>
              <p className={styles["product-delivery"]}>
                Delivery before 29 February, $12
              </p>
              <div className={styles["product-quantity"]}>
                Quantity: <b>{i.quantity}</b>
              </div>
              <div className={styles["product-total"]}>
                Total: <b>${i.total}</b>
              </div>
            </div>
            <div className={styles["product-price"]}>${i.product.price}</div>
          </div>
        ))}
      </div>

      {showPaymentDetails && (
        <PaymentDetails
          order={order}
          onCancelOrder={() => cancelOrder.cancel(order.id)}
          isLoadingCancelOrder={cancelOrder.isLoading}
        />
      )}

      {showOrderDetails && (
        <OrderInfo
          order={order}
          onRemoveOrder={() => removeOrder.remove(order.id)}
          isLoadingRemoveOrder={removeOrder.isLoading}
          onConfirmShipment={() => confirmShipment.confirm(order.id)}
          isLoadingConfirmShipment={confirmShipment.isLoading}
          onConfirmDelivery={() => confirmDelivery.confirm(order.id)}
          isLoadingConfirmDelivery={confirmDelivery.isLoading}
        />
      )}
    </div>
  );
};

export default OrderItem;
