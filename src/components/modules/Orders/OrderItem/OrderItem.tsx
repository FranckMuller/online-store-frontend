import { useDeleteOrder } from "@/hooks/orders/queries";

import Image from "next/image";
import Link from "next/link";
import ElementSpinner from "@/components/ui/ElementSpinner/ElementSpinner";
import Button, { EButtonVariants } from "@/components/ui/Button/Button";

import { IOrder } from "@/interfaces/orders.interface";

import styles from "./OrderItem.module.scss";

const orderStatuses = {
  PENDING: { title: "pending", styles: { backgroundColor: "var(--blue)" } },
  PAYED: { title: "payed", styles: { backgroundColor: "var(--green)" } },
  CANCELED: { title: "canceled", styles: { backgroundColor: "var(--orange)" } }
};

type Props = {
  order: IOrder;
  onCancelOrder?: (orderId: string) => void;
  isLoadingCancel?: boolean;
  showPaymentDetails?: boolean;
  showOrderDetails?: boolean;
};

const OrderItem = ({
  order,
  onCancelOrder,
  isLoadingCancel,
  showPaymentDetails,
  showOrderDetails
}: Props) => {
  const { deleteOrder, isLoadingDelete } = useDeleteOrder();

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
            </div>
            <div className={styles["product-price"]}>${i.product.price}</div>
          </div>
        ))}
      </div>

      {showPaymentDetails && (
        <div className={`${styles["payment-details"]} bg-white`}>
          <h3 className={styles["title"]}>
            To pay <span>${order.amount}</span>
          </h3>
          <p className={styles["products-quantity"]}>
            30 item <span>${order.amount}</span>
          </p>
          <p className={styles["vat"]}>
            VAT 20% <span>$5</span>
          </p>
          <p className={styles["delivery"]}>
            Delivery <span>free</span>
          </p>

          <div className={styles["order-controls"]}>
            {onCancelOrder && (
              <button
                disabled={!!isLoadingCancel}
                className="btn-cancel"
                onClick={() => onCancelOrder(order.id)}
              >
                Cancel order
                <ElementSpinner isLoading={!!isLoadingCancel} />
              </button>
            )}

            {order.paymentUrl && (
              <Link
                className={`${styles["payment-link"]} btn-secondary`}
                href={order.paymentUrl}
              >
                Pay order
              </Link>
            )}
          </div>
        </div>
      )}

      {showOrderDetails && (
        <div className={styles["order-details"]}>
          <p className={styles["status"]}>
            Status:
            <span
              style={
                orderStatuses[order.status as keyof typeof orderStatuses].styles
              }
            >
              {orderStatuses[order.status as keyof typeof orderStatuses].title}
            </span>
          </p>
          <p className={styles["total"]}>Total: {order.amount}</p>
          
            <Button
              customClass={styles["delete-btn"]}
              text="Delete order"
              variant={EButtonVariants.DANGER}
              onClick={() => deleteOrder(order.id)}
              loading={isLoadingDelete}
              disabled={isLoadingDelete}
            />
          
        </div>
      )}
    </div>
  );
};

export default OrderItem;
